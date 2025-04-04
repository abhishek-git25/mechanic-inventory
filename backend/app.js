import express from "express";
import authRoutes from "./routes/authRoutes.js";
import toolRoutes from "./routes/toolRoutes.js";
import cors from "cors";
import connectDB from "./config/db.js";
const app = express();

const corsOptions = {
  origin: ["http://localhost:8000", "http://localhost:5173", "http://localhost:4173"],
  credentials: true
}



app.use(cors(corsOptions));
app.use("/uploads", express.static("uploads")); // Serve uploaded images
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: true }));

connectDB()



app.use('/api/auth', authRoutes); // Use the auth routes
app.use('/api/tools', toolRoutes); // Use the tool routes


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
