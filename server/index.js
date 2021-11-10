const path = require("path");

function clearConsoleAndScrollBuffer() {
  console.log("clear lines ******* ");
  process.stdout.write("\u001b[3J\u001b[1J");
  console.clear();
}

if (process.env.NODE_ENV === "dev") {
  clearConsoleAndScrollBuffer();

  require("dotenv").config({ path: path.join(__dirname, "../.env.dev") });
} else {
  require("dotenv").config({ path: path.join(__dirname, "../.env") });
}

const { mongoConnect, db } = require("./database/index");
const { testGreeting, insertInvoice } = require("./routes");
const express = require("express");
const app = express();
app.use(express.json());

const init = async () => {
  await mongoConnect();

  app.get("/", testGreeting);

  app.post("/invoice", insertInvoice);

  app.listen(process.env.PORT, () => {
    console.log(
      `${process.env.NODE_ENV} server started on port ${process.env.PORT}`
    );
  });
};

init();
