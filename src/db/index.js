import PG from "pg";
import dotenv from "dotenv";
dotenv.config();
const { Pool } = PG;
console.log( process.env.DB_PASSWORD);

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

 pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(1)
});


(async () => {
  try {
    const client = await pool.connect();
    console.log("✅ Connected to PostgreSQL");
    client.release();
  } catch (err) {
    console.error("❌ Database connection failed", err);
  }
})();

export default pool;