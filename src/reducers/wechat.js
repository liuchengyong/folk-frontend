/**
 * Created by luowei on 3/10/16.
 */
const initialState = {isFetching: true, loadedSDK: false};

module.exports = function(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  //let nextState = Object.assign({}, state);
  //console.log(action);
  switch (action.type) {
    case 'DONE_WECHAT_CONFIG':
      return Object.assign({}, state, {loadedSDK: true});
    case 'RECEIVE_WECHAT_CONFIG':
      return Object.assign({}, state, {SDK: action.parameter, isFetching: false});
    case 'RECEIVE_WECHAT_SHAREDATA':
      return Object.assign({}, state, {shareData: action.parameter});
    default:
      return state;
  }
};