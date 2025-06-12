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

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connection Successful!"))
  .catch((err) => {
    console.error("MongoDB Connection Error:", err.message);
    process.exit(1);
  });

// Routes
app.use("/api/auth", require("./routes/authRoutes"));   // Signup/Login
app.use("/api/tests", require("./routes/testRoutes"));  // Test APIs

// Health check route
app.get("/", (req, res) => {
  res.send(" Server is live.");
});

// Start server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
