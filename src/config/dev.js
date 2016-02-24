'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'dev',  // feel free to remove the appEnv property here
  baseUrl: 'http://test.zhid58.com:8080'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
