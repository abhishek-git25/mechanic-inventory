import mongoose from "mongoose";

const ToolSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    availableQuantity: { type: Number, required: true, default: 0 },
    issuedQuantity: { type: Number, required: true, default: 0 },
});

export default mongoose.model("Tool", ToolSchema);