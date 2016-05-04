/**
*
*
*
*/
import React from 'react';
import DeviceAdapter from '../../common/deviceAdapter';
let img_play = require('../../images/play.png');
let ic_me_avatar_default = require('../../images/ic_me_avatar_default.png');


class DynamicContent extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	isCover: true
	    };
	  }
	playVideo(){
		this.setState({isCover:false});
		this.videoEl.play();
	}
	DownApp() {
	    this.props.actions.setDialogStatus(true);
	}
	render(){
		let dynamic = this.props.dynamic;
		let content = dynamic.activityEvent;
		let teacher = dynamic.user;
		let sud,contentMsg,videoCover,contentTitle;
		if(dynamic.likedList.length > 0){
			sud = <div className = "dynamic-support-detail">
					{dynamic.likedList.map((result,i) => {
							return <img key={i} src= {result.avatar || ic_me_avatar_default} />;
						})}
				</div>;
		}

		
		if(content.type == 'VIDEO'){ //content type is video
			let mobileType = DeviceAdapter.getMobileType();
			if(mobileType.iPhone || mobileType.iPad ){
				contentMsg =<div className = "content-mode">
								<video src={content.url} controls="controls"
								ref={(el)=>{
			                        this.videoEl = el;
			                    }} poster={content.previewUrl}>
									你的微信不支持视频播放
								</video>
							</div>;
			}else{
				if(this.state.isCover){ //first click after status
 					videoCover = <div className="video-cover" onClick={this.playVideo.bind(this)} >
											<img className="imgCover" src={content.previewUrl}/>
											<img className="imgCoverPlay" src={img_play} />
								</div>;
				}
				contentMsg =<div className = "content-mode">
								<video src= {content.url} controls="controls"
								ref={(el) => {
			                        this.videoEl = el;
			                    }}>
									你的微信不支持视频播放
								</video>
								{videoCover}
							</div>;
			}

		}else{  //content type is html
			contentTitle = <div className="content-title">{decodeURIComponent(content.title)}</div>;
		}
		return (<div className="dynamic-content">
				<div className="content-header">
					<img className = "teacher-avter" src = {teacher.avatar} onClick={this.DownApp.bind(this)}/>
					<div className = "teacher-base">
						<span className = "teacher-name">{decodeURIComponent(teacher.name || teacher.loginName || '匿名')}</span>
						<div className = "teacher-tag">
							<span className = "school">{decodeURIComponent(dynamic.expert.title)}</span>
						</div>
					</div>
				</div>
				{contentTitle}
				<div className = "content-text" dangerouslySetInnerHTML={{__html: decodeURIComponent(content.description)}}></div>
				{contentMsg}
				<div className = "content-footer">
					<span className = "dynamic-support" onClick={this.DownApp.bind(this)} >{dynamic.countOfLiked}</span>
					<span className = "dynamic-count">{dynamic.countOfComment}</span>
				</div>
				{sud}
			</div>)
	}
}
export default DynamicContent;