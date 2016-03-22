'use strict';

import baseConfig from './base';
Object.assign = require('object-assign');

let config = {
  appEnv: 'dist', // feel free to remove the appEnv property here
  apiUrl: 'http://www.zhid58.com:8080',
  baseUrl: 'http://www.zhid58.com'
};

export default Object.assign({}, baseConfig, config);
