import { createPool, VercelPool } from '@vercel/postgres';
import dotenv from 'dotenv';
dotenv.config();
const connectionString = process.env.VITE_POSTGRES_URL;

const pool: VercelPool = createPool({
  connectionString: connectionString
});

export default pool;