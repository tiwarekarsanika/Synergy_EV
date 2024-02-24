const express = require('express');
const mysql = require('mysql');
const { createConnection } = require('mysql'); // Corrected import
const { readFile } = require('fs').promises; // Updated import for promisified readFile
const { json } = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// MySQL Connection Configuration
const connection = createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ev_charging_stations',
});

app.use(bodyParser.json());

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');

    // Read CHARGING STATION JSON file
    // readFile('ev_charging.json', 'utf8')
    //     .then((data) => {
    //         // Parse JSON data
    //         const jsonData = JSON.parse(data);

    //         // Iterate through entries and insert into MySQL
    //         jsonData.forEach((entry) => {
    //             // Extract attribute names and values
    //             const attributeNames = Object.keys(entry).filter((key) => key !== '0'); // Exclude '0' key
    //             const attributeValues = attributeNames.map((key) => entry[key]);

    //             // Generate placeholders and column names for the SQL query
    //             const placeholders = Array(attributeNames.length).fill('?').join(', ');
    //             const columns = attributeNames.join(', ');

    //             // Insert data into MySQL
    //             const query = `INSERT INTO charging_stations (${columns}) VALUES (${placeholders})`;

    //             connection.query(query, attributeValues, (insertErr, result) => {
    //                 if (insertErr) {
    //                     console.error('Error inserting data into MySQL:', insertErr);
    //                     return;
    //                 }

    //                 console.log('Data inserted successfully');
    //             });
    //         });

    //         // Close MySQL connection
    //         connection.end();
    //     })
    //     .catch((readErr) => {
    //         console.error('Error reading JSON file:', readErr);
    //         connection.end();
    //     });

    // Read CAR JSON file
    // readFile('Cars.json', 'utf8')
    //     .then((data) => {
    //         // Parse JSON data
    //         const jsonData = JSON.parse(data);

    //         // Iterate through entries and insert into MySQL
    //         jsonData.forEach((entry) => {
    //             // Extract attribute names and values
    //             const attributeNames = Object.keys(entry).filter((key) => key !== '0'); // Exclude '0' key
    //             const attributeValues = attributeNames.map((key) => entry[key]);

    //             // Generate placeholders and column names for the SQL query
    //             const placeholders = Array(attributeNames.length).fill('?').join(', ');
    //             const columns = attributeNames.join(', ');

    //             // Insert data into MySQL
    //             const query = `INSERT INTO ev_models (${columns}) VALUES (${placeholders})`;

    //             connection.query(query, attributeValues, (insertErr, result) => {
    //                 if (insertErr) {
    //                     console.error('Error inserting data into MySQL:', insertErr);
    //                     return;
    //                 }

    //                 console.log('Data inserted successfully');
    //             });
    //         });

    //         // Close MySQL connection
    //         connection.end();
    //     })
    //     .catch((readErr) => {
    //         console.error('Error reading JSON file:', readErr);
    //         connection.end();
    //     });

    //  Read TRAVEL JSON file
    // readFile('travel.json', 'utf8')
    //     .then((data) => {
    //         // Parse JSON data
    //         const jsonData = JSON.parse(data);

    //         // Iterate through entries and insert into MySQL
    //         jsonData.forEach((entry) => {
    //             // Extract attribute names and values
    //             const attributeNames = Object.keys(entry).filter((key) => key !== '0'); // Exclude '0' key
    //             const attributeValues = attributeNames.map((key) => entry[key]);

    //             // Generate placeholders and column names for the SQL query
    //             const placeholders = Array(attributeNames.length).fill('?').join(', ');
    //             const columns = attributeNames.join(', ');

    //             // Insert data into MySQL
    //             const query = `INSERT INTO travel_data (${columns}) VALUES (${placeholders})`;

    //             connection.query(query, attributeValues, (insertErr, result) => {
    //                 if (insertErr) {
    //                     console.error('Error inserting data into MySQL:', insertErr);
    //                     return;
    //                 }

    //                 console.log('Data inserted successfully');
    //             });
    //         });

    //         // Close MySQL connection
    //         connection.end();
    //     })
    //     .catch((readErr) => {
    //         console.error('Error reading JSON file:', readErr);
    //         connection.end();
    //     });
});

app.post('/user', (req, res) => {
    const { name, phone_number, email, ev_model } = req.body;

    const insertQuery = `
      INSERT INTO user_profiles (name, phone_number, email, ev_model)
      VALUES (?, ?, ?, ?)
    `;

    connection.query(insertQuery, [name, phone_number, email, ev_model], (err, results) => {
        if (err) {
            console.error('Error inserting data: ', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.log('User profile added successfully');
            res.status(201).json({ message: 'User profile added successfully' });
        }
    });
});

let globalEfficiency;

// Express route to fetch EV model details by model name
app.get('/model-info', (req, res) => {
    const { modelName } = req.body;

    if (!modelName) {
        return res.status(400).json({ error: 'Model name is required in the query parameters' });
    }

    const query = 'SELECT * FROM ev_models WHERE model = ?';

    // Execute the query with the model name as a parameter
    connection.query(query, [modelName], (err, results) => {
        if (err) {
            console.error('Error executing MySQL query: ' + err.stack);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Model not found' });
        }

        globalEfficiency = results[0].efficiency_wh_km;
        if (globalEfficiency != 0) {
            console.log("Global efficiency is: ", globalEfficiency)
        }
        else {
            console.log("no gef.");
        }

        // Send the model details as JSON response
        res.json(results[0]);
    });
});

// POST endpoint to calculate carbon footprint for a travel entry
app.get('/carbon-footprint', (req, res) => {
    // Energy consumption rate (in Wh per km)
    const energyConsumptionRate = globalEfficiency / 1000;
    if (energyConsumptionRate != 0) {
        console.log("energyConsumptionRate is: ", energyConsumptionRate)
    }
    else {
        console.log("no energyConsumptionRate");
    }

    // Carbon intensity (in kg CO2 per kWh)
    const carbonIntensity = 177 / 1000;
    const avgCarbonEms = 121.3; 

    // Manufacturing emissions (adjusted to 5 tons)
    const manufacturingEmissions = 5000; // in kgCO2

    // Query to get the sum of total_distance from travel_data table
    const getDistanceSumQuery = 'SELECT SUM(total_distance) AS distanceSum FROM travel_data';

    // Execute the query
    connection.query(getDistanceSumQuery, (err, result) => {
        if (err) {
            console.error('Error getting distance sum from database:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            const distanceTraveled = result[0].distanceSum || 0; // If there are no records, assume distance is 0

            // Calculate total energy consumed
            const totalEnergyConsumed = distanceTraveled * energyConsumptionRate;
            if (totalEnergyConsumed != 0) {
                console.log("totalEnergyConsumed is: ", totalEnergyConsumed)
            }
            else {
                console.log("no totalEnergyConsumed");
            }

            // Calculate carbon emissions from charging
            const carbonEmissionsFromCharging = totalEnergyConsumed * carbonIntensity;

            // Calculate total carbon footprint
            const totalCarbonFootprint = carbonEmissionsFromCharging + manufacturingEmissions;
            if (totalCarbonFootprint != 0) {
                console.log("totalCarbonFootprint is: ", totalCarbonFootprint)
            }
            else {
                console.log("no totalCarbonFootprint");
            }

            const totalFuelCarbonFootprint = (distanceTraveled * avgCarbonEms)/10;

            // Respond with the calculated results
            res.json({ distanceTraveled, totalEnergyConsumed, carbonEmissionsFromCharging, totalCarbonFootprint, totalFuelCarbonFootprint });
        }
    });
});

app.use(json());

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

