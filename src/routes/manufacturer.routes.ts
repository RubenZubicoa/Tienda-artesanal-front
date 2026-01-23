import { Router } from "express";
import { getManufacturers, createManufacturer, deleteManufacturer, updateManufacturer, getManufacturerById, getManufacturersByFilters, uploadManufacturerImage } from "../controllers/manufacturer.controller";
import multer from "../libs/multer";

export const manufacturerRoutes = Router();

manufacturerRoutes.get('/', getManufacturers);

manufacturerRoutes.get('/:id', getManufacturerById);

manufacturerRoutes.post('/criteria', getManufacturersByFilters);

manufacturerRoutes.post('/', createManufacturer);

manufacturerRoutes.post('/uploadImage', multer.single('image'), uploadManufacturerImage);

manufacturerRoutes.put('/:id', updateManufacturer);

manufacturerRoutes.delete('/:id', deleteManufacturer);

export default manufacturerRoutes;