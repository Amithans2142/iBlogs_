const express = require('express');
const app = express();
const route = express.Router();
const { createUser } = require('../controllers/create');
const { logIn } = require('../controllers/login');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const {createPost,getAllPosts,getAllPostsHome }= require('../controllers/post');
const {likedPost} = require('../controllers/like');
const {commentOnPost}=require('../controllers/comment');
const {deletePost}= require('../controllers/delete');
const {updatePost}=require('../controllers/update');
const user = require('../middleware/user');


route.post('/create', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 8 characters').isLength({ min: 8 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    const existingEmail = await User.findOne({ email });
    if (!existingEmail) {


    } else {
        return res.json({
            message: "User Already Exist"
        })
    }

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 10)
    } catch {
        return res.json({
            message: "Error while hashing"
        })

    }
    const Saved = await User.create({
        name, email, password: hashedPassword
    })


    res.status(200).json({
        success: true,
        message: "User Created",
        data: Saved
    })
},
    createUser);
route.post('/login', logIn);


app.use(user); 
route.post('/post',user,createPost);
route.get('/posts',user,getAllPosts);
route.get('/dashboard',user,getAllPostsHome );
route.post('/like',likedPost);
route.post('/comment',user,commentOnPost);
route.delete('/delete/:id',deletePost);
route.put('/update/:id',updatePost);


route.post('/fetch', user, async (req, res) => {
    try {
        const userId = req.user.existingUser.id;
       
        console.log(userId);
        const foundUser = await User.findById(userId).select("-password"); // Fixed variable name
        if (!foundUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.send(foundUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});












module.exports = route;