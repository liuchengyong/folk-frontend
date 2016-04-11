/**
 * 基础信息
 * Created by HuangGuorui on 3/29/16.
 */
import React from 'react';
import lodashArray from 'lodash/array';

import Qiniu from 'react-qiniu';

class UpImage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        files: [],
        preItem: [], //有效证件
        avatarPreItem: [], //头像信息
        token: this.props.token,
        prefix: 'YOUR_QINIU_KEY_PREFIX' // Optional
    };
    this.idImgUrl = [];
    this.bool = false;
  }

  onUpload(files) {
    var self = this;
    files.map(function (f) {
        f.onprogress = function() {
        };
    });
  }

  onDrop(files) {
    this.setState({
        files: files
    });
    files.map(file => {
      file.uploadPromise.then((data) => {
        this.idImgUrl.push(JSON.parse(data.text));
      });
    });
  }

  deleteImg(i) {
    this.bool = true;
    this.setState({
      preItem: lodashArray.without(this.state.preItem, this.state.preItem[i])
    });
    this.idImgUrl.splice(i, 1);
  }

  showFiles () {
    if (this.state.files.length <= 0) {
      return '';
    }

    if(this.state.preItem.length >= 1) {
      // console.log('只能上传一张图片');
      return false;
    }

    var files = this.state.files;
    var self = this;

    if(this.bool) {
      this.state.files = [];
      this.bool = false;
      return false;
    }
    this.state.preItem.push([].map.call(files, function (f, i) {
      var i = self.state.preItem.length || i;
        var preview = '';
        if (/image/.test(f.type)) {
            preview = <div className="pre-view">
                        <img  src={f.preview} key={i}/>
                      </div>;
        }
        return <li onClick={self.deleteImg.bind(self, i)}  className="perview-item" key={i}><div className="mask-pre">点击删除</div>{preview} </li>;
    }));
  }

  render() {
    this.showFiles();
    return (
        <div className="form-group frm-wrap avatar-frm">
            <div className="avatar-pre-wrap">
              <ul>
                {this.state.preItem.map((img) => {
                  return img;
                })}
              </ul>
            </div>
          <label  className="frm-label ">{this.props.desc.title}</label>
          <div className="frm-ipt-box avatar-up">
            <div className="upload-pic-wrapper">
              <div className="upload-pic-title">
                {this.props.desc.header}
              </div>
              <div className="upload-pic-content" id="container">
                <div className="ipt-upload-pic">
                    <Qiniu multiple={false} className="form-control" id="expertPic" onDrop={this.onDrop.bind(this)} size={150} token={this.state.token} onUpload={this.onUpload.bind(this)}>
                    </Qiniu>
                </div>
              </div>
            </div>
          </div>
          {this.props.desc.tips}
        </div>
    );
  }
  componentDidMount() {
    // DeviceAdapter.setFrontSize();
    // this.props.actions.fetchExpertData(this.props.params.id);
  }
}


export default UpImage;