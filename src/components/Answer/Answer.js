/**
 * wenxin college share
 * @auther liuchengyong
 */
require('normalize.css');
require('styles/answer/_answer.scss')

import React from 'react';
import DeviceAdapter from '../../common/deviceAdapter';
import Loading from '../Common/Loading';
import RequestLoading from '../Common/RequestLoading';
import Helmet from 'react-helmet';
import TopBanner from '../Common/TopBanner';
import config from 'config';

import CommentFrom from './CommentFrom';
import AnswerListComponent from './AnswerList';
import AnswerSelfComponent from './AnswerSelf';
import AnswerDetailComponent from './AnswerDetail';

import WechatWrapper from '../WechatWrapper';

let ic_me_gray = require('../../images/me_gray.png'),
    ic_me_blue = require('../../images/me_blue.png'),
    ic_jingxuan_gray = require('../../images/jingxuan_gray.png'),
    ic_jingxuan_blue = require('../../images/jingxuan_blue.png');

class AnswerComponent extends React.Component {
  changePageState(pageType){
    if(pageType == this.props.answer.pageType) return;
    if(pageType == 'list'){
      this.props.actions.fetchAnswerPageState({isFetching:true});
      this.props.actions.fetchAnswerListData(this.props.user.openid,0,10);
    }else if(pageType == 'me'){
      this.props.user.isFetching ? this.props.actions.setDialogStatus(true) :
      this.props.actions.fetchAnswerPageState({isFetching:false,pageType:'me'});
    }
  }
  render() {
    let params = this.props.answer,
        user = this.props.user;
    if(this.props.isWeixin && !user.isFetching && params.pageType == 'list' && params.answerList == undefined){
      this.props.actions.fetchAnswerListData(this.props.user.openid,0,10);
    }
    if(!this.props.isWeixin && params.pageType == 'list' && params.answerList == undefined){
      this.props.actions.fetchAnswerListData(this.props.user.openid,0,10);
    }

    if(params.isFetching) {
        return <Loading />;
    }
    if(!user.isFetching && params.pageType == 'detail' && params.answerDetail == undefined){
      this.props.actions.fetchAnswerDetailData(params.answer.answerId,user.openid);
      return <Loading />;
    }

    let answerMenus = (<div className="answer-menus">
                <div className="answer-menu answer-menu-jinxuan" onClick={this.changePageState.bind(this,'list')}>
                  <img src={params.pageType == 'list' ? ic_jingxuan_blue : ic_jingxuan_gray}/>
                  <span>精选</span>
                </div>
                <div className="answer-menu answer-menu-me" onClick={this.changePageState.bind(this,'me')}>
                  <img src={ params.pageType == 'me' ||  params.pageType == 'melist' ? ic_me_blue : ic_me_gray}/>
                  <span>我的</span>
                </div>
          </div>);
    return (
      <div className="answer-container">
        <Helmet title={'益答--你的教育专家'} />
        <TopBanner dialog={this.props.dialog} actions={this.props.actions} />
        {params.pageType == 'list' ? (<AnswerListComponent data={this.props.answer} actions={this.props.actions} user={this.props.user}/>) : null}
        {params.pageType == 'melist' ? (<AnswerListComponent data={this.props.answer} actions={this.props.actions} user={this.props.user}/>) : null}
        {params.pageType == 'me' ? (<AnswerSelfComponent user={this.props.user} actions={this.props.actions} />) : null}
        {params.pageType == 'detail' ? (<AnswerDetailComponent user={this.props.user} data={this.props.answer} actions={this.props.actions}/>) : null}
        {answerMenus}
        {params.isOpenLoad ? (<RequestLoading text={params.loadText}/>): null}
        {params.isOpenFrom ? (<CommentFrom actions={this.props.actions} answer={params} user={user}/>):null}
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loadedConfig || (!nextProps.answer.isFetching && this.props.answer.pageType != nextProps.answer.pageType)){
        let wconfig = {};
        if(nextProps.answer.pageType == 'detail'){
          let answer = nextProps.answer;
          wconfig.title = '【指点】 益答' +
            (answer.answerType == 'AUDIO' ? '听听':'瞅瞅') + '|' +
            answer.answer.question.title;
          wconfig.desc = answer.answer.answererName + '|' + answer.answer.answererTitle;
          wconfig.link = `${config.baseUrl}/answer/${answer.answer.question.id}`;
          wconfig.imgUrl = answer.answer.answererAvater || config.shareLogeIcon;
        }else{
          wconfig.title = '【指点】你的益答，我的益答';
          wconfig.desc = '传递真实透明的教育经验';
          wconfig.link = `${config.baseUrl}/answer/list`;
          wconfig.imgUrl = config.shareLogeIcon;
        }
        nextProps.configWechatSharing(wconfig);
    }
  }

  componentDidMount() {
      DeviceAdapter.setFrontSize();
      if(this.props.params.id == 'list'){
        this.props.actions.fetchAnswerPageState({pageType:'list'});
      }else if(this.props.params.id == 'me'){
        this.props.actions.fetchAnswerPageState({isFetching:false,pageType:'me'});
      }else{
        this.props.actions.fetchAnswerData(this.props.params.id);
      }
  }
}

AnswerComponent.defaultProps = {};

export default WechatWrapper(AnswerComponent);