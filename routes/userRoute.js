const express = require("express");
const { signin, signup } = require("../controller/userControl");
const userRouter = express.Router();
const userSch = require("../models/user");

//Get all users

userRouter.get("/api/all_users", async (req, res) => {
  try {
    const users = await userSch.find().sort({ date: -1 });
    res.json(users);
  } catch (err) {
    res.send(err);
  }
});

// Sign Up

userRouter.post("/api/signup", signup);

// Sign In

userRouter.post("/api/signin", signin);

// Delete User

userRouter.delete("/api/delete/:id", (req, res) => {
  try {
    var id = req.params.id;
    userSch.findOneAndRemove({ _id: id }, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send("user not found or ID is wrong");
      }
      return res.status(200).send("User deleted successfully");
    });
  } catch (err) {
    res.send(err);
  }
});

module.exports = userRouter;
