'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'dev',  // feel free to remove the appEnv property here
  apiUrl: 'http://test.zhid58.com:8080',
  baseUrl: 'http://wetest.zhid58.com',
  wechatServer: 'http://wetest.zhid58.com:3000/'
};

export default Object.freeze(Object.assign({}, baseConfig, config));