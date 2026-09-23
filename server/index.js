require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const conceptsRouter = require('./routes/concepts');
const blocksRouter = require('./routes/blocks');

const app = express();
app.use(express.json());

app.get('/health', (req, res) => res.json({ ok: true }));
app.use('/api/concepts', conceptsRouter);
app.use('/api/blocks', blocksRouter);

const PORT = process.env.PORT || 3000;

async function start() {
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI is not set — add it in your deployment env vars.');
    process.exit(1);
  }
  await mongoose.connect(process.env.MONGODB_URI);
  app.listen(PORT, () => console.log(`Server listening on :${PORT}`));
}

start();
