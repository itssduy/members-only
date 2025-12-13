const { post } = require('../routes/publicRoutes');
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

const getComment = async (id) => { 
    const { rows } =  await db.query('SELECT * FROM comments WHERE id=$1', [id]);
    return rows[0];
}

const getCommentsFromPost = async (postId) => { 
    const { rows } =  await db.query('SELECT * FROM comments WHERE postId=$1', [postId]);
    return rows;
}

const createComment = async (postId, authorId, text) => {
    const { rows } = await db.query('INSERT INTO comments (postId, authorId, text) VALUES ($1, $2, $3) RETURNING *', [postId, authorId, text]);
    return rows[0];
}

const deleteComment = async (id, userId) => {
    const { rows } = await db.query('DELETE FROM comments WHERE id=$1 AND authorid=$2', [id, userId]);
    return rows;
}


module.exports = {
    getAllPosts,
    createPost,
    getPost,
    getUser,
    getMembership,
    getComment,
    getCommentsFromPost,
    createComment,
    deleteComment
}