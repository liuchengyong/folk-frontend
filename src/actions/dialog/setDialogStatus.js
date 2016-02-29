/**
 * 公共弹窗
 */

const openDialog = require('./openDialog');
const closeDialog = require('./closeDialog');

module.exports = function(open) {
	if(open) {
		return dispatch => 
			dispatch(openDialog());
	} else {
		return dispatch =>
			dispatch(closeDialog());
	};
};