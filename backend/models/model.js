import mongoose from "mongoose";

const MechanicSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    mobile: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: { type: Boolean, default: false },
    picture: {
        type: String,
        default: "https://www.gravatar.com/avatar/"
    }
});

export default mongoose.model("Mechanic", MechanicSchema);
