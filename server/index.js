const path = require("path");
const { plantSeeds } = require("./database/seeds");
const { mongoConnect } = require("./database");
const { insertInvoice, findAllInvoices, testGreeting } = require("./routes");
const { clearConsole, isDev } = require("./utilities");

if (isDev) {
  clearConsole();
  require("dotenv").config({ path: path.join(__dirname, "../.env.dev") });
} else {
  require("dotenv").config({ path: path.join(__dirname, "../.env") });
}

const express = require("express");
const app = express();
app.use(express.json());

const init = async () => {
  await mongoConnect();
  await plantSeeds();

  app.get("/", testGreeting);
  app.get("/invoices", findAllInvoices);

  app.post("/invoice", insertInvoice);

  app.listen(process.env.PORT, () => {
    console.log(
      `${process.env.NODE_ENV} server started on port ${process.env.PORT}`
    );
  });
};

init();
