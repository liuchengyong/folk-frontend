import assign from 'lodash/assign';

const initialState = {isFetching: true};


module.exports = function(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  //let nextState = Object.assign({}, state);
  switch(action.type) {
    case 'RECEIVE_ANSWER_DATA': {
      //@TODO 将删除状态作为一个action
      return action.parameter.success ? assign({}, action.parameter, {isFetching: false}) :
             {isFetching: true};
    } break;
    case 'REQUEST_ANSWER_DATA': {
      return assign({}, state, {isFetching: true});
    } break;
    case 'RECEIVE_ANSWER_DETAIL_DATA':{
      return action.parameter.success ? assign({}, action.parameter, {isFetching: false}) :
             {isFetching: true}
    } break;
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
};
