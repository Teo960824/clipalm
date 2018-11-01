const state = {
  type: '',
  post: [],
  forumPage: 1,
  forumMenu: '',
  forumContent: {}
}

const mutations = {
  SET_forumType (state, x) {
    state.type = x
  },
  SET_post (state, x) {
    state.post = x
  },
  SET_forumPage (state, x) {
    state.forumPage = x
  },
  SET_forumContent (state, x) {
    if (x) {
      state.forumMenu = x.title
    }
    state.forumContent = x
  },
  SET_forumMenu (state, x) {
    state.forumMenu = x
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    commit('SET_forumType')
    commit('SET_post')
    commit('SET_forumPage')
    commit('SET_forumContent')
    commit('SET_forumMenu')
  }
}

export default {
  state,
  mutations,
  actions
}
