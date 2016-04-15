/**
*
*
*
*/
import React from 'react';

// import {default as Video, Controls, Play, Mute, Seek, Fullscreen, Time, Overlay}  from 'react-html5video/dist/ReactHtml5Video.js';

// require('react-html5video/dist/ReactHtml5Video.css');

class DynamicContent extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	isCover: true
	    };
	  }
	playVideo(){
		console.log("das");
		this.setState({
			isCover:false
		});
		
	}
	playLoad(){ //开始加载
		this.refs.video.pause();
		console.log("playLoad");
	}
	playPause(){ 
		 console.log(this.refs.video);
		this.refs.video.fullscreen();
		console.log("playPause");
	}
	LoadedData(){

		console.log("LoadedData");
	}

	render(){
		let dynamic = this.props.dynamic;
		let content = dynamic.activityEvent;
		let teacher = dynamic.user;
		// let name = dynamic.param.a
		// console.log(this);
// 
		let sud;
		if(dynamic.likedList.length > 0){
			sud = <div className = "dynamic-support-detail">
					{dynamic.likedList.map((result,i) => {
							return <img key={i} src= {result.avatar} />;
						})}
				</div>;
		}
		let contentMsg;
		// if(content.type == 'VIDEO'){
		// 	contentMsg =<div className = {'content-mode ' + (this.state.isCover ? 'show':'')}>
		// 					<Video controls onPlaying={this.playVideo.bind(this)} ref="video" onPause ={this.playPause.bind(this)} onLoadStart={this.playLoad.bind(this)}
		// 					onLoadedData={this.LoadedData.bind(this)}>
		//                         <source src={content.url} type="video/mp4" />
		//                         <img className="imgCover" src={content.previewUrl} />
		//                         <Overlay />
		//                         <Controls>
		// 			                <Play />
		// 			                <Seek />
		// 			                <Time />
		// 			                <Mute />
		// 			             	<Fullscreen />
		// 			            </Controls>
		//                     </Video>
		// 				</div>;
		// }

		if(content.type == 'VIDEO'){
			contentMsg =
						<div className = "content-mode">
							<video src= {content.url} controls="controls">
								你的微信不支持视频播放
							</video>
						</div>;
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