import { Product } from './Product';
import { Manufacturer } from './Manufacturer';

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
  manufacturerId: Manufacturer['uuid'];
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
  manufacturerId: Manufacturer['uuid'];
  status: string;
  createdAt: number;
  updatedAt?: number;
}

export type AddOrder = Omit<Order, 'uuid' | 'createdAt' | 'updatedAt' | 'status'>;
export type UpdateOrder = Omit<Order, 'uuid' | 'createdAt' | 'updatedAt'>;


export function mapOrderToOrder(orderDB: OrderDB): Order {
  return {
    uuid: orderDB._id ?? '',
    username: orderDB.username,
    address: orderDB.address,
    phone: orderDB.phone,
    email: orderDB.email,
    products: orderDB.products,
    manufacturerId: orderDB.manufacturerId,
    status: orderDB.status as 'pending' | 'completed' | 'cancelled',
    createdAt: orderDB.createdAt,
    updatedAt: orderDB.updatedAt,
  };
}