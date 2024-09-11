import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

dotenv.config();

mongoose.connect(process.env.MONGO)
.then(() => {
    console.log('¡Conectado a MongoDB!');
})
.catch((err) => {
    console.log(err);
})

const app = express();

app.listen(3000, () => {
    console.log('Servidor está corriendo en puerto 3000');
});