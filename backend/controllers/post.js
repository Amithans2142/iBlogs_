

const Post = require('../models/Post');
const User = require('../models/User'); 
const user = require('../middleware/user');

exports.createPost = async (req, res) => {
    try {
        const { title, body } = req.body;
        const userId = req.user.existingUser.id; 
        console.log("id",userId);

        // Fetch the user's information from the User model
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        
        const post = new Post({
            title,
            body,
            user
         
        });

        const savedPost = await post.save();
        res.status(200).json({
            success: true,
            post: savedPost,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while creating the post',
        });
    }
};

//Dashboard at client side 

exports.getAllPostsHome = async (req, res) => {
    try {

        // const userId = req.user.existingUser.id;
        // console.log("userid",userId);

        const posts = await Post.find()
            .populate('likes').populate('comments').populate('user').exec();
        res.status(200).json({
            success: true,
            data: posts
        })

    } catch {
        res.json({
            success: false
        })

    }
}



//Account section  at client side 

exports.getAllPosts = async (req, res) => {
    try {

        const userId = req.user.existingUser.id;
        console.log("userid",userId);

        const posts = await Post.find({user:req.user.existingUser.id})
            .populate('likes').populate('comments').populate('user').exec();
        res.status(200).json({
            success: true,
            data: posts
        })

    } catch {
        res.json({
            success: false
        })

    }
}