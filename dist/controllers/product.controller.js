"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = getProducts;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
const product_model_1 = require("../models/product.model");
const Product_1 = require("../types/Product");
const mongodb_1 = require("mongodb");
async function getProducts(req, res) {
    try {
        const products = await (0, product_model_1.getProducts)();
        res.status(200).json(products);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los productos", error: error });
    }
}
async function createProduct(req, res) {
    const product = req.body;
    if (!(0, Product_1.isProduct)(product)) {
        return res.status(400).json({ message: "Datos de producto inválidos" });
    }
    try {
        const result = await (0, product_model_1.insertProduct)(product);
        res.status(201).json(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear el producto", error: error });
    }
}
async function updateProduct(req, res) {
    const productId = new mongodb_1.ObjectId(req.params.id);
    const product = req.body;
    if (!(0, Product_1.isProduct)(product)) {
        return res.status(400).json({ message: "Datos de producto inválidos" });
    }
    try {
        const result = await (0, product_model_1.updateProduct)(productId, product);
        res.status(200).json(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar el producto", error: error });
    }
}
async function deleteProduct(req, res) {
    const productId = req.params.id;
    try {
        const result = await (0, product_model_1.deleteProduct)(new mongodb_1.ObjectId(productId));
        res.status(200).json(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar el producto", error: error });
    }
}
