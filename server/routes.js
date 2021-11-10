const { db } = require("./database/index");
const { invoiceSchema } = require("./schemas/index");
const Ajv = require("ajv");
const ajv = new Ajv();

exports.testGreeting = async (req, res) => res.send("Hi, I'm an API!");

exports.findInvoiceById = async (req, res) => db.findOne({ id: req.body.id });

exports.insertInvoice = async (req, res) => {
  const validate = ajv.compile(invoiceSchema);
  return (function () {
    const valid = validate(data);
    if (!valid) throw new Error("Invalid invoice!");
    if (!req.body.paid) req.body.paid = false;
    const content = ({ company, address, total, dueDate, items } = req.body);
    content.createdAt = Date();
    console.log(content);
    res.send(content);
  })();
};
