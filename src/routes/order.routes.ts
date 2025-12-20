import { Router } from "express";
import { createOrder, deleteOrder, getOrders, updateOrder } from "../controllers/order.controller";

export const orderRoutes = Router();

orderRoutes.get('/', getOrders);
orderRoutes.post('/', createOrder);
orderRoutes.put('/:id', updateOrder);
orderRoutes.delete('/:id', deleteOrder);

export default orderRoutes;