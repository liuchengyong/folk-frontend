/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const initialState = {
  isFetching: true,
  // isFetching:false,
  // city: "Darwin",
  // country: "",
  // headimgurl: "http://wx.qlogo.cn/mmopen/PiajxSqBRaELMo5oBNFPuwxYMeKllKL6lL6sTYSrO03nICbBzlFj3ibdntyvMfLlEgGwb8ePtFVlZpdEibsNKS5XQ/0",
  // language: "zh_CN",
  // nickname: "源",
  // openid: "olsAEuFTTxKLoCOyAt0syhgMqXtQ",
  // province: "Northern Territory",
  // sex: 1
};
import assign from 'lodash/assign';

module.exports = function(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  //let nextState = Object.assign({}, state);
  switch(action.type) {
    case 'RECEIVE_USER_DATA': {
      return assign({}, action.parameter, {isFetching: false});
    } break;
    case 'REQUEST_USER_DATA': {
      return assign({}, state, {isFetching: true});
    } break;
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
};
 