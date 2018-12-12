import React from 'react';
// import PropTypes from 'prop-types';
import {
  Button,
  Form,
  Input,
} from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

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
      <div>
        <Form>
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
            <Button
              type="primary"
              htmlType="submit"
            >
              Send
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

NewMessageForm.propTypes = {
  // onMessageCreated: PropTypes.func.isRequired,
};

export default NewMessageForm;
