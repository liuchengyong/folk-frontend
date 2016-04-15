/**
*
*
*
*/
import React from 'react';
import DeviceAdapter from '../../common/deviceAdapter';
// import {default as Video, Controls, Play, Mute, Seek, Fullscreen, Time, Overlay}  from 'react-html5video/dist/ReactHtml5Video.js';

// require('react-html5video/dist/ReactHtml5Video.css');
let img_play = require('../../images/play.png');


class DynamicContent extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	isCover: true
	    };
	  }
	playVideo(){
		console.log(this.refs.video);
		this.setState({
			isCover:false
		});
		this.videoEl.play();
	}
	render(){
		let dynamic = this.props.dynamic;
		let content = dynamic.activityEvent;
		let teacher = dynamic.user;
		// let name = dynamic.param.a
		//console.log(this);
// 	
		let sud,contentMsg,videoCover;
		if(dynamic.likedList.length > 0){
			sud = <div className = "dynamic-support-detail">
					{dynamic.likedList.map((result,i) => {
							return <img key={i} src= {result.avatar} />;
						})}
				</div>;
		}

		
		if(content.type == 'VIDEO'){
			let mobileType = DeviceAdapter.getMobileType();
			if(mobileType.iPhone || mobileType.iPad ){
				contentMsg =<div className = "content-mode">
								<video src= {content.url} controls="controls" 
								ref={(el) => {
			                        this.videoEl = el;
			                    }} poster={content.previewUrl}>
									你的微信不支持视频播放
								</video>		
							</div>;
			}else{
				if(this.state.isCover){
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

			
		}
		return (<div className="dynamic-content">
				<div className="content-header">
					<img className = "teacher-avter" src = {teacher.avatar}/>
					<div className = "teacher-base">
						<span className = "teacher-name">{decodeURI(teacher.loginName || teacher.name)}</span>
						<div className = "teacher-tag">
							<span className = "school">{dynamic.expert.title}</span>
						</div>
					</div>
				</div>
				<div className = "content-text">{content.description}</div>
				{contentMsg}
				<div className = "content-footer">
					<span className = "dynamic-support">{dynamic.countOfLiked}</span>
					<span className = "dynamic-count">{dynamic.countOfComment}</span>
				</div>
				{sud}
			</div>)
	}
}
export default DynamicContent;