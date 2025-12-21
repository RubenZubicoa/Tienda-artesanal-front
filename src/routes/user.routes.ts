import { Router } from "express";
import { getUserByEmail, createUser, updateUser, deleteUser } from "../controllers/user.controller";

export const userRoutes = Router();

userRoutes.get('/:email', getUserByEmail);
userRoutes.post('/', createUser);
userRoutes.put('/:id', updateUser);
userRoutes.delete('/:id', deleteUser);

export default userRoutes;