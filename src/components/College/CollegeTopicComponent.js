
import React from 'react';
import stringFramet from '../../common/string';

let ic_me_avatar_default = require('../../images/ic_me_avatar_default.png');
class CollegeComponent extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	openMore:false
	    };
	}
	DownApp() {
	    this.props.actions.setDialogStatus(true);
	}
	openMore(){
		this.setState({
			openMore:!this.state.openMore
		});
	}
	render(){
		let topics = this.props.college.topicList,
			topicsDom = null;
		topicsDom = topics.map((topic,i)=>{

        	return (<div key={i} className="topic" onClick={this.DownApp.bind(this)}>
						<div className="topic-header">
							<img className="avtar" src={topic.eAvatar || ic_me_avatar_default } />
							<span className="teacher-name">{topic.eName || topic.eLoginname || '匿名'}</span>
							|
							<span className="teacher-job">{topic.eTitle}</span>
						</div>
						<div className="topic-content">
							<span className="topic-role">{topic.eRole == 'STUDENT' ? '名校' : (topic.eRole == 'TEACHER'?'名师':'家长')}</span>
							<span className="topic-text">{topic.tTitle}</span>
						</div>
						<div className="topic-footer">
							<span>{topic.viewCount+"浏览"}</span>
						</div>
					</div>);
        });


		return (
			<div className="college-topic">
				<div className="topic-title">热门话题</div>
				{topicsDom}
			</div>
			);
	}
}
export default CollegeComponent;