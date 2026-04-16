import dotenv from 'dotenv';

dotenv.config();

const required = ['JWT_SECRET_KEY', 'DB_HOST', 'DB_USER', 'DB_PORT', 'DB_PASSWORD', 'DB_DATABASE'];
for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing environment variable: ${key}`);
  }
}
