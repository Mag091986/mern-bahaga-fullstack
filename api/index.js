import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from 'express';
import mongoose from "mongoose";
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import userRouter from './routes/user.route.js';

dotenv.config();

mongoose.connect(process.env.MONGO)
.then(() => {
    console.log('¡Conectado a MongoDB!');
})
.catch((err) => {
    console.log(err);
})

const app = express();

app.use(express.json());

app.use(cookieParser());

app.listen(3000, () => {
    console.log('Servidor está corriendo en puerto 3000');
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

app.use((err, req, res, next) => {
const statusCode = err.statusCode || 500;
const message = err.message || 'Error interno del servidor';
return res.status(statusCode).json({
    success: false,
    statusCode,
    message
});    
})