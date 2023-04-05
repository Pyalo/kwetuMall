import express from "express";
import bodyParser from "body-parser";
import classRoutes from "./routes/classRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
import mongoose from "mongoose";

const app = express();
const PORT = 5000;
app.use(bodyParser());
const mongoUri = 'mongodb+srv://pyalo:kimjolang01@kwetumalldb.prp3nti.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(mongoUri)
        .then(()=>console.log('MongoDB is connected'))
        .catch((error)=>console.log(error))

app.use('/', classRoutes);
app.use('/', activityRoutes);

app.listen(PORT, () => {
    console.log('Server is listening on PORT:' + PORT);
});
