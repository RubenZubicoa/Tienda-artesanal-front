import { Component, computed, signal } from '@angular/core';
import { PRODUCTS_LIST } from '../../../core/data/products';
import { Product } from '../../../core/models/Product';
import { ProductsListComponent } from '../../../shared/components/products-list/products-list.component';

@Component({
  selector: 'app-products',
  imports: [ProductsListComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  public products = signal<Product[]>(PRODUCTS_LIST);
}
