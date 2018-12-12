import { gql } from 'apollo-server-express';

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.
  type Login {
    token: String!
    created: String!
    user: User!
  }

  type User {
    id: String!
    created: String!
    firstName: String!
    lastName: String!
    username: String!
    password: String!
  }

  type Message {
    id: String!
    created: String!
    text: String!
    user: User!
  }

  type Query {
    users: [User]
    messages: [Message]
  }

  type Mutation {
    createMessage(text:String!): Message
    createUser(
      firstName: String!,
      lastName: String!,
      username: String!,
      password: String!
    ): User
    login(username: String!, password: String!): Login
  }

  type Subscription {
    messageCreated: Message!
  }
`;

export {
  typeDefs, // eslint-disable-line
};
