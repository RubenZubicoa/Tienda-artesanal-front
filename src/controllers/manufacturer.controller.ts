import { Request, Response } from "express";
import { database } from "../db/database";
import { Manufacturer } from "../types/Manufacturer";
import { insertManufacturer, getManufacturers as getManufacturersModel } from "../models/manufacturer.model";

export async function getManufacturers(req: Request, res: Response) {
  try {
    const manufacturers = await getManufacturersModel();
    res.status(200).json(manufacturers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los artesanos", error: error });
  }
}

export async function createManufacturer(
  req: Request<{}, {}, Manufacturer>,
  res: Response
) {
  const manufacturer: Manufacturer = req.body;
  console.log(manufacturer);
  try {
    const result = await insertManufacturer(manufacturer);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el artesano", error: error });
  }
}
