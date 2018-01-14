import {
  CHANE_STATE_USERID,
  CHANE_STATE_USER
} from '../mutation-types';
const state = {
  userId: '',
  userState: ''
};
const getters = {
  userId: state => state.userId,
  userState: state=>state.userState
};

const mutations = {
  [CHANE_STATE_USERID] (state, userId) {
    state.userId = userId;
  },
  [CHANE_STATE_USER]: (state, userState)=> {
    state.userState = userState;
  },
};

export default {
  state,
  getters,
  mutations
};
