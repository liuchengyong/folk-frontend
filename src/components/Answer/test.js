/**
 * wenxin college share
 * @auther liuchengyong
 */
require('normalize.css');
require('styles/_answer.scss');

import React from 'react';
import DeviceAdapter from '../../common/deviceAdapter';
import Loading from '../Common/Loading';
import RequestLoading from '../Common/RequestLoading';
import Helmet from 'react-helmet';
import config from 'config';
import TopBanner from '../Common/TopBanner';

import QuestionComponent from './Question';
import CommentsComponent from './Comments';
import CommentFrom from './CommentFrom';

import WechatWrapper from '../WechatWrapper';
import headers from '../../actions/globalHeader';

let logo_icon = require('../../images/icon/logo_icon.png');

class AnswerComponent extends React.Component {

  openCommentFrom(){
    this.props.actions.fetchAnswerCommentFrom(this.props.answer,{isOpenFrom:true});
  }
  DownApp() {
      this.props.actions.setDialogStatus(true);
  }
  goPay(){
    let user = this.props.user;
    if(user.isFetching){
        this.props.actions.setDialogStatus(true);
        return;
    }
    this.getPayOrder();
  }
  serialize(data) {
      return Object.keys(data).map(function (keyName) {
          return encodeURIComponent(keyName) + '=' + encodeURIComponent(data[keyName])
      }).join('&');
  }
  fetchOrderConfig(user,answerId,title){
    var options = {
      openId: user.openid,
      avatar: user.headimgurl,
      loginName: user.nickname,
      account: user.unionid || null,
      gender: user.sex === 1  ? 'MALE' : user.sex === 2 ? 'FEMALE' : 'SECRET',
      answerId: answerId,
      subject: title.substring(0,35),
      body: title.substring(0,35),
      price: 100
    };
    //config.apiUrl
    return fetch(config.apiUrl + '/api/v1/fund/order/answer/weixin/h5', {
      method: 'Post',
      headers: headers,
      body:this.serialize(options)
    });
  }

  fetchPayStatu(openId,answerId){
    var options = {
      openId: openId,
      answerId: answerId,
      tradeStatus: 'TRADE_SUCCESS',
      sms:true,
      notification:true,
      debug:false
    };
    return fetch(config.apiUrl + '/api/v1/payment/confirm/paid/h5', {
      method: 'Post',
      headers: headers,
      body:this.serialize(options)
    });
  }

  getPayOrder(){
    this.fetchOrderConfig(this.props.user,this.props.answer.answer.answerId,this.props.answer.answer.question.title)
    .then(response => response.json())
    .then(data => {
      data = data.param;
      WeixinJSBridge.invoke(
         'getBrandWCPayRequest', {
            'appId':data.appid,     //公众号名称，由商户传入
            'timeStamp':data.myTimestamp,         //时间戳，自1970年以来的秒数
            'nonceStr':data.myNoncestr,//随机串
            'package':'prepay_id='+data.prepay_id,
            'signType':'MD5',         //微信签名方式:
            'paySign':data.mySign //微信签名
         },res => {
            if (res.err_msg == 'get_brand_wcpay_request:ok') {
              this.fetchPayStatu(this.props.user.openid,this.props.answer.answer.answerId)
              .then(response => response.json())
              .then(() => {
                this.props.actions.fetchAnswerDetailData(this.props.answer,this.props.user.openid)
              });
            } else if (res.err_msg == 'get_brand_wcpay_request:cancel') {
              
            } else {
              
            }
         });
    });
  }

  render() {
    console.log(this.props);
    let params = this.props.answer,
        user = this.props.user;
    if(params.isFetching) {
        return <Loading />;
    }
    if(!user.isFetching && params.answerDetail == undefined){
      this.props.actions.fetchAnswerDetailData(params,user.openid);
      return <Loading />;
    }
   
    let dialog = this.props.dialog,
        actions = this.props.actions,
        answer = params.answer,
        comments = this.props.answer.comments,
        commentsDom = null,
        answerPayDom = (<div className="answer-pay"><span onClick={this.goPay.bind(this)}>1元去瞅瞅</span></div>);
    
    if(!user.isFetching && params.answerDetail.answer.description != null){
      answerPayDom = (<div className="answer-text" dangerouslySetInnerHTML={{__html: params.answerDetail.answer.description}}></div>)
    }

    if(!user.isFetching) params.answerDetail.answer.description = '<p>我们都江堰的确如此。我的心里都会很久没有理由去掉血沫！？！？</p><img src="http://statics.zhid58.com/4592FDEE-4526-4049-A840-78A01EC69A99"><p>&nbsp;<br>你民工哦，我们的话可以接受的话可以接受的话可以接受的话可以接受的话可以接受的话可以接受的话可以接受的话可以接受的话</p><img src="http://statics.zhid58.com/7F0B7597-CC97-4790-A010-3B5861ED8DBF">';
    if(comments.totalSize > 0){
        commentsDom = (<CommentsComponent actions={actions} comments={comments} isShow={ !user.isFetching && params.answerDetail.answer.description != null}/>);
    }
    return (
      <div className="answer-container">
        <Helmet title={ '指点-' + answer.question.title} />
        <TopBanner dialog={dialog} actions={actions} />
        <QuestionComponent question={answer} />
        <div className="answer">
          <div className="answer-header">
              <img className="answer-person-icon" src={answer.answererAvater} />
              <div className="answer-person">
                <span className="answer-person-name">{answer.answererName}</span>
                <span className="answer-person-paymentTimes">{answer.paymentTimes == 0 ? '' : answer.paymentTimes + '人瞅瞅'}</span>
              </div>
              <span className="answer-person-major">{answer.answererTitle}</span>
          </div>
          {answerPayDom}
        </div>
        { !user.isFetching && params.answerDetail.answer.description != null && comments.totalSize == 0? (<div className="answer-footer" onClick={this.openCommentFrom.bind(this)}>
            看完吐槽一下吧
        </div>) : null}
        {commentsDom}
        {params.isOpenLoad ? (<RequestLoading text={'[指点]努力处理中'}/>): null}
        {params.isOpenFrom ? (<CommentFrom actions={actions} answer={params} user={user}/>):null}
      </div>
    );
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.loadedConfig && !nextProps.answer.isFetching) {
        let answer = nextProps.answer.answer;
        nextProps.configWechatSharing({
            title: `【指点】 你的益答 | ${answer.question.title}`,
            desc: answer.answererName + '|' + answer.answererTitle,
            link: `${config.baseUrl}/answer/` + this.props.params.id,
            imgUrl: answer.answererAvater || logo_icon
        });
    }
  }
  componentDidMount() {
      DeviceAdapter.setFrontSize();
      this.props.actions.fetchAnswerData(this.props.params.id);
  }
}

AnswerComponent.defaultProps = {};

export default WechatWrapper(AnswerComponent);