require('dotenv').config();

const pool = require('./pool');


const SQL = `

    DROP TABLE if EXISTS users cascade;
    DROP TABLE if EXISTS posts cascade;
    DROP TABLE if EXISTS comments;


    CREATE TABLE users (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        first_name CHAR(255) NOT NULL,
        last_name CHAR(255) NOT NULL,
        username VARCHAR(255) UNIQUE NOT NULL,
        membership BOOLEAN DEFAULT FALSE,
        email TEXT,
        hash TEXT NOT NULL,
        salt TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE posts (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        authorid INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255),
        text TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE comments (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        authorid INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        postid INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
        text TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE likeToPostsRelation (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        userId INTEGER NOT NULL,
        status INTEGER
    )

    CREATE TABLE likeToCommentsRelation (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        userId INTEGER NOT NULL,
        status INTEGER
    )
`;

pool.query(SQL, (err, result) => {
    if (err) {
        console.error('Error creating table:', err);
    } else {
        console.log('Tables Created!');
    }
    pool.end();
});