const state = {
  statDrg: [],
  statMenu: '',
  statPage: 1
}

const mutations = {
  SET_statDrg (state, x) {
    state.statDrg = x
  },
  SET_statMenu (state, x) {
    state.statMenu = x
  },
  SET_statPage (state, x) {
    state.statPage = x
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    commit('SET_statDrg')
    commit('SET_statMenu')
    commit('SET_statPage')
  }
}

export default {
  state,
  mutations,
  actions
}
