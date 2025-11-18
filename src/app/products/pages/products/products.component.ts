import { Component, computed, signal } from '@angular/core';
import { PRODUCTS_LIST } from '../../../core/data/products';
import { Product } from '../../../core/models/Product';
import { ProductsListComponent } from '../../../shared/components/products-list/products-list.component';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-products',
  imports: [ProductsListComponent, CommonModule, BreadcrumbsComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  public products = signal<Product[]>(PRODUCTS_LIST);
}
