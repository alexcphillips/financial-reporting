const { insertInvoices } = require("../dbOperations");
const { dummyData } = require("./dummyData");
const { isDev } = require("../../utilities");
const Mongo = require("../index");

exports.plantSeeds = async () => {
  if (!isDev) {
    return;
  }

  await Mongo.db.collection("invoices").deleteMany({});
  await insertInvoices(dummyData);
  console.log("planted seeds");
};
