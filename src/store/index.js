import Vue2 from 'vue'
import Vuex from 'vuex'
import modules from './modules'

if (WXEnvironment.platform === 'Web') {
  Vue2.use(Vuex)
} else {
  Vue.use(Vuex)
}

module.exports = new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== 'production'
})
