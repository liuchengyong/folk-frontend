/**
 * 根据国家获取对应学校
 * @author HuangGuorui
 */
import assign from 'lodash/assign';
const initialState = {isFetching: true};

module.exports = function(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  //let nextState = Object.assign({}, state);
  switch(action.type) {
    case 'RECEIVE_COLLEGE_COUNTRY': {
      //@TODO 将删除状态作为一个action
       var schoolArr = [];

       for(var i = 0; i < action.parameter.length; i++) {
            schoolArr.push((function(i) {
                return {
                  value: action.parameter[i].id,
                  label: action.parameter[i].name
                }
            })(i));
        }

        return schoolArr;

      // return (action.parameter.success) ?
      //       assign({}, action.parameter.param, {isFetching: false}) :
      //       {isFetching: true};
    } break;
    case 'REQUEST_COLLEGE_COUNTRY': {
      return assign({}, state, {isFetching: true});
    } break;
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
};
