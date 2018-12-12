import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import {
  Alert,
  Button,
  Form,
  Input,
} from 'antd';

const FormItem = Form.Item;

const SIGNUP = gql`
  mutation createUser($username: String!, $password: String!, $firstName: String!, $lastName: String!) {
    createUser(username: $username, password: $password, firstName: $firstName, lastName: $lastName) {
      id
      created
      firstName
      lastName
      username
    }
  }
`;

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isErrorVisible: false,
    };
  }

  handleDisplayError = () => {
    this.setState({ isErrorVisible: true });
  }

  handleHideError = () => {
    this.setState({ isErrorVisible: false });
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleResetData = () => {
    this.setState({
      username: '',
      password: '',
      firstName: '',
      lastName: '',
    });
  }

  render = () => {
    const {
      isErrorVisible,
      username,
      password,
      firstName,
      lastName,
    } = this.state;

    return (
      <Mutation mutation={SIGNUP}>
        {(createUser, { loading, error }) => (
          <div>
            <Form onSubmit={async (event) => {
              event.preventDefault();
              this.handleHideError();

              const { data } = await createUser({
                variables: {
                  username,
                  password,
                  firstName,
                  lastName,
                },
              });

              if (!data.createUser.id) {
                this.handleDisplayError();
                return;
              }
              this.handleResetData();

              const { handleSignUp } = this.props;
              handleSignUp();
            }}
            >
              <FormItem>
                <Input placeholder="First Name" id="firstName" size="large" value={firstName} onChange={this.handleInputChange} />
              </FormItem>
              <FormItem>
                <Input placeholder="Last Name" id="lastName" size="large" value={lastName} onChange={this.handleInputChange} />
              </FormItem>
              <FormItem>
                <Input placeholder="Username" id="username" size="large" value={username} onChange={this.handleInputChange} />
              </FormItem>
              <FormItem>
                <Input placeholder="Password" id="password" size="large" value={password} type="password" onChange={this.handleInputChange} />
              </FormItem>
              <FormItem>
                {(error || isErrorVisible) && <Alert message="Error Signing Up" type="error" />}
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                >
                  Sign Up
                </Button>
              </FormItem>
            </Form>
          </div>
        )}
      </Mutation>
    );
  }
}

SignUpForm.propTypes = {
  handleSignUp: PropTypes.func.isRequired,
};

export default SignUpForm;
