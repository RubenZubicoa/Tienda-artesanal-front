import { TableColumn } from "../../shared/components/table/table.models";

export const PRODUCTS_COLUMNS: TableColumn[] = [
  {
    header: 'order-details.order-products.table.product-name',
    field: 'name',
  },
  {
    header: 'order-details.order-products.table.product-quantity',
    field: 'quantity',
  },
  {
    header: 'order-details.order-products.table.product-price',
    field: 'price',
    type: 'currency',
  },
];