"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getManufacturers = getManufacturers;
exports.insertManufacturer = insertManufacturer;
exports.updateManufacturer = updateManufacturer;
exports.deleteManufacturer = deleteManufacturer;
const database_1 = require("../db/database");
async function getManufacturers() {
    try {
        await database_1.clientDB.connect();
        const manufacturers = await database_1.database.collection("Manufacturers").find().toArray();
        await database_1.clientDB.close();
        return manufacturers;
    }
    catch (error) {
        await database_1.clientDB.close();
        console.error(error);
        throw new Error("Error al obtener los artesanos");
    }
}
async function insertManufacturer(manufacturer) {
    try {
        await database_1.clientDB.connect();
        manufacturer.createdAt = Date.now();
        const result = await database_1.database.collection("Manufacturers").insertOne(manufacturer);
        await database_1.clientDB.close();
        return result;
    }
    catch (error) {
        await database_1.clientDB.close();
        console.error(error);
        throw new Error("Error al crear el artesano");
    }
}
async function updateManufacturer(manufacturerId, manufacturer) {
    try {
        await database_1.clientDB.connect();
        manufacturer.updatedAt = Date.now();
        const result = await database_1.database.collection("Manufacturers").updateOne({ _id: manufacturerId }, { $set: manufacturer });
        await database_1.clientDB.close();
        return result;
    }
    catch (error) {
        await database_1.clientDB.close();
        console.error(error);
        throw new Error("Error al actualizar el artesano");
    }
}
async function deleteManufacturer(manufacturerId) {
    try {
        await database_1.clientDB.connect();
        const result = await database_1.database.collection("Manufacturers").deleteOne({ _id: manufacturerId });
        await database_1.clientDB.close();
        return result;
    }
    catch (error) {
        await database_1.clientDB.close();
        console.error(error);
        throw new Error("Error al eliminar el artesano");
    }
}
