import { TableColumn } from "../../shared/components/table/table.models";

export const MY_ORDERS_COLUMNS: TableColumn[] = [
  {
    header: 'my-orders.table.createdAt-label',
    field: 'createdAt',
    type: 'date',
  },
  {
    header: 'my-orders.table.total-label',
    field: 'total',
    type: 'currency',
  },
  {
    header: 'my-orders.table.status-label',
    field: 'status',
  },
];