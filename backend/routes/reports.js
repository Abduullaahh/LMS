const express = require('express');
const router = express.Router();
const connection = require('../server');

// Generate a report for a student
router.get('/student/:id', (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM Grades WHERE student_id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Generate a report for a course
router.get('/course/:id', (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM Grades WHERE course_id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

module.exports = router;
