const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());
app.use(express());

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connection Successful !"))
  .catch((err) => console.error(err));

//app.use("/api/auth", require("./routes/authRoutes"));
//app.use("api/tests", require("./routes/testRoutes"));

app.listen(PORT,() => console.log("Server is running on port ${PORT}"));