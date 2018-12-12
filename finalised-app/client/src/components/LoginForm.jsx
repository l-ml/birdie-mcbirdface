import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import {
  Alert,
  Button,
  Form,
  Icon,
  Input,
} from 'antd';

const FormItem = Form.Item;

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        firstName
        lastName
        username
      }
    }
  }
`;

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isErrorVisible: false,
      username: '',
      password: '',
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
    });
  }

  render = () => {
    const { isErrorVisible, username, password } = this.state;
    return (
      <Mutation mutation={LOGIN}>
        {(login, { loading, error }) => (
          <div>
            <Form onSubmit={async (event) => {
              event.preventDefault();
              this.handleHideError();

              const { data } = await login({ variables: { username, password } });

              if (!data.login.user) {
                this.handleDisplayError();
                return;
              }

              this.handleResetData();

              const { handleLogin } = this.props;
              handleLogin(data.login.user, data.login.token);
            }}
            >
              <FormItem>
                <Input prefix={<Icon type="user" />} placeholder="Username" size="large" id="username" value={username} onChange={this.handleInputChange} />
              </FormItem>
              <FormItem>
                <Input prefix={<Icon type="lock" />} type="password" size="large" id="password" placeholder="Password" value={password} onChange={this.handleInputChange} />
              </FormItem>
              <FormItem>
                {(error || isErrorVisible) && <Alert message="Incorrect username or password" type="error" />}
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                >
                  Log in
                </Button>
              </FormItem>
            </Form>
          </div>
        )}
      </Mutation>
    );
  }
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default LoginForm;
