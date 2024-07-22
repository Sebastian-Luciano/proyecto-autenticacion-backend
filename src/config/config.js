import dotenv from 'dotenv';

dotenv.config();

export const {
  DB_SECRET_KEY,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_DATABASE,
  DB_PORT,
  PORT
} = process.env;