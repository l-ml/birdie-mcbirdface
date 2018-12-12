import dataStore from 'nedb-promise';
import path from 'path';

const loginStore = dataStore({
  autoload: true,
  filename: path.resolve(__dirname, './logins.db'),
});

const messageStore = dataStore({
  autoload: true,
  filename: path.resolve(__dirname, './messages.db'),
});

const userStore = dataStore({
  autoload: true,
  filename: path.resolve(__dirname, './users.db'),
});

export {
  loginStore,
  messageStore,
  userStore,
};
