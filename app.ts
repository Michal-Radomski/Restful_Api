require("dotenv").config();
// console.log("process.env.PORT:", process.env.PORT);

import express from "express";
import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/test", {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", function callback() {
  console.log("Connected to the MongoDB");
});

const app = express();

const port = (process.env.PORT || 3000) as number;

app.listen(port, () => {
  console.log(`Server in listening on port: ${port}`);
});
