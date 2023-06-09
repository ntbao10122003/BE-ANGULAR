import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRouter from "./routers/auth";
import productRouter from "./routers/product"
import categoryRouter from "./routers/category"
import searchRouter from "./routers/search"
import cartRouter from './routers/cart'

const app = express();

app.use(express.json());
app.use(cors());

// router
app.use("/api", authRouter);
app.use("/api", productRouter);
app.use("/api", categoryRouter)
app.use("/api",searchRouter);
app.use("/api",cartRouter);

mongoose.connect("mongodb://127.0.0.1:27017/BE-Angular");

export const viteNodeApp = app;
