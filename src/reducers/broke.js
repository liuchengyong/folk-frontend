/**
 * 匿名爆料
 */

const initialState = {isFetching: true};

module.exports = function(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  //let nextState = Object.assign({}, state);
  switch(action.type) {
    case 'RECEIVE_BROKE_DATA': {
      //@TODO 将删除状态作为一个action
      return (action.parameter.success ||  action.parameter.code == 303) ? 
            Object.assign({}, action.parameter.param, {isFetching: false}) : 
            {isFetching: true};
    } break;
    case 'REQUEST_BROKE_DATA': {
      return Object.assign({}, state, {isFetching: true});
    } break;
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
};
