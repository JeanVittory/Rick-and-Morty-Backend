import { DataTypes, Model, Sequelize } from 'sequelize';
import axios from 'axios';
import { getCache, setCache } from '../services/cache';

interface CharacterAttributes {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  origin: string;
  image: string;
}

class CharacterModel extends Model<CharacterAttributes> implements CharacterAttributes {
  public id!: number;
  public name!: string;
  public status!: 'Alive' | 'Dead' | 'unknown';
  public species!: string;
  public type!: string;
  public gender!: 'Female' | 'Male' | 'Genderless' | 'unknown';
  public origin!: string;
  public image!: string;

  public static initialize(sequelize: Sequelize): void {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM('Alive', 'Dead', 'unknown'),
          allowNull: false,
        },
        species: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        type: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        gender: {
          type: DataTypes.ENUM('Female', 'Male', 'Genderless', 'unknown'),
          allowNull: false,
        },
        origin: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        image: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: 'Character',
      },
    );
  }

  public static async seedDatabase(): Promise<void> {
    try {
      const response = await axios.get('https://rickandmortyapi.com/api/character');
      const characters = response.data.results.slice(0, 15);

      await this.bulkCreate(
        characters.map((char: any) => ({
          name: char.name,
          status: char.status,
          species: char.species,
          type: char.type,
          gender: char.gender,
          origin: char.origin.name,
          image: char.image,
        })),
      );

      console.log('✅ Database seeded with 15 characters');
    } catch (error) {
      console.error('❌ Error seeding database:', error);
      throw error;
    }
  }
  public static async getCharactersWithCache(filters: any): Promise<CharacterAttributes[]> {
    const cacheKey = `characters:${JSON.stringify(filters)}`;
    const cachedData = await getCache(cacheKey);

    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const characters = await this.findAll({ where: filters });
    await setCache(cacheKey, JSON.stringify(characters), 3600); // Cache for 1 hour

    return characters;
  }
}

export { CharacterModel, CharacterAttributes };
