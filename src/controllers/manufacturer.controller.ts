import { Request, Response } from "express";
import { isManufacturer, Manufacturer, ManufacturerFilters } from "../types/Manufacturer";
import {
  insertManufacturer,
  getManufacturers as getManufacturersModel,
  updateManufacturer as updateManufacturerModel,
  deleteManufacturer as deleteManufacturerModel,
  getManufacturerById as getManufacturerByIdModel,
  getManufacturersByFilters as getManufacturersByFiltersModel,
  uploadManufacturerImage as uploadManufacturerImageModel,
} from "../models/manufacturer.model";
import { ObjectId } from "mongodb";
import { uploadToCloudinary } from "../libs/cloudinary";

export async function getManufacturers(req: Request, res: Response) {
  try {
    const manufacturers = await getManufacturersModel();
    res.status(200).json(manufacturers);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al obtener los artesanos", error: error });
  }
}

export async function getManufacturersByFilters(req: Request<{}, {}, ManufacturerFilters>, res: Response) {
  const filters: ManufacturerFilters = req.body;
  try {
    const manufacturers = await getManufacturersByFiltersModel(filters);
    res.status(200).json(manufacturers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los artesanos", error: error });
  }
}

export async function getManufacturerById(
  req: Request<{ id: string }>,
  res: Response
) {
  const manufacturerId = req.params.id;
  try {
    const manufacturer = await getManufacturerByIdModel(
      new ObjectId(manufacturerId)
    );
    res.status(200).json(manufacturer);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al obtener el artesano", error: error });
  }
}

export async function createManufacturer(
  req: Request<{}, {}, Manufacturer>,
  res: Response
) {
  const manufacturer: Manufacturer = req.body;
  if (!isManufacturer(manufacturer)) {
    return res.status(400).json({ message: "Datos de artesano inválidos" });
  }
  try {
    const result = await insertManufacturer(manufacturer);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al crear el artesano", error: error });
  }
}

export async function updateManufacturer(
  req: Request<{ id: string }, {}, Manufacturer>,
  res: Response
) {
  const manufacturerId = new ObjectId(req.params.id);
  const manufacturer: Manufacturer = req.body;
  if (!isManufacturer(manufacturer)) {
    return res.status(400).json({ message: "Datos de artesano inválidos" });
  }
  try {
    const result = await updateManufacturerModel(manufacturerId, manufacturer);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al actualizar el artesano", error: error });
  }
}

export async function deleteManufacturer(
  req: Request<{ id: string }>,
  res: Response
) {
  const manufacturerId = req.params.id;
  try {
    const result = await deleteManufacturerModel(new ObjectId(manufacturerId));
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al eliminar el artesano", error: error });
  }
}

export async function uploadManufacturerImage(req: Request, res: Response) {
  const manufacturerId = req.body.manufacturerId;
  const image = req.file as Express.Multer.File;
  try {
    const imageUrl = await uploadToCloudinary(image);
    if (!imageUrl) {
      return res.status(400).json({ message: "Error al subir la imagen del artesano" });
    }
    const result = await uploadManufacturerImageModel(manufacturerId, imageUrl);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al subir la imagen del artesano", error: error });
  }
}