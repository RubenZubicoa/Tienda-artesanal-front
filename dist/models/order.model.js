"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrders = getOrders;
exports.insertOrder = insertOrder;
exports.updateOrder = updateOrder;
exports.deleteOrder = deleteOrder;
const database_1 = require("../db/database");
async function getOrders() {
    try {
        await database_1.clientDB.connect();
        const orders = await database_1.database.collection("Orders").find().toArray();
        await database_1.clientDB.close();
        return orders;
    }
    catch (error) {
        await database_1.clientDB.close();
        console.error(error);
        throw new Error("Error al obtener las ordenes");
    }
}
async function insertOrder(order) {
    try {
        await database_1.clientDB.connect();
        order.createdAt = Date.now();
        const result = await database_1.database.collection("Orders").insertOne(order);
        await database_1.clientDB.close();
        return result;
    }
    catch (error) {
        await database_1.clientDB.close();
        console.error(error);
        throw new Error("Error al crear la orden");
    }
}
async function updateOrder(orderId, order) {
    try {
        await database_1.clientDB.connect();
        order.updatedAt = Date.now();
        const result = await database_1.database.collection("Orders").updateOne({ _id: orderId }, { $set: order });
        await database_1.clientDB.close();
        return result;
    }
    catch (error) {
        await database_1.clientDB.close();
        console.error(error);
        throw new Error("Error al actualizar la orden");
    }
}
async function deleteOrder(orderId) {
    try {
        await database_1.clientDB.connect();
        const result = await database_1.database.collection("Orders").deleteOne({ _id: orderId });
        await database_1.clientDB.close();
        return result;
    }
    catch (error) {
        await database_1.clientDB.close();
        console.error(error);
        throw new Error("Error al eliminar la orden");
    }
}
