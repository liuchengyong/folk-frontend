/**
 * Created by luowei on 2/27/16.
 */
/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const initialState = {fetchingCoupon: false};

module.exports = function(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  //let nextState = Object.assign({}, state);
  //console.log(action);
  switch (action.type) {
    case 'REQUEST_COUPON':
      return Object.assign({}, state, {fetchingCoupon: true});
    case 'RECEIVE_COUPON':
      return Object.assign({}, state, {fetchingCoupon: false}, action.parameter);
    default:
      /* Return original state if no actions were consumed. */
      return state;
  }
};