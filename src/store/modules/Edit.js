const state = {
  wt4Case: [],
  wt4PopRight: [],
  wt4PopRightPage: 1,
  wt4Page: 1,
  wt4Info: '',
  groupResult: { 入组DRG: 'ST15', 分组日志: '判断1: DRG分组范围--12天/1123.0元;判断2: 主要诊断--B25.900y001;判断3: 主要诊断MDC--P,S;判断4: 其他诊断--;判断5: 手术/操作--;判断6: MDCA先期分组--;判断7: MDCP新生儿先期分组--;判断8: MDCY先期分组--;判断9: MDCZ先期分组--;判断10: 是否手术室手术--否;判断11: 外科分组--;判断12: 内科分组--ST1;判断13: ADRG分组--ST1;判断14: MCC/CC主诊排除判断--;判断15: 是否MCC--否;判断16: 是否CC--否;判断17: DRG分组--ST15;', 错误日志: '' }
}

const mutations = {
  SET_wt4Case (state, x) {
    state.wt4Case = x
  },
  SET_wt4Page (state, x) {
    state.wt4Page = x
  },
  SET_wt4PopRight (state, x) {
    state.wt4PopRight = x
  },
  SET_wt4PopRightPage (state, x) {
    state.wt4PopRightPage = x
  },
  SET_wt4Info (state, x) {
    state.wt4Info = x
  },
  SET_groupResult (state, x) {
    state.groupResult = x
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    commit('SET_wt4Case')
    commit('SET_wt4Page')
    commit('SET_wt4PopRight')
    commit('SET_wt4PopRightPage')
    commit('SET_wt4Info')
    commit('SET_groupResult')
  }
}

export default {
  state,
  mutations,
  actions
}
