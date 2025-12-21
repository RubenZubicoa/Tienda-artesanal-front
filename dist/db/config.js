"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionString = void 0;
exports.connectionString = process.env.MONGO_URI || 'mongodb://localhost:27017/tienda';
