const app = {
  state: {
    user: null,
    token: null
  },
  mutations: {
    SET_AUTH_USER (state, userInfo) {
      state.user = userInfo
    },
    SET_AUTH_TOKEN (state, token) {
      state.token = token
    }
  },
  actions: {
    setUserInfo ({ commit }, userInfo) {
      commit('SET_AUTH_USER', userInfo)
    },
    setToken ({commit}, token) {
      commit('SET_AUTH_TOKEN', token)
    }
  }
}

export default app
