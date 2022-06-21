import express from "express";

const UserModel = require("../models/UserModel");

const router = express.Router();

interface User {
  title: string;
  description: string;
  date: Date;
}

router.get("/hello", (req, res) => {
  console.log("req.ip:", req.ip);
  res.send("<h1>Hello World!</h1>");
});

// Get all the Users
router.get("/", async (req, res) => {
  console.log("req.ip:", req.ip);
  try {
    const users: User[] = await UserModel.find();
    res.json(users);
  } catch (err) {
    console.log("Error: ", err);
  }
});

// Get an individual user
router.get("/:userId", async (req, res) => {
  console.log("req.ip:", req.ip);
  try {
    const user: User = await UserModel.findById(req.params.userId);
    res.json(user);
  } catch (error) {
    // console.log("Error: ", error);
    res.json({error});
  }
});

// Create a User
router.post("/", (req, res) => {
  // console.log("req.body:", req.body);
  const user = new UserModel({
    title: req.body.title,
    description: req.body.description,
  });
  user
    .save()
    .then((data: User) => {
      console.log({data}, "Saved successfully");
      res.send(data);
    })
    .catch((error: string) => {
      console.error("Failed to save user to the database", error);
    });
});

// Update a User
router.patch("/:userId", async (req, res) => {
  console.log("req.ip:", req.ip);
  try {
    const updatedUser: User = await UserModel.updateOne(
      {_id: req.params.userId},
      {$set: {title: req.body.title, description: req.body.description}}
    );
    res.json(updatedUser);
  } catch (error) {
    // console.log("Error: ", error);
    res.json({error});
  }
});

// Delete a User
router.delete("/:userId", async (req, res) => {
  console.log("req.ip:", req.ip);
  try {
    // const deletedUser: User = await UserModel.remove({_id: req.params.userId});
    //* Other way
    const deletedUser: User = await UserModel.deleteOne({_id: req.params.userId});

    res.json(deletedUser);
  } catch (error) {
    // console.log("Error: ", error);
    res.json({error});
  }
});

module.exports = router;
