import bcrypt from 'bcrypt';
import { format } from 'date-fns';
import uuid from 'uuid/v4';
import { PubSub } from 'apollo-server-express';
import {
  loginStore,
  messageStore,
  userStore,
} from './datastore';

const resolvers = async () => {
  const pubsub = new PubSub();
  const saltRounds = 10;
  const logins = await loginStore;
  const users = await userStore;
  const messages = await messageStore;

  return {
    // Queries
    Query: {
      users: async () => users.find({}),
      messages: async () => {
        const messageStubs = await messages.find({});
        return messageStubs.map(async message => ({
          ...message,
          user: await users.findOne({ id: message.userId }),
        }));
      },
    },
    // Mutations
    Mutation: {
      createMessage: async (root, { text }, context) => {
        try {
          const message = {
            id: uuid(),
            created: format(new Date()),
            text,
          };
          await messages.insert({ ...message, userId: context.user.id });
          const messageWithUser = {
            ...message,
            user: context.user,
          };
          pubsub.publish('MESSAGE_CREATED', { messageCreated: messageWithUser });
          return messageWithUser;
        } catch (error) {
          console.log(`Error creating message: ${error}`);
          return false;
        }
      },
      createUser: async (root, {
        firstName,
        lastName,
        username,
        password,
      }) => {
        try {
          const user = {
            id: uuid(),
            created: format(new Date()),
            firstName,
            lastName,
            username,
            password: await bcrypt.hash(password, saltRounds),
          };
          await users.insert(user);

          return user;
        } catch (error) {
          console.log(`Error creating user: ${error}`);
          return false;
        }
      },
      login: async (root, { username, password }) => {
        try {
          const user = await users.findOne({ username });
          if (!user) throw new Error('User not found!');

          if (!await bcrypt.compare(password, user.password)) throw new Error('Wrong password!');

          const token = uuid();
          const login = {
            token,
            userId: user.id,
            created: format(new Date()),
          };

          await logins.insert(login);

          return {
            token,
            user,
          };
        } catch (error) {
          console.log(`Error logging in: ${error}`);
          return false;
        }
      },
    },
    Subscription: {
      messageCreated: {
        subscribe: () => pubsub.asyncIterator(['MESSAGE_CREATED']),
      },
    },
  };
};


export default resolvers;
