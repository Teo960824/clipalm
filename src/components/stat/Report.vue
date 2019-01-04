<template>
  <div class="container" v-bind:style="panel">
    <mini-bar :title="menu" rightIcon="home" leftIcon="back"></mini-bar>
    <div class="count1"></div>
    <div class="count" v-if="customQueryShowType">
      <wxc-cell v-for="(item, index) in customQuery" v-bind:key="index"
                v-if="item !== undefined"
                :title="index"
                :desc="`${item}`"></wxc-cell>
    </div>
    <list @loadmore="fetch" loadmoreoffset="0" v-if="showData">
      <cell class="cell" v-for="(stat, index) in stats" v-bind:key="index">
        <am-list :no-border="false">
          <am-list-item
          v-if="menu.includes('机构分析')"
          :title="stat.code"
          @click="wxcIndexlistItemClicked(stat)"
          :cell-style="cellStyle"
          :brief="`机构ID：${stat.name}`"></am-list-item>
          <am-list-item
          v-else
          :title="stat.code"
          @click="wxcIndexlistItemClicked(stat)"
          :cell-style="cellStyle"
          :brief="stat.name"></am-list-item>
        </am-list>
      </cell>
      <cell style="height:200px" v-if="showMore">
        <am-nav-bar
          mode="light"
          title="加载更多"
          :left-btn="[]"
          :right-btn="[]"
          @click="fetch">
        </am-nav-bar>
      </cell>
    </list>
    <list class="list" loadmoreoffset="20" v-else>
      <cell>
        <div class="panel">
          <am-list :no-border="false">
            <am-list-item
              title="此版本无数据"
              arrow="empty"></am-list-item>
            <am-list-item
              title="修改年份或版本试试?"
              arrow="empty"
              :brief="`当前版本:${user.clipalm_year}-${user.clipalm_version}  用户类型:${user.type}`"></am-list-item>
          </am-list>
        </div>
      </cell>
    </list>
  </div>
</template>

<script>
import { WxcIndexlist, WxcPopup, WxcCell, WxcButton } from 'weex-ui'
import { getDetails } from '../../utils/details'
import { AmListItem, AmList, AmNavBar } from 'weex-amui'
import { getServer, customSearch } from '../../utils/server'
import MiniBar from '../common/MiniBar.vue'
const icon = require('../../utils/icon.js')
export default {
  components: { WxcIndexlist, AmListItem, AmList, WxcPopup, WxcCell, MiniBar, WxcButton, AmNavBar },
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
      console.log(this.$store.state.Stat.statDrg)
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
      let type = ''
      if (this.menu === 'DRG基础') {
        type = 'MDC分析'
      } else if (['DRG机构分析-年', 'DRG机构分析-半年', 'DRG机构分析-季度', 'DRG机构分析-月'].includes(this.menu)) {
        type = 'DRG机构分析'
      } else {
        type = this.menu
      }
      const details = getDetails(this, type, e)
      this.$store.commit('SET_info', details)
    },
    fetch () {
      this.$store.commit('SET_statPage', this.$store.state.Stat.statPage + 1)
      if (this.menu !== 'DRG基础') {
        if (this.menu === '自定义查询结果') {
          customSearch(this, this.$store.state.Home.customQuery[2].query)
        } else {
          getServer(this, this.activeTab, this.menu)
        }
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
    margin-top: 90px;
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
