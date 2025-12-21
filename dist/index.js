"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config/config"));
const database_1 = require("./db/database");
const server_1 = __importDefault(require("./server"));
server_1.default.listen(config_1.default.port, () => {
    console.log(`Server is running on port ${config_1.default.port}`);
    (0, database_1.connectToDatabase)();
});
