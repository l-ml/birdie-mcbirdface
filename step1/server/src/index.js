import http from 'http';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import getResolvers from './resolvers';
import { typeDefs } from './schema';
import {
  loginStore,
  userStore,
} from './datastore';


(async () => {
  const PORT = 4000;
  const resolvers = await getResolvers();

  const logins = await loginStore;
  const users = await userStore;


  const server = new ApolloServer({
    // These will be defined for both new or existing servers
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      let login = false;
      let user = false;
      // get the user token from the headers
      const token = (req && req.headers && req.headers.authorization) || false;
      // try to retrieve login with the token
      if (token) login = await logins.findOne({ token });
      if (login) user = await users.findOne({ id: login.userId });
      // optionally block the user
      // we could also check user roles/permissions here
      // if (!user) throw new AuthorizationError('you must be logged in');
      // add the user to the context
      return { user };
    },
  });

  const app = express();

  server.applyMiddleware({ app }); // app is from an existing express app

  const httpServer = http.createServer(app);

  httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
})();
