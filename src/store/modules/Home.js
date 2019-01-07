const state = {
  activeTab: 0,
  menus: [{'DRG': ['CN-DRG'], '疾病': ['疾病/诊断术语', 'GB-ICD10', 'BJ-ICD10'], '手术': ['手术/操作术语', 'GB-ICD9', 'BJ-ICD9']}],
  // 各个页面默认菜单
  menu: ['字典', '病案', 'DRG分析', '论坛', '个人信息'],
  infoPages: [[], [], [], [], []],
  infoLevel: [0, 0, 0, 0, 0],
  user: { loginResult: '', login: false, data: { clipalm_version: 'BJ编码版' } },
  showData: true,
  showMore: true,
  userAnalyse: null,
  isLoadingShow: null,
  customQuery: [{show: false, query: {}}, {show: false, query: {}}, {show: false, query: {}}],
  forumInfo: {},
  showFilter: false,
  // 发布版本修改
  version: '1.0.5',
  serverVersion: { version: '1.0.5' }
}

const mutations = {
  SET_showFilter (state, x) {
    state.showFilter = x
  },
  SET_activeTab (state, x) {
    state.activeTab = x
  },
  SET_menus (state, x) {
    state.menus = x
  },
  SET_menu_all (state, x) {
    state.menu = x
  },
  SET_menu (state, x) {
    state.menu.splice(x[0], 1, x[1])
  },
  SET_user (state, x) {
    state.user = x
  },
  SET_showData (state, x) {
    state.showData = x
  },
  SET_showMore (state, x) {
    state.showMore = x
  },
  SET_userData (state, x) {
    state.user.data = x
  },
  SET_userAnalyse (state, x) {
    state.userAnalyse = x
  },
  SET_isLoadingShow (state, x) {
    state.isLoadingShow = x
  },
  SET_info (state, x) {
    const info = state.infoPages[state.activeTab]
    if (info) {
      info.push(x)
      state.infoPages[state.activeTab] = info
      state.infoLevel[state.activeTab] = info.length
    } else {
      state.infoPages[state.activeTab] = [x]
      state.infoLevel[state.activeTab] = 1
    }
  },
  SET_onlyInfoLevel (state, x) {
    state.infoLevel.splice(x[0], 1, x[1])
  },
  SET_infoLevel (state, x) {
    const level = state.infoLevel[state.activeTab]
    switch (x) {
      case null:
        x = level + 1
        break
      case 0:
        state.infoPages[state.activeTab] = []
        break
      default:
        if (x < level) {
          state.infoPages[state.activeTab].splice(-1, 1)
        }
        break
    }
    state.infoLevel.splice(state.activeTab, 1, x)
  },
  SET_serverVersion (state, x) {
    state.serverVersion = x
  },
  SET_loginResult (state, x) {
    state.user.loginResult = x
  },
  SET_customQuery (state, x) {
    state.customQuery[x[0]] = x[1]
  },
  SET_forumInfo (state, x) {
    state.forumInfo = x
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    commit('SET_forumInfo')
    commit('SET_userMenu')
    commit('SET_showFilter')
    commit('SET_serverVersion')
    commit('SET_activeTab')
    commit('SET_showData')
    commit('SET_showMore')
    commit('SET_menus')
    commit('SET_menu')
    commit('SET_user')
    commit('SET_userAnalyse')
    commit('SET_menu_all')
    commit('SET_userData')
    commit('SET_isLoadingShow')
    commit('SET_info')
    commit('SET_infoLevel')
    commit('SET_onlyInfoLevel')
  }
}

export default {
  state,
  mutations,
  actions
}
