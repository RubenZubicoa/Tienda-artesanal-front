import { CommonModule } from '@angular/common';
import { Component, DestroyRef, effect, inject, input, OnInit, signal } from '@angular/core';
import { getStatusLabel, Order, OrderStatus } from '../../../core/models/Order';
import { Manufacturer } from '../../../core/models/Manufacturer';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ManufacturerService } from '../../../manufacturers/services/manufacturer.service';
import { DataSection } from '../../../shared/components/data-section/models';
import { DataSectionComponent } from '../../../shared/components/data-section/data-section.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-order-data',
  imports: [CommonModule, DataSectionComponent],
  templateUrl: './order-data.component.html',
  styleUrl: './order-data.component.scss',
  standalone: true,
  providers: [DatePipe]
})
export class OrderDataComponent implements OnInit {
  private readonly manufacturerService = inject(ManufacturerService);
  private readonly destroyRef = inject(DestroyRef);

  public order = input.required<Order>();
  public manufacturer = signal<Manufacturer | undefined>(undefined);
  public dataSection = signal<DataSection>([]);
  public datePipe = inject(DatePipe);

  constructor(){
    effect(() => {
      this.manufacturerService.getManufacturer(this.order().manufacturerId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(manufacturer => {
        this.manufacturer.set(manufacturer);
      });
    }, { allowSignalWrites: true });
  }

  ngOnInit(): void {
    this.dataSection.set(this.mapDataOrderToDataSection(this.order()));
  }

  getStatusLabel(status: OrderStatus): string {
    return getStatusLabel(status);
  }

  mapDataOrderToDataSection(order: Order): DataSection {
    const formattedDate = this.datePipe.transform(order.createdAt, 'dd/MM/yyyy HH:mm') ?? '';
    return [
      { label: 'Nombre del cliente', value: order.username },
      { label: 'Fecha del pedido', value: formattedDate },
      { label: 'Email', value: order.email },
      { label: 'Teléfono', value: order.phone },
    ];
  }

}
