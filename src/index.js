import './styles/main.scss';

import '@babel/polyfill';
import 'jquery';
import 'materialize-css/dist/js/materialize';

import Connector from './Connector';

const connector = new Connector(tableau);
tableau.registerConnector(connector);
