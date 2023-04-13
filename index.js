import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import userRoutes from './routes/userRoute.js';

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit:'30mb', extended: true }));
app.use(
    cors({
        origin: [`http://localhost:${PORT}`, 'http://localhost:3000']
    })
);


app.use('/users', userRoutes)

//CONNECT TO DATABASE

const CONNECTION_URL = process.env.CONNECTION_URL;
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((err) => console.log(err.message));


//NEW METHOD FOR DB CONNECTION


// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://adetolaadedeji0:<password>@cluster0.lzwpfmd.mongodb.net/?retryWrites=true&w=majority";
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//     serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//     }
// });
// async function run() {
//     try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//     }
// }
// run().catch(console.dir);