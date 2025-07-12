// backend/routes/lawyers.js
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
    const { city, specialization, experience } = req.query;

    let query = `SELECT * FROM Lawyers WHERE 1=1`;
    const params = [];
    let idx = 1;

    if (city) {
        query += ` AND city ILIKE $${idx++}`;
        params.push(city);
    }
    if (specialization) {
        query += ` AND specialization ILIKE $${idx++}`;
        params.push(`%${specialization}%`);
    }
    if (experience) {
        query += ` AND experience >= $${idx++}`;
        params.push(experience);
    }

    try {
        const result = await db.query(query, params);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
