import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CompleteOrderFormService } from '../../services/complete-order-form.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ToastService } from '../../../shared/components/toast/toast.service';
import { ToastTypes } from '../../../shared/components/toast/toastData';
import { CarritoService } from '../../services/carrito.service';
import { AddOrder, Order } from '../../../core/models/Order';
import { OrdersService } from '../../../orders/services/orders.service';
import { ProductCart } from '../../../core/models/Product';

@Component({
  selector: 'app-complete-order-form',
  imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './complete-order-form.component.html',
  styleUrl: './complete-order-form.component.scss'
})
export class CompleteOrderFormComponent {

  private readonly completeOrderFormService = inject(CompleteOrderFormService);
  private readonly toasterService = inject(ToastService);
  private readonly carritoService = inject(CarritoService);
  private readonly ordersService = inject(OrdersService);
  
  public form = this.completeOrderFormService.crearFormulario();

  public completeOrder(): void {
    const productsByManufacturer = this.carritoService.getProductsCartByManufacturer();
    const formData = this.completeOrderFormService.obtenerDatos(this.form);
    for (const manufacturer in productsByManufacturer) {
      const products = productsByManufacturer[manufacturer];
      const order: AddOrder = {
        manufacturerId: manufacturer,
        products: this.getProducts(products),
        username: formData.name,
        address: formData.address,
        phone: formData.phone,
        email: formData.email,
      };
      this.createOrder(order);      
    }
  }

  private getProducts(products: ProductCart[]){
    return products.map(product => ({ productId: product.uuid, name: product.name, quantity: product.quantity, price: product.price }))
  }

  private createOrder(order: AddOrder): void {
    this.ordersService.createOrder(order).subscribe({
      next: () => {
        this.toasterService.showMessage(ToastTypes.SUCCESS, 'Pedido completado', 'El pedido ha sido completado correctamente');
      },
      error: () => {
        this.toasterService.showMessage(ToastTypes.ERROR, 'Error al completar pedido', 'El pedido no ha sido completado correctamente');
      }
    });
  }
}
