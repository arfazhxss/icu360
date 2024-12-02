// src/scripts/migrate-to-kv.mjs
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { Redis } from '@upstash/redis';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env.local
dotenv.config({ path: path.join(__dirname, '..', '..', '.env.local') });

// Log the environment variables (for debugging purposes)
console.log('TRIAGE_KV_REST_API_URL:', process.env.TRIAGE_KV_REST_API_URL);
console.log('TRIAGE_KV_REST_API_TOKEN:', process.env.TRIAGE_KV_REST_API_TOKEN);

const redis = new Redis({
  url: process.env.TRIAGE_KV_REST_API_URL,
  token: process.env.TRIAGE_KV_REST_API_TOKEN,
});

const DATA_FILE = path.join(__dirname, '..', '..', 'src', 'data', 'triage-data.json');

async function migrateToKV() {
  try {
    // Read the JSON file
    const data = await fs.readFile(DATA_FILE, 'utf8');
    const { users, patients } = JSON.parse(data);

    // Store users and patients in Redis
    await redis.set('users', JSON.stringify(users));
    await redis.set('patients', JSON.stringify(patients));

    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Error during migration:', error);
  }
}

migrateToKV();