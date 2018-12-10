<template>
  <div class="container" v-bind:style="panel">
    <list class="list" @loadmore="fetch" loadmoreoffset="0" v-if="showData">
      <cell class="cell" v-for="(stat, index) in stats" v-bind:key="index">
        <wxc-cell :label="stat.code"
            @wxcCellClicked="wxcIndexlistItemClicked(stat)"
            :has-margin="false"
            :has-arrow="true"
            :extraContent="stat.desc"></wxc-cell>
      </cell>
      <cell style="height:200px" v-if="showMore">
        <wxc-button text="加载更多"
          class="submits"
          size="big"
          @wxcButtonClicked="fetch"></wxc-button>
      </cell>
    </list>
    <list class="list" loadmoreoffset="20" v-else>
      <cell>
        <div class="panel">
          <wxc-cell
            title="无数据"
            :has-margin="false"
            :has-arrow="false"
            :arrow-icon="arrawSrc">
          </wxc-cell>
        </div>
      </cell>
    </list>
    <mini-bar :title="menu" rightIcon="home" leftIcon="left" rightButtonShow="true"></mini-bar>
  </div>
</template>

<script>
import { WxcIndexlist, WxcPopup, WxcCell, WxcButton } from 'weex-ui'
import { getDetails } from '../../utils/details'
import { getServer } from '../../utils/server'
import MiniBar from '../common/MiniBar.vue'
export default {
  components: { WxcIndexlist, WxcPopup, WxcCell, MiniBar, WxcButton },
  created: function () {
    this.getData()
  },
  data () {
    return {
      isBottomShow: false,
      height: 400,
      info: {}
    }
  },
  computed: {
    activeTab () {
      return this.$store.state.Home.activeTab
    },
    menu () {
      return this.$store.state.Home.menu[this.activeTab]
    },
    showData () {
      return this.$store.state.Home.showData
    },
    showMore () {
      let show = false
      if (['DRG机构分析-年', 'DRG机构分析-半年', 'DRG机构分析-季度', 'DRG机构分析-月'].includes(this.menu)) {
        show = false
      } else {
        show = this.$store.state.Home.showMore
      }
      return show
    },
    stats () {
      return this.$store.state.Stat.statDrg
    },
    panel () {
      const tabPageHeight = weex.config.env.deviceHeight
      const style = {
        height: tabPageHeight
      }
      return style
    }
  },
  methods: {
    getData () {
      if (this.stats.length === 0) {
        getServer(this, this.activeTab, this.menu)
      }
    },
    wxcIndexlistItemClicked (e) {
      this.$store.commit('SET_infoLevel', 1)
      const details = getDetails(this, this.menu, e)
      this.$store.commit('SET_info', details)
    },
    fetch () {
      this.$store.commit('SET_statPage', this.$store.state.Stat.statPage + 1)
      getServer(this, this.activeTab, this.menu)
    }
  }
}
</script>

<style scoped>
  .container {
    width: 750px;
  }
  .list {
    margin-top: 91px;
  }
  .submits{
    position: relative;
    left: 210px;
    top: 1
  }
</style>
