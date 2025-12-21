"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrders = getOrders;
exports.createOrder = createOrder;
exports.updateOrder = updateOrder;
exports.deleteOrder = deleteOrder;
const order_model_1 = require("../models/order.model");
const Order_1 = require("../types/Order");
const mongodb_1 = require("mongodb");
async function getOrders(req, res) {
    try {
        const orders = await (0, order_model_1.getOrders)();
        res.status(200).json(orders);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener las ordenes", error: error });
    }
}
async function createOrder(req, res) {
    const order = req.body;
    if (!(0, Order_1.isOrder)(order)) {
        return res.status(400).json({ message: "Datos de orden inválidos" });
    }
    try {
        const result = await (0, order_model_1.insertOrder)(order);
        res.status(201).json(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear la orden", error: error });
    }
}
async function updateOrder(req, res) {
    const orderId = new mongodb_1.ObjectId(req.params.id);
    const order = req.body;
    if (!(0, Order_1.isOrder)(order)) {
        return res.status(400).json({ message: "Datos de orden inválidos" });
    }
    try {
        const result = await (0, order_model_1.updateOrder)(orderId, order);
        res.status(200).json(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar la orden", error: error });
    }
}
async function deleteOrder(req, res) {
    const orderId = new mongodb_1.ObjectId(req.params.id);
    try {
        const result = await (0, order_model_1.deleteOrder)(orderId);
        res.status(200).json(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar la orden", error: error });
    }
}
