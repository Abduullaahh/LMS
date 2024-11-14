const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all courses
router.get('/', (req, res) => {
    db.runQuery('SELECT * FROM Courses', [], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Get course by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.runQuery('SELECT * FROM Courses WHERE course_id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});

// Create a new course
router.post('/', (req, res) => {
    const { course_name, course_description, instructor_id } = req.body;
    db.runQuery('INSERT INTO Courses (course_name, course_description, instructor_id) VALUES (?, ?, ?)', [course_name, course_description, instructor_id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Course created' });
    });
});

// Update a course
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { course_name, course_description, instructor_id } = req.body;
    db.runQuery('UPDATE Courses SET course_name = ?, course_description = ?, instructor_id = ? WHERE course_id = ?', [course_name, course_description, instructor_id, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Course updated' });
    });
});

// Delete a course
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.runQuery('DELETE FROM Courses WHERE course_id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Course deleted' });
    });
});

module.exports = router;
