import React from 'react';
import PropTypes from 'prop-types';
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

const MESSAGES_SUBSCRIPTION = gql`
  subscription messageCreated {
    messageCreated {
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

class Content extends React.Component {
  componentDidMount() {
    const { subscribeToNewMessages } = this.props;
    subscribeToNewMessages();
  }

  render = () => {
    const { loading, error, data } = this.props;
    return (
      <AntContent className="content">
        { loading && renderLoadingIndicator() }
        { error && renderError() }
        { data && renderMessages(data.messages) }
      </AntContent>
    );
  };
}

Content.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.bool,
  data: PropTypes.object, // eslint-disable-line
  subscribeToNewMessages: PropTypes.func.isRequired,
};

Content.defaultProps = {
  loading: false,
  error: false,
};

const ContentWithData = () => (
  <Query
    query={MESSAGES_QUERY}
  >
    {({ subscribeToMore, ...result }) => (
      <Content
        {...result}
        subscribeToNewMessages={() => subscribeToMore({
          document: MESSAGES_SUBSCRIPTION,
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
              const newMessage = subscriptionData.data.messageCreated;
              return { messages: [...prev.messages, newMessage] };
           },
        })}
      />
    )}
  </Query>
);

export default ContentWithData;
