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
        console.log(req.body, req.file, "req body");
        const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

        console.log(name, category, availableQuantity, 11);


        const newTool = new Tool({ name, category, image: imagePath, availableQuantity });
        await newTool.save();

        sendResponse(res, 200, true, "Tool added successfully", newTool);
    } catch (error) {
        console.error("Error adding tool:", error); // Logs the error
        sendResponse(res, 500, false, "Server error", error);
    }
}