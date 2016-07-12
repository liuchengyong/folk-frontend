
module.exports = state => {
  return dispatch => dispatch(changeAnswerPageState(state));
}

function changeAnswerPageState(parameter){
	return {type: 'CHANGE_ANSWER_PAGE_STATE', parameter};
}