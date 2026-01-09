import { Injectable, signal } from '@angular/core';
import { OrderFilters, OrderStatus } from '../../core/models/Order';
import { FormControl, FormGroup } from '@angular/forms';
import { IServiceForm } from '../../core/models/IServiceForm';

type OrderFiltersFormContent = {
    username?: FormControl<string | null>;
    phone?: FormControl<string | null>;
    email?: FormControl<string | null>;
    status?: FormControl<OrderStatus | null>;
    createdAt?: FormControl<{ start?: number; end?: number } | null>;
}

export type OrderFiltersForm = FormGroup<OrderFiltersFormContent>;


@Injectable({
  providedIn: 'root'
})
export class OrderFiltersFormService implements IServiceForm<OrderFilters, OrderFiltersForm, OrderFilters> {
  public form = this.crearFormulario({});

  crearFormulario(inputData: OrderFilters): OrderFiltersForm {
    return new FormGroup<OrderFiltersFormContent>({
      username: new FormControl<string | null>(inputData.username ?? null),
      phone: new FormControl<string | null>(inputData.phone ?? null),
      email: new FormControl<string | null>(inputData.email ?? null),
      status: new FormControl<OrderStatus | null>(inputData.status ?? null),
      createdAt: new FormControl<{ start?: number; end?: number } | null>(inputData.createdAt ?? null),
    });
  }
  actualizarFormulario(form: OrderFiltersForm, inputData: OrderFilters): void {
    form.patchValue({
      username: inputData.username ?? null,
      phone: inputData.phone ?? null,
      email: inputData.email ?? null,
      status: inputData.status ?? null,
      createdAt: inputData.createdAt ?? null,
    });
  }
  obtenerDatos(form: OrderFiltersForm): OrderFilters {
    return form.getRawValue() as OrderFilters;
  }
  reset(form: OrderFiltersForm): void {
    form.reset();
  }

}
