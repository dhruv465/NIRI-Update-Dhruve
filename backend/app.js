const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the 'cors' module
const app = express();
const PORT = 5001;

app.use(cors()); // Use CORS middleware
app.use(bodyParser.json());

// Connect to the SQLite database
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Create a table for user registration data
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    First_Name TEXT,
    Last_Name TEXT,
    Email TEXT,
    Phone_Number TEXT,
    Password TEXT,
    Confirm_Password TEXT,
    Gender TEXT
  )
`, (err) => {
  if (err) {
    console.error('Error creating table:', err.message);
  } else {
    console.log('Table "users" created or already exists.');
  }
});

// Define the registration endpoint
app.post('/api/register', (req, res) => {
  const { First_Name, Last_Name, Email, Phone_Number, Password, Confirm_Password, Gen } = req.body;

  // Validate that Password and Confirm_Password match
  if (Password !== Confirm_Password) {
    res.status(400).json({ error: 'Password and Confirm Password do not match.' });
    return;
  }

  db.run(
    'INSERT INTO users (First_Name, Last_Name, Email, Phone_Number, Password, Confirm_Password, Gender) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [First_Name, Last_Name, Email, Phone_Number, Password, Confirm_Password, Gen],
    (err) => {
      if (err) {
        res.status(500).json({ error: 'Error inserting data into the database.' });
      } else {
        res.status(201).json({ message: 'Registration successful.' });
      }
    }
  );
});

app.get('/api/search', (req, res) => {
  const searchTerm = req.query.searchTerm;

  const query = `
    SELECT * FROM users
    WHERE First_Name LIKE ? OR Last_Name LIKE ? OR Email LIKE ? OR Phone_Number LIKE ? OR Gender LIKE ?
  `;
  const params = Array(5).fill(`%${searchTerm}%`);

  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Error searching data.' });
    } else {
      res.json(rows);
    }
  });
});

// Define an endpoint to fetch submitted data
app.get('/api/get-submitted-data', (req, res) => {
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching submitted data.' });
    } else {
      res.json(rows);
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Close the database connection when the Node.js process is terminated
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing database connection:', err.message);
    } else {
      console.log('Database connection closed.');
    }
    process.exit(0);
  });
});
