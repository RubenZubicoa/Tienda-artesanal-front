"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = getProducts;
exports.insertProduct = insertProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
const database_1 = require("../db/database");
async function getProducts() {
    try {
        await database_1.clientDB.connect();
        const products = await database_1.database.collection("Products").find().toArray();
        await database_1.clientDB.close();
        return products;
    }
    catch (error) {
        await database_1.clientDB.close();
        console.error(error);
        throw new Error("Error al obtener los productos");
    }
}
async function insertProduct(product) {
    try {
        await database_1.clientDB.connect();
        product.createdAt = Date.now();
        const result = await database_1.database.collection("Products").insertOne(product);
        await database_1.clientDB.close();
        return result;
    }
    catch (error) {
        await database_1.clientDB.close();
        console.error(error);
        throw new Error("Error al crear el producto");
    }
}
async function updateProduct(productId, product) {
    try {
        await database_1.clientDB.connect();
        product.updatedAt = Date.now();
        const result = await database_1.database.collection("Products").updateOne({ _id: productId }, { $set: product });
        await database_1.clientDB.close();
        return result;
    }
    catch (error) {
        await database_1.clientDB.close();
        console.error(error);
        throw new Error("Error al actualizar el producto");
    }
}
async function deleteProduct(productId) {
    try {
        await database_1.clientDB.connect();
        const result = await database_1.database.collection("Products").deleteOne({ _id: productId });
        await database_1.clientDB.close();
        return result;
    }
    catch (error) {
        await database_1.clientDB.close();
        console.error(error);
        throw new Error("Error al eliminar el producto");
    }
}
