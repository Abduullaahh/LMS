const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all grades
router.get('/', (req, res) => {
    db.runQuery('SELECT * FROM Grades', [], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Get grade by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.runQuery('SELECT * FROM Grades WHERE grade_id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});

// Record student grade
router.post('/', (req, res) => {
    const { student_id, course_id, grade } = req.body;
    db.runQuery('INSERT INTO Grades (student_id, course_id, grade) VALUES (?, ?, ?)', [student_id, course_id, grade], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Grade recorded' });
    });
});

// Update grade
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { student_id, course_id, grade } = req.body;
    db.runQuery('UPDATE Grades SET student_id = ?, course_id = ?, grade = ? WHERE grade_id = ?', [student_id, course_id, grade, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Grade updated' });
    });
});

// Delete grade
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.runQuery('DELETE FROM Grades WHERE grade_id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Grade deleted' });
    });
});

module.exports = router;
