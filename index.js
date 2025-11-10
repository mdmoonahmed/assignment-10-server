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

    const db = client.db("car-db");
    const carCollection = db.collection("cars");
        
    // all cars
        app.get("/cars", async (req, res) => {
      const result = await carCollection.find().toArray();
      res.send(result);
    });

    //  car
     app.get("/cars/:id", async (req, res) => {
      const { id } = req.params;
      const objectId = new ObjectId(id);

      const result = await carCollection.findOne({ _id: objectId });

      res.send({
        result,
      });
    });

     
    // add car
     app.post("/cars",   async (req, res) => {
      const data = req.body;
      // console.log(data)
      const result = await carCollection.insertOne(data);
      res.send({
        result,
      });
    });


    //  update car
     app.put("/cars/:id",  async (req, res) => {
      const { id } = req.params;
      const data = req.body;
      // console.log(id)
      // console.log(data)
      const objectId = new ObjectId(id);
      const filter = { _id: objectId };
      const update = {
        $set: data,
      };

      const result = await carCollection.updateOne(filter, update);

      res.send({
        success: true,
        result,
      });
    });

        
    //   delete car
      app.delete("/cars/:id",  async (req, res) => {
      const { id } = req.params;
      //    const objectId = new ObjectId(id)
      // const filter = {_id: objectId}
      const result = await carCollection.deleteOne({ _id: new ObjectId(id) });

      res.send({
        success: true,
        result,
      });
    });

    //   latest car
     app.get("/latest-cars", async (req, res) => {
      const result = await carCollection
        .find()
        .sort({ created_at: "desc" })
        .limit(6)
        .toArray();

      console.log(result);

      res.send(result);
    });



    //   get my car
     app.get("/my-cars", async(req, res) => {
      const email = req.query.email
      const result = await carCollection.find({created_by: email}).toArray()
      res.send(result)
    })


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