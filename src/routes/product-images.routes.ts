import { Router } from "express";
import multer from "../libs/multer";
import { addProductImages, deleteProductImages, getProductImages } from "../controllers/product-images.controller";

const productImagesRoutes = Router();

productImagesRoutes.get('/:productId', getProductImages);
productImagesRoutes.post('/', multer.array('images'), addProductImages);
productImagesRoutes.post('/deleteImages', deleteProductImages);

export default productImagesRoutes;