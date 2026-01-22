import { Request, Response } from "express";
import {
  getProducts as getProductsModel,
  insertProduct as insertProductModel,
  updateProduct as updateProductModel,
  deleteProduct as deleteProductModel,
  getProductsByManufacturerId as getProductsByManufacturerIdModel,
  getProductById as getProductByIdModel,
  getProductsByFilters as getProductsByFiltersModel,
} from "../models/product.model";
import { isProduct, Product, ProductFilters } from "../types/Product";
import { ObjectId, UpdateResult } from "mongodb";

export async function getProducts(req: Request, res: Response) {
  try {
    const products = await getProductsModel();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al obtener los productos", error: error });
  }
}

export async function getProductsByFilters(req: Request<{}, {}, ProductFilters>, res: Response) {
  const filters: ProductFilters = req.body;
  try {
    const products = await getProductsByFiltersModel(filters);
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los productos", error: error });
  }
}

export async function getProductById(req: Request<{ id: string }>, res: Response) {
  const productId = new ObjectId(req.params.id);
  try {
    const product = await getProductByIdModel(productId);
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el producto", error: error });
  }
}

export async function getProductsByManufacturerId(
  req: Request<{ id: string }>,
  res: Response
) {
  const manufacturerId = req.params.id;
  try {
    const products = await getProductsByManufacturerIdModel(manufacturerId);
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al obtener los productos", error: error });
  }
}

export async function createProduct(
  req: Request<{}, {}, Product>,
  res: Response
) {
  const product: Product = req.body;
  if (!isProduct(product)) {
    return res.status(400).json({ message: "Datos de producto inválidos" });
  }
  try {
    const result = await insertProductModel(product);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al crear el producto", error: error });
  }
}

export async function updateProduct(
  req: Request<{ id: string }, {}, Product>,
  res: Response
) {
  const productId = new ObjectId(req.params.id);
  const product: Product = req.body;
  if (!isProduct(product)) {
    return res.status(400).json({ message: "Datos de producto inválidos" });
  }
  try {
    const result: UpdateResult = await updateProductModel(productId, product);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al actualizar el producto", error: error });
  }
}

export async function deleteProduct(
  req: Request<{ id: string }>,
  res: Response
) {
  const productId = req.params.id;
  try {
    const result = await deleteProductModel(new ObjectId(productId));
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al eliminar el producto", error: error });
  }
}
