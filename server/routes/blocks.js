const express = require('express');
const Block = require('../models/Block');

const router = express.Router();

// GET /api/blocks — full registry
router.get('/', async (req, res) => {
  const blocks = await Block.find().lean();
  res.json(blocks);
});

// GET /api/blocks?concept_id=newtons_second_law — blocks teaching one concept
router.get('/for-concept/:conceptId', async (req, res) => {
  const blocks = await Block.find({ concept_ids: req.params.conceptId }).lean();
  res.json(blocks);
});

module.exports = router;
