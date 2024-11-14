const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all attendance records
router.get('/', (req, res) => {
    db.runQuery('SELECT * FROM Attendance', [], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Get attendance by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.runQuery('SELECT * FROM Attendance WHERE attendance_id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});

// Record student attendance
router.post('/', (req, res) => {
    const { student_id, course_id, date, status } = req.body;
    db.runQuery('INSERT INTO Attendance (student_id, course_id, date, status) VALUES (?, ?, ?, ?)', [student_id, course_id, date, status], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Attendance recorded' });
    });
});

// Update attendance
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { student_id, course_id, date, status } = req.body;
    db.runQuery('UPDATE Attendance SET student_id = ?, course_id = ?, date = ?, status = ? WHERE attendance_id = ?', [student_id, course_id, date, status, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Attendance updated' });
    });
});

// Delete attendance
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.runQuery('DELETE FROM Attendance WHERE attendance_id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Attendance deleted' });
    });
});

module.exports = router;
