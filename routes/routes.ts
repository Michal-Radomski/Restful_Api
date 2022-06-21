import express from "express";

const userModel = require("../models/UserModel");

const router = express.Router();

router.get("/", (req, res) => {
  console.log("req.ip:", req.ip);
  res.send("<h1>Hello World!</h1>");
});

module.exports = router;
