import React from 'react';
import { Input } from 'react-materialize';
import AWX from '../AWX';

export default class AuthConfig extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      templates: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const { connector: { connectionData, username, password } } = this.props;
    const { baseURL } = connectionData;

    try {
      const results = await AWX.jobTemplates(baseURL, username, password);
      const templates = results.map(template => (
        { value: template.id, label: template.name }
      ));
      this.setState({
        templates,
      });
    } catch (error) {
      console.warn(error);
    }
  }

  handleChange(event) {
    const change = {};
    change[event.target.name] = event.target.value;
    this.setState(change);
  }

  async handleSubmit(event) {
    event.preventDefault();

    if (event.target.checkValidity()) {
      const { connector } = this.props;
      const { templateID } = this.state;
      connector.connectionData = { templateID };
      connector.submit();
    }
  }

  render() {
    const { templateID, templates } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          s={6}
          id="templateID"
          name="templateID"
          type="select"
          label="Target Job Template"
          onChange={this.handleChange}
          value={templateID}
        >
          { templates.map(t => (
            <option key={t.value} value={t.value}>{t.label}</option>
          )) }
        </Input>
        <button className="waves-effect waves-light btn" type="submit">Submit</button>
      </form>
    );
  }
}
