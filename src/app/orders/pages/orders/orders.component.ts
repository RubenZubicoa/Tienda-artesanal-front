import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { TableComponent } from '../../../shared/components/table/table.component';
import { ORDERS_COLUMNS } from '../../models/orders.columns';
import { toSignal } from '@angular/core/rxjs-interop';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-orders',
  imports: [CommonModule, BreadcrumbsComponent, TableComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {

  private readonly ordersService = inject(OrdersService);

  public readonly columns = ORDERS_COLUMNS;
  public readonly data = toSignal(this.ordersService.getOrders());

}
