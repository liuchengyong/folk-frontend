const redux = require('redux');
const reducers = require('../reducers');
const thunkMiddleware = require('redux-thunk');


module.exports = function(initialState) {
  const store = redux.createStore(reducers, initialState, redux.applyMiddleware(thunkMiddleware));
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer)
    })
  }

  return store
};
