

module.exports = (current) => {
  return dispatch => {
    dispatch({type: 'CHANGE_EXPERT_TAB', parameter:{current:current}});
  }
}