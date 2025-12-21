import { ObjectId } from "mongodb";

export type User = {
    _id?: ObjectId;
    name: string;
    email: string;
    password: string;
    manufacturerId?: string;
    createdAt?: number;
    updatedAt?: number;
    isDeleted?: boolean;
}

export function isUser(user: unknown): user is User {
    return (
        user !== undefined &&
        user !== null &&
        typeof user === "object" &&
        "name" in user &&
        "email" in user &&
        "password" in user
    );
}