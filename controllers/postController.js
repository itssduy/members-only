const query = require('../models/query')

const getDashboard = async (req,res) => {
    const posts = await query.getAllPosts();
    res.render('posts/dashboard', {posts: posts})
}

const getPost = (req, res) => {
    res.render('posts/view')
}



const getNewPost = (req, res) => {
    res.render('posts/new')
}
const postNewPost = async (req, res) => {
    const { title, text } = req.body;
    const userId = req.user.rows[0].id
    //validate and sanitize data


    //make a psql query
    const post = await query.createPost(title, text, userId);
    //redirect to post page
   res.redirect(`posts/${post.id}`);
}


const getEditPost = (req, res) => {

}
const postEditPost = (req, res) => {

}

const deletePost = (req, res) => {

}


module.exports = {
    getDashboard,
    getPost,
    getNewPost,
    postNewPost,
    getEditPost,
    postEditPost,
    deletePost
}