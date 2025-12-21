import { Request, Response } from "express";
import { getUserByEmail as getUserByEmailModel, insertUser as insertUserModel, updateUser as updateUserModel, deleteUser as deleteUserModel } from "../models/user.model";
import { isUser, User } from "../types/User";
import { ObjectId } from "mongodb";

export async function getUserByEmail(req: Request, res: Response) {
    try {
        const user = await getUserByEmailModel(req.params.email);
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener el usuario", error: error });
    }
}

export async function createUser(req: Request<{}, {}, User>, res: Response) {
    const user: User = req.body;
    if (!isUser(user)) {
        return res.status(400).json({ message: "Datos de usuario inválidos" });
    }
    try {
        const result = await insertUserModel(user);
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear el usuario", error: error });
    }
}

export async function updateUser(req: Request<{ id: string }, {}, User>, res: Response) {
    const userId = new ObjectId(req.params.id);
    const user: User = req.body;
    if (!isUser(user)) {
        return res.status(400).json({ message: "Datos de usuario inválidos" });
    }
    try {
        const result = await updateUserModel(userId, user);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar el usuario", error: error });
    }
}

export async function deleteUser(req: Request<{ id: string }>, res: Response) {
    const userId = new ObjectId(req.params.id);
    try {
        const result = await deleteUserModel(userId);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar el usuario", error: error });
    }
}