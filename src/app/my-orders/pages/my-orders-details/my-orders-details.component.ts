import { Component, DestroyRef, effect, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '../../../core/models/Order';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { OrderMeetingPointComponent } from '../../../orders/components/order-meeting-point/order-meeting-point.component';
import { MeetingPointsService } from '../../../meeting-points/services/meeting-points.service';
import { MeetingPoint } from '../../../core/models/MeetingPoint';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { OrderProductListComponent } from '../../../orders/components/order-product-list/order-product-list.component';
import { ManufacturerService } from '../../../manufacturers/services/manufacturer.service';
import { Manufacturer } from '../../../core/models/Manufacturer';

@Component({
  selector: 'app-my-orders-details',
  imports: [CommonModule, BreadcrumbsComponent, OrderMeetingPointComponent, OrderProductListComponent],
  templateUrl: './my-orders-details.component.html',
  styleUrl: './my-orders-details.component.scss'
})
export class MyOrdersDetailsComponent {

  private readonly meetingPointService = inject(MeetingPointsService);
  private readonly manufacturersService = inject(ManufacturerService);
  private readonly destroyRef = inject(DestroyRef);

  public order = input.required<Order>();
  public meetingPoint = signal<MeetingPoint | undefined>(undefined);
  public manufacturer = signal<Manufacturer | undefined>(undefined);

  constructor() {
    effect(() => {
      const meetingPointId = this.order().meetingPointId;
      if (meetingPointId) {
        this.getMeetingPoint(meetingPointId);
      }
    });

    effect(() => {
      const manufacturerId = this.order().manufacturerId;
      if (manufacturerId) {
        this.getManufacturer(manufacturerId);
      }
    });
  }

  getMeetingPoint(meetingPointId: MeetingPoint['uuid']): void {
    this.meetingPointService.getMeetingPoint(meetingPointId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(meetingPoint => {
      this.meetingPoint.set(meetingPoint);
    });
  }

  getManufacturer(manufacturerId: Manufacturer['uuid']): void {
    this.manufacturersService.getManufacturer(manufacturerId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(manufacturer => {
      this.manufacturer.set(manufacturer);
    });
  }
}
