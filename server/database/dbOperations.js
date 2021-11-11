const Mongo = require("./index");

exports.dbFindCompanyById = async (companyId) => {
  await Mongo.db.collection("companies").findOne({ id: companyId });
};

exports.insertInvoices = async (invoices) => {
  await Mongo.db.collection("invoices").insertMany(invoices);
};
