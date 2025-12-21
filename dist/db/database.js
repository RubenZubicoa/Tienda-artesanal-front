"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = exports.clientDB = void 0;
exports.connectToDatabase = connectToDatabase;
const mongodb_1 = require("mongodb");
const connectionString = process.env.MONGO_URI || 'mongodb://localhost:27017/tienda';
// Replace the placeholder with your Atlas connection string
const uri = "mongodb+srv://rubenzubicoatic_db_user:nJSfg6ckTM3Av6fa@cluster0.rcwxcg8.mongodb.net/?appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const clientDB = new mongodb_1.MongoClient(uri, {
    serverApi: {
        version: mongodb_1.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
exports.clientDB = clientDB;
const database = clientDB.db(process.env.MONGO_DB_NAME);
exports.database = database;
async function connectToDatabase() {
    try {
        // Connect the client to the server (optional starting in v4.7)
        await clientDB.connect();
        // Send a ping to confirm a successful connection
        await clientDB.db("prueba").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    finally {
        // Ensures that the client will close when you finish/error
        await clientDB.close();
    }
}
