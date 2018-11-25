import React from 'react';
import { Row, Input } from 'react-materialize';
import history from '../history';

import AWX from '../AWX';

export default class AuthConfig extends React.Component {
  constructor(props) {
    super(props);

    const {
      connector: {
        connectionData,
        username = '',
        password = '',
      },
    } = this.props;
    const {
      baseURL = '',
    } = connectionData;

    this.state = {
      baseURL,
      username,
      password,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const change = {};
    change[event.target.name] = event.target.value;
    this.setState(change);
  }

  async handleSubmit(event) {
    event.preventDefault();

    const { connector } = this.props;

    if (event.target.checkValidity()) {
      const { baseURL, username, password } = this.state;

      try {
        await AWX.me(baseURL, username, password);
        connector.connectionData = { baseURL };
        connector.username = username;
        connector.password = password;

        if (connector.inInteractivePhase) {
          history.push('/data');
        } else {
          connector.submit();
        }
      } catch (error) {
        console.warn(error.message);
      }
    }
  }

  render() {
    const { connector } = this.props;
    const { baseURL, username, password } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <Row>
          <Input
            s={6}
            id="baseURL"
            name="baseURL"
            type="url"
            placeholder="https://tower.example.com"
            label="AWX API Base URL"
            value={baseURL}
            onChange={this.handleChange}
            disabled={connector.inAuthPhase}
            validate
            required
          />
        </Row>
        <Row>
          <Input
            s={6}
            id="username"
            name="username"
            type="text"
            placeholder="tableau-user"
            label="AWX Username"
            value={username}
            onChange={this.handleChange}
            validate
            required
          />
        </Row>
        <Row>
          <Input
            s={6}
            id="password"
            name="password"
            type="password"
            label="AWX Password"
            value={password}
            onChange={this.handleChange}
            validate
            required
          />
        </Row>
        <button className="waves-effect waves-light btn" type="submit">Submit</button>
      </form>
    );
  }
}
