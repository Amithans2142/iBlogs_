const User = require('../models/User');
const Post = require('../models/Post');

exports.userDetails = async (req,res)=> {
    try{
        const {name,email,password} = req.body;
        const user = new User({
            name,email,password
        })

    }catch{

    }
} 