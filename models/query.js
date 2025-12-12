const db = require('./pool');


const createPost = async (title, text, authorId) => {
    const {rows} = await db.query('INSERT INTO posts (title, text, authorId) VALUES ($1, $2, $3) RETURNING *', [title, text, authorId]);
    return rows[0];
}

const getAllPosts = async ()=>{
    const { rows } = await db.query('SELECT * FROM posts');
    return rows;
}

const getPost = async (id)=>{
    const { rows } = await db.query('SELECT * FROM posts WHERE id=$1', [id]);
    return rows[0];
}

const getUser = async (id)=>{
    const { rows } = await db.query('SELECT * FROM users WHERE id=$1', [id]);
    return rows[0];
}

const getMembership = async (id) => {
    const { rows } = await db.query('SELECT (membership) FROM users WHERE id=$1', [id]);
    return rows[0].membership;
}


module.exports = {
    getAllPosts,
    createPost,
    getPost,
    getUser,
    getMembership
}