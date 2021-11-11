const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });
const MongoClient = require("mongodb").MongoClient;
exports.db = null;

exports.mongoConnect = async (options) => {
  const defaultOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

  console.log(`connecting mongodb to ${process.env.MONGO_URI}`);

  const client = await MongoClient.connect(
    process.env.MONGO_URI,
    options || defaultOptions
  );

  exports.db = client.db("financial-reporting");
  console.log("db client cdreated");

  return exports.db;
};
