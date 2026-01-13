import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IServiceForm } from '../../core/models/IServiceForm';
import { ManufacturerFilters } from '../../core/models/Manufacturer';

type ManufacturersFormFiltersFormContent = {
  name: FormControl<string | null>;
  address: FormControl<string | null>;
  maxDistance: FormControl<number | null>;
}

export type ManufacturersFormFiltersForm = FormGroup<ManufacturersFormFiltersFormContent>;

@Injectable({
  providedIn: 'root'
})
export class ManufacturersFormFiltersService implements IServiceForm<ManufacturerFilters, ManufacturersFormFiltersForm, ManufacturerFilters> {

  public form = this.crearFormulario();
  crearFormulario(): ManufacturersFormFiltersForm {
    return new FormGroup<ManufacturersFormFiltersFormContent>({
      name: new FormControl(null),
      address: new FormControl(null),
      maxDistance: new FormControl(null),
    });
  }
  actualizarFormulario(form: ManufacturersFormFiltersForm, inputData: ManufacturerFilters): void {
    form.patchValue({
      name: inputData.name ?? null,
      address: inputData.address ?? null,
      maxDistance: inputData.maxDistance ?? null,
    });
  }

  obtenerDatos(form: ManufacturersFormFiltersForm): ManufacturerFilters {
    const rawValue = form.getRawValue();
    return rawValue as ManufacturerFilters;
  }
  reset(form: ManufacturersFormFiltersForm): void {
    form.reset();
  }
}
