const { db } = require("./database/index");
const { validateInvoice } = require("./schemas/index");

exports.testGreeting = async (req, res) => res.send("Hi, I'm an API!");

exports.findInvoiceById = async (req, res) => db.findOne({ id: req.body.id });

exports.insertInvoice = async (req, res) => {
  console.log(req.body);
  const valid = validateInvoice(req.body);

  if (!valid) throw new Error(JSON.stringify(validateInvoice.errors));
  if (!req.body.paid) req.body.paid = false;
  const content = ({ company, address, total, dueDate, items } = req.body);
  content.createdAt = Date();
  console.log(content);
  res.send(content);
};
