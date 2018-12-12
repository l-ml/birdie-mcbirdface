import React from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Button,
  Form,
  Icon,
  Input,
} from 'antd';

const FormItem = Form.Item;

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
    const { username, password } = this.state;
    return (
      <div>
        <Form>
          <FormItem>
            <Input prefix={<Icon type="user" />} placeholder="Username" size="large" id="username" value={username} onChange={this.handleInputChange} />
          </FormItem>
          <FormItem>
            <Input prefix={<Icon type="lock" />} type="password" size="large" id="password" placeholder="Password" value={password} onChange={this.handleInputChange} />
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
            >
              Log in
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default LoginForm;
