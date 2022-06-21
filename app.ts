require("dotenv").config();
console.log("process.env.PORT:", process.env.PORT);

import express from "express";

const app = express();

const port = (process.env.PORT || 3000) as number;

app.listen(port, () => {
  console.log(`Server in listening on port: ${port}`);
});
