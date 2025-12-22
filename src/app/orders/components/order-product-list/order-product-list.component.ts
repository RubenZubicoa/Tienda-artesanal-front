import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { Order } from '../../../core/models/Order';
import { TableComponent } from '../../../shared/components/table/table.component';
import { PRODUCTS_COLUMNS } from '../../models/products.columns';

@Component({
  selector: 'app-order-product-list',
  imports: [CommonModule, TableComponent],
  templateUrl: './order-product-list.component.html',
  styleUrl: './order-product-list.component.scss'
})
export class OrderProductListComponent {

  public products = input.required<Order['products']>();
  public columns = PRODUCTS_COLUMNS;
}
