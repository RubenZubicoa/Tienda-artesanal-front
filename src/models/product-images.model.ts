import { clientDB, database } from "../db/database";
import { Product } from "../types/Product";
import { AddProductImages } from "../types/ProductImages";
import fs from "fs";

export async function addProductImages(productImages: AddProductImages) {
    try {
        await clientDB.connect();
        const result = await database.collection("ProductImages").insertOne(productImages);
        await clientDB.close();
        return result;
    } catch (error) {
        await clientDB.close();
        console.error(error);
        throw new Error("Error al agregar las imágenes del producto");
    }
}

export async function getProductImages(productId: string) {
    try {
        await clientDB.connect();
        const result = await database.collection("ProductImages").findOne({ productId });
        await clientDB.close();
        return result;
    } catch (error) {
        await clientDB.close();
        console.error(error);
        throw new Error("Error al obtener las imágenes del producto");
    }
}

export async function deleteProductImages(productId: string, images: string[]) {
    try {
        await clientDB.connect();
        console.log(images);
        const result = await database.collection("ProductImages").deleteOne({ productId, images: { $in: images } });
        for (const image of images) {
            await fs.unlink(image, (err) => {
            if (err) {
                console.error(err);
                throw new Error("Error al eliminar las imágenes del producto");
            }
        });
        }
        return result;
    } catch (error) {
        await clientDB.close();
        console.error(error);
        throw new Error("Error al eliminar las imágenes del producto");
    }
}