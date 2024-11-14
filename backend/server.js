const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Database module
const db = require('./db');

// Import routes
const usersRoute = require('./routes/users');
const coursesRoute = require('./routes/courses');
const enrollmentsRoute = require('./routes/enrollments');
const attendanceRoute = require('./routes/attendance');
const gradesRoute = require('./routes/grades');
const reportsRoute = require('./routes/reports');

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static files (if needed for front-end)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/users', usersRoute);
app.use('/api/courses', coursesRoute);
app.use('/api/enrollments', enrollmentsRoute);
app.use('/api/attendance', attendanceRoute);
app.use('/api/grades', gradesRoute);
app.use('/api/reports', reportsRoute);

// Health check route
app.get('/health', (req, res) => {
    res.json({ status: 'OK' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: err.message });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
