const express = require('express');
const router = express.Router();
const db = require('../db');

// Generate a report for a student
router.get('/student/:id', (req, res) => {
    const { id } = req.params;
    db.runQuery('SELECT * FROM Grades WHERE student_id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Generate a report for a course
router.get('/course/:id', (req, res) => {
    const { id } = req.params;
    db.runQuery('SELECT * FROM Grades WHERE course_id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

module.exports = router;
