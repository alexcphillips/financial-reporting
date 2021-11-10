const { db } = require("./index");

exports.dbFindCompanyById = (companyId) => {
  db.collection("companies").findOne({ id: companyId });
};

exports.insertInvoice = (...invoices) => {
  db.collection("invoices").insertMany(invoices);
};
