import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { compareDesc } from 'date-fns';
import {
  Alert,
  Avatar,
  Card,
  Layout,
  Skeleton,
} from 'antd';

const AntContent = Layout.Content;
const { Meta } = Card;

const MESSAGES_QUERY = gql`
  query {
    messages {
      id
      created
      text
      user {
        username
        firstName
        lastName
      }
    }
  }
`;

const renderLoadingIndicator = () => (
  [...Array(10).keys()].map(e => (
    <Card key={e} className="message">
      <Skeleton loading avatar active />
    </Card>
  ))
);

const renderError = () => (
  <Alert
    message="Error"
    description="Something here went really wrong :("
    type="error"
    showIcon
  />
);

const renderMessages = messages => (
  messages
    ? messages
      .sort((a, b) => compareDesc(a.created, b.created))
      .map(message => (
        <Card key={message.id} className="message">
          <Meta
            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            title={`${message.user.firstName} ${message.user.lastName}`}
            description={message.text}
          />
        </Card>
      ))
    : null
);

const Content = () => (
  <Query query={MESSAGES_QUERY}>
    {({ loading, error, data }) => (
      <AntContent className="content">
        { loading && renderLoadingIndicator() }
        { error && renderError() }
        { data && renderMessages(data.messages) }
      </AntContent>
    )}
  </Query>
);


export default Content;
