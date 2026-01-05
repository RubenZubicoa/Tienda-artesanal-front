import { ObjectId } from "mongodb";
import { clientDB, database } from "../db/database";
import { User, UserUpdate } from "../types/User";
import { hashPassword } from "../utils/password-utils";

export async function getUsers() {
    try {
        await clientDB.connect();
        const users = await database.collection("Users").find({ isDeleted: {$ne: true} }).toArray();
        await clientDB.close();
        return users;
    } catch (error) {
        await clientDB.close();
        console.error(error);
        throw new Error("Error al obtener los usuarios");
    }
}

export async function getUserById(userId: string) {
    try {
        await clientDB.connect();
        const user = await database.collection("Users").findOne({ _id: new ObjectId(userId), isDeleted: {$ne: true} });
        await clientDB.close();
        return user;
    } catch (error) {
        await clientDB.close();
        console.error(error);
        throw new Error("Error al obtener el usuario");
    }
}

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
        user.password = await hashPassword(user.password);
        const result = await database.collection("Users").insertOne(user);
        await clientDB.close();
        return result;
    } catch (error) {
        await clientDB.close();
        console.error(error);
        throw new Error("Error al crear el usuario");
    }
}

export async function updateUser(userId: string, user: User) {
    try {
        await clientDB.connect();
        user.updatedAt = Date.now();
        const result = await database.collection("Users").updateOne({ _id: new ObjectId(userId) }, { $set: user });
        // await clientDB.close();
        return result;
    } catch (error) {
        // await clientDB.close();
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