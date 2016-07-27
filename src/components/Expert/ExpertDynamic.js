/**
 * 导师详情 导师话题
 */
import React from 'react';
import {decodeString,paresHtmlToText} from '../../common/string';
import {formateTime} from '../../common/timeFormate';



let ic_me_avatar_default = require('../../images/ic_me_avatar_default.png');

class ExpertDynamic extends React.Component {
  DownApp() {
    this.props.actions.setDialogStatus(true);
  }
  render() {
    return (
      <div className="expert-dynamic-list">
        {this.props.dynamic.results.map((dynamic,index) =>{
            return (
              <div className = "expert-dynamic" key={dynamic.activityEvent.id}>
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
                          return index > 7?null : (<img key={liker.id} alt={liker.name} src={liker.avatar} />);
                        })
                      }
                      <span className="expert-dynamic-bottom-desc">{dynamic.countOfLiked + '人点赞过'}</span>
                    </div>) : null 
                }
              </div>);
          })
        }
      </div>);
  }
}

export default ExpertDynamic;