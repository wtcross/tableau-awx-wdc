import Axios from 'axios';
import Url from 'url-parse';
import Mitt from 'mitt';
import QueryString from 'query-string';

export default class AWX {
  constructor(baseURL, username, password) {
    const url = new Url(baseURL.replace(/^(?!https?:\/\/)/, 'https://'));

    this.axios = Axios.create({
      baseURL: `${url.protocol}//${url.host}`,
      auth: {
        username,
        password,
      },
    });

    this.emitter = Mitt();
  }

  on(event, handler) {
    this.emitter.on(event, handler);
    return this;
  }

  async get(url, params = {}, results = []) {
    try {
      const {
        data: {
          results: _results,
          next,
          count,
        },
      } = await this.axios.get(url, { params });

      if (_results.length > 0) {
        results.push(..._results);
      }

      if (next) {
        if (params.page_size) {
          const page = params.page || 1;
          const processed = page * params.page_size;
          this.emitter.emit('row progress', `${processed} / ${count} rows extracted`);
        }

        const nextURL = new Url(next);
        const nextParams = Object.assign(
          params,
          QueryString.parse(nextURL.query),
        );

        return await this.get(url, nextParams, results);
      }
    } catch (error) {
      if (!error.response) {
        throw new Error('Invalid Base URL');
      }

      if (error.response.status === 401) {
        error.message = 'Invalid Credentials';
      }

      throw error;
    }

    return results;
  }

  async me(params = {}) {
    try {
      return await this.get('/api/v2/me/', params);
    } catch (error) {
      throw error;
    }
  }

  async jobs(params = {}, rowProgressHandler = null) {
    return this
      .on('row progress', rowProgressHandler)
      .get('/api/v2/jobs/', params);
  }

  async jobEvents(params = {}, rowProgressHandler = null) {
    return this
      .on('row progress', rowProgressHandler)
      .get('/api/v2/job_events/', params);
  }

  async jobTemplates(params = {}) {
    return this
      .get('/api/v2/job_templates/', params);
  }

  static async me(baseURL, username, password, params = {}) {
    const client = new AWX(baseURL, username, password);
    return client.me(params);
  }

  static async jobs(baseURL, username, password, params = {}, rowProgressHandler = null) {
    const client = new AWX(baseURL, username, password);
    return client.jobs(params, rowProgressHandler);
  }

  static async jobEvents(baseURL, username, password, params = {}, rowProgressHandler = null) {
    const client = new AWX(baseURL, username, password);
    return client.jobEvents(params, rowProgressHandler);
  }

  static async jobTemplates(baseURL, username, password, params = {}) {
    const client = new AWX(baseURL, username, password);
    return client.jobTemplates(params);
  }

  static resource(name) {
    const resources = {
      me: AWX.me,
      jobs: AWX.jobs,
      jobEvents: AWX.jobEvents,
    };

    return resources[name];
  }
}
