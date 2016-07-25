/* Combine all available reducers to a single root reducer.
 *
 * CAUTION: When using the generators, this file is modified in some places.
 *          This is done via AST traversal - Some of your formatting may be lost
 *          in the process - no functionality should be broken though.
 *          This modifications only run once when the generator is invoked - if
 *          you edit them, they are not updated again.
 */
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import extend from 'lodash/extend';

/* Populated by react-webpack-redux:reducer */
const reducers = {
  home: require('../reducers/home'),
  user: require('../reducers/user'),
  school: require('../reducers/found'),
  topic: require('../reducers/topic'),
  dialog: require('../reducers/dialog'),
  broke: require('../reducers/broke'),
  expert: require('../reducers/expert'),
  consultation: require('../reducers/consultation'),
  register: require('../reducers/register'),
  captch: require('../reducers/captch'),
  login: require('../reducers/login'),
  uploadToken: require('../reducers/uploadToken'),
  dynamic: require('../reducers/dynamic'),
  collegeByCountry: require('../reducers/fetchCollegeCountry'),
  verifyExpert: require('../reducers/verifyExpert'),
  applyExpert: require('../reducers/applyExpert'),
  active: require('../reducers/activity'),
  college: require('../reducers/college'),
  answer: require('../reducers/answer'),
  customer: require('../reducers/customer')
};

module.exports = combineReducers(extend(reducers, {routing: routerReducer}));