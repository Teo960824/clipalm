<template>
  <!-- <div class="container" v-if="['MDC', 'ADRG', 'DRG'].includes(menu)">
      <wxc-indexlist :normal-list="rules"
                    @wxcIndexlistItemClicked="wxcIndexlistItemClicked"
                    :show-index="true"></wxc-indexlist>
  </div> -->
  <div class="container">
      <list class="list" @loadmore="fetch" loadmoreoffset="30000">
        <cell class="cell" v-for="(rule, index) in rules" v-bind:key="index">
          <wxc-cell :label="rule.code"
                    @wxcCellClicked="wxcIndexlistItemClicked(rule)"
                    :has-margin="false"
                    :extraContent="rule.desc"></wxc-cell>
        </cell>
      </list>
  </div>
</template>

<script>
import { WxcIndexlist, WxcPopup, WxcCell, WxcLoading, WxcPartLoading } from 'weex-ui'
import { getDetails } from '../../utils/details'
import { getServer } from '../../utils/server'
const modal = weex.requireModule('modal')
export default {
  components: { WxcIndexlist, WxcPopup, WxcCell, WxcLoading, WxcPartLoading },
  data () {
    return {
      // isBottomShow: false,
      height: 400,
      // info: {},
      isShow: false
    }
  },
  computed: {
    menu: {
      get () {
        return this.$store.state.Library.libraryMenu
      }
    },
    rules: {
      get () {
        let data = []
        switch (this.menu) {
          case 'MDC':
            data = this.$store.state.Library.mdcRule
            break
          case 'ADRG':
            data = this.$store.state.Library.adrgRule
            break
          case 'DRG':
            data = this.$store.state.Library.drgRule
            break
          case 'ICD10':
            data = this.$store.state.Library.icd10Rule
            break
          case 'ICD9':
            data = this.$store.state.Library.icd9Rule
            break
          default:
            data = []
            break
        }
        return data
      }
    }
  },
  updated: function () {
  },
  methods: {
    wxcIndexlistItemClicked (e) {
      this.$store.commit('SET_isBottomShow', true)
      this.$store.commit('SET_info', e)
      this.$store.commit('SET_infoLevel', 1)
      this.$store.commit('SET_menu', [this.$store.state.Home.activeTab, '规则详情'])
      this.$store.commit('SET_miniBarTitle', `${this.menu}-${e.code}规则详情`)
      this.$store.commit('SET_infoPage', getDetails(`${this.menu}规则详情`, e))
    },
    openBottomPopup () {
      this.$store.commit('SET_isBottomShow', true)
    },
    popupOverlayBottomClick () {
      this.$store.commit('SET_isBottomShow', false)
    },
    swipe (e) {
      if (e.direction === 'left' && this.$store.state.Home.infoPage1.info !== '') {
        this.$store.commit('SET_infoMenu', '规则详情')
        this.$store.commit('SET_menu', [this.$store.state.Home.activeTab, this.menu])
        this.$store.commit('SET_infoLevel', 1)
      }
    },
    fetch () {
      switch (this.menu) {
        case 'ADRG':
          this.$store.commit('SET_libraryPage', ['ADRG', this.$store.state.Library.adrgPage + 1])
          break
        case 'DRG':
          this.$store.commit('SET_libraryPage', ['DRG', this.$store.state.Library.drgPage + 1])
          break
        case 'ICD10':
          this.$store.commit('SET_libraryPage', ['ICD10', this.$store.state.Library.icd10Page + 1])
          break
        case 'ICD9':
          this.$store.commit('SET_libraryPage', ['ICD9', this.$store.state.Library.icd9Page + 1])
          break
      }
      modal.toast({ message: `${this.$store.state.Library.adrgPage}`, duration: 1 })
      if (this.menu !== 'MDC') {
        getServer(this, 'all', this.menu)
      }
    }
  }
}
</script>
<style scoped>
.container {
  margin-top: 91px;
  width: 750px;
  height: 1250px;
}
</style>
