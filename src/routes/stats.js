const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const DATA_PATH = path.join(__dirname, "../../data/items.json");

// GET /api/stats
router.get("/", (req, res, next) => {
  try {
    if (!fs.existsSync(DATA_PATH)) {
      return res.json({ total: 0, averagePrice: 0 });
    }

    const data = fs.readFileSync(DATA_PATH, "utf-8");
    const items = JSON.parse(data || "[]");

    // Calculate stats
    const stats = {
      total: items.length,
      averagePrice:
        items.length > 0
          ? items.reduce((acc, cur) => acc + (cur.price || 0), 0) / items.length
          : 0,
    };

    res.json(stats);
  } catch (err) {
    console.error("Error calculating stats:", err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
