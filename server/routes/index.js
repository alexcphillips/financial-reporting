const Mongo = require("../database/index");
const { validateInvoice } = require("../schemas/index");

exports.testGreeting = async (req, res) => res.send("Hi, I'm an API!");

exports.findInvoiceById = async (req, res) =>
  res.send(await Mongo.db.collection("invoices").findOne({ id: req.body.id }));

exports.findAllInvoices = async (req, res) => {
  const invoices = await Mongo.db.collection("invoices").find({}).toArray();
  console.log("invoices:", invoices.length);
  res.json(invoices);
};

exports.insertInvoice = async (req, res) => {
  const valid = validateInvoice(req.body);

  if (!valid) throw new Error(JSON.stringify(validateInvoice.errors));

  if (!req.body.paid) req.body.paid = false;

  // const content = ({ company, address, total, dueDate, items } = req.body);
  req.body.createdAt = Date();
  res.send(req.body);
};
