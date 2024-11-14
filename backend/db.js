const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./school_system.db', (err) => {
    if (err) {
        console.error('Error opening SQLite database:', err);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Function to run queries
db.runQuery = (query, params = [], callback) => {
    db.all(query, params, (err, rows) => {
        if (err) {
            console.error('Error executing query:', err);
            return callback(err);
        }
        callback(null, rows);
    });
};

module.exports = db;
