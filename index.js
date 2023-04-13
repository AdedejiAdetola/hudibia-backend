import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit:'30mb', extended: true }));
app.use(
    cors({
        origin: [`http://localhost:${PORT}`, 'http://localhost:3000']
    })
);

//CONNECT TO DATABASE

const CONNECTION_URL = process.env.CONNECTION_URL;
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((err) => console.log(err.message));