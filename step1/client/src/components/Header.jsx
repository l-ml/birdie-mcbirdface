import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Col,
  Layout,
  Row,
} from 'antd';
import logo from '../assets/logo.svg';

const AntHeader = Layout.Header;

const Header = (props) => {
  const { handleOpenNewMessageDialog, handleOpenUserModal } = props;

  return (
    <AntHeader className="header">
      <Row>
        <Col span={16}>
          <img src={logo} className="logo" alt="logo" />
          Birdie McBirdface
        </Col>
        <Col span={8} className="menu">
          <Button
            icon="message"
            onClick={handleOpenNewMessageDialog}
            shape="circle"
            type="primary"
          />
          <Button
            icon="user"
            onClick={handleOpenUserModal}
            shape="circle"
            type="primary"
          />
        </Col>
      </Row>
    </AntHeader>
  );
};

Header.propTypes = {
  handleOpenNewMessageDialog: PropTypes.func.isRequired,
  handleOpenUserModal: PropTypes.func.isRequired,
};

export default Header;
