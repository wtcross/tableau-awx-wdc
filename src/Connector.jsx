import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import jsonQuery from 'json-query';

import ConnectorUI from './components/ConnectorUI';
import buildSchema from './schema';
import AWX from './AWX';

export default class Connector {
  constructor(tab) {
    this.tab = tab;
  }

  submit() {
    this.tab.submit();
  }

  set username(username) { this.tab.username = username; }

  get username() { return this.tab.username; }

  set password(password) { this.tab.password = password; }

  get password() { return this.tab.password; }

  set connectionData(data) {
    this.tab.connectionData = JSON.stringify(
      Object.assign(
        this.connectionData,
        data,
      ),
    );
  }

  get connectionData() {
    return JSON.parse(this.tab.connectionData || '{}');
  }

  get inInteractivePhase() { return this.tab.phase === 'interactive'; }

  get inAuthPhase() { return this.tab.phase === 'auth'; }

  get inGatherDataPhase() { return this.tab.phase === 'gatherData'; }

  init(callback) {
    this.tab.authType = 'custom';

    if (this.inInteractivePhase || this.inAuthPhase) {
      const mountNode = document.getElementById('app');
      ReactDOM.render((
        <HashRouter>
          <ConnectorUI connector={this} />
        </HashRouter>
      ), mountNode);
    }

    callback();
  }

  async getSchema(callback) {
    const { eventDataQueries } = this.connectionData;
    const { tables, connections } = buildSchema(eventDataQueries);
    callback(tables, connections);
  }

  async getData(table, callback) {
    const { tableInfo: { id }, appendRows } = table;
    const params = { page_size: 500 };
    const { baseURL, eventDataQueries, templateID } = this.connectionData;

    try {
      if (id === 'jobEvents' && templateID) {
        Object.assign(params, {
          job__job_template: templateID,
        });
      }

      let results = await AWX.resource(id)(
        baseURL,
        this.username,
        this.password,
        params,
        this.tab.reportProgress,
      );


      if (id === 'jobEvents') {
        results = results.map((result) => {
          const changes = {};

          eventDataQueries.forEach((query) => {
            const data = jsonQuery(query.query, { data: result });
            if (data.value) {
              changes[query.name] = data.value;
            }
          });

          return Object.assign(result, changes);
        });
      }

      appendRows(results);
    } catch (error) {
      console.error(error);
    }

    callback();
  }

  shutdown(callback) {
    callback();
  }
}
