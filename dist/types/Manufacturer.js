"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isManufacturer = isManufacturer;
function isManufacturer(manufacturer) {
    return (manufacturer !== undefined &&
        manufacturer !== null &&
        typeof manufacturer === "object" &&
        "name" in manufacturer &&
        "address" in manufacturer &&
        "phone" in manufacturer &&
        "email" in manufacturer &&
        "description" in manufacturer);
}
