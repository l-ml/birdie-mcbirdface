import React from 'react';
import {
  Button,
  Layout,
  Modal,
  Tabs,
} from 'antd';
import Content from './components/Content';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import NewMessageForm from './components/NewMessageForm';
import SignUpForm from './components/SignUpForm';
import UserInfo from './components/UserInfo';
import './App.css';

const { TabPane } = Tabs;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginDialogOpen: false,
      isNewMessageDialogOpen: false,
      isUserModalOpen: false,
      user: JSON.parse(localStorage.getItem('user')) || {},
    };
  }

  checkLogIn = () => {
    if (!this.isLoggedIn()) {
      this.setState({ isLoginDialogOpen: true });
      return false;
    }

    return true;
  }

  isLoggedIn = () => !!localStorage.getItem('token');

  handleInputChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleOpenNewMessageDialog = () => {
    if (this.checkLogIn()) {
      this.setState({ isNewMessageDialogOpen: true });
    }
  }

  handleOpenUserModal = () => {
    if (this.checkLogIn()) {
      this.setState({ isUserModalOpen: true });
    }
  }

  handleCloseLoginDialog = () => {
    this.setState({ isLoginDialogOpen: false });
  }

  handleCloseNewMessageDialog = () => {
    this.setState({ isNewMessageDialogOpen: false });
  }

  handleCloseUserModal = () => {
    this.setState({ isUserModalOpen: false });
  }

  handleLogin = (user, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.setState({
      isLoginDialogOpen: false,
      user,
    });
  }

  handleLogout = () => {
    this.setState({
      isUserModalOpen: false,
      user: {},
    });
    localStorage.clear();
  }

  renderNewMessageDialog = () => {
    const { isNewMessageDialogOpen } = this.state;

    return (
      <Modal
        title="Post a New Message"
        onCancel={this.handleCloseNewMessageDialog}
        visible={isNewMessageDialogOpen}
        footer={null}
      >
        <NewMessageForm onMessageCreated={this.handleCloseNewMessageDialog} />
      </Modal>
    );
  }

  renderLoginDialog = () => {
    const { isLoginDialogOpen } = this.state;

    return (
      <Modal
        title="Log In / Sign Up"
        onCancel={this.handleCloseLoginDialog}
        visible={isLoginDialogOpen}
        footer={null}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="Log In" key="1">
            <LoginForm handleLogin={this.handleLogin} />
          </TabPane>
          <TabPane tab="Sign Up" key="2">
            <SignUpForm handleSignUp={this.handleCloseLoginDialog} />
          </TabPane>
        </Tabs>
      </Modal>
    );
  }

  renderUserModal = () => {
    const { isUserModalOpen, user } = this.state;
    return (
      <Modal
        title="User Info"
        onCancel={this.handleCloseUserModal}
        visible={isUserModalOpen}
        footer={[
          <Button key="back" onClick={this.handleCloseUserModal}>Close</Button>,
          <Button key="submit" type="danger" onClick={this.handleLogout}>Log Out</Button>,
        ]}
      >
        <UserInfo user={user} />
      </Modal>
    );
  }

  render = () => (
    <div className="App">
      <Layout>
        <Header
          handleOpenNewMessageDialog={this.handleOpenNewMessageDialog}
          handleOpenUserModal={this.handleOpenUserModal}
        />
        <Content />
        { this.renderLoginDialog() }
        { this.renderNewMessageDialog() }
        { this.renderUserModal() }
      </Layout>
    </div>
  );
}

export default App;
