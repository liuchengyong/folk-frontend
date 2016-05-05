/**
 * wenxin college share
 * @auther liuchengyong
 */
require('normalize.css');
require('styles/_college.scss');

import React from 'react';
import DeviceAdapter from '../../common/deviceAdapter';
import Loading from '../Common/Loading';
import Helmet from 'react-helmet';
import config from 'config';
import TopBanner from '../Common/TopBanner';

import CollegeContainerComponent from './CollegeComponent';
import CollegeTopicComponent from './CollegeTopicComponent';

import WechatWrapper from '../WechatWrapper';

let logo_icon = require('../../images/icon/logo_icon.png');

class CollegeComponent extends React.Component {

  render() {
    
    let college = this.props.college;
    if(college.isFetching) {
        return <Loading />;
    }

    let dialog = this.props.dialog,
        actions = this.props.actions,
        topics = null;
    if(college.topicList.length > 0){
        topics = (<CollegeTopicComponent college={college} actions={actions} dialog={dialog} />);
    }
    return (
      <div className="college">
        <Helmet title={ '指点-'+decodeURIComponent(college.college.name) } />
        <TopBanner dialog={dialog} actions={actions}/>
        <CollegeContainerComponent college={college} actions={actions} dialog={dialog} />
        {topics}
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loadedConfig && !nextProps.college.isFetching) {
        let college = nextProps.college,
            desc = '指点君觉得这所学校棒棒哒~';
        if(college.college.description){
            desc = college.college.description.replace(/<[^>]+>/g,'').replace(/\s/g,'');
            let span = document.createElement('span');
            span.innerHTML = desc;
            desc = (typeof span.textContent == 'string') ? span.textContent : span.innerText;
        }
        nextProps.configWechatSharing({
            title: college.college.name+'和我预想的不一样啊',
            desc:  desc,
            link: `${config.baseUrl}/college/` + this.props.params.id,
            imgUrl: college.college.icon || logo_icon
        });
    }
  }

  componentDidMount() {
      DeviceAdapter.setFrontSize();
      this.props.actions.fetchCollegeData(this.props.params.id);
  }
}

CollegeComponent.defaultProps = {};

export default WechatWrapper(CollegeComponent);