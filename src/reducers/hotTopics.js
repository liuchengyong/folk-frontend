/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const initialState = {topics: []};

module.exports = function(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  //let nextState = Object.assign({}, state);
  switch(action.type) {
    case 'RECEIVE_HOT_TOPICS': {
      var topics = action.parameter.success ? action.parameter.param.results : [];
      return {
        topics : topics,
        isFetching: false
      };
    } break;
    case 'FETCH_HOT_TOPICS': {
      // Modify next state depending on the action and return it
      return {
        isFetching: true
      }
    } break;
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
};
