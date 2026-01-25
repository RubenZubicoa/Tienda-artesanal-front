import { Filter, ObjectId } from "mongodb";
import { clientDB, database } from "../db/database";
import { Product, ProductFilters } from "../types/Product";

export async function getProducts() {
    try {
        await clientDB.connect();
        const products = await database.collection("Products").find({ isDeleted: false }).toArray();
        await clientDB.close();
        return products;
    } catch (error) {
        await clientDB.close();
        console.error(error);
        throw new Error("Error al obtener los productos");
    }
}

export async function getProductsByFilters(filters: ProductFilters) {
    try {
        await clientDB.connect();
        const query: Filter<Product> = {};
        if (filters.manufacturerId) {
            query.manufacturerId = { $regex: filters.manufacturerId, $options: 'i' };
        }
        if (filters.name) {
            query.name = { $regex: filters.name, $options: 'i' };
        }
        if (filters.description) {
            query.description = { $regex: filters.description, $options: 'i' };
        }
        if (filters.price?.start) {
            query.price = { $gte: filters.price.start };
        }
        if (filters.price?.end) {
            query.price = { $lte: filters.price.end };
        }
        if (filters.inStock) {
            query.stock = { $gt: 0 };
        }
        if (filters.category) {
            query.category = { $regex: filters.category, $options: 'i' };
        }
        query.isDeleted = false;
        const products = await database.collection<Product>("Products").find(query).toArray();
        await clientDB.close();
        return products;
    } catch (error) {
        await clientDB.close();
        console.error(error);
        throw new Error("Error al obtener los productos");
    }
}

export async function getProductById(productId: Product['_id']) {
    try {
        await clientDB.connect();
        const product = await database.collection("Products").findOne({ _id: productId, isDeleted: false });
        if (!product) {
            await clientDB.close();
            throw new Error("Producto no encontrado");
        }
        await clientDB.close();
        return product;
    } catch (error) {
        await clientDB.close();
        console.error(error);
        throw new Error("Error al obtener el producto");
    }
}

export async function getProductsByManufacturerId(manufacturerId: string) {
    try {
        await clientDB.connect();
        const products = await database.collection("Products").find({ manufacturerId: manufacturerId, isDeleted: false }).toArray();
        await clientDB.close();
        return products;
    } catch (error) {
        await clientDB.close();
        console.error(error);
        throw new Error("Error al obtener los productos");
    }
}

export async function insertProduct(product: Product) {
    try {
        await clientDB.connect();
        product.createdAt = Date.now();
        product.isDeleted = false;
        const result = await database.collection("Products").insertOne(product);
        await clientDB.close();
        return result;
    } catch (error) {
        await clientDB.close();
        console.error(error);
        throw new Error("Error al crear el producto");
    }
}

export async function updateProduct(productId: Product['_id'], product: Product) {
    try {
        await clientDB.connect();
        product.updatedAt = Date.now();
        const result = await database.collection("Products").updateOne({ _id: productId }, { $set: product });
        await clientDB.close();
        return result;
    } catch (error) {
        await clientDB.close();
        console.error(error);
        throw new Error("Error al actualizar el producto");
    }
}

export async function deleteProduct(productId: Product['_id']) {
    try {
        await clientDB.connect();
        const result = await database.collection("Products").updateOne({ _id: productId }, { $set: { isDeleted: true } });
        await clientDB.close();
        return result;
    } catch (error) {
        await clientDB.close();
        console.error(error);
        throw new Error("Error al eliminar el producto");
    }
}