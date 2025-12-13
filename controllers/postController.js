const query = require('../models/query')

const getDashboard = async (req,res) => {
    const posts = await query.getAllPosts();
    res.render('posts/dashboard', {posts: posts})
}

const getPost = async (req, res) => {
    const {id} = req.params;
    const post = await query.getPost(id);
    const author = await query.getUser(post.authorid);
    const userId = req.session.passport.user
    const comments = await query.getCommentsFromPost(post.id);

    //sort comments by descending order
    comments.sort(function(x,y){
        return y.created_at - x.created_at;
    })

    res.render('posts/view', {post: post, author: author.username, comments: comments, userId: userId});
}



const getNewPost = (req, res) => {
    res.render('posts/new')
}
const postNewPost = async (req, res) => {
    const { title, text } = req.body;
    const userId = req.user.rows[0].id

    if(!userId){
        return;
    }

    //validate and sanitize data


    //make a psql query
    const post = await query.createPost(title, text, userId);
    //redirect to post page
   res.redirect(`${post.id}`);
}


const getEditPost = (req, res) => {

}
const postEditPost = (req, res) => {

}

const deletePost = (req, res) => {

}


const postComment = async (req, res) => {
    const text = req.body.comment
    const postId = req.params.id
    const userId = req.session.passport.user

    const newComment = await query.createComment(postId, userId, text);
    res.redirect(`/posts/${postId}`);
}

const deleteComment = async(req, res) => {
    const commentId = req.params.commentId
    const postId = req.params.postId

    const userId = req.session.passport.user

    await query.deleteComment(commentId, userId);
    res.redirect(`/posts/${postId}`);

}

module.exports = {
    getDashboard,
    getPost,
    getNewPost,
    postNewPost,
    getEditPost,
    postEditPost,
    deletePost,
    postComment,
    deleteComment
}