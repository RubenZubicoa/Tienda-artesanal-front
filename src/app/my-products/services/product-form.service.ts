import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IServiceForm } from '../../core/models/IServiceForm';
import { AddProduct } from '../../core/models/Product';

type ProductFormContent = {
  name: FormControl<string | null>;
  price: FormControl<number | null>;
  stock: FormControl<number | null>;
  category: FormControl<string | null>;
  images: FormControl<string[] | null>;
  description: FormControl<string | null>;
};

export type ProductForm = FormGroup<ProductFormContent>;

@Injectable({
  providedIn: 'root'
})
export class ProductFormService implements IServiceForm<AddProduct, ProductForm, AddProduct> {

  crearFormulario(): ProductForm {
    return new FormGroup<ProductFormContent>({
      name: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      stock: new FormControl(0, [Validators.required]),
      category: new FormControl(null, [Validators.required]),
      images: new FormControl([]),
      description: new FormControl(''),
    });
  }
  actualizarFormulario(form: ProductForm, inputData: AddProduct): void {
    form.patchValue(inputData);
  }
  obtenerDatos(form: ProductForm): AddProduct {
    return form.getRawValue() as AddProduct;
  }
  reset(form: ProductForm): void {
    form.reset();
  }

  setImages(form: ProductForm, images: string[]): void {
    form.get('images')?.setValue(images);
  }
}
