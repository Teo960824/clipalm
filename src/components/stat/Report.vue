<template>
  <div class="container" @swipe="swipe">
    <wxc-indexlist :normal-list="stats"
                   @wxcIndexlistItemClicked="wxcIndexlistItemClicked"
                   :show-index="true"></wxc-indexlist>
 </div>

</template>

<script>
import { WxcIndexlist, WxcPopup, WxcCell } from 'weex-ui'
import { getDetails } from '../../utils/details'
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
  .wrapper {
    justify-content: center;
  }
  .text {
    color: #666666;
    font-size: 32px;
  }
  .container {
    margin-top: 91px;
  }
</style>
