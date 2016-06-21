/**
 * wenxin college share
 * @auther liuchengyong
 */
require('normalize.css');
require('styles/_answer.scss');

import React from 'react';
import DeviceAdapter from '../../common/deviceAdapter';
import Loading from '../Common/Loading';
import Helmet from 'react-helmet';
import config from 'config';
import TopBanner from '../Common/TopBanner';

import QuestionComponent from './Question';
import CommentsComponent from './Comments';

import WechatWrapper from '../WechatWrapper';

let logo_icon = require('../../images/icon/logo_icon.png');

class AnswerComponent extends React.Component {
  DownApp() {
      this.props.actions.setDialogStatus(true);
  }
  render() {

    let params = this.props.answer;
    if(params.isFetching) {
        return <Loading />;
    }
   
    let dialog = this.props.dialog,
        actions = this.props.actions,
        answer = params.answer,
        comments = this.props.answer.comments,
        commentsDom = null;
    if(comments.totalSize > 0){
        commentsDom = (<CommentsComponent actions={actions} comments={comments} />);
    }

    return (
      <div className="answer-container">
        <Helmet title={ '指点-' + answer.question.title} />
        <TopBanner dialog={dialog} actions={actions} />
        <QuestionComponent question={answer} />
        <div className="answer">
          <div className="answer-header">
              <img className="answer-person-icon" src={answer.answererAvater} />
              <span className="answer-person-name">{answer.answererName}</span>
              <span className="answer-person-major">{answer.answererTitle}</span>
          </div>
          <div className="answer-pay">
              <span onClick={this.DownApp.bind(this)}>1元去瞅瞅</span>
          </div>
        </div>
        {commentsDom}
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loadedConfig && !nextProps.answer.isFetching) {
        let answer = nextProps.answer.answer;
        nextProps.configWechatSharing({
            title: `【指点】 你的益答 | ${answer.question.title}`,
            desc:  answer.answererTitle,
            link: `${config.baseUrl}/answer/` + this.props.params.id,
            imgUrl: answer.questionerAvater || logo_icon
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