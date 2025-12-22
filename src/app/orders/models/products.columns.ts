import { TableColumn } from "../../shared/components/table/table.models";

export const PRODUCTS_COLUMNS: TableColumn[] = [
  {
    header: 'Nombre',
    field: 'name',
  },
  {
    header: 'Cantidad',
    field: 'quantity',
  },
  {
    header: 'Precio',
    field: 'price',
    type: 'currency',
  },
];