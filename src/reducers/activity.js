/**
 * 专题活动
 * @author HuangGuorui
 */
import assign from 'lodash/assign';
const initialState = {isFetching: true};

module.exports = function(state = initialState, action) {
  switch(action.type) {
    case 'RECEIVE_ACTIVE_DATA': {
      return action.parameter.success ?
            assign({}, action.parameter.param, {isFetching: false}) :
            {isFetching: true};
    } break;
    case 'REQUEST_ACTIVE_DATA': {
      return assign({}, state, {isFetching: true});
    } break;
    default: {
      return state;
    }
  }
};
