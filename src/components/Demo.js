import React from 'react';
import ReactDOM from 'react-dom';
import {Motion, spring} from 'react-motion';


// const Demo = React.createClass({
class Demo extends React.Component {

	constructor(props, context) {
    super(props, context)
    this.state = {
      open: false
    }
  }

  handleMouseDown() {
    this.setState({open: !this.state.open});
  }

  handleTouchStart(e) {
    e.preventDefault();
    this.handleMouseDown();
  }

  render() {
    return (
      <div>
        <button
          onMouseDown={this.handleMouseDown.bind(this)}
          onTouchStart={this.handleTouchStart.bind(this)}>
          Toggle
        </button>

        <Motion style={{x: spring(this.state.open ? 400 : 0)}}>
          {({x}) =>
            <div className="demo0">
              <div className="demo0-block" style={{
                WebkitTransform: `translate3d(${x}px, 0, 0)`,
                transform: `translate3d(${x}px, 0, 0)`,
              }} />
            </div>
          }
        </Motion>
      </div>
    );
  }
}

export default Demo;