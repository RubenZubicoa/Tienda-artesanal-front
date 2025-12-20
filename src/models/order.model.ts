import { clientDB, database } from "../db/database";
import { Order } from "../types/Order";

export async function getOrders() {
    try {
        await clientDB.connect();
        const orders = await database.collection("Orders").find().toArray();
        await clientDB.close();
        return orders;
    } catch (error) {
        await clientDB.close();
        console.error(error);
        throw new Error("Error al obtener las ordenes");
    }
}

export async function insertOrder(order: Order) {
    try {
        await clientDB.connect();
        order.createdAt = Date.now();
        const result = await database.collection("Orders").insertOne(order);
        await clientDB.close();
        return result;
    } catch (error) {
        await clientDB.close();
        console.error(error);
        throw new Error("Error al crear la orden");
    }
}

export async function updateOrder(orderId: Order['_id'], order: Order) {
    try {
        await clientDB.connect();
        order.updatedAt = Date.now();
        const result = await database.collection("Orders").updateOne({ _id: orderId }, { $set: order });
        await clientDB.close();
        return result;
    } catch (error) {
        await clientDB.close();
        console.error(error);
        throw new Error("Error al actualizar la orden");
    }
}

export async function deleteOrder(orderId: Order['_id']) {
    try {
        await clientDB.connect();
        const result = await database.collection("Orders").deleteOne({ _id: orderId });
        await clientDB.close();
        return result;
    } catch (error) {
        await clientDB.close();
        console.error(error);
        throw new Error("Error al eliminar la orden");
    }
}