const express = require("express");
const router = express.Router();
const postSch = require("../models/post");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "REUNIONAPI";
const verifyToken = require('../middlewares/verifyJWT');

// Get all entries by blog creation date

router.get("/api/all_posts", verifyToken, async (req, res) => {
  try {
    const Posts = await postSch.find().sort({ date: -1 });
    res.status(200).json(Posts);
  } catch (err) {
    res.status(404).send("error" + err);
  }
});

// Get specific entry

router.get("/api/post/:id", verifyToken ,async (req, res) => {
  try {
    const Post = await postSch.findById(req.params.id);
    res.json(Post);
  } catch (err) {
    res.send("error" + err);
  }
});

// Create entry

router.post("/api/posts", verifyToken ,async (req, res, next) => {
  const newPost = new postSch({
    title: req.body.title,
    desc: req.body.desc,
    likes: req.body.likes,
    comments: req.body.comments,
    date: req.body.date,
    follow: req.body.follow,
  });

  try {
    await newPost.save();
    res.json(newPost);
  } catch (err) {
    res.send(err);
  }
});

// Follow post

router.patch("/api/follow/:id", verifyToken ,async (req, res) => {
  try {
    const post = await postSch.findById(req.params.id);
    if (post.follow == true) {
      return res.send("already following");
    }
    post.follow = true;
    const p1 = await post.save();
    res.json(p1);
    //res.send("Following");
  } catch (err) {
    res.send("error" + err);
  }
});

// Unfollow Post

router.patch("/api/unfollow/:id", verifyToken ,async (req, res) => {
  try {
    const post = await postSch.findById(req.params.id);
    if (post.follow == false) {
      return res.send("not following");
    }
    post.follow = false;
    const p1 = await post.save();
    res.json(p1);
    //res.send("UnFollowed");
  } catch (err) {
    res.send("error" + err);
  }
});

// Like Post

router.patch("/api/like/:id", verifyToken ,async (req, res) => {
  try {
    const post = await postSch.findById(req.params.id);
    post.likes = post.likes + 1;
    await post.save();
    res.json(post);
  } catch (err) {
    res.send("error" + err);
  }
});

// Dislike post

router.patch("/api/unlike/:id", verifyToken , async (req, res) => {
  try {
    const post = await postSch.findById(req.params.id);
    post.likes = post.likes - 1;
    await post.save();
    res.json(post);
  } catch (err) {
    res.send("error" + err);
  }
});

// Add Comments
router.patch("/api/comment/:id", verifyToken ,async (req, res) => {
  try {
    const post = await postSch.findByIdAndUpdate(req.params.id, req.body);
    await post.save();
    res.json(post);
  } catch (err) {
    res.send(err);
  }
});

// Delete Post

router.delete("/api/delete/:id", verifyToken, async (req, res) => {
  try {
    var id = req.params.id;
    postSch.findOneAndRemove({ _id: id }, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send();
      }
      return res.status(200).send("post deleted successfully");
    });
  } catch (err) {
    res.send(err);
  }
});

// router.delete('/del/:id', async(req,res) => {
//     try{
//         const post = await postSch.findById(req.params.id);
//         await post.remove();
//         res.json(post);
//         res.send("post deleted");
//     }catch(err){
//         res.send("error" + err);
//     }
// })

// middleware function

module.exports = router;
