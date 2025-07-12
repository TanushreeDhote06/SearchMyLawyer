// routes/appointments.js
const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');

// client books a lawyer
router.post('/', authenticate, authorize('client'), async (req, res) => {
    const { lawyerId, date, time } = req.body;

    // Later you’ll validate availability here
    // Save appointment in DB
    res.json({ message: 'Appointment booked successfully' });
});

module.exports = router;
