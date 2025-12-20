import { ObjectId } from "mongodb";
import { Product } from "./Product";

export type Order = {
    _id?: ObjectId;
    username: string;
    address: string;
    phone: string;
    email: string;
    products: {
        productId: Product['_id'];
        quantity: number;
        price: number;
    }[];
    total: number;
    status: string;
    createdAt: number;
    updatedAt?: number;
}