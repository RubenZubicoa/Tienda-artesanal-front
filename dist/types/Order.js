"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOrder = isOrder;
function isOrder(order) {
    return (order !== undefined &&
        order !== null &&
        typeof order === "object" &&
        "username" in order &&
        "address" in order &&
        "phone" in order &&
        "email" in order &&
        "products" in order &&
        "total" in order &&
        "status" in order);
}
