import bcrypt from 'bcrypt';
import { format } from 'date-fns';
import uuid from 'uuid/v4';
import {
  loginStore,
  userStore,
} from './datastore';

const resolvers = async () => {
  const saltRounds = 10;
  const logins = await loginStore;
  const users = await userStore;
  return {
  // Queries
    Query: {
      users: async () => users.find({}),
    },
    // Mutations
    Mutation: {
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
  };
};


export default resolvers;
