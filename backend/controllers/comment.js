const Post = require('../models/Post');
const Comment = require('../models/Comment');
const User = require('../models/User');

exports.commentOnPost = async (req,res)=> {
    const userId = req.user.existingUser.name;
    
    try{
        const {postId,user,comment}= req.body;
        const comments = new Comment ({
           postId, user:userId, comment
        })
        const savedComment = await comments.save();
        console.log(savedComment._id);
        const updatedPost = await Post.findByIdAndUpdate(postId,{$push:{comments:savedComment._id}},{new:true}).populate('comments').exec();

        res.status(200).json({
            success:true,
            message:"true",
            data:updatedPost
        })



    }catch(err){
        res.json({
            success:false,
            err
        })

    }
}

