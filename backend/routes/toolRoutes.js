import express from "express";
import { addTools, getTools } from "../controllers/tools.js";
import upload from "../middleware/upload.js";


const app = express.Router();


app.get("/get-tools", getTools); // Get all tools
app.post("/add-tools", upload.single('image'), addTools);

export default app;