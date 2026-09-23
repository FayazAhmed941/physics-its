const mongoose = require('mongoose');

const ConceptSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    prerequisites: [{ type: String }],
    block_ids: [{ type: String }],
    syllabus_ref: String,
    common_misconceptions: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Concept', ConceptSchema);
