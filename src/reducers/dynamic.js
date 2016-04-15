import assign from 'lodash/assign';

const initialState = {isFetching: true};


module.exports = function(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  //let nextState = Object.assign({}, state);
  switch(action.type) {
    case 'RECEIVE_DYNAMIC_DATA': {
      //@TODO 将删除状态作为一个action
      return action.parameter.success ?
             assign({}, action.parameter.param, {isFetching: false}) :
             {isFetching: true}
    } break;
    case 'REQUEST_DYNAMIC_DATA': {
      return assign({}, state, {isFetching: true});
    } break;
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
};
