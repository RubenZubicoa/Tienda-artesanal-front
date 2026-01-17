import { Component, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { Order } from '../../../core/models/Order';
import { OrderDataComponent } from '../../components/order-data/order-data.component';
import { OrderMeetingPointComponent } from '../../components/order-meeting-point/order-meeting-point.component';
import { OrderProductListComponent } from '../../components/order-product-list/order-product-list.component';
import { MeetingPointsService } from '../../../meeting-points/services/meeting-points.service';
import { MeetingPoint } from '../../../core/models/MeetingPoint';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-order-details',
  imports: [CommonModule, BreadcrumbsComponent, OrderDataComponent, OrderProductListComponent, OrderMeetingPointComponent],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent implements OnInit {
  private readonly meetingPointService = inject(MeetingPointsService);
  private readonly destroyRef = inject(DestroyRef);

  public order = input.required<Order>();
  public meetingPoint = signal<MeetingPoint | undefined>(undefined);

  ngOnInit(): void {
    this.getMeetingPoint();
  }

  getMeetingPoint(): void {
    const meetingPointId = this.order().meetingPointId;
    if (!meetingPointId) {
      return;
    }
    this.meetingPointService.getMeetingPoint(meetingPointId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(meetingPoint => {
      this.meetingPoint.set(meetingPoint);
    });
  }

}
