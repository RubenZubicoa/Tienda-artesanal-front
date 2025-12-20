import { TableColumn } from "../../shared/components/table/table.models";

export const ORDERS_COLUMNS: TableColumn[] = [
  {
    header: 'Nombre',
    field: 'username',
  },   
  {
    header: 'Dirección',
    field: 'address',
  },
  {
    header: 'Teléfono',
    field: 'phone',
  },
  {
    header: 'Total',
    field: 'total',
  },
  {
    header: 'Fecha de creación',
    field: 'createdAt',
    type: 'date',
  },
  {
    header: 'Estado',
    field: 'status',
  },
];