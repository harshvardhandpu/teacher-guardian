const express = require('express');
const Attendance = require('../models/Attendance');
const router = express.Router();

router.post('/mark', async (req, res) => {
    const { studentId, status } = req.body;
    try {
        const attendance = new Attendance({ studentId, status });
        await attendance.save();
        res.status(201).json({ message: 'Attendance marked' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:studentId', async (req, res) => {
    try {
        const records = await Attendance.find({ studentId: req.params.studentId });
        res.json(records);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
