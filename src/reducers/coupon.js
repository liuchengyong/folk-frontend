/**
 * Created by luowei on 2/27/16.
 */
/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const initialState = {isFetching: true};

module.exports = function(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  //let nextState = Object.assign({}, state);
  switch(action.type) {
    case 'RECEIVE_WECHAT_CONFIG': {
      return action.parameter.success ? Object.assign({}, action.parameter.param, {isFetching: false}) : {isFetching: false};
    } break;
    case 'REQUEST_WECHAT_CONFIG': {
      return Object.assign({}, state, {isFetching: true});
    } break;
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
};