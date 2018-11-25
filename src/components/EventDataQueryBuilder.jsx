import React from 'react';

import {
  Input,
  Table,
  Button,
} from 'react-materialize';

export default class EventDataQueryBuilder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      query: '',
      role: 'default',
      type: 'string',
    };

    this.handleAdd = this.handleAdd.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleAdd(event) {
    event.preventDefault();
    const { onAdd } = this.props;
    const {
      name,
      role,
      query,
      type,
    } = this.state;

    if (name && role && query && type) {
      this.setState({
        name: '',
        query: '',
        role: 'default',
        type: 'string',
      }, () => onAdd({
        name,
        role,
        query,
        type,
      }));
    }
  }

  handleChange(event) {
    const change = {};
    change[event.target.name] = event.target.value;
    this.setState(change);
  }

  render() {
    const { queries } = this.props;
    const {
      name,
      query,
      role,
      type,
    } = this.state;

    return (
      <Table>
        <thead>
          <tr>
            <th>Column Name</th>
            <th>Column Role</th>
            <th>Column Data Type</th>
            <th>JSON Query</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr className="form-row">
            <td>
              <Input
                name="name"
                placeholder=""
                value={name}
                onChange={this.handleChange}
              />
            </td>
            <td>
              <Input
                name="role"
                type="select"
                value={role}
                onChange={this.handleChange}
              >
                <option value="default">Default</option>
                <option value="measure">Measure</option>
                <option value="dimension">Dimension</option>
              </Input>
            </td>
            <td>
              <Input
                name="type"
                type="select"
                value={type}
                onChange={this.handleChange}
              >
                <option value="string">string</option>
                <option value="bool">bool</option>
                <option value="date">date</option>
                <option value="datetime">datetime</option>
                <option value="float">float</option>
                <option value="geometry">geometry</option>
                <option value="int">int</option>
              </Input>
            </td>
            <td>
              <Input
                name="query"
                placeholder=""
                value={query}
                onChange={this.handleChange}
              />
            </td>
            <td><Button floating className="red" waves="light" icon="add" onClick={this.handleAdd} /></td>
          </tr>
          { queries.length > 0 ? queries.map(q => (
            <tr key={q.name}>
              <td>{q.name}</td>
              <td>{q.role}</td>
              <td>{q.type}</td>
              <td>{q.query}</td>
              <td />
            </tr>
          )) : (
            <tr>
              <td>No Queries Added</td>
              <td />
              <td />
              <td />
              <td />
            </tr>
          ) }
        </tbody>
      </Table>
    );
  }
}
