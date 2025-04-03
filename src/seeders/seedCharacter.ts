import { CharacterModel } from '../models/character';

export const seedCharacters = async (): Promise<void> => {
  try {
    await CharacterModel.seedDatabase();
  } catch (error) {
    console.error('Failed to seed characters:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  seedCharacters();
}
