/**
 * Created by luowei on 3/12/16.
 */
const initialState = {isFetching: true};

module.exports = function(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  //let nextState = Object.assign({}, state);
  //console.log(action);
  switch (action.type) {
    case 'RECEIVE_CONSULTATION':
      return Object.assign({}, {isFetching: false}, action.parameter);
    default:
      /* Return original state if no actions were consumed. */
      return state;
  }
};