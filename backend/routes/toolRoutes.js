import express from "express";
import { addTools, getTools, issueTool, returnTool } from "../controllers/tools.js";
import upload from "../middleware/upload.js";


const app = express.Router();


app.get("/get-tools", getTools); // Get all tools
app.post("/add-tools", upload.single('image'), addTools);
app.post("/issue-tool/:toolId", issueTool); // Issue a tool
app.post("/return-tool/:toolId", returnTool); // Return a tool

export default app;