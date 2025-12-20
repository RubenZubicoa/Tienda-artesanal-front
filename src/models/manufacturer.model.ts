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
        const result = await database.collection("Manufacturers").insertOne(manufacturer);
        await clientDB.close();
        return result;
    } catch (error) {
        await clientDB.close();
        console.error(error);
        throw new Error("Error al crear el artesano");
    }
}