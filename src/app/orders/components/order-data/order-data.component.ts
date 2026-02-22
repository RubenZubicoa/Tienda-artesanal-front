import { CommonModule } from '@angular/common';
import { Component, DestroyRef, effect, inject, input, OnInit, signal } from '@angular/core';
import { getStatusLabel, Order, OrderStatus } from '../../../core/models/Order';
import { Manufacturer } from '../../../core/models/Manufacturer';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ManufacturerService } from '../../../manufacturers/services/manufacturer.service';
import { DataSection } from '../../../shared/components/data-section/models';
import { DataSectionComponent } from '../../../shared/components/data-section/data-section.component';
import { DatePipe } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-order-data',
  imports: [CommonModule, DataSectionComponent, TranslatePipe],
  templateUrl: './order-data.component.html',
  styleUrl: './order-data.component.scss',
  standalone: true,
  providers: [DatePipe]
})
export class OrderDataComponent implements OnInit {
  private readonly manufacturerService = inject(ManufacturerService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly translate = inject(TranslateService);

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
      { label: this.translate.instant('order-details.order-data.name'), value: order.username },
      { label: this.translate.instant('order-details.order-data.date'), value: formattedDate },
      { label: this.translate.instant('order-details.order-data.email'), value: order.email },
      { label: this.translate.instant('order-details.order-data.phone'), value: order.phone },
    ];
  }

}
