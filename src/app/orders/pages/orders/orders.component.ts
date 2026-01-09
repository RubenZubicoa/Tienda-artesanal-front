import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { TableComponent } from '../../../shared/components/table/table.component';
import { ORDERS_COLUMNS } from '../../models/orders.columns';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { OrdersService } from '../../services/orders.service';
import { CurrentUserService } from '../../../core/services/current-user.service';
import { map } from 'rxjs';
import { OrderFilters, OrderTableData } from '../../../core/models/Order';
import { Router } from '@angular/router';
import { OrderFiltersComponent } from '../../components/order-filters/order-filters.component';
import { ToastTypes } from '../../../shared/components/toast/toastData';
import { ToastService } from '../../../shared/components/toast/toast.service';

@Component({
  selector: 'app-orders',
  imports: [CommonModule, BreadcrumbsComponent, TableComponent, OrderFiltersComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {

  private readonly ordersService = inject(OrdersService);
  private readonly currentUserService = inject(CurrentUserService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly toastService = inject(ToastService);

  public readonly columns = ORDERS_COLUMNS;
  public filters = signal<OrderFilters>({});
  public orders = signal<OrderTableData[]>([]);

  ngOnInit(): void {
    this.getOrders(this.filters());
  }

  public goToOrderDetails(order: OrderTableData) {
    this.router.navigate(['/orders', order.uuid]);
  }

  public applyFilters(filters: OrderFilters) {
    this.filters.set(filters);
    this.getOrders(filters);
  }

  private getOrders(filters: OrderFilters) {
    const manufacturerId = this.currentUserService.currentUser()?.manufacturerId;
    if (!manufacturerId) {
      this.toastService.showMessage(ToastTypes.ERROR, 'Error', 'No tienes permisos para ver los pedidos');
      return;
    }
    filters.manufacturerId = manufacturerId;
    this.ordersService.getOrdersByFilters(filters).pipe(
      map((data) => {
        return data.map((order) => ({
          ...order,
          total: order.products.reduce((acc, product) => acc + product.price * product.quantity, 0),
        }) as OrderTableData);
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(orders => {
      this.orders.set(orders);
    });
  }

}
