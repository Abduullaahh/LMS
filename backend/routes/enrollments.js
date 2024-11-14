const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all enrollments
router.get('/', (req, res) => {
    db.runQuery('SELECT * FROM Enrollments', [], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Get enrollment by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.runQuery('SELECT * FROM Enrollments WHERE enrollment_id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});

// Enroll a student in a course
router.post('/', (req, res) => {
    const { student_id, course_id } = req.body;
    db.runQuery('INSERT INTO Enrollments (student_id, course_id) VALUES (?, ?)', [student_id, course_id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Student enrolled' });
    });
});

// Update enrollment
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { student_id, course_id } = req.body;
    db.runQuery('UPDATE Enrollments SET student_id = ?, course_id = ? WHERE enrollment_id = ?', [student_id, course_id, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Enrollment updated' });
    });
});

// Delete enrollment
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.runQuery('DELETE FROM Enrollments WHERE enrollment_id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Enrollment deleted' });
    });
});

module.exports = router;
