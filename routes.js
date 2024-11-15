// routes.js
const express = require('express');
const router = express.Router();
const calculateCarbonFootprint = require('./calculator'); // Import the calculator

// Define the POST /calculate route
router.post('/calculate', (req, res) => {
    const data = req.body;

    if (!data.electricity || !data.diet || !data.travel || !data.dist) {
        return res.status(400).send({ error: 'Please provide electricity, diet, travel, and dist data.' });
    }

    const carbonFootprint = calculateCarbonFootprint(data);
    res.send({ carbonFootprint });
});

module.exports = router;