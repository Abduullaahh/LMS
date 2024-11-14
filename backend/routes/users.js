const express = require('express');
const router = express.Router();
const connection = require('../server');

// Get all users
router.get('/', (req, res) => {
    connection.query('SELECT * FROM Users', [], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Get user by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM Users WHERE user_id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});

// Get user by role
router.get('/role/:role', (req, res) => {
    console.log('i was here')
    const { role } = req.params;
    connection.query('SELECT * FROM Users WHERE role = ?', [role], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});

// Create a new user
router.post('/', (req, res) => {
    const { username, password, email, role } = req.body;
    connection.query('INSERT INTO Users (username, password, email, role) VALUES (?, ?, ?, ?)', [username, password, email, role], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'User created' });
    });
});

// Update a user
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { username, password, email, role } = req.body;
    connection.query('UPDATE Users SET username = ?, password = ?, email = ?, role = ? WHERE user_id = ?', [username, password, email, role, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'User updated' });
    });
});

// Delete a user
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM Users WHERE user_id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'User deleted' });
    });
});

module.exports = router;
