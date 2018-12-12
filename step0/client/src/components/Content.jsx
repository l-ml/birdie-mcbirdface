import React from 'react';
// import { compareDesc } from 'date-fns';
import {
  // Alert,
  // Avatar,
  Card,
  Layout,
  Skeleton,
} from 'antd';

const AntContent = Layout.Content;
// const { Meta } = Card;

const renderLoadingIndicator = () => (
  [...Array(10).keys()].map(e => (
    <Card key={e} className="message">
      <Skeleton loading avatar active />
    </Card>
  ))
);

// const renderError = () => (
//   <Alert
//     message="Error"
//     description="Something here went really wrong :("
//     type="error"
//     showIcon
//   />
// );

// const renderMessages = messages => (
//   messages
//     ? messages
//       .sort((a, b) => compareDesc(a.created, b.created))
//       .map(message => (
//         <Card key={message.id} className="message">
//           <Meta
//             avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
//             title={`${message.user.firstName} ${message.user.lastName}`}
//             description={message.text}
//           />
//         </Card>
//       ))
//     : null
// );

const Content = () => (
  <AntContent className="content">
    { renderLoadingIndicator() }
  </AntContent>
);

export default Content;
