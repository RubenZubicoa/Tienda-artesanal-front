import { FormControl, FormGroup } from '@angular/forms';
import { Product } from './Product';

export type Order = {
  uuid?: string;
  username: string;
  address: string;
  phone: string;
  email: string;
  products: {
      productId: Product['uuid'];
      quantity: number;
      price: number;
  }[];
  total: number;
  createdAt: number;
  updatedAt?: number;
  status: 'pending' | 'completed' | 'cancelled';
};

export type OrderDB = {
  _id?: string;
  username: string;
  address: string;
  phone: string;
  email: string;
  products: {
      productId: Product['uuid'];
      quantity: number;
      price: number;
  }[];
  total: number;
  status: string;
  createdAt: number;
  updatedAt?: number;
}

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


export function mapOrderToOrder(orderDB: OrderDB): Order {
  return {
    uuid: orderDB._id ?? '',
    username: orderDB.username,
    address: orderDB.address,
    phone: orderDB.phone,
    email: orderDB.email,
    products: orderDB.products,
    total: orderDB.total,
    status: orderDB.status as 'pending' | 'completed' | 'cancelled',
    createdAt: orderDB.createdAt,
    updatedAt: orderDB.updatedAt,
  };
}