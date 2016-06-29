'use strict';

// Settings configured here will be merged into the final config object.
export default {
  homeData: '/api/v2/home',
  found: '/api/v1/topic/list/keyword?keyword=',
  TopicData: '/api/v1/topic/',
  BrokeData: '/api/v1/headline/list/descendant?commentId=',
  ExpertData: '/api/v2/expert/',
  Consultation: '/api/v1/article/',
  Captch: '/api/v1/captcha/register',
  RegisterByMobile: '/api/v1/user/register',
  RegisterByEmail: '/api/v1/user/register/email',
  LoginByMobile: '/api/v1/user/login',
  LoginByEmail: '/api/v1/user/login/email',
  couponIcon: 'http://statics.zhid58.com/img/share_hongbao.jpg',
  couponId: '09E572B6-CE9A-4D85-A63E-1ED6F2465BA2',
  fetchCollegeByCountry: '/api/v1/college/listByCountry?country=',
  UploadToken: '/api/v1/upload/token',
  verifyExpert: '/api/v1/verify/expert',
  applyExpert: '/api/v2/expert',
  ActiveData: '/api/v1/article/',
  wechatAPI: {
    config: '/api/wechat/config',
    coupon: '/api/wechat/coupon',
    base:'/api/wechat/base',
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
  eduLevelMap: {
    'UNDERGRADUATE': '本科',
    'MASTER': '硕士',
    'PHD': '博士',
    'DOCTOR': '博士后'
  },
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
  },
  //国家区号
  countryCode: [
    {value: 'key,AU,code,+61', label: '澳大利亚'},
    {value: 'key,GE,code,+49', label: '德国'},
    {value: 'key,RU,code,+7', label: '俄罗斯'},
    {value: 'key,FR,code,+33', label: '法国'},
    {value: 'key,CA,code,+1', label: '加拿大'},
    {value: 'key,KR,code,+82', label: '韩国'},
    {value: 'key,US,code,+1', label: '美国'},
    {value: 'key,MY,code,+60', label: '马来西亚'},
    {value: 'key,TH,code,+66', label: '泰国'},
    {value: 'key,TW,code,+88', label: '中国台湾'},
    {value: 'key,SG,code,+65', label: '新加坡'},
    {value: 'key,JP,code,+81', label: '日本'},
    {value: 'key,IN,code,+91', label: '印度'},
    {value: 'key,GB,code,+44', label: '英国'},
    {value: 'key,CN,code,+86', label: '中国'},
    {value: 'key,MO,code,+85', label: '中国澳门特别行政区'},
    {value: 'key,HK,code,+85', label: '中国香港特别行政区'},
    {value: 'key,CH,code,+41', label: '瑞士'},
    {value: 'key,IE,code,+35', label: '爱尔兰'},
    {value: 'key,SE,code,+46', label: '瑞典'},
    {value: 'key,AT,code,+43', label: '奥地利'},
    {value: 'key,NL,code,+31', label: '荷兰'},
    {value: 'key,FI,code,+35', label: '芬兰'},
    {value: 'key,BE,code,+32', label: '比利时'},
    {value: 'key,DE,code,+49', label: '德国'},
    {value: 'key,IT,code,+39', label: '意大利'},
    {value: 'key,ES,code,+34', label: '西班牙'},
    {value: 'key,PT,code,+35', label: '葡萄牙'},
    {value: 'key,DK,code,+45', label: '丹麦'},
    {value: 'key,NO,code,+47', label: '挪威'},
    {value: 'key,IS,code,+35', label: '冰岛'},
    {value: 'key,NZ,code,+64', label: '新西兰'}
  ]

}