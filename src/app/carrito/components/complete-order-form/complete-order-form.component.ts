import { Component, inject, OnInit, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CompleteOrderFormService, ICompleteOrderForm } from '../../services/complete-order-form.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CurrentUserService } from '../../../core/services/current-user.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-complete-order-form',
  imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, TranslatePipe],
  templateUrl: './complete-order-form.component.html',
  styleUrl: './complete-order-form.component.scss'
})
export class CompleteOrderFormComponent implements OnInit {

  private readonly completeOrderFormService = inject(CompleteOrderFormService);
  private readonly currentUserService = inject(CurrentUserService);

  public completeOrder = output<ICompleteOrderForm>();

  public form = this.completeOrderFormService.crearFormulario();

  ngOnInit(): void {
    const currentUser = this.currentUserService.currentUser();
    if (currentUser) {
      this.completeOrderFormService.actualizarFormulario(this.form, {
        name: currentUser.name,
        email: currentUser.email,
        phone: currentUser.phone,
      });
    }
  }

  public onCompleteOrder(): void {
    this.completeOrder.emit(this.completeOrderFormService.obtenerDatos(this.form));
  }

}
