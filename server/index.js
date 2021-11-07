const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const { mongoConnect } = require("./database/index");
const express = require("express");
const app = express();
app.use(express.json());
const port = process.env.PORT;

const init = async () => {
  app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
  });
};

init();
