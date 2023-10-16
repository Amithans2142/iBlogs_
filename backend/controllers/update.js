const Post = require('../models/Post');

exports.updatePost = async (req, res) => {
  try {
    const { title, body } = req.body;
    const newPost = {};
    if (title) {
      newPost.title = title;
    }
    if (body) {
      newPost.body = body;
    }

    // Check if the post with the given ID exists
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Update the post
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $set: newPost },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(500).json({ message: "Update failed" });
    }

    res.json({
      message: "Updated",
      updatedPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update" });
  }
};
