/**
 * Created by HuangGuorui on 2/24/16.
 */
import React from 'react';
import config from 'config';

class Banner extends React.Component {
  render() {

  	let url = config.baseUrl;
  	let articleList = this.props;

  	if(articleList.type == 'EXPERT') {
  		url += '/expert/';
  	} else if(articleList.type == 'TOPIC') {
  		url += '/topic/';
  	} else {
  		url += '/artic/';
  	}

    return (
      <div className="banner">
        <img className="cover" src={articleList.cover}  alt={articleList.title} />
        <a className="desc" href={articleList.entity && (url + articleList.entity.entityId) }>{this.props.title}</a>
        <hr/>
      </div>
    );
  }
}

export default Banner;