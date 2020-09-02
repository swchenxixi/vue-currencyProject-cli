import { login, logout, whoAmI, getPermissions } from '@/api/login-service';

export default {
  namespaced: true,
  state: {
    data: null,
    isLoading: false
  },
  mutations: {
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
    setData(state, data) {
      state.data = data;
    }
  },
  actions: {
    async login({ commit }, { loginId, loginPassword }) {
      commit('setIsLoading', true);
      const result = await login(loginId, loginPassword);
      commit('setIsLoading', false);
      if (result) {
        commit('setData', result);
        return true;
      }
      return false;
    },

    async whoAmI({ commit }) {
      commit('setIsLoading', true);
      const result = await whoAmI();
      commit('setIsLoading', false);
      commit('setData', result);
    },

    async getPermissions({ commit }) {
      commit('setIsLoading', true);
      const result = await getPermissions();
      commit('setIsLoading', false);
      commit('setData', result);
      return result;
    },

    logout({ commit }) {
      logout();
      commit('setData', null);
    }
  }
};
