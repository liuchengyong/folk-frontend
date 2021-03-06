'use strict';
import baseConfig from './base';
Object.assign = require('object-assign');

let config = {
  appEnv: 'dev',  // feel free to remove the appEnv property here
  apiUrl: 'http://test.zhid58.com:8080',
  baseUrl: 'http://wetest.zhid58.com'
};

export default Object.assign({}, baseConfig, config);