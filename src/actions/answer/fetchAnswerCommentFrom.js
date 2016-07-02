import assign from 'lodash/assign';

module.exports = (answer,obj) => {
  return dispatch => dispatch(changeCommentFrom(assign(answer,obj)));
}

function changeCommentFrom(parameter){
	return {type: 'CHANGE_COMMENT_FROM', parameter};
}