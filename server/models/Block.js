const mongoose = require('mongoose');

const BlockSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    render_engine: { type: String, enum: ['matter-js', 'canvas', 'svg'], required: true },
    concept_ids: [{ type: String }],
    parameters: { type: mongoose.Schema.Types.Mixed, required: true },
    component_path: { type: String, required: true },
    default_duration_seconds: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Block', BlockSchema);
