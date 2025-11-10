const express = require('express');
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');

const port = 4000;

app.use(cors());
app.use(express.json());




const uri = "mongodb+srv://assignment-10:Gi2Wjp32OZchMOZ6@cluster0.orfhois.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const db = client.db("model-db");
    const modelCollection = db.collection("models");

        app.get("/models", async (req, res) => {
      const result = await modelCollection.find().toArray();
      res.send(result);
    });


  } finally {
   
  }
}
run().catch(console.dir);

app.get('/', (req,res)=> {
    res.send('running on port :4000')
})

app.listen(port, ()=> {
     console.log(`Server is listening on port ${port}`);
})