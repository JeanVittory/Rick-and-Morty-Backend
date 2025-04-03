import { config } from 'dotenv';
import invariant from 'invariant';
import path from 'path';
config({ path: path.resolve(__dirname, '../../.env') });

invariant(process.env.PORT, 'A port must be declared');
if (!process.env.DATABASE || !process.env.DB_USERNAME || !process.env.DB_PASSWORD) {
  throw new Error('Database configuration is incomplete in .env file');
}

export default {
  PORT: process.env.APP_PORT || 4545,
  DATABASE: process.env.DATABASE,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
};
