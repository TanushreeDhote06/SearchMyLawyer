const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

app.use('/api/lawyer', require('./routes/lawyer'));     // lawyer-only stuff
app.use('/api/appointments', require('./routes/appointments')); // booking

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
w