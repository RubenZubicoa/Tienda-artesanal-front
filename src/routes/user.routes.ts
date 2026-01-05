import { Router } from "express";
import { getUserByEmail, createUser, updateUser, deleteUser, getUsers, getUserById } from "../controllers/user.controller";

export const userRoutes = Router();

userRoutes.get('/', getUsers);
userRoutes.get('/:id', getUserById);
userRoutes.get('/email/:email', getUserByEmail);
userRoutes.post('/', createUser);
userRoutes.put('/:id', updateUser);
userRoutes.delete('/:id', deleteUser);

export default userRoutes;