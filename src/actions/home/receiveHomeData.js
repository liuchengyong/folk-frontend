module.exports = function(parameter) {
  console.log('RECEIVE_HOME_DATA');
  return { type: 'RECEIVE_HOME_DATA', parameter };
};
