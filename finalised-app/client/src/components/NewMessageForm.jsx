import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import {
  Alert,
  Button,
  Form,
  Input,
} from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

const CREATE_MESSAGE = gql`
  mutation createMessage($text: String!) {
    createMessage(text: $text) {
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

class NewMessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  }

  render = () => {
    const { text } = this.state;
    return (
      <Mutation mutation={CREATE_MESSAGE}>
        {(createMessage, { loading, error }) => (
          <div>
            <Form onSubmit={async (event) => {
              event.preventDefault();
              const { onMessageCreated } = this.props;
              const { data } = await createMessage({ variables: { text } });
              if (data.createMessage.id) {
                this.setState({ text: '' });
                onMessageCreated();
              }
            }}
            >
              <FormItem>
                <TextArea
                  autosize={{ minRows: 2, maxRows: 6 }}
                  id="text"
                  onChange={this.handleInputChange}
                  placeholder="Write your message here"
                  value={text}
                />
              </FormItem>
              <FormItem>
                {(error) && <Alert message="Error saving new message" type="error" />}
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                >
                  Send
                </Button>
              </FormItem>
            </Form>
          </div>
        )}
      </Mutation>
    );
  }
}

NewMessageForm.propTypes = {
  onMessageCreated: PropTypes.func.isRequired,
};

export default NewMessageForm;
