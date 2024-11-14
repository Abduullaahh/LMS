const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql2');
const app = express();

// Setup MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    database: 'universitydb',
    user: 'root',
    password: '1234',
    port: 3306
});

// Check the database connection
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err.code);
        console.error('Error details:', err);
        process.exit(1);
    }
    console.log('Connected to database successfully');
});
module.exports = connection;

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
app.get('/', (req, res) => {
    connection.query('SELECT 1', (err, results) => {
        if (err) {
            console.error('Error in health check:', err);
            res.status(500).json({ status: 'Error', error: err.message });
            return;
        }
        res.json({ status: 'OK', database: 'Connected' });
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: err.message });
});

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
