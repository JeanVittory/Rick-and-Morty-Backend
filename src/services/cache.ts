import { createClient } from 'redis';

const redisClient = createClient({
  url: 'redis://localhost:6379',
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

const initializeCache = async () => {
  await redisClient.connect();
  console.log('Connected to Redis');
};

const getCache = async (key: string): Promise<string | null> => {
  try {
    return await redisClient.get(key);
  } catch (error) {
    console.error('Error getting cache:', error);
    return null;
  }
};

const setCache = async (key: string, value: string, ttl: number): Promise<void> => {
  try {
    await redisClient.set(key, value, { EX: ttl });
  } catch (error) {
    console.error('Error setting cache:', error);
  }
};

export { initializeCache, getCache, setCache };
