// Customers Model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true},
  password: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String,  required: true},
  city: { type: String,  required: true },
  languages: [{type: String,  required: true }],
  isActive: { type: Boolean, default: true },
  createdDate: { type: Date, default: Date.now },
  modifiedDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Customer', customerSchema);




