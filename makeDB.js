const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;
const fs = require('fs');

// MySQL Connection Configuration
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'ev_charging_stations',
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');

    // Read JSON file
    fs.readFile('your_data.json', 'utf8', (readErr, data) => {
        if (readErr) {
            console.error('Error reading JSON file:', readErr);
            connection.end();
            return;
        }

        // Parse JSON data
        const jsonData = JSON.parse(data);

        // Iterate through entries and insert into MySQL
        jsonData.forEach((entry) => {
            // Extract attribute names and values
            const attributeNames = Object.keys(entry).filter((key) => key !== '0'); // Exclude '0' key
            const attributeValues = attributeNames.map((key) => entry[key]);

            // Generate placeholders and column names for the SQL query
            const placeholders = Array(attributeNames.length).fill('?').join(', ');
            const columns = attributeNames.join(', ');

            // Insert data into MySQL
            const query = `INSERT INTO charging_stations (${columns}) VALUES (${placeholders})`;

            connection.query(query, attributeValues, (insertErr, result) => {
                if (insertErr) {
                    console.error('Error inserting data into MySQL:', insertErr);
                    return;
                }

                console.log('Data inserted successfully');
            });
        });

        // Close MySQL connection
        connection.end();
    });
});

app.use(express.json());

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
