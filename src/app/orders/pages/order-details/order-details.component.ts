import { Component, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { Order, OrderStatus } from '../../../core/models/Order';
import { OrderDataComponent } from '../../components/order-data/order-data.component';
import { OrderMeetingPointComponent } from '../../components/order-meeting-point/order-meeting-point.component';
import { OrderProductListComponent } from '../../components/order-product-list/order-product-list.component';
import { MeetingPointsService } from '../../../meeting-points/services/meeting-points.service';
import { MeetingPoint } from '../../../core/models/MeetingPoint';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { OrdersService } from '../../services/orders.service';
import { ToastTypes } from '../../../shared/components/toast/toastData';
import { ToastService } from '../../../shared/components/toast/toast.service';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-order-details',
  imports: [CommonModule, BreadcrumbsComponent, OrderDataComponent, OrderProductListComponent, OrderMeetingPointComponent, TranslatePipe],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent implements OnInit {
  private readonly meetingPointService = inject(MeetingPointsService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly ordersService = inject(OrdersService);
  private readonly toastService = inject(ToastService);
  private readonly router = inject(Router);

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

  changeOrderStatus(order: Order): void {
    const newStatus = order.status === OrderStatus.PENDING ? OrderStatus.COMPLETED : OrderStatus.PENDING;
    this.ordersService.updateOrder(
      order.uuid,
      {
      ...order,
      status: newStatus
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.toastService.showMessage(ToastTypes.SUCCESS, 'Estado del pedido cambiado', 'El estado del pedido ha sido cambiado correctamente');
      this.router.navigate(['/orders']);
    });
  }

}
