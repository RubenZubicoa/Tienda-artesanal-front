import { Filter } from "mongodb";
import { clientDB, database } from "../db/database";
import { Manufacturer, ManufacturerFilters } from "../types/Manufacturer";

export async function getManufacturers() {
    try {
        await clientDB.connect();
        const manufacturers = await database.collection("Manufacturers").find({ isDeleted: false }).toArray();
        await clientDB.close();
        return manufacturers;
    } catch (error) {
        await clientDB.close();
        console.error(error);
        throw new Error("Error al obtener los artesanos");
    }
}

export async function getManufacturersByFilters(filters: ManufacturerFilters) {
    try {
        await clientDB.connect();
        const query: Filter<Manufacturer> = {};
        if (filters.name) {
            query.name = { $regex: filters.name, $options: 'i' };
        }
        query.isDeleted = false;
        const manufacturers = await database.collection<Manufacturer>("Manufacturers").find(query).toArray();
        await clientDB.close();
        return manufacturers;
    } catch (error) {
        await clientDB.close();
        console.error(error);
        throw new Error("Error al obtener los artesanos");
    }
}

export async function getManufacturerById(manufacturerId: Manufacturer['_id']) {
    try {
        await clientDB.connect();
        const manufacturer = await database.collection<Manufacturer>("Manufacturers").findOne({ _id: manufacturerId, isDeleted: false });
        await clientDB.close();
        return manufacturer;
    } catch (error) {
        await clientDB.close();
        console.error(error);
        throw new Error("Error al obtener el artesano");
    }
}

export async function insertManufacturer(manufacturer: Manufacturer) {
    try {
        await clientDB.connect();
        manufacturer.createdAt = Date.now();
        manufacturer.isDeleted = false;
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
        const result = await database.collection("Manufacturers").updateOne({ _id: manufacturerId }, { $set: { isDeleted: true } });
        await clientDB.close();
        return result;
    } catch (error) {
        await clientDB.close();
        console.error(error);
        throw new Error("Error al eliminar el artesano");
    }
}
