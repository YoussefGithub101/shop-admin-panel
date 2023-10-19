// counterSchema.js

const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  model: { type: String, required: true },
  field: { type: String, required: true },
  count: { type: Number, default: 1 },
});

const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;