import React from 'react';
import ReactInterval from 'react-interval';
import config from 'config';
import headers from '../../actions/globalHeader';

require('styles/answer/_answerPayControl.scss');


class AnswerPayControlComponent extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	isPlay:false,
	    	duration:0
	    };
	}
	goPay(){
	    let user = this.props.user;
	    if(user.isFetching){
	        this.props.actions.setDialogStatus(true);
	        return;
	    }
	    this.props.actions.fetchAnswerCommentFrom(this.props.data,{isOpenLoad:true,loadText:'[益答]正在用力请求微信支付'});
	    this.getPayOrder();
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
	    this.fetchOrderConfig(this.props.user,this.props.answer.answer.id,this.props.answer.question)
	    .then(response => response.json())
	    .then(data => {
	      	data = data.param;
	      	this.props.actions.fetchAnswerCommentFrom(this.props.data,{isOpenLoad:false,loadText:'[益答]正在用力请求微信支付'});
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
	              this.fetchPayStatu(this.props.user.openid,this.props.answer.answer.id)
	              .then(response => response.json())
	              .then(() => {
	              	this.props.pageType == 'list' ?
	              	this.props.actions.fetchAnswerData(this.props.answer.answer.questionId)
	              	: this.props.actions.fetchAnswerDetailData(this.props.answer.answer.id,this.props.user.openid);
	              });
	            }
	        });
	    });
	}
	serialize(data) {
      	return Object.keys(data).map(function (keyName) {
          	return encodeURIComponent(keyName) + '=' + encodeURIComponent(data[keyName])
      	}).join('&');
  	}
	changePageState(id){
	    this.props.actions.fetchAnswerPageState({isFetching:true});
	    this.props.actions.fetchAnswerData(id);
  	}

  	audioOpera(type){
  		this.state.duration = this.props.answer.answer.duration
  		if(type == 'click'){
  			if(this.state.isPlay){
	  			this.refs.audioControl.load();
	  		}else{
	  			this.refs.audioControl.play();
	  		}
	  		this.setState({isPlay:!this.state.isPlay});
  		}else if('end'){
  			this.setState({isPlay:false});
  		}else if(type == 'start'){
			this.setState({isPlay:true});
  		}
  	}

	render(){
		let answer = this.props.answer;
		let answerDom = null;
		if(answer.answer.type == 'RICH_TEXT' && answer.answer.description == null){
			answerDom = (<div className="answer-content-control-text" onClick={this.goPay.bind(this)}>
            		<span className="answer-content-control-desc">1元去瞅瞅</span>
            	</div>);
		}else if(answer.answer.type == 'RICH_TEXT' && answer.answer.description != null){
			answerDom =this.props.isShow ? (<div className="answer-content-control-description" dangerouslySetInnerHTML={{__html: answer.answer.description}}></div>)
			: (<div className="answer-content-control-text" onClick={this.changePageState.bind(this,answer.answer.questionId)}>
            		<span className="answer-content-control-desc">查看详情</span>
            	</div>);
		}else if(answer.answer.type == 'AUDIO' && answer.answer.description == null){
			answerDom = (<div className="answer-content-control-audio" onClick={this.goPay.bind(this)}>
            		<span className="answer-content-control-desc">1元去听听</span>
            		<span className='answer-content-control-audio-timer'>{answer.answer.duration+'\'\''}</span>
            	</div>);
		}else if(answer.answer.type == 'AUDIO' && answer.answer.description != null){
			answerDom = (<div className={`answer-content-control-audio ${ this.state.isPlay ? 'answer-content-control-audio-play' : 'answer-content-control-audio-paid'}`} onClick={this.audioOpera.bind(this,'click')}>
            		<span className='answer-content-control-audio-timer'>
            			{(this.state.isPlay ? this.state.duration : answer.answer.duration)+ '\'\''}
            			<ReactInterval timeout={1000} enabled={this.state.isPlay} callback={() => this.setState({duration: this.state.duration - 1})}/>
            		</span>
            		<audio ref="audioControl" src={answer.answer.description} preload="auto" className="answer-detail-audio-controls" onEnded={this.audioOpera.bind(this,'end')}></audio>
            	</div>);
		}
		return answerDom;
	}
}
export default AnswerPayControlComponent;