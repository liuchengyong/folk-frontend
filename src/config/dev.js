'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'dev',  // feel free to remove the appEnv property here
  baseUrl: 'http://123.57.174.208:8080'
};

export default Object.freeze(Object.assign({}, baseConfig, config));