'use strict';

// Settings configured here will be merged into the final config object.
export default {
  homeData: '/api/v2/home',
  found: '/api/v1/topic/list/keyword?keyword=',
  TopicData: '/api/v1/topic/',
  BrokeData: '/api/v1/headline/list/descendant?commentId=',
  ExpertData: '/api/v1/expert/',
  Consultation: '/api/v1/article/',
  couponIcon: 'http://statics.zhid58.com/img/share_hongbao.jpg',
  couponId: '09E572B6-CE9A-4D85-A63E-1ED6F2465BA2',
  wechatAPI: {
    config: '/api/wechat/config',
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
  },
  roles: {
    'STUDENT': '学生',
    'TEACHER': '名师',
    'PARENTS': '家长'
  }
}