import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CompleteOrderFormService } from '../../services/complete-order-form.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ToastService } from '../../../shared/components/toast/toast.service';
import { ToastTypes } from '../../../shared/components/toast/toastData';

@Component({
  selector: 'app-complete-order-form',
  imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './complete-order-form.component.html',
  styleUrl: './complete-order-form.component.scss'
})
export class CompleteOrderFormComponent {

  private readonly completeOrderFormService = inject(CompleteOrderFormService);
  private readonly toasterService = inject(ToastService);
  public form = this.completeOrderFormService.crearFormulario();

  public completeOrder(): void {
    this.toasterService.showMessage(ToastTypes.SUCCESS, 'Pedido completado', 'El pedido ha sido completado correctamente');
  }
}
