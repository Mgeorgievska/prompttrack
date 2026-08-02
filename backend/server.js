require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./db");
const promptRoutes = require("./routes/promptRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const tagRoutes = require("./routes/tagRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/categories", categoryRoutes);
app.use("/api/tags", tagRoutes );
app.use("/api/favorites", favoriteRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to PromptTrack API 🚀"
    });
});

app.get("/health", async (req, res) => {
    try {
        await pool.query("SELECT NOW()");
        res.json({
            status: "OK",
            database: "Connected"
        });
    } catch (err) {
        res.status(500).json({
            status: "ERROR",
            database: "Disconnected"
        });
    }
});

const PORT = process.env.PORT || 5000;
app.use("/api/prompts", promptRoutes);


app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});