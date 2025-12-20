import { TableDataWithStatus } from "../../shared/components/table/table.models";
import { Order } from "../models/Order";

export const ORDERS_LIST: TableDataWithStatus<Order>[] = [
  {
    uuid: '1',
    username: 'Order 1',
    address: '123 Main St',
    phone: '1234567890',
    email: 'order1@example.com',
    products: [],
    total: 100,
    status: 'pending',
    createdAt: new Date().getTime(),
  },
];