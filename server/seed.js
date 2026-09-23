require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const Concept = require('./models/Concept');
const Block = require('./models/Block');

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);

  const conceptsPath = path.join(__dirname, '..', 'data', 'concepts.mechanics.json');
  const concepts = JSON.parse(fs.readFileSync(conceptsPath, 'utf-8'));
  for (const c of concepts) {
    await Concept.findOneAndUpdate({ id: c.id }, c, { upsert: true, new: true });
  }
  console.log(`Seeded ${concepts.length} concepts.`);

  const blocksDir = path.join(__dirname, '..', 'blocks');
  const blockFiles = fs
    .readdirSync(blocksDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name !== 'shared')
    .map((d) => path.join(blocksDir, d.name, 'block.json'))
    .filter(fs.existsSync);

  for (const file of blockFiles) {
    const block = JSON.parse(fs.readFileSync(file, 'utf-8'));
    await Block.findOneAndUpdate({ id: block.id }, block, { upsert: true, new: true });
  }
  console.log(`Seeded ${blockFiles.length} block(s).`);

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
