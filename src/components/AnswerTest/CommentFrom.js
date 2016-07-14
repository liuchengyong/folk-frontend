import React from 'react';

class CommentFrom extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	vaildContentError:false
	    };
  	}

	btn_click(type){
		if(type == 'cancle'){
			this.props.actions.fetchAnswerCommentFrom(this.props.answer,{isOpenFrom:false});
		}else{
			let content = this.refs.content.value.trim();
			if(content == ''){
				this.setState({
					vaildContentError: true
				});
				return;
			}
			let	comment = {
					content: encodeURIComponent(this.refs.content.value.trim()),
					answerId: this.props.answer.answer.answerId
				};
			this.props.actions.fetchAnswerCommentData(this.props.answer.answer,this.props.user.openid,comment);
			this.props.actions.fetchAnswerCommentFrom(this.props.answer,{isOpenFrom:false});
		}
	}

	render(){
		return (
		 <div className="comment-from">
	    	<div className="comment-from-bg"></div>
	    	<div className="comment-from-content">
	    		<div className="comment-from-text-box">
	    			<textarea className="comment-from-text" ref="content" placeholder={this.state.vaildContentError? '评论不能为空。。':'请写下你的内心留白...'}/>
	    		</div>
	    		<div className="comment-from-btn">
	    			<span className="comment-from-btn-cancle" onClick={this.btn_click.bind(this,'cancle')}>取消</span>
	    			<span className="comment-from-btn-ok" onClick={this.btn_click.bind(this,'ok')}>发布</span>
	    		</div>
	    	</div>       
	    </div>);
	}
}

export default CommentFrom;