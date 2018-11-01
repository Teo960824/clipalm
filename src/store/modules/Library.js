const state = {
  rule: [],
  mdcRule: [],
  adrgRule: [],
  drgRule: [],
  icd9Rule: [],
  icd10Rule: [],
  icd10Page: 1,
  icd9Page: 1,
  libraryMenu: '',
  // version: 'BJ',
  mdc: ''
}

const mutations = {
  SET_mdc_rule (state, x) {
    state.mdcRule = x
  },
  SET_adrg_rule (state, x) {
    state.adrgRule = x
  },
  SET_drg_rule (state, x) {
    state.drgRule = x
  },
  SET_icd9_rule (state, x) {
    state.icd9Rule = x
  },
  SET_icd10_rule (state, x) {
    state.icd10Rule = x
  },
  SET_icd10_page (state, x) {
    state.icd10Page = x
  },
  SET_icd9_page (state, x) {
    state.icd9Page = x
  },
  // SET_version (state, x) {
  //   state.version = x
  // },
  SET_mdc (state, x) {
    state.mdc = x
  },
  SET_library_menu (state, x) {
    state.libraryMenu = x
    switch (x) {
      case 'MDC':
        state.rule = state.mdcRule
        break
      case 'ADRG':
        state.rule = state.adrgRule
        break
      case 'DRG':
        state.rule = state.drgRule
        break
      case 'ICD10':
        state.rule = state.icd10Rule
        break
      case 'ICD9':
        state.rule = state.icd9Rule
        break
      default: break
    }
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    commit('SET_library_menu')
    commit('SET_mdc_rule')
    commit('SET_adrg_rule')
    commit('SET_drg_rule')
    commit('SET_icd9_rule')
    commit('SET_icd10_rule')
    commit('SET_icd10_page')
    commit('SET_icd9_page')
    // commit('SET_version')
    commit('SET_mdc')
  }
}

export default {
  state,
  mutations,
  actions
}
