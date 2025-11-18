import { Manufacturer } from "../../../core/models/Manufacturer";
import { Product } from "../../../core/models/Product";

export type CardData = {
    title: string;
    subtitle: string;
    image: string;
    perfilImage?: string;
    price?: number;
}

export function mapProductToCardData(product: Product): CardData {
    return {
        title: product.name,
        subtitle: product.manufacturerId,
        image: product.image,
        perfilImage: product.manufacturerId,
        price: product.price,
    }
}

export function mapManufacturerToCardData(manufacturer: Manufacturer): CardData {
    return {
        title: manufacturer.name,
        subtitle: manufacturer.city ?? '',
        image: manufacturer.image ?? '',
    }
}