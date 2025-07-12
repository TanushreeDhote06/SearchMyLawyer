const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const db = require("../db");

const JWT_SECRET = "your_jwt_secret"; // Replace with process.env.JWT_SECRET in prod

// ======================= REGISTER ===========================
router.post("/register", async (req, res) => {
    const { name, email, password, phone, role } = req.body;

    if (!["lawyer", "client"].includes(role))
        return res.status(400).json({ error: "Invalid role" });

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        const userRes = await db.query(
            `INSERT INTO users (name, email, password, phone, role)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [name, email, hashedPassword, phone, role]
        );

        const user = userRes.rows[0];

        // If lawyer, insert extra info
        if (role === "lawyer") {
            const { specialization, experience, bio, city } = req.body;
            await db.query(
                `INSERT INTO lawyers (user_id, specialization, experience, bio, city, rating)
         VALUES ($1, $2, $3, $4, $5, 0)`,
                [user.id, specialization || "", experience || 0, bio || "", city || ""]
            );
        }

        // Generate JWT
        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
            expiresIn: "7d",
        });

        res.json({ token });
    } catch (err) {
        console.error("Register Error:", err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// ======================= LOGIN ===========================
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const userRes = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
        if (userRes.rowCount === 0)
            return res.status(400).json({ error: "Invalid credentials" });

        const user = userRes.rows[0];

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(400).json({ error: "Invalid credentials" });

        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
            expiresIn: "7d",
        });

        res.json({ token });
    } catch (err) {
        console.error("Login Error:", err.message);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
