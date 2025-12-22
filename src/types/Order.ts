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
    manufacturerId: string;
    status: string;
    createdAt: number;
    updatedAt?: number;
}

export type AddOrder = Omit<Order, '_id' | 'createdAt' | 'updatedAt' | 'status'>;
export type UpdateOrder = Omit<Order, '_id' | 'createdAt' | 'updatedAt'>;

export function isOrder(order: unknown): order is Order {
    return (
        order !== undefined &&
        order !== null &&
        typeof order === "object" &&
        "username" in order &&
        "address" in order &&
        "phone" in order &&
        "email" in order &&
        "products" in order &&
        "total" in order &&
        "status" in order &&
        "manufacturerId" in order
    );
}

export function isAddOrder(order: unknown): order is AddOrder {
    return (
        order !== undefined &&
        order !== null &&
        typeof order === "object" &&
        "username" in order &&
        "address" in order &&
        "phone" in order &&
        "email" in order &&
        "products" in order &&
        "manufacturerId" in order
    );
}

export function isUpdateOrder(order: unknown): order is UpdateOrder {
    return (
        order !== undefined &&
        order !== null &&
        typeof order === "object" &&
        "username" in order &&
        "address" in order &&
        "phone" in order &&
        "email" in order &&
        "products" in order &&
        "manufacturerId" in order &&
        "status" in order
    );
}