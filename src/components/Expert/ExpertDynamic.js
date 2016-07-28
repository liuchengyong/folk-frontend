/**
 * 导师详情 导师话题
 */
import React from 'react';
import {decodeString,paresHtmlToText} from '../../common/string';
import {formateTime} from '../../common/timeFormate';
import { Link } from 'react-router';



let ic_me_avatar_default = require('../../images/ic_me_avatar_default.png');

class ExpertDynamic extends React.Component {
  DownApp() {
    this.props.actions.setDialogStatus(true);
  }
  render() {
    return (<div className="expert-dynamic-list">
        {this.props.dynamic.results.map(dynamic =>{
            return (<Link className = "expert-dynamic" key={dynamic.activityEvent.id} to={`/dynamic/${dynamic.activityEvent.id}`} >
                {dynamic.activityEvent.type == 'ARTICLE'? (<span className="expert-dynamic-title">{decodeString(dynamic.activityEvent.title)}</span>) : null}
                {dynamic.activityEvent.type == 'VIDEO'? (<div className="expert-dynamic-video"><img src={dynamic.activityEvent.previewUrl}/></div>) : null}
                <div className="expert-dynamic-description">{paresHtmlToText(decodeString(dynamic.activityEvent.description))}</div>
                <span className="expert-dynamic-time">{formateTime(dynamic.activityEvent.timeRecorded)}</span>
                <span className="expert-dynamic-countOfLiked">{dynamic.countOfLiked}</span>
                <span className="expert-dynamic-countOfComment">{dynamic.countOfComment}</span>
                {
                  dynamic.countOfLiked != 0 ? (
                     <div className="expert-dynamic-bottom">
                      {
                        dynamic.likedList.map((liker,index)=>{
                          return index > 7?null : (<img key={liker.id} alt={liker.name} src={liker.avatar || ic_me_avatar_default} />);
                        })
                      }
                      <span className="expert-dynamic-bottom-desc">{dynamic.countOfLiked + '人点赞过'}</span>
                    </div>) : null
                }
              </Link>);
          })
        }
        {
          this.props.dynamic.totalSize > 5 ? (<span className="expert-dynamic-more" onClick={this.DownApp.bind(this)}>查看更多</span>) : null
        }
        {
          this.props.dynamic.totalSize == 0 ? (
            <div className="expert-dynamic-null">
              <span>哎呀～点师好懒还没有发布任何动态</span>
              <span>下次估计就好啦＊^_^＊</span>
              <span>去其他页面看看吧</span>
            </div>) : null
        }
      </div>);
  }
}

export default ExpertDynamic;