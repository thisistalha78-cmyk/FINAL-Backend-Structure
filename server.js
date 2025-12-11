require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// ROUTE IMPORT
const summaryRoute = require("./api/summary");
app.use("/api/summary", summaryRoute);

// Root check
app.get("/", (req, res) => {
    res.send("Summary Backend Running!");
});

// Start server for Render
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Server running on PORT " + PORT));
