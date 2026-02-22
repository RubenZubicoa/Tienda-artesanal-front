import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, ViewChild } from '@angular/core';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { CompleteOrderFormComponent } from '../../components/complete-order-form/complete-order-form.component';
import { SelectMeetingPointComponent } from '../../components/select-meeting-point/select-meeting-point.component';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import { AddOrder } from '../../../core/models/Order';
import { OrdersService } from '../../../orders/services/orders.service';
import { ToastService } from '../../../shared/components/toast/toast.service';
import { ToastTypes } from '../../../shared/components/toast/toastData';
import { CarritoService } from '../../services/carrito.service';
import { CompleteOrderForm, CompleteOrderFormService, ICompleteOrderForm } from '../../services/complete-order-form.service';
import { Manufacturer } from '../../../core/models/Manufacturer';
import {MatStepper, MatStepperModule} from '@angular/material/stepper';
import { MeetingPoint } from '../../../core/models/MeetingPoint';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-complete-order',
  imports: [CommonModule, BreadcrumbsComponent, CompleteOrderFormComponent, MatDividerModule, SelectMeetingPointComponent, MatStepperModule, TranslatePipe],
  templateUrl: './complete-order.component.html',
  styleUrl: './complete-order.component.scss'
})
export class CompleteOrderComponent {
  private readonly completeOrderFormService = inject(CompleteOrderFormService);
  private readonly toasterService = inject(ToastService);
  private readonly carritoService = inject(CarritoService);
  private readonly ordersService = inject(OrdersService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly translate = inject(TranslateService);

  public orders: Record<Manufacturer['uuid'], AddOrder> = {};
  public orderFormData: CompleteOrderForm = this.completeOrderFormService.crearFormulario();

  @ViewChild('stepper') stepper!: MatStepper;

  public completeOrder(formData: ICompleteOrderForm): void {
    const productsByManufacturer = this.carritoService.getProductsCartByManufacturer();
    for (const manufacturer in productsByManufacturer) {
      const products = productsByManufacturer[manufacturer];
      const order: AddOrder = {
        manufacturerId: manufacturer,
        products: products,
        username: formData.name,
        phone: formData.phone,
        email: formData.email,
      };
      this.orders[manufacturer] = order;
    }
    this.completeOrderFormService.actualizarFormulario(this.orderFormData, formData);
    this.stepper.next();
  }

  public selectedMeetingPoint(event: { manufacturerId: Manufacturer['uuid'], meetingPointId: MeetingPoint['uuid'] }): void {
    this.orders[event.manufacturerId].meetingPointId = event.meetingPointId;
  }

  public saveChanges(){
    for (const manufacturer in this.orders) {
      const order = this.orders[manufacturer];
      this.createOrder(order);
    }
    this.carritoService.clearCart();
  }

  private createOrder(order: AddOrder): void {
    this.ordersService.createOrder(order).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.router.navigate(['/home']);
        this.toasterService.showMessage(ToastTypes.SUCCESS, this.translate.instant('carrito.complete-order.toast-success-title'), this.translate.instant('carrito.complete-order.toast-success-message'));
      },
      error: () => {
        this.toasterService.showMessage(ToastTypes.ERROR, this.translate.instant('carrito.complete-order.toast-error-title'), this.translate.instant('carrito.complete-order.toast-error-message'));
      }
    });
  }
}
