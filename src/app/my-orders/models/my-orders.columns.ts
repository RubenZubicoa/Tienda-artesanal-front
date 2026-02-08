import { TableColumn } from "../../shared/components/table/table.models";

export const MY_ORDERS_COLUMNS: TableColumn[] = [
  {
    header: 'Fecha de creación',
    field: 'createdAt',
    type: 'date',
  },
  {
    header: 'Total',
    field: 'total',
    type: 'currency',
  },
  {
    header: 'Estado',
    field: 'status',
  },
];