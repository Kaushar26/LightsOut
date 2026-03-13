const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/drivers", require("./routes/driverRoutes"));

app.get("/api/telemetry", async (req, res) => {
  try {

    const response = await fetch("https://api.openf1.org/v1/drivers");

    const data = await response.json();

    res.json(data.slice(0,10)); // send first 10 drivers

  } catch (error) {
    res.status(500).json({error:"Failed to fetch telemetry"});
  }
});

// test route
app.get("/", (req, res) => {
  res.send("Backend running");
});

// mongodb connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

