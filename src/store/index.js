import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';
import api from '../services';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    data: {}
  },
  getters: {
    // 割接开始时间
    beginTime: state => {
      return moment(state.data.cuttime).format("YYYY-MM-DD HH:mm:ss").split(' ');
    },
  },
  actions: {
    async getData({ commit }) {
      const data = await api.readFile();
      commit('setData', data);
    }
  },
  mutations: {
    setData(state, data) {
      state.data = data;
    }
  },
});

export default store;