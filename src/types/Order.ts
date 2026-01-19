import { ObjectId } from "mongodb";
import { Product, ProductWithQuantity } from "./Product";

export type OrderStatus = 'pending' | 'completed' | 'cancelled' | 'shipped' | 'delivered' | 'returned';

export type OrderFilters = {
    username?: string;
    phone?: string;
    email?: string;
    status?: OrderStatus;
    createdAt?: {
        start?: number;
        end?: number;
    }
    manufacturerId?: string;
}

export type Order = {
    _id?: ObjectId;
    username: string;
    address: string;
    phone: string;
    email: string;
    products: ProductWithQuantity[];
    manufacturerId: string;
    meetingPointId?: string;
    status: OrderStatus;
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
        "phone" in order &&
        "email" in order &&
        "products" in order &&
        "manufacturerId" in order &&
        "status" in order
    );
}