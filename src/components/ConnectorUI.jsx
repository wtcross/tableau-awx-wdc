import React from 'react';
import { Route } from 'react-router-dom';

import AuthConfig from './AuthConfig';
import DataConfig from './DataConfig';
import awxLogo from '../images/awx.svg';

const ConnectorUI = ({ connector }) => (
  <div className="container">
    <img className="awx-logo" src={awxLogo} alt="AWX Logo" />
    <Route
      exact
      path="/"
      render={() => <AuthConfig connector={connector} />}
    />
    <Route
      path="/data"
      render={() => <DataConfig connector={connector} />}
    />
  </div>
);

export default ConnectorUI;
