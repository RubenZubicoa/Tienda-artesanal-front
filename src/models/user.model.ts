import { clientDB, database } from "../db/database";
import { User } from "../types/User";


export async function getUserByEmail(email: string) {
    try {
        await clientDB.connect();
        const user = await database.collection("Users").findOne({ email: email });
        await clientDB.close();
        return user;
    } catch (error) {
        await clientDB.close();
        console.error(error);
        throw new Error("Error al obtener el usuario");
    }
}

export async function insertUser(user: User) {
    try {
        await clientDB.connect();
        user.createdAt = Date.now();
        const result = await database.collection("Users").insertOne(user);
        await clientDB.close();
        return result;
    } catch (error) {
        await clientDB.close();
        console.error(error);
        throw new Error("Error al crear el usuario");
    }
}

export async function updateUser(userId: User['_id'], user: User) {
    try {
        await clientDB.connect();
        user.updatedAt = Date.now();
        const result = await database.collection("Users").updateOne({ _id: userId }, { $set: user });
        await clientDB.close();
        return result;
    } catch (error) {
        await clientDB.close();
        console.error(error);
        throw new Error("Error al actualizar el usuario");
    }
}

export async function deleteUser(userId: User['_id']) {
    try {
        await clientDB.connect();
        const result = await database.collection("Users").updateOne({ _id: userId }, { $set: { isDeleted: true } });
        await clientDB.close();
        return result;
    } catch (error) {
        await clientDB.close();
        console.error(error);
        throw new Error("Error al eliminar el usuario");
    }
}