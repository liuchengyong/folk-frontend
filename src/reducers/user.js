/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const initialState = {
  isFetching: true
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
      return assign({}, action.parameter, {isFetching: true});
    } break;
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
};
 