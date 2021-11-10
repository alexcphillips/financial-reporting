const Ajv = require("ajv");
const ajv = new Ajv();

const lineItemsSchema = {
  type: "object",
  properties: {
    description: { type: "string" },
    amount: { type: "integer" },
    paid: { type: "boolean" },
    companyId: { type: "integer" }
  },
  required: ["description", "amount", "companyId"],
  additionalProperties: true
};

const invoiceSchema = {
  type: "object",
  properties: {
    company: { type: "string" },
    address: { type: "string" },
    total: { type: "integer" },
    dueDate: { type: "string" },
    lineItems: {
      type: "array",
      items: lineItemsSchema
    }
  },
  required: ["company", "address", "total", "dueDate", "lineItems"],
  additionalProperties: false
};

exports.validateInvoice = ajv.compile(invoiceSchema);

//accept these properties in the body: company, address, total, createdAt, dueDate,
//items (array of objects for work done with properties: description, amount, paid (default to false), companyId
