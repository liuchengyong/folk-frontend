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

let logo_icon = require('../../images/icon/logo_icon.png'),
    ic_me_gray = require('../../images/me_gray.png'),
    ic_me_blue = require('../../images/me_blue.png'),
    ic_jingxuan_gray = require('../../images/jingxuan_gray.png'),
    ic_jingxuan_blue = require('../../images/jingxuan_blue.png');

class AnswerComponent extends React.Component {

  changePageState(pageType){
    if(pageType == this.props.answer.pageType) return;
    if(pageType == 'list'){
      this.props.actions.fetchAnswerPageState({isFetching:true});
      this.props.actions.fetchAnswerListData(this.props.user.openid,0,20);
    }else if(pageType == 'me'){
      this.props.user.isFetching ? this.props.actions.setDialogStatus(true) :
      this.props.actions.fetchAnswerPageState({isFetching:false,pageType:'me'});
    }
  }

  render() {
    console.log(this.props);
    let params = this.props.answer,
        user = this.props.user;
    if(params.isFetching && !user.isFetching && params.pageType == 'list' && params.answerList == undefined){
        this.props.actions.fetchAnswerListData(this.props.user.openid,0,20);
    }
    if(params.isFetching) {
        return <Loading />;
    }
    if(!user.isFetching && params.pageType == 'detail' && params.answerDetail == undefined){
      this.props.actions.fetchAnswerDetailData(params,user.openid);
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
    console.log(nextProps);
    if (!nextProps.loadedConfig && !nextProps.answer.isFetching) {
        console.log(nextProps.answer);                  
        let wconfig = {};
        if(this.props.params.id == 'list' || this.props.params.id == 'me'){
          wconfig.title = '益答-你的教育专家';
          wconfig.desc = '益答-你的教育专家';
          wconfig.link = `${config.baseUrl}/testanswertest/${this.props.params.id}`;
          wconfig.imgUrl = logo_icon;
        }else{
          let answer = nextProps.answer;
          wconfig.title = '【指点】 益答' + 
            (answer.answerType == 'AUDIO' ? '听听':'瞅瞅') + '|' +
            answer.answer.question.title;
          wconfig.desc = answer.answer.answererName + '|' + answer.answer.answererTitle;
          wconfig.link = `${config.baseUrl}/testanswertest/${this.props.params.id}`;
          wconfig.imgUrl = answer.answer.answererAvater || logo_icon;
        }
        nextProps.configWechatSharing(wconfig);
    }
  }

  componentDidMount() {
      DeviceAdapter.setFrontSize();
      if(this.props.params.id == 'list'){
        
      }else if(this.props.params.id == 'me'){
        this.props.actions.fetchAnswerPageState({isFetching:false,pageType:'me'});
      }else{
        this.props.actions.fetchAnswerData(this.props.params.id);
      }  
  }
}

AnswerComponent.defaultProps = {};

export default WechatWrapper(AnswerComponent);