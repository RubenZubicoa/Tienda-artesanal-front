import { TableColumn } from "../../shared/components/table/table.models";

export const ORDERS_COLUMNS: TableColumn[] = [
  {
    header: 'orders.table.name-label',
    field: 'username',
  },   
  {
    header: 'orders.table.phone-label',
    field: 'phone',
  },
  {
    header: 'orders.table.email-label',
    field: 'email',
  },
  {
    header: 'orders.table.createdAt-label',
    field: 'createdAt',
    type: 'date',
  },
  {
    header: 'orders.table.total-label',
    field: 'total',
    type: 'currency',
  },
  {
    header: 'orders.table.status-label',
    field: 'status',
  },
];