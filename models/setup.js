require('dotenv').config();

const pool = require('./pool');


const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        hash TEXT NOT NULL,
        salt TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

pool.query(createUsersTable, (err, result) => {
    if (err) {
        console.error('Error creating table:', err);
    } else {
        console.log('Users table created!');
    }
    pool.end();
});