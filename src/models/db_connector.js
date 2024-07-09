// index.js
import { Client } from 'pg';

// Database connection configuration
const client = new Client({
  user: 'your-username', // Replace with your PostgreSQL username
  host: 'localhost', // Replace with your PostgreSQL host
  database: 'your-database', // Replace with your PostgreSQL database name
  password: 'your-password', // Replace with your PostgreSQL password
  port: 5432, // Replace with your PostgreSQL port (default is 5432)
});

// Connect to the database
async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL database successfully');

    // Example query
    const res = await client.query('SELECT NOW()');
    console.log('Current Time:', res.rows[0]);

    // Close the connection
    await client.end();
    console.log('Connection to PostgreSQL database closed');
  } catch (err) {
    console.error('Error connecting to PostgreSQL database:', err);
  }
}

// Execute the function
connectToDatabase();
