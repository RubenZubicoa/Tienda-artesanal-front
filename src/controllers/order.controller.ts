import { Request, Response } from "express";
import { getOrders as getOrdersModel, insertOrder as insertOrderModel, updateOrder as updateOrderModel, deleteOrder as deleteOrderModel } from "../models/order.model";
import { Order } from "../types/Order";
import { ObjectId } from "mongodb";

export async function getOrders(req: Request, res: Response) {
    try {
        const orders = await getOrdersModel();
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener las ordenes", error: error });
    }
}

export async function createOrder(req: Request<{}, {}, Order>, res: Response) {
    try {
        const order = await insertOrderModel(req.body);
        res.status(201).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear la orden", error: error });
    }
}

export async function updateOrder(req: Request<{ id: string }, {}, Order>, res: Response) {
    const orderId = new ObjectId(req.params.id);
    const order: Order = req.body;
    try {
        const result = await updateOrderModel(orderId, order);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar la orden", error: error });
    }
}

export async function deleteOrder(req: Request<{ id: string }>, res: Response) {
    const orderId = new ObjectId(req.params.id);
    try {
        const result = await deleteOrderModel(orderId);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar la orden", error: error });
    }
}