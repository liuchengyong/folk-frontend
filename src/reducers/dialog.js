/**
 * @date    2/29/2016
 * @author  HuangGuorui
 *
 * Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const initialState = {isOpening: false};

module.exports = function(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  //let nextState = Object.assign({}, state);
  switch(action.type) {
    case 'OPEN_DIALOG': { 
      return {isOpening: true};
    } break;
    case 'CLOSE_DIALOG': {
      return {isOpening: false}
    } break;
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
};
