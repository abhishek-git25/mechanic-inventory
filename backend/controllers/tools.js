import { sendResponse } from "../utility/helper.js";
import Tool from "../models/tools.js";



export const getTools = async (req, res) => {
    try {
        const tools = await Tool.find();
        res.status(200).json(tools);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}


export const addTools = async (req, res) => {
    try {
        const { name, category, availableQuantity } = req.body;
        const imagePath = req.file ? `/uploads/${req.file.filename}` : "";
        const newTool = new Tool({ name, category, image: imagePath, availableQuantity });
        await newTool.save();
        sendResponse(res, 200, true, "Tool added successfully", newTool);
    } catch (error) {
        console.error("Error adding tool:", error);
        sendResponse(res, 500, false, "Server error", error);
    }
}


export const issueTool = async (req, res) => {
    try {
        const tool = await Tool.findById(req.params.toolId);
        if (!tool) return sendResponse(res, 404, false, "Tool not found", null);
        if (tool.availableQuantity <= 0) return sendResponse(res, 400, false, "No tools available to issue", null);
        tool.availableQuantity -= 1;
        tool.issuedQuantity += 1;
        await tool.save();
        sendResponse(res, 200, true, "Tool issued successfully", tool);
    } catch (error) {
        sendResponse(res, 500, false, "Server error", error);
    }
}


export const returnTool = async (req, res) => {
    try {
        const tool = await Tool.findById(req.params.toolId);
        if (!tool) return sendResponse(res, 404, false, "Tool not found", null);
        if (tool.issuedQuantity <= 0) return sendResponse(res, 400, false, "No tools issued", null);
        tool.availableQuantity += 1;
        tool.issuedQuantity -= 1;
        await tool.save();
        sendResponse(res, 200, true, "Tool returned successfully", tool);
    } catch (error) {
        sendResponse(res, 500, false, "Server error", error);
    }
}

