// import http from '../../http';
import {ADD_COUNT_ACTION} from '../action-types';
import {
  ADD_COUNT_MUTATION,
  CHANGE_LOAD_SHOW_STATE,
  OPERATION_RESULT_SHOW,
  OPERATION_RESULT_HIDDEN
} from '../mutation-types';
const state = {
  count: 0,
  isLoadLayer: false,
  operationInfo: {
    flag: false,
    iconfont: '',
    text: ''
  }
};

const actions = {
  [ADD_COUNT_ACTION] ({commit}){
    commit('addCount', 10);
  }
};

const getters = {
  isLoadLayer: state => {
    return state.isLoadLayer;
  },
  count: state =>state.count,
  operationInfo: state => state.operationInfo
};

const mutations = {
  [CHANGE_LOAD_SHOW_STATE] (state, isLoadLayer) {
    state.isLoadLayer = isLoadLayer;
  },
  [ADD_COUNT_MUTATION]: (state, count) => {
    state.count = count;
  },
  [OPERATION_RESULT_SHOW]: (state, value)=> {
    state.operationInfo.flag = true;
    state.operationInfo.iconfont = value.iconfont;
    state.operationInfo.text = value.text;
  },
  [OPERATION_RESULT_HIDDEN]: (state)=> {
    state.operationInfo.flag = false;
    state.operationInfo.iconfont = '';
    state.operationInfo.text = '';
  },
  addCount: (state, count) => {
    state.count = count;
  }
};

export default {
  state,
  actions,
  getters,
  mutations
};
