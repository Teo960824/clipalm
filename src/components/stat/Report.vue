<template>
  <div class="container" v-bind:style="panel">
    <div class="count1" v-if="customQueryShowType">
      <wxc-cell v-for="(item, index) in customQuery" v-bind:key="index"
                v-if="item !== undefined"
                :title="index"
                :desc="`${item}`"
                :extraContent="aa(stat, index)"></wxc-cell>
      <!-- <am-list-item
        v-for="(item, index) in customQuery" v-bind:key="index"
        v-if="item !== undefined"
        :title="index"
        :brief="`${item}`"
        :cell-style="cellStyle"
        :extra="aa(stat, index)"></am-list-item> -->
    </div>
    <list @loadmore="fetch" loadmoreoffset="0" v-if="showData">
      <cell class="cell" v-for="(stat, index) in stats" v-bind:key="index">
        <!-- <wxc-cell :label="stat.code"
            @wxcCellClicked="wxcIndexlistItemClicked(stat)"
            :has-margin="false"
            :has-arrow="true"
            :extraContent="stat.name"></wxc-cell> -->
        <am-list no-border>
          <am-list-item
          :title="stat.code"
          @click="wxcIndexlistItemClicked(stat)"
          :cell-style="cellStyle"
          :extra="stat.name"></am-list-item>
        </am-list>
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
          <!-- <wxc-cell
            title="此版本无数据"
            :has-margin="false"
            :has-arrow="false"
            :desc="`当前版本:${user.clipalm_year}-${user.clipalm_version}  用户类型:${user.type}`"
            :arrow-icon="arrawSrc">
          </wxc-cell> -->
        <am-list no-border>
          <am-list-item
            title="此版本无数据"
            arrow="empty"
            :brief="`当前版本:${user.clipalm_year}-${user.clipalm_version}  用户类型:${user.type}`"></am-list-item>
        </am-list>
        </div>
      </cell>
    </list>
    <mini-bar :title="menu" rightIcon="home" leftIcon="back"></mini-bar>
  </div>
</template>

<script>
import { WxcIndexlist, WxcPopup, WxcCell, WxcButton } from 'weex-ui'
import { getDetails } from '../../utils/details'
import { AmListItem, AmList } from 'weex-amui'
import { getServer, customSearch } from '../../utils/server'
import MiniBar from '../common/MiniBar.vue'
const icon = require('../../utils/icon.js')
export default {
  components: { WxcIndexlist, AmListItem, AmList, WxcPopup, WxcCell, MiniBar, WxcButton },
  created: function () {
    this.getData()
  },
  data () {
    return {
      isBottomShow: false,
      height: 400,
      info: {},
      arrawSrc: icon['more'],
      cellStyle: {
        backgroundColor: '#F8F8FF'
      }
    }
  },
  computed: {
    customQueryShowType () {
      return this.$store.state.Home.customQuery[2].show
    },
    customQuery () {
      const query = Object.keys(this.$store.state.Home.customQuery[2].query)
      const obj = {}
      query.map((x) => {
        if (x !== 'tab' && x !== 'page') {
          obj[x] = this.$store.state.Home.customQuery[2].query[x]
        }
      })
      return obj
    },
    user () {
      return this.$store.state.Home.user.data
    },
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
      if (this.stats.length === 0 && this.menu !== '自定义查询结果') {
        getServer(this, this.activeTab, this.menu)
      } else if (this.stats.length === 0 && this.menu === '自定义查询结果') {
        this.$store.commit('SET_showData', false)
      }
    },
    wxcIndexlistItemClicked (e) {
      this.$store.commit('SET_infoLevel', 1)
      const details = getDetails(this, this.menu, e)
      this.$store.commit('SET_info', details)
    },
    fetch () {
      this.$store.commit('SET_statPage', this.$store.state.Stat.statPage + 1)
      if (this.menu === '自定义查询结果') {
        customSearch(this, this.$store.state.Home.customQuery[2].query)
      } else {
        getServer(this, this.activeTab, this.menu)
      }
    },
    aa (title, index) {
      const keys = Object.keys(title)
      const lastKey = keys[keys.length - 1]
      if (lastKey === index) {
        return ''
      } else {
        return '       |'
      }
    }
  }
}
</script>

<style scoped>
  .container {
    width: 750px;
  }
  .count1 {
    margin-top: 91px;
  }
  .submits{
    position: relative;
    left: 210px;
    top: 1
  }
  .count {
    flex-direction: row;
    justify-content: space-around;
    background-color: #F8F8FF;
  }
</style>
