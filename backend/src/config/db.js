import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: Number(process.env.DB_PORT),
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 10,
  waitForConnections: true,
});

export const connectDB = async () => {
  const conn = await pool.getConnection();
  await conn.ping();
  conn.release();
  console.log('Connected to MySQL');
};

export default pool;
