import React from 'react';
import ReactSwipe from 'react-swipe';
import stringFramet from '../../common/string';

let bannerDefault = require('../../images/college-banner-default.png'),
	logoDefault = require('../../images/college-logo-default.png');

let countryMap = {
	'CHINA':{name:'中国',index:0,icon:'country_china.png'},
	'TW':{name:'中国台湾',index:1,icon:'tw'},
	'HK':{name:'中国香港',index:2,icon:'country_hk.png'},
	'MO':{name:'中国澳门',index:3,icon:'country_mo.png'},
	'US':{name:'美国',index:4,icon:'country_us.png'},
	'GB':{name:'英国',index:5,icon:'country_gb.png'},
	'JP':{name:'日本',index:6,icon:'country_jp.png'},
	'KR':{name:'韩国',index:7,icon:'country_kr.png'},
	'GE':{name:'德国',index:8,icon:'country_ge.png'},
	'FR':{name:'法国',index:9,icon:'country_fr.png'},
	'AU':{name:'澳大利亚',index:10,icon:'country_au.png'},
	'RU':{name:'俄罗斯',index:11,icon:'country_ru.png'},
	'CA':{name:'加拿大',index:12,icon:'country_ca.png'},
	'SG':{name:'新加坡',index:13,icon:'country_sg.png'},
	'CH':{name:'瑞士',index:14,icon:'country_ch.png'},
	'IE':{name:'爱尔兰',index:15,icon:'country_ie.png'},
	'SE':{name:'瑞典',index:16,icon:'country_se.png'},
	'AT':{name:'奥地利',index:17,icon:'country_at.png'},
	'NL':{name:'荷兰',index:18,icon:'country_nl.png'},
	'FI':{name:'芬兰',index:19,icon:'country_fi.png'},
	'BE':{name:'比利时',index:20,icon:'country_be.png'},
	'IT':{name:'意大利',index:21,icon:'country_it.png'},
	'ES':{name:'西班牙',index:22,icon:'country_es.png'},
	'PT':{name:'葡萄牙',index:23,icon:'country_pt.png'},
	'DK':{name:'丹麦',index:24,icon:'country_dk.png'},
	'NO':{name:'挪威',index:25,icon:'country_no.png'},
	'IS':{name:'冰岛',index:26,icon:'country_is.png'},
	'NZ':{name:'新西兰',index:27,icon:'country_nz.png'},
	'OTHER':{name:'其他',index:28,icon:'country_unknow.png'}
	};

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
			collegeTagList = null,
			countryDom = null,
			collegeTypeDom = null;

		collegeTypeDom = (<div className="college-type">
							院校类型： {stringFramet.collegeTypeConversion(college.type)}类
						</div>);
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
        let desc = '我们正在接收卧底传回的数据，请期待...';
        if(college.description){
        	desc = college.description.replace(/<[^>]+>/g,'').replace(/\s/g,'');
        	let span = document.createElement('span');
        	span.innerHTML = desc;
        	desc = (typeof span.textContent == 'string') ? span.textContent : span.innerText;
        }

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
        let countryBase = null;
    	try{
    		countryBase = countryMap[college.country];
    	}catch(e){
			countryBase = null;
    	}
        if(college.country != 'CHINA' && countryBase){
        	let countryLogo = require('../../images/countryIcon/'+countryBase.icon);
        	countryDom = (<div className="college-country">
        					<img className="country-logo" src={countryLogo} />
        					<span className="country-name">{countryBase.name}</span>
        				</div>);
        	collegeTypeDom = null;
        	keySubjectCount = null;
        }


		return (
			<div className="college-container">
				<ReactSwipe className="college-banner" swipeOptions={swipeOptions} style={style} key={5}>
					{collegeBanner}
				</ReactSwipe>
				<div className="college-tag">
					<img className="college-logo" src={college.icon || logoDefault} />
					<div className="college-base">
						{countryDom}
						<span className="college-name">{decodeURIComponent(college.name || '')}</span>
						<span className="college-ename">{decodeURIComponent(college.englishName || '')}</span>
						{collegeTagList}
						{collegeTypeDom}
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