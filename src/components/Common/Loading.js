/**
 * Loading
 * @date    2/26/2016
 * @author    HuangGuorui
 */
import React from 'react';
require('styles/_loading.scss');
let loading = require('../../images/loading.gif');

// import CircularProgress from 'material-ui/lib/circular-progress';

const Loading = () => (
  <div className="loading-wrap">
  	<img src={loading} />
  </div>
);

export default Loading;