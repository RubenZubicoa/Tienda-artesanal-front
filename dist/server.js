"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const manufacturer_routes_1 = __importDefault(require("./routes/manufacturer.routes"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const order_routes_1 = __importDefault(require("./routes/order.routes"));
const server = (0, express_1.default)();
// Middlewares
server.use((0, morgan_1.default)('dev'));
server.use((0, cors_1.default)());
server.use(express_1.default.json());
server.use(express_1.default.urlencoded({ extended: true }));
// Routes
server.use('/api/manufacturers', manufacturer_routes_1.default);
server.use('/api/products', product_routes_1.default);
server.use('/api/orders', order_routes_1.default);
exports.default = server;
