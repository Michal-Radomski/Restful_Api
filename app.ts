require("dotenv").config();
// console.log("process.env.PORT:", process.env.PORT);

import express from "express";
import mongoose from "mongoose";

// DB Connection
mongoose.connect("mongodb://localhost:27017/test", {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", function callback() {
  console.log("Connected to the MongoDB");
});

const app = express();

// Configuring routes
const allRoutes = require("./routes/routes");
// console.log({allRoutes});
app.use(allRoutes);

const port = (process.env.PORT || 3000) as number;

app.listen(port, () => {
  console.log(`Server in listening on port: ${port}`);
});
