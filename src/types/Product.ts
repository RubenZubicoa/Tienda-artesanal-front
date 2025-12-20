export type Product = {
    uuid: string;
    manufacturerId: string;
    name: string;
    description?: string;
    price: number;
    stock: number;
    category: string;
    images: string[];
    createdAt: number;
    updatedAt?: number;
}