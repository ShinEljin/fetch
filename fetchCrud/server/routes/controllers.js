const mongoose = require("mongoose");
const PostCard = require('../models/posts');

module.exports.createPost = async (req, res) => {

  try {
    const post = req.body;

    const newPost = new PostCard(post);
  
    res.status(200).json("Success");
    await newPost.save();
  } catch (error) {
    res.status(404).json({message: error.message});
  }
}

module.exports.getPost = async (req, res) => {
  try {
    const postCard = await PostCard.find();

    res.status(200).json(postCard);
  } catch (error) {
    res.status(404).json({message: error});
  }
}

module.exports.getPostById = async (req, res) => {
  try {
    const postCard = await PostCard.findById(req.params.id);

    res.status(200).json(postCard);
  } catch (error) {
    res.status(404).json({message: error});
  }
}

module.exports.updatePost = async (req, res) => {


  try {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) 
      return res.status(404).send("No post with that id");
    
    const updatePost = await PostCard.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json("Success");
  } catch (error) {
    res.status(404).json({message: error});
  }
};

module.exports.deletePost = async (req, res) => {
   try {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) 
      return res.status(404).send("No post with that id");

    await PostCard.findByIdAndRemove(req.params.id);

    res.status(200).json("Deleted");
  } catch (error) {
    res.status(404).json({message: error});
  }
}