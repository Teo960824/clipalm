<template>
  <div class="container" v-bind:class="container">
    <mini-bar :title="menu" :rightIcon="['filter', 'home']" :leftIcon="['left']"></mini-bar>
    <div>
      <div class="count1"></div>
      <div class="count" v-if="customQueryShowType">
        <wxc-cell v-for="(item, index) in customQuery" v-bind:key="index"
                  v-if="item !== undefined"
                  :title="index"
                  :desc="`${item}`"
                  :cell-style="cellStyle"></wxc-cell>
      </div>

      <text style="font-size:90px">{{showFilter}}</text>
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
          <am-nav-bar
            mode="light"
            title="加载更多"
            v-if="showMore"
            :left-btn="[]"
            :right-btn="[]"
            @click="fetch">
          </am-nav-bar>
        </cell>
      </list>
      <list class="list" loadmoreoffset="20" v-else>
        <cell>
          <div class="panel" @longpress="longpress(wt4)" style="font-size:10px;">
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
    <am-popup
        :show.sync="showFilter"
        position="right"
        width="500"
      >
        <text :style="{fontSize: '40px'}">版本</text>
        <am-button
          type="warning"
        >点我关闭</am-button>
      </am-popup>
  </div>
</template>

<script>
import { WxcCell, WxcButton } from 'weex-ui'
import { AmListItem, AmList, AmNavBar, AmPopup } from 'weex-amui'
import { getDetails } from '../../utils/details'
import { getServer, customSearch } from '../../utils/server'
import MiniBar from '../common/MiniBar.vue'
// const modal = weex.requireModule('modal')
const icon = require('../../utils/icon.js')
export default {
  components: { WxcCell, MiniBar, AmPopup, AmListItem, WxcButton, AmList, AmNavBar },
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
    },
    showFilter () {
      console.log(this.$store.state.Home.showFilter)
      return this.$store.state.Home.showFilter
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
      if (this.menu === 'CN-DRG') {
        type = 'MDC规则'
      } else if (['疾病/诊断术语', 'GB-ICD10', 'BJ-ICD10'].includes(this.menu)) {
        type = 'ICD10'
      } else if (['手术/操作术语', 'GB-ICD9', 'BJ-ICD9'].includes(this.menu)) {
        type = 'ICD9'
      } else {
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
          customSearch(this, this.$store.state.Home.customQuery[1].query)
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
  .list {
    /* margin-top: 91px; */
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
    /* margin-top: 91px; */
  }
  .count {
    flex-direction: row;
    justify-content: space-around;
    background-color: #F8F8FF;
  }
</style>
