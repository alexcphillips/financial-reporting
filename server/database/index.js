const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });
const MongoClient = require("mongodb").MongoClient;
let db = null;

const mongoConnect = async (options) => {
  const defaultOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

  db = await MongoClient.connect(
    process.env.MONGO_URI,
    options || defaultOptions
  );
};

module.exports = { mongoConnect, db };
