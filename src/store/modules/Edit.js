const state = {
  wt4Case: [],
  editMenu: '',
  wt4Page: 1,
  wt4Info: ''
}

const mutations = {
  SET_wt4Case (state, x) {
    state.wt4Case = x
  },
  SET_editMenu (state, x) {
    state.editMenu = x
  },
  SET_wt4Page (state, x) {
    state.wt4Page = x
  },
  SET_wt4Info (state, x) {
    state.wt4Info = x
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    commit('SET_wt4Case')
    commit('SET_editMenu')
    commit('SET_wt4Page')
    commit('SET_wt4Info')
  }
}

export default {
  state,
  mutations,
  actions
}
