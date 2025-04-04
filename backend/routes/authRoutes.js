import express from "express";
import { signin, signup } from "../controllers/auth.js";
import multer from "multer";
import upload from "../middleware/upload.js";

const app = express.Router();

app.post("/sign-up", upload.single('picture') ,signup);
app.post("/sign-in", signin);

export default app;