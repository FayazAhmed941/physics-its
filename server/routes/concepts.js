const express = require('express');
const Concept = require('../models/Concept');

const router = express.Router();

// GET /api/concepts — full concept graph
router.get('/', async (req, res) => {
  const concepts = await Concept.find().lean();
  res.json(concepts);
});

// GET /api/concepts/:id — one concept, with its prerequisites resolved
router.get('/:id', async (req, res) => {
  const concept = await Concept.findOne({ id: req.params.id }).lean();
  if (!concept) return res.status(404).json({ error: 'concept not found' });

  const prerequisites = await Concept.find({
    id: { $in: concept.prerequisites },
  }).lean();

  res.json({ ...concept, prerequisites_resolved: prerequisites });
});

module.exports = router;
