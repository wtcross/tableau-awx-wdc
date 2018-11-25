import React from 'react';
import {
  Row,
  Input,
  Button,
} from 'react-materialize';

import AWX from '../AWX';
import EventDataQueryBuilder from './EventDataQueryBuilder';

export default class AuthConfig extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      templates: [{
        value: 0,
        label: 'Select a job template',
      }],
      eventDataQueries: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addQuery = this.addQuery.bind(this);
  }

  async componentDidMount() {
    const { connector: { connectionData, username, password } } = this.props;
    const { baseURL } = connectionData;
    const { templates } = this.state;

    try {
      const results = await AWX.jobTemplates(baseURL, username, password);
      this.setState({
        templates: templates.concat(results.map(template => (
          { value: template.id, label: template.name }
        ))),
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

  addQuery(query) {
    let { eventDataQueries } = this.state;
    eventDataQueries = eventDataQueries.concat([query]);

    const { connector } = this.props;
    connector.connectionData = { eventDataQueries };

    this.setState({
      eventDataQueries,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (event.target.checkValidity()) {
      const { connector } = this.props;
      const { templateID } = this.state;
      connector.connectionData = { templateID };
      connector.submit();
    }
  }

  render() {
    const {
      templateID,
      templates,
      eventDataQueries,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <Row>
          <h5>Only show job events from jobs run using a specific job template</h5>
          <Input
            s={9}
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
        </Row>
        <Row>
          <h5>
            Add custom columns to the table using a&nbsp;
            <a href="https://github.com/mmckegg/json-query" target="_blank" rel="noopener noreferrer">JSON query</a>
          </h5>
          <h7>
            This makes it possible to add any arbitrary property&nbsp;
            of a job event data object to the table
          </h7>
          <EventDataQueryBuilder queries={eventDataQueries} onAdd={this.addQuery} />
        </Row>
        <Button waves="light">Submit</Button>
      </form>
    );
  }
}
