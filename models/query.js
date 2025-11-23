const db = require('./pool');


const createPost = async (title, text, authorId) => {
    const {rows} = await db.query('INSERT INTO posts (title, text, authorId) VALUES ($1, $2, $3) RETURNING *', [title, text, authorId]);
    return rows[0];
}

const getAllPosts = async ()=>{
    const { rows } = await db.query('SELECT * FROM posts');
    return rows;
}


module.exports = {
    getAllPosts,
    createPost
}