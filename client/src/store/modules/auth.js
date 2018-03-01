const app = {
  state: {
    user: null,
    token: null
  },
  mutations: {
    SET_AUTH_USER (state, userInfo) {
      state.user = userInfo
    }
  },
  actions: {
    setUserInfo ({ commit }, userInfo) {
      commit('SET_AUTH_USER', userInfo)
    }
  }
}

export default app
