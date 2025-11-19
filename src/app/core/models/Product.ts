import { Manufacturer } from "./Manufacturer";

export type Product = {
    uuid: string;
    name: string;
    manufacturerId: Manufacturer['uuid'];
    image: string;
    price: number;
    description?: string;
    manufacturer?: Manufacturer;
}

export function isProduct(product: unknown): product is Product {
    return typeof product === 'object' && product !== null && 'uuid' in product && 'name' in product && 'manufacturerId' in product && 'image' in product && 'price' in product;
}

export function isProductCart(product: unknown): product is ProductCart {
    return isProduct(product) && 'quantity' in product;
}

export type ProductCart = Product & {
    quantity: number;
}