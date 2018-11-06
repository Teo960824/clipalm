const state = {
  visible: false,
  activeTab: 0,
  menus: [],
  menu: ['用户登陆', '数据展示', '数据展示', '数据展示', '数据展示'],
  notice: '未注册用户！',
  user: { login: false, data: { clipalm_version: 'BJ编码版' } },
  isBottomShow: false,
  infoLevel: 0,
  infoMenu: '',
  infoPage1: { info: '', details: [], infoTitle: '', gridList: [], buttonText: '', isBottomShow: false, isInfoButtonShow: false },
  infoPage2: { info: '', details: [], infoTitle: '', gridList: [], buttonText: '', isBottomShow: false, isInfoButtonShow: false },
  infoPage3: { info: '', details: [], infoTitle: '', gridList: [], buttonText: '', isBottomShow: false, isInfoButtonShow: false },
  infoPage4: { info: '', details: [], infoTitle: '', gridList: [], buttonText: '', isBottomShow: false, isInfoButtonShow: false },
  isLoadingShow: false,
  isMiniShow: false,
  showForum: false,
  miniBarTitle: ' ',
  point: ['点击底部标签可显示菜单', '点击任意条目可进入条目详情', '病案页长按可进入论坛', '页面左滑右滑可前进后退', '页面上滑加载下一页'],
  pointIndex: 0,
  // 发布版本修改
  version: '0.0.1',
  serverVersion: { version: '0.0.1' }
}

const mutations = {
  SET_miniBarTitle (state, x) {
    state.miniBarTitle = x
  },
  SET_pointIndex (state, x) {
    state.pointIndex = x
  },
  SET_visible (state, x) {
    state.visible = x
  },
  SET_showForum (state, x) {
    state.showForum = x
  },
  SET_activeTab (state, x) {
    state.activeTab = x
  },
  SET_menus (state, x) {
    if (!x.includes('论坛')) {
      state.showForum = false
    }
    state.menus = x
  },
  SET_menu (state, x) {
    state.menu.splice(x[0], 1, x[1])
  },
  SET_user (state, x) {
    state.user = x
  },
  SET_userData (state, x) {
    state.user.data = x
  },
  SET_isBottomShow (state, x) {
    state.isBottomShow = x
  },
  SET_isLoadingShow (state, x) {
    state.isLoadingShow = x
  },
  SET_info (state, x) {
    switch (state.infoLevel) {
      case 1:
        state.infoPage1.info = x
        break
      case 2:
        state.infoPage2.info = x
        break
      case 3:
        state.infoPage3.info = x
        break
      case 4:
        state.infoPage4.info = x
        break
    }
  },
  SET_infoMenu (state, x) {
    state.infoMenu = x
  },
  SET_infoPageClear (state) {
    const clear = { info: '', details: [], infoTitle: '', gridList: [], buttonText: '', isBottomShow: false, isInfoButtonShow: false }
    state.infoLevel = 0
    state.infoPage1 = clear
    state.infoPage2 = clear
    state.infoPage3 = clear
    state.infoPage4 = clear
  },
  SET_infoPage (state, x) {
    switch (state.infoLevel) {
      case 1:
        state.infoPage1 = x
        break
      case 2:
        state.infoPage2 = x
        break
      case 3:
        state.infoPage3 = x
        break
      case 4:
        state.infoPage4 = x
        break
    }
  },
  SET_infoLevel (state, x) {
    state.infoLevel = x
  },
  SET_isMiniShow (state, x) {
    state.isMiniShow = x
  },
  SET_serverVersion (state, x) {
    state.serverVersion = x
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    commit('SET_miniBarTitle')
    commit('SET_pointIndex')
    commit('SET_showForum')
    commit('SET_serverVersion')
    commit('SET_visible')
    commit('SET_activeTab')
    commit('SET_menus')
    commit('SET_menu')
    commit('SET_user')
    commit('SET_userData')
    commit('SET_labelDetails')
    commit('SET_isBottomShow')
    commit('SET_isLoadingShow')
    commit('SET_info')
    commit('SET_infoMenu')
    commit('SET_infoPage')
    commit('SET_infoLevel')
    commit('SET_isMiniShow')
    commit('SET_infoPageClear')
  }
}

export default {
  state,
  mutations,
  actions
}
