import http from 'http';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import getResolvers from './resolvers';
import { typeDefs } from './schema';

(async () => {
  const PORT = 4000;
  const resolvers = await getResolvers();

  const server = new ApolloServer({
    // These will be defined for both new or existing servers
    typeDefs,
    resolvers,
  });

  const app = express();

  server.applyMiddleware({ app }); // app is from an existing express app

  const httpServer = http.createServer(app);

  httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
})();
