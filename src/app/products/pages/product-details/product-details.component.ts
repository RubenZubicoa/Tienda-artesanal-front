import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../core/models/Product';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { CarritoService } from '../../../shared/services/carrito.service';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, BreadcrumbsComponent, MatInputModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  public product = input.required<Product>();

  private readonly carritoService = inject(CarritoService);

  public addProductToCart(quantity: string) {
    this.carritoService.addProduct(this.product(), Number(quantity));
  }
}
