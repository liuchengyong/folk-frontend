/**
 * 发现模块中.名校组件
 * @date    2/26/2016
 * @author  HuangGuorui
 */

require('normalize.css');
require('styles/App.scss');

import React from 'react';
import Loading from './Loading';

class AppComponent extends React.Component {
  render() {

    let results = this.props.school.results;

    if(this.props.school.isFetching) {
      return <Loading />
    }
    return (
      <div className="index">
      <div className="school-item">
        {results.map(list => {
          return <div key={list.topic.id}>{list.topic.title}</div>
        })}
      </div>
      </div>
    );
  }

  componentDidMount() {
    this.props.actions.fetchKeyWordData('名校');
  }
}

AppComponent.defaultProps = {};

export default AppComponent;