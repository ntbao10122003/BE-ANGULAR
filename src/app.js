import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRouter from "./routers/auth";
const app = express();

app.use(express.json());
app.use(cors());

// router
app.use("/api", authRouter);
mongoose.connect("mongodb://127.0.0.1:27017/BE-Angular");

export const viteNodeApp = app;
