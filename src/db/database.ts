import { MongoClient, ServerApiVersion } from "mongodb";

const connectionString = process.env.MONGO_URI || 'mongodb://localhost:27017/tienda';
// Replace the placeholder with your Atlas connection string
const uri = "mongodb+srv://rubenzubicoatic_db_user:nJSfg6ckTM3Av6fa@cluster0.rcwxcg8.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const clientDB = new MongoClient(uri,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
);

async function connectToDatabase() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await clientDB.connect();

    // Send a ping to confirm a successful connection
    await clientDB.db("prueba").command({ ping: 1 });

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await clientDB.close();
  }
}

export { connectToDatabase, clientDB as client };