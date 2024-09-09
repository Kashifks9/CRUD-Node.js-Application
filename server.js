
// server.js
const express = require('express');
const mysql = require('mysql');
const path = require('path');

const app = express();

// Create MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'abc123',
    database: 'test'
});

// Connect to MySQL
db.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// Define the /data route to fetch data from the database
app.get('/data', (req, res) => {
    let sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results); // Send the data as JSON
    });
});

// Define the /add-data route to add data to the database
app.post('/add-data', (req, res) => {
    const { name, email } = req.body;
    let sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
    db.query(sql, [name, email], (err, results) => {
        if (err) throw err;
        res.send('Data added successfully'); // Send a success message
    });
});

// Delete data from the database
app.delete('/delete-user/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'User deleted successfully' });
    });
});

// Update data in the database
app.put('/update-user/:id', (req, res) => {
    const id = req.params.id;
    const { name, email } = req.body;
    const sql = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
    db.query(sql, [name, email, id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'User updated successfully' });
    });
});


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
