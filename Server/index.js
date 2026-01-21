import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import chatbotRoutes from "./routes/chatbot.routes.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 4000;
app.use(cors());
dotenv.config();

app.get("/", (req, res) => {
  console.log("hello");
  res.send("Hello World!");
});

// db connection
mongoose.connect(process.env.MONGO_URI).then(() => {
  try {
    console.log("db is connected");
  } catch (error) {
    console.log("db is not connected", error);
  }
});
app.use(express.json());
// routs calling
app.use("/bot/v1/", chatbotRoutes);

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
