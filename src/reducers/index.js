/* Combine all available reducers to a single root reducer.
 *
 * CAUTION: When using the generators, this file is modified in some places.
 *          This is done via AST traversal - Some of your formatting may be lost
 *          in the process - no functionality should be broken though.
 *          This modifications only run once when the generator is invoked - if
 *          you edit them, they are not updated again.
 */
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
const _ = require('lodash');

/* Populated by react-webpack-redux:reducer */
const reducers = {
  home: require('../reducers/home.js'),
  school: require('../reducers/found.js'),
  topic: require('../reducers/topic.js')
};

module.exports = combineReducers(_.extend(reducers, {routing: routerReducer}));