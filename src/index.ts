import express from 'express';
import http from 'http';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { loggerMiddleware } from './middleware/logger';
import { schema } from './schema/schema';
import { initializeDatabase } from './config/database';
import { initializeCache } from './services/cache';
import env from './config/env';

const app = express();
const httpServer = http.createServer(app);

const PORT = env.PORT;
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

const server = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

const startServer = async () => {
  try {
    await initializeDatabase();
    await initializeCache();

    await server.start();

    app.post('/graphql', async (req, res) => {
      try {
        const { body } = req;
        const response = await server.executeOperation({
          query: body.query,
          variables: body.variables,
          operationName: body.operationName,
        });

        res.status(200).json(response);
      } catch (error) {
        console.error('Error executing GraphQL operation:', error);
        res.status(500).json({ errors: [{ message: 'Internal server error' }] });
      }
    });

    httpServer.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}/graphql`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
