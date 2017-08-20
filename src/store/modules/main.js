// import http from '../../http';
import {ADD_COUNT_ACTION} from '../action-types';
import {ADD_COUNT_MUTATION, CHANGE_LOAD_SHOW_STATE} from '../mutation-types';
const state = {
  count: 0,
  isLoadLayer: false,
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
  count: state =>state.count

};

const mutations = {
  [CHANGE_LOAD_SHOW_STATE] (state, isLoadLayer) {
    state.isLoadLayer = isLoadLayer;
  },
  [ADD_COUNT_MUTATION]: (state, count) => {
    state.count = count;
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
