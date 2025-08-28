import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDB } from "./configs/db.js";
import adminRouter from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRoutes.js";
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

await connectDB();

app.get("/", (req, res) => {
  res.send("API IS WORKING");
});
app.use("/api/admin", adminRouter);
app.use("/api/blog", blogRouter);
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("Server is running at port http://localhost:3001");
});
