const state = {
  // type: '',
  post: [],
  forumPage: 1,
  forumModule: '',
  forumLabel: '',
  forumIndex: null,
  forumContent: {},
  showNew: false
}

const mutations = {
  SET_forumIndex (state, x) {
    state.forumIndex = x
  },
  SET_forumModule (state, x) {
    state.forumModule = x
  },
  SET_post (state, x) {
    state.post = x
  },
  SET_forumPage (state, x) {
    state.forumPage = x
  },
  SET_forumContent (state, x) {
    state.forumContent = x
  },
  SET_forumLabel (state, x) {
    state.forumLabel = x
  },
  SET_showNew (state, x) {
    state.showNew = x
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    commit('SET_showNew')
    commit('SET_forumIndex')
    commit('SET_forumModule')
    commit('SET_post')
    commit('SET_forumPage')
    commit('SET_forumContent')
    commit('SET_forumLabel')
  }
}

export default {
  state,
  mutations,
  actions
}
