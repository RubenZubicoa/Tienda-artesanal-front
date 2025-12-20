import { Router } from "express";
import { getManufacturers, createManufacturer } from "../controllers/manufacturer.controller";

export const manufacturerRoutes = Router();

manufacturerRoutes.get('/', getManufacturers);

manufacturerRoutes.post('/', createManufacturer);

export default manufacturerRoutes;