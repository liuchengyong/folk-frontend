/**
 * 验证手机号是否是点师状态
 * @author HuangGuorui
 */

const initialState = {isFetching: true};
import assign from 'lodash/assign';



module.exports = function(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  //let nextState = Object.assign({}, state);
  switch(action.type) {
    case 'RECEIVE_VERIFY_EXPERT': {
      //@TODO 将删除状态作为一个action
      return action.parameter.msg ?
             assign({}, action.parameter, {isFetching: false}) :
             {isFetching: true}
    } break;
    case 'REQUEST_VERIFY_EXPERT': {
      return assign({}, state, {isFetching: true});
    } break;
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
};
