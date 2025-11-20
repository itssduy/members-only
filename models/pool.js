const { Pool } = require('pg');


const config = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: process.env.DBPORT,
    database: process.env.DATABASE,
}

module.exports = new Pool(config);