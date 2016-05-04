import React from 'react';
import ReactSwipe from 'react-swipe';
import stringFramet from '../../common/string';

let bannerDefault = require('../../images/college-banner-default.png'),
	logoDefault = require('../../images/college-logo-default.png');

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
		let college = this.props.college.college,
			collegeTag = null,
			collegeBanner = null,
			introduction = null,
			introductionMore = null,
			keySubjectCount = null,
			collegeTagList = null;

		if(college.keySubjectCount != 0){
			keySubjectCount = (<div className="college-keySubjectCount">重点学科： {college.keySubjectCount}个 </div>);
		}
		let swipeOptions  = {
				startSlide: 0,
				speed: 400,
				auto: 3000,
				continuous: true,
				disableScroll: false,
				stopPropagation: false
			};
		let style = {
            container: {
                overflow: 'hidden',
                visibility: 'hidden',
                position: 'relative'
            },
            wrapper: {
                overflow: 'hidden',
                position: 'relative',
                height:'100%'
            },
            child: {
                float: 'left',
                width: 'auto',
                height:'100%',
                display:'block',
                position: 'relative',
                transitionProperty: 'transform'
            }
        };


        if(college.tags.length > 0){
        	collegeTag = college.tags.map((value,i)=>{
	        	return (<span key={i}>{stringFramet.collegeTagsConversion(value)}</span>);
	        });
        	collegeTagList = (<div className="college-tag-list">{collegeTag}</div>);
        }
        
        collegeBanner = college.images.map((value,i)=>{
        	return (<img key={i} src={value.uri} />);
        });
        if(collegeBanner.length == 0){
        	collegeBanner = (<img src={bannerDefault} />);
        }
        let desc = decodeURIComponent(college.description.replace(/%/g,'%25') || '我们正在接收卧底传回的数据，请期待...').replace(/<[^>]+>/g,'').replace(/\s/g,"");
        if(desc.length < 100){
        	introduction = (<div className="college-introduction-content">{desc}</div>);
        }else{
        	if(this.state.openMore){
				introduction = (<div className="college-introduction-content">{desc}</div>);
        		introductionMore = (<div className="college-introduction-footer" onClick={this.openMore.bind(this)}>
        							收起<span className="arrow up"></span>
								</div>);
        	}else{
        		introduction = (<div className="college-introduction-content">{desc.slice(0,100)+'...'}</div>);
	        	introductionMore = (<div className="college-introduction-footer" onClick={this.openMore.bind(this)}>
	        							更多<span className="arrow down"></span>
									</div>);
        	}
        	
        }
		return (
			<div className="college-container">
				<ReactSwipe className="college-banner" swipeOptions={swipeOptions} style={style} key={5}>
					{collegeBanner }
				</ReactSwipe>
				<div className="college-tag">
					<img className="college-logo" src={college.icon || logoDefault} />
					<div className="college-base">
						<span className="college-name">{decodeURIComponent(college.name)}</span>
						<span className="college-ename">{decodeURIComponent(college.englishName)}</span>
						{collegeTagList}
						<div className="college-type">
							院校类型： {stringFramet.collegeTypeConversion(college.type)}类
						</div>
						{keySubjectCount}
					</div>
				</div>
				<div className="college-introduction">
					<div className="college-introduction-head">
						 学校简介
					</div>
					{introduction}
					{introductionMore}
				</div>
			</div>
			);
	}
}
export default CollegeComponent;