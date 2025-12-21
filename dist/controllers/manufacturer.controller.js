"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getManufacturers = getManufacturers;
exports.createManufacturer = createManufacturer;
exports.updateManufacturer = updateManufacturer;
exports.deleteManufacturer = deleteManufacturer;
const Manufacturer_1 = require("../types/Manufacturer");
const manufacturer_model_1 = require("../models/manufacturer.model");
const mongodb_1 = require("mongodb");
async function getManufacturers(req, res) {
    try {
        const manufacturers = await (0, manufacturer_model_1.getManufacturers)();
        res.status(200).json(manufacturers);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los artesanos", error: error });
    }
}
async function createManufacturer(req, res) {
    const manufacturer = req.body;
    if (!(0, Manufacturer_1.isManufacturer)(manufacturer)) {
        return res.status(400).json({ message: "Datos de artesano inválidos" });
    }
    try {
        const result = await (0, manufacturer_model_1.insertManufacturer)(manufacturer);
        res.status(201).json(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear el artesano", error: error });
    }
}
async function updateManufacturer(req, res) {
    const manufacturerId = new mongodb_1.ObjectId(req.params.id);
    const manufacturer = req.body;
    if (!(0, Manufacturer_1.isManufacturer)(manufacturer)) {
        return res.status(400).json({ message: "Datos de artesano inválidos" });
    }
    try {
        const result = await (0, manufacturer_model_1.updateManufacturer)(manufacturerId, manufacturer);
        res.status(200).json(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar el artesano", error: error });
    }
}
async function deleteManufacturer(req, res) {
    const manufacturerId = req.params.id;
    try {
        const result = await (0, manufacturer_model_1.deleteManufacturer)(new mongodb_1.ObjectId(manufacturerId));
        res.status(200).json(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar el artesano", error: error });
    }
}
