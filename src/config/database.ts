import { Sequelize } from 'sequelize';
import { CharacterModel } from '../models/character';
import env from '../config/env';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  database: env.DATABASE,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  logging: false,
});

const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established');

    CharacterModel.initialize(sequelize);

    await sequelize.sync({ force: true });
    console.log('Database synchronized');

    await CharacterModel.seedDatabase();
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
};

export { sequelize, initializeDatabase };
