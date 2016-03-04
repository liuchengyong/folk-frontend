'use strict';

// Settings configured here will be merged into the final config object.
export default {
  homeData: '/api/v2/home',
  found: '/api/v1/topic/list/keyword?keyword=',
  TopicData: '/api/v1/topic/',
  wechatAPI: {
    config: '/api/wechat/config',
    auth: '/api/wechat/oauth',
    SDK: 'http://res.wx.qq.com/open/js/jweixin-1.0.0.js'
  }
}