import { clientDB, database } from "../db/database";
import { Manufacturer } from "../types/Manufacturer";

export async function getManufacturers() {
    try {
        await clientDB.connect();
        const manufacturers = await database.collection("Manufacturers").find().toArray();
        await clientDB.close();
        return manufacturers;
    } catch (error) {
        await clientDB.close();
        console.error(error);
        throw new Error("Error al obtener los artesanos");
    }
}

export async function insertManufacturer(manufacturer: Manufacturer) {
    try {
        await clientDB.connect();
        manufacturer.createdAt = Date.now();
        const result = await database.collection("Manufacturers").insertOne(manufacturer);
        await clientDB.close();
        return result;
    } catch (error) {
        await clientDB.close();
        console.error(error);
        throw new Error("Error al crear el artesano");
    }
}

export async function updateManufacturer(manufacturerId: Manufacturer['_id'], manufacturer: Manufacturer) {
    try {
        await clientDB.connect();
        manufacturer.updatedAt = Date.now();
        const result = await database.collection("Manufacturers").updateOne({ _id: manufacturerId }, { $set: manufacturer });
        await clientDB.close();
        return result;
    } catch (error) {
        await clientDB.close();
        console.error(error);
        throw new Error("Error al actualizar el artesano");
    }
}

export async function deleteManufacturer(manufacturerId: Manufacturer['_id']) {
    try {
        await clientDB.connect();
        const result = await database.collection("Manufacturers").deleteOne({ _id: manufacturerId });
        await clientDB.close();
        return result;
    } catch (error) {
        await clientDB.close();
        console.error(error);
        throw new Error("Error al eliminar el artesano");
    }
}
