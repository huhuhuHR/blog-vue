// import http from '../../http';
import {ADD_COUNT_ACTION} from '../action-types';
import {ADD_COUNT_MUTATION} from '../mutation-types';
const state = {
  count: 0
};

const actions = {
  [ADD_COUNT_ACTION] ({commit}){
    commit('addCount', 10);
  }
};

const getters = {
  count: state => {
    return state.count;
  }
};

const mutations = {
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
