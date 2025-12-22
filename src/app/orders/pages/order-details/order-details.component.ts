import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { Order } from '../../../core/models/Order';
import { OrderDataComponent } from '../../components/order-data/order-data.component';
import { OrderMeetingPointComponent } from '../../components/order-meeting-point/order-meeting-point.component';
import { OrderProductListComponent } from '../../components/order-product-list/order-product-list.component';

@Component({
  selector: 'app-order-details',
  imports: [CommonModule, BreadcrumbsComponent, OrderDataComponent, OrderProductListComponent, OrderMeetingPointComponent],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent {

  public order = input.required<Order>();

}
