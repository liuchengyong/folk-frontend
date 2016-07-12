import assign from 'lodash/assign';

const initialState = {
  isFetching: true,
  isOpenFrom: false,
  isOpenLoad: false
};


module.exports = function(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  //let nextState = Object.assign({}, state);
  switch(action.type) {
    case 'RECEIVE_ANSWER_DATA': {
      //@TODO 将删除状态作为一个action
      return assign({},state,action.parameter, {isFetching: false,pageType:'detail'});
    } break;
    case 'RECEIVE_COMMENT_DATA':{
      return assign({},state,action.parameter);
    } break;
    case 'RECEIVE_ANSWER_DETAIL_DATA':{
      return action.parameter.success ? assign({}, action.parameter, {isFetching: false}) :
             {isFetching: true}
    } break;
    case 'CHANGE_COMMENT_FROM':{
      return assign({},state,action.parameter);
    }break;
    case 'CHANGE_ANSWER_PAGE_STATE':{
      return assign({},initialState,action.parameter);
    }break;
    case 'RECEIVE_ANSWER_LIST_DATA':{ // 初始化益达精选列表
      return assign({},initialState,action.parameter,{isFetching: false});
    }break;
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
};
