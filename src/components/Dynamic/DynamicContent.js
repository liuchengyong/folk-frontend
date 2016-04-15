/**
*
*
*
*/
import React from 'react';

import {default as Video, Controls, Overlay}  from 'react-html5video/dist/ReactHtml5Video.js';

require('react-html5video/dist/ReactHtml5Video.css');

class DynamicContent extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	isCover: true
	    };
	  }
	hideCover(){
		// this.refs.mode.className = "content-mode";
		this.setState({
			isCover:false
		})
	}



	render(){
		let dynamic = this.props.dynamic;
		let content = dynamic.activityEvent;
		let teacher = dynamic.user;
		// let name = dynamic.param.a
		// console.log(this);

		let sud;
		if(dynamic.likedList.length > 0){
			sud = <div className = "dynamic-support-detail">
					{dynamic.likedList.map((result,i) => {
							return <img key={i} src= {result.avatar} />;
						})}
				</div>;
		}
		let contentMsg;
		if(content.type == 'VIDEO'){
			contentMsg =<div className = {'content-mode ' + (this.state.isCover ? 'show':'')} onClick={this.hideCover.bind(this)} >
							<Video controls>
		                        <source src={content.url} type="video/mp4" />
		                        <img className="imgCover" src={content.previewUrl} />
		                        <Overlay />
		                        <Controls />
		                    </Video>
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