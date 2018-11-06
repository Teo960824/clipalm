<template>
  <div class="container">
      <list class="list" @loadmore="fetch" loadmoreoffset="30000">
        <cell class="cell" v-for="(stat, index) in stats" v-bind:key="index">
          <wxc-cell :label="stat.code"
              @wxcCellClicked="wxcIndexlistItemClicked(stat)"
              :has-margin="false"
              :extraContent="stat.desc"></wxc-cell>
        </cell>
      </list>
  </div>
</template>

<script>
import { WxcIndexlist, WxcPopup, WxcCell } from 'weex-ui'
import { getDetails } from '../../utils/details'
import { getServer } from '../../utils/server'
export default {
  components: { WxcIndexlist, WxcPopup, WxcCell },
  created: function () {
  },
  data () {
    return {
      isBottomShow: false,
      height: 400,
      info: {}
    }
  },
  computed: {
    stats: {
      get () {
        return this.$store.state.Stat.statDrg
      }
    }
  },
  methods: {
    wxcCellClicked (e) {
      console.log(e)
    },
    wxcIndexlistItemClicked (e) {
      this.$store.commit('SET_isBottomShow', true)
      this.$store.commit('SET_info', e.item)
      this.$store.commit('SET_infoLevel', 1)
      this.$store.commit('SET_menu', [this.$store.state.Home.activeTab, '分析详情'])
      this.$store.commit('SET_infoMenu', '统计分析')
      this.$store.commit('SET_infoPage', getDetails(`分析详情`, e.item))
    },
    swipe (e) {
      if (e.direction === 'left' && this.$store.state.Home.infoPage1.info !== '') {
        this.$store.commit('SET_infoMenu', '分析详情')
        this.$store.commit('SET_menu', [this.$store.state.Home.activeTab, '分析详情'])
        this.$store.commit('SET_infoLevel', 1)
      }
    },
    fetch () {
      this.$store.commit('SET_statPage', this.$store.state.Stat.statPage + 1)
      getServer(this, 'all', '统计分析')
    },
    openBottomPopup () {
      this.isBottomShow = true
    },
    popupOverlayBottomClick () {
      this.isBottomShow = false
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
