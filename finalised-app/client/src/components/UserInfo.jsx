import React from 'react';
import PropTypes from 'prop-types';

const UserInfo = (props) => {
  const { user } = props;

  return (
    <div>
      <b>Username:</b>
      <br />
      { user.username }
      <br />
      <b>First Name:</b>
      <br />
      { user.firstName }
      <br />
      <b>Last Name:</b>
      <br />
      { user.lastName }
      <br />
    </div>
  );
};

UserInfo.propTypes = {
  user: PropTypes.object.isRequired, // eslint-disable-line
};

export default UserInfo;
