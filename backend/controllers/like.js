const Post = require('../models/Post');
const Like = require('../models/Like');

exports.likedPost = async (req,res)=> {
    try{
        const {post,user} = req.body;
        const like = new Like ({
            post, user
        });
        const savedLike = await like.save();
        const updatedPost = await Post.findByIdAndUpdate(post,{$push:{likes:savedLike._id}},{new:true}).populate('likes').exec();
        res.status(200).json({
            success:true,
            data:updatedPost

        })

    }catch{
        res.json({
            success:false
        })

    }
}