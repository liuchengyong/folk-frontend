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
        college.description = "<p></p> <p>%25天津师范大学是天津市属重点院校，始建于1958年，原名天津师范学院，1982年更名为天津师范大学。1999年4月，原天津师范大学、天津师范高等专科学校、天津教育学院合并组建新天津师范大学。</p> <p>　　学校占地面积3519.88亩（2346596平方米）、建筑面积854207平方米。2005年9月，坐落于西青区的天津师范大学新校区正式启用，办学环境得到根本性改善，为学校发展奠定了坚实的基础。</p> <p>　　学校现有24个学院，61个本科专业，涉及文学、理学、教育学、历史学、法学、经济学、管理学、工学、艺术学等9个学科门类。学校现有2个国家重点学科，10个天津市重点学科，4个天津市“重中之重”学科，6个教育部特色专业建设点，16个天津市品牌专业建设点，5个天津市战略性新兴产业相关专业建设点。5个省部级设置的研究（院、中心）、实验室。有6个一级学科博士学位授权点，28个一级学科硕士学位授权点，11个专业硕士学位授权点，5个博士后科研流动站。学校已建成6门国家级精品课程、25门市级精品课程，1支国家级教学团队，2支市级教学团队。在2007年教育部本科教学工作水平评估工作中获优秀。</p> <p>　　学校现有教育部人文社会科学重点研究基地、全国多媒体技术开发与培训基地、全国大学生文化素质教育基地、国家教育部中小学骨干教师培训基地、天津市教委人文社会科学重点研究基地、天津市思想政治教育队伍专职人员培养基地。建有1个国家级实验教学示范中心建设单位，6个天津市高等学校优秀教学实验室。</p> <p>　　学校定期出版《天津师范大学学报》（社会科学版）、《天津师范大学学报》（自然科学版）、《天津师范大学学报》（基础教育版）、《心理与行为研究》、《青少年科技博览》、《少年心世界》、《数学教育学报》、《中等数学》和《政治思想史》9种期刊。</p> <p>　　全日制在校生28545人，其中本科生23862人、博士研究生266人、硕士研究生3003人、港澳台学生106人；各类留学生2780人。</p> <p>　　教职工2361人，其中专任教师1409人，拥有正高级职称257人，副高级职称394人，具有博士学位教师519人。</p> <p>　　学校始终坚持开放办学，与27个国家和地区的109所大学建立了友好协作与交流关系，并分别在肯尼亚和泰国建立了内罗毕大学孔子学院和曼松德？昭帕亚皇家师范大学孔子学院。与韩国世翰（大佛）大学合作举办教育行政学硕士学位教育项目和情报学信息分析与决策方向硕士学位教育项目，与日本国立三重大学合作举办日语专业本科教育项目。与9所国际知名大</p> <p>　　学正式签订了合作协议，开展本科、硕士层次的学分互认互换、学位互授联授工作。学校是国家具有接收中国政府奖学金外国留学生资格的高等院校，教育部首批免试招收香港学生和接收推免澳门学生试点学校，同时还是中国留学服务中心出国留学培训基地和天津法语联盟的落户单位。</p> <p>　　学校先后荣获全国五一劳动奖状、全国精神文明建设工作先进单位、全国先进基层党组织、全国内部审计先进集体等荣誉称号。</p> <p>　　学校践行“勤奋严谨，自树树人”的校训，确立为基础教育服务、为经济和社会发展服务的办学方向，遵循“以生为本”的办学理念，按照“厚基础、宽口径、高素质、一专多能的复合型人才”的育人标准，正在向人才培养高质量、科研成果高水平、学科建设高标准、学校管理高效率的目标奋进，建成国内一流的教师教育特色的教学研究型综合性大学。</p> <p>　　（数据统计截止时间为2012年11月15日）</p> <p></p>";
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