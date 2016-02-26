'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'dist', // feel free to remove the appEnv property here
  apiUrl: 'http://123.57.174.208:8080',
  baseUrl: 'http://wetest.zhid58.com'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
