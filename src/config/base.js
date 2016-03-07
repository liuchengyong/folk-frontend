'use strict';

// Settings configured here will be merged into the final config object.
export default {
  homeData: '/api/v2/home',
  found: '/api/v1/topic/list/keyword?keyword=',
  TopicData: '/api/v1/topic/',
  wechatAPI: {
    config: '/api/wechat/config',
    auth: '/api/wechat/oauth',
    coupon: '/api/wechat/coupon',
    SDK: 'http://res.wx.qq.com/open/js/jweixin-1.0.0.js'
  },
  words: [
    '收好红包去找导师啦~~~',
    '钱包君做梦也会偷着笑',
    '土豪，我们做朋友吧~',
    '导师，我来了，带我飞吧~~~',
    '红包领得好，知识不会少~',
    '换个姿势，再来一次~~~',
    '棒棒哒,拿券抵导师费,赚到啦~'
  ],
  couponStatus: {
    PLACED: '这是你已经领过的红包了哦~',
    USED: '红包已经使用~',
    EXPIRED: '红包已经过期~',
    DEFAULT: '赶快领取属于你的优惠大礼包~'
  }
}