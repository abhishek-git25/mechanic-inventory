import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Mechanic from "../models/model.js";
import { sendResponse } from "../utility/helper.js";


const JWT_SECRET = "shinmincheol_isgod";

export const signup = async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;


        if (mobile.length < 10 || mobile.length > 10) {
            console.log(10);
            return sendResponse(res, 400, false, "Mobile number must be 10 digits long");
        }

        // Check if user already exists
        const existingUser = await Mechanic.findOne({ $or: [{ email }, { mobile }] });
        if (existingUser) return res.status(400).json({ message: "Email or Mobile already registered" });


        if (password.length < 6) {
            console.log(17);
            return sendResponse(res, 400, false, "Password must be at least 6 characters long");
        }


        // Validate password strength
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        if (!passwordRegex.test(password)) {
            console.log(21);
            return sendResponse(
                res,
                400,
                false,
                "Password must contain both letters and numbers and no special characters"
            );
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const picture = req.file ? `/uploads/${req.file}` : null;

        // const picture = ""

        // Save user to DB
        const mechanic = new Mechanic({ name, email, mobile, password: hashedPassword, picture });
        await mechanic.save();

        // res.status(201).json({ message: "Mechanic registered successfully" });
        sendResponse(res, 200, true, "Mechanic registered successfully");
    } catch (error) {
        // res.status(500).json({ message: "Server error", error });
        console.error(error, "signup error");

        sendResponse(res, 500, false, "Server error", error);
    }
};


export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const mechanic = await Mechanic.findOne({ email });
        if (!mechanic) return sendResponse(res, 400, false, "User doesn't exist");

        const { name, mobile, admin } = mechanic;

        // Compare passwords
        const isMatch = await bcrypt.compare(password, mechanic.password);
        if (!isMatch) return sendResponse(res, 400, false, "Invalid credentials");

        // Generate JWT token
        const token = jwt.sign({ id: mechanic._id }, JWT_SECRET, { expiresIn: "1h" });

        sendResponse(res, 200, true, "Login successful", { token, name, mobile, email, admin });
    } catch (error) {
        sendResponse(res, 500, false, "Server error", error);
    }

} 