import React from 'react';

export default class Alert extends React.Component {
  constructor(props) {
    super(props);
    const { message = false } = props;
    this.state = { message };
  }

  componentWillReceiveProps({ message }) {
    this.setState({
      message,
    });
  }

  render(props, { message }) {
    if (message) {
      return (
        <div className="alert alert-danger" role="alert">{message}</div>
      );
    }

    return null;
  }
}
