<template>
  <div class="container" v-bind:class="container">
    <div class="count1"></div>
    <div class="count" v-if="customQueryShowType">
      <wxc-cell v-for="(item, index) in customQuery" v-bind:key="index"
                v-if="item !== undefined"
                :title="index"
                :desc="`${item}`"
                :cell-style="cellStyle"
                :extraContent="aa(customQuery, index)"></wxc-cell>
    </div>
    <list @loadmore="fetch" loadmoreoffset="20" v-if="showData">
      <cell class="cell" v-for="(rule, index) in rules" v-bind:key="index">
        <am-list :no-border="false">
          <am-list-item
            :title="rule.code"
            :brief="rule.desc"
            @click="wxcIndexlistItemClicked(rule)"></am-list-item>
        </am-list>
      </cell>
      <cell style="height:200px">
        <wxc-button text="加载更多"
          class="submits"
          size="big"
          v-if="showMore"
          @wxcButtonClicked="fetch"></wxc-button>
      </cell>
    </list>
    <list class="list" loadmoreoffset="20" v-else>
      <cell>
        <div class="panel" @longpress="longpress(wt4)" style="font-size:10px;">
          <am-list :no-border="false">
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
import { WxcCell, WxcButton } from 'weex-ui'
import { AmListItem, AmList } from 'weex-amui'
import { getDetails } from '../../utils/details'
import { getServer, customSearch } from '../../utils/server'
import MiniBar from '../common/MiniBar.vue'
import PopRight from '../common/PopRight.vue'
// const modal = weex.requireModule('modal')
const icon = require('../../utils/icon.js')
export default {
  components: { WxcCell, MiniBar, PopRight, AmListItem, WxcButton, AmList },
  data () {
    return {
      height: 400,
      isShow: false,
      arrawSrc: icon['more'],
      show: false,
      page: {},
      cellStyle: {
        backgroundColor: '#F8F8FF'
      }
    }
  },
  created () {
    this.getData()
  },
  computed: {
    customQueryShowType () {
      return this.$store.state.Home.customQuery[1].show
    },
    customQuery () {
      const query = Object.keys(this.$store.state.Home.customQuery[1].query)
      const obj = {}
      query.map((x) => {
        if (x !== 'tab' && x !== 'page') {
          obj[x] = this.$store.state.Home.customQuery[1].query[x]
        }
      })
      return obj
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
      return this.$store.state.Home.showMore
    },
    user () {
      return this.$store.state.Home.user.data
    },
    rules () {
      return this.$store.state.Library.rule
    },
    container () {
      const tabPageHeight = weex.config.env.deviceHeight + 200
      const style = {
        height: tabPageHeight
      }
      return style
    }
  },
  updated: function () {
  },
  methods: {
    getData () {
      if (this.rules.length === 0 && this.menu !== '自定义查询结果') {
        getServer(this, this.activeTab, this.menu)
      } else if (this.rules.length === 0 && this.menu === '自定义查询结果') {
        this.$store.commit('SET_showData', false)
      }
    },
    wxcIndexlistItemClicked (e) {
      let type = ''
      switch (this.menu) {
        case 'CN-DRG':
          type = 'MDC'
          break
        default:
          type = this.menu
      }
      const details = getDetails(this, type, e)
      this.show = true
      this.page = details
      this.$store.commit('SET_infoLevel', 1)
      this.$store.commit('SET_info', details)
    },
    fetch () {
      if (this.menu !== 'MDC') {
        this.$store.commit('SET_libraryPage', this.$store.state.Library.page + 1)
        if (this.menu === '自定义查询结果') {
          console.log(this.$store.state.Home.customQuery)
          customSearch(this, this.$store.state.Home.customQuery[1].query)
        } else {
          getServer(this, this.activeTab, this.menu)
        }
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
  .list {
    margin-top: 91px;
  }
  .submits{
    position: relative;
    left: 210px;
    top: 1
  }
  .count1 {
    flex-direction: row;
    justify-content: space-around;
    background-color: #F8F8FF;
    margin-top: 91px;
  }
  .count {
    flex-direction: row;
    justify-content: space-around;
    background-color: #F8F8FF;
  }
</style>
