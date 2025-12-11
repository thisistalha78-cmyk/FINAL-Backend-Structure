import generateSummary from "../services/openrouter.js";
import express from "express";

const router = express.Router();

// POST /api/summary
router.post("/", async (req, res) => {
    const text = req.body.text;

    if (!text || text.trim() === "") {
        return res.json({ summary: "❌ No text provided" });
    }

    try {
        const summary = await generateSummary(text);
        res.json({ summary });
    } catch (err) {
        console.error(err);
        res.json({ summary: "Error generating summary" });
    }
});

export default router;
