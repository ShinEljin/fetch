const express = require("express");
const controllers = require("./controllers");

const createPost = controllers.createPost;
const getPost = controllers.getPost;
const getPostById = controllers.getPostById;
const updatePost = controllers.updatePost;
const deletePost = controllers.deletePost;


const router = express.Router();

router.post("/", createPost);
router.get("/", getPost);
router.get("/:id", getPostById);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);


module.exports = router;




