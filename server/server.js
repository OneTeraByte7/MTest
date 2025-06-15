const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed:", err.message);
    process.exit(1);
  });

// Routes
app.use("/api/auth", require("./routes/authRoutes"));           
app.use("/api/tests", require("./routes/testRoutes"));         
app.use("/api/questions", require("./routes/questionRoutes")); 
app.use("/api/answers", require("./routes/answerRoutes"));     
app.use("/api/results", require("./routes/resultRoutes"));     

// Health Check
app.get("/", (req, res) => {
  res.status(200).send("Server is up and running.");
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
