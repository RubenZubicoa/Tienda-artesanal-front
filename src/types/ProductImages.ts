import { ObjectId } from "mongodb";

export type ProductImages = {
    _id: ObjectId;
    productId: string;
    images: string[];
}

export type AddProductImages = {
    productId: string;
    images: string[];
}

export function isAddProductImages(productImages: unknown): productImages is AddProductImages {
    return (
        productImages !== undefined &&
        productImages !== null &&
        typeof productImages === "object" &&
        "productId" in productImages &&
        "images" in productImages &&
        Array.isArray(productImages.images)
    );
}