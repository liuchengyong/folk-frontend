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
import Delete from '../Common/Delete';

import CollegeContainerComponent from './CollegeComponent';
import CollegeTopicComponent from './CollegeTopicComponent';

import WechatWrapper from '../WechatWrapper';

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
        <Helmet title={"大学信息"} />
        <TopBanner dialog={dialog} actions={actions}/>
        <CollegeContainerComponent college={college} actions={actions} dialog={dialog} />
        {topics}
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
    // if (!nextProps.loadedConfig && !nextProps.dynamic.isFetching) {
    //     let dynamic = nextProps.dynamic.activityEvent,
    //         user = nextProps.dynamic.user;
    //     let shareTitles = (['【指点】噢～我鲜为人知的一面被你发现了','【指点】对于一个人了解全面些比较好，你也一样','【指点】经历的更多，人生才会充满欢笑'])[Math.floor(Math.random()*3)];

    //     // console.log(shareTitles);
    //     let desc = nextProps.dynamic.activityEvent ? decodeURIComponent(dynamic.title || dynamic.description) : "动态已被删除";
    //     nextProps.configWechatSharing({
    //         title: shareTitles,
    //         desc:  desc,
    //         link: `${config.baseUrl}/dynamic/` + this.props.params.id,
    //         imgUrl: user.avatar
    //     });
    // }
  }

  componentDidMount() {
      DeviceAdapter.setFrontSize();
      this.props.actions.fetchCollegeData(this.props.params.id);
  }
}

CollegeComponent.defaultProps = {};

export default WechatWrapper(CollegeComponent);