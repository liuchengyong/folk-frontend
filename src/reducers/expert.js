/**
 * 登录
 * @author HuangGuorui
 */

const initialState = {
  isFetching: true,
  current:'detail'
};
import assign from 'lodash/assign';

module.exports = function(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  //let nextState = Object.assign({}, state);
  switch(action.type) {
    case 'RECEIVE_EXPERT_DATA': {
      //@TODO 将删除状态作为一个action
      return assign({}, state ,action.parameter, {isFetching: false});
    } break;
    case 'CHANGE_EXPERT_TAB': {
      return assign({}, state, action.parameter);
    } break;
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
};
