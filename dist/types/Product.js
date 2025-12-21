"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isProduct = isProduct;
function isProduct(product) {
    return (product !== undefined &&
        product !== null &&
        typeof product === "object" &&
        "manufacturerId" in product &&
        "name" in product &&
        "description" in product &&
        "price" in product &&
        "stock" in product &&
        "category" in product &&
        "images" in product);
}
