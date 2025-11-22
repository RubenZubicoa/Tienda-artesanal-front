import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { IServiceForm } from '../../core/models/service-form.model';
import { ICompleteOrderForm, CompleteOrderForm, CompleteOrderFormContent } from '../../core/models/Order';

@Injectable({
  providedIn: 'root'
})
export class CompleteOrderFormService implements IServiceForm<ICompleteOrderForm, CompleteOrderForm, ICompleteOrderForm> {

  crearFormulario(): CompleteOrderForm {
    return new FormGroup<CompleteOrderFormContent>({
      name: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      address: new FormControl(''),
      city: new FormControl(''),
      zip: new FormControl(''),
      country: new FormControl(''),
    });
  }
  actualizarFormulario(form: CompleteOrderForm, inputData: ICompleteOrderForm): void {
    form.patchValue(inputData);
  }
  obtenerDatos(form: CompleteOrderForm): ICompleteOrderForm {
    return form.getRawValue() as ICompleteOrderForm;
  }
  reset(form: CompleteOrderForm): void {
    form.reset();
  }
}
