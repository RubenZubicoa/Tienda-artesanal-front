import { FormControl, FormGroup } from '@angular/forms';
import { Product } from './Product';

export type Order = {
  uuid?: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  country: string;
  products: Product[];
  total: number;
  createdAt: Date;
  updatedAt: Date;
};

export interface ICompleteOrderForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  country: string;
}

export type CompleteOrderFormContent = {
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  phone: FormControl<string | null>;
  address: FormControl<string | null>;
  city: FormControl<string | null>;
  zip: FormControl<string | null>;
  country: FormControl<string | null>;
};

export type CompleteOrderForm = FormGroup<CompleteOrderFormContent>;
