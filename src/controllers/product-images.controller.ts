import { Request, Response } from "express";
import { AddProductImages, isAddProductImages } from "../types/ProductImages";
import { addProductImages as addProductImagesModel, getProductImages as getProductImagesModel, deleteProductImages as deleteProductImagesModel } from "../models/product-images.model";
import { ObjectId } from "mongodb";
import { uploadToCloudinary } from "../libs/cloudinary";

export async function addProductImages(req: Request, res: Response) {
    const productId = req.body.productId;
    const images = req.files as Express.Multer.File[];
    const productImages: AddProductImages = { productId, images: [] };
    if (!isAddProductImages(productImages)) {
        return res.status(400).json({ message: "Datos de imágenes de producto inválidos" });
    }
    try {
        const imagesUrls = [];
        for (const image of images) {
            const imageUrl = await uploadToCloudinary(image);
            if (!imageUrl) {
                return res.status(400).json({ message: "Error al subir la imagen del producto" });
            }
            imagesUrls.push(imageUrl);
        }
        productImages.images = imagesUrls;
        const result = await addProductImagesModel(productImages);
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al agregar las imágenes del producto", error: error });
    }
}   

export async function getProductImages(req: Request, res: Response) {
    const productId = req.params.productId;
    try {
        const result = await getProductImagesModel(productId);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener las imágenes del producto", error: error });
    }
}

export async function deleteProductImages(req: Request, res: Response) {
    const productId = req.body.productId;
    const images = req.body.images;
    try {
        const result = await deleteProductImagesModel(productId, images);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar las imágenes del producto", error: error });
    }
}