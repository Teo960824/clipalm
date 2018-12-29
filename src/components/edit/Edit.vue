<template>
  <div class="demo" v-bind:style="panel">
    <div class="count" v-if="showStat" style="backgroundColor: #FFFFFF">
      <wxc-cell v-for="(item, index) in stat" v-bind:key="index"
                :title="index"
                :desc="`${item}`"
                :cell-style="cellStyle"></wxc-cell>
    </div>
    <div class="count1" v-if="customQueryShowType">
      <wxc-cell v-for="(item, index) in customQuery" v-bind:key="index"
                v-if="item !== undefined"
                :title="index"
                :desc="`${item}`"
                :cell-style="cellStyle"></wxc-cell>
    </div>
    <!-- <text class="demo-title"  v-if="wt4Case.length !== 0">{{title.count}}</text> -->
    <list class="list" @loadmore="fetch" loadmoreoffset="20" v-if="showData">
      <cell @longpress="test">
        <am-list :no-border="false" v-if="menu==='填报异常病历'">
          <am-list-item
            v-for="(wt4, index) in wt4Case"
            :key="index"
            :title="wt4.disease_code"
            :brief="`性别:${wt4.gender}·年龄:${wt4.age}·费用:${wt4.total_expense}·住院天数:${wt4.acctual_days}天`"
            @click="wxcCellClicked(wt4)"></am-list-item>
        </am-list>
        <am-list :no-border="false" v-else>
          <am-list-item
            v-for="(wt4, index) in wt4Case"
            :key="index"
            :title="wt4.code"
            :brief="`病历数:${wt4.num_sum}`"
            @click="wxcCellClicked(wt4)"></am-list-item>
        </am-list>
      </cell>
      <cell style="height:200px" v-if="showMore">
        <!-- <wxc-button text="加载更多"
          class="submits"
          size="big"
          @wxcButtonClicked="fetch"></wxc-button> -->
      </cell>
    </list>
    <list class="list" loadmoreoffset="20" v-else>
      <cell style="height:90px">
      </cell>
      <cell>
        <div class="panel" @longpress="longpress(wt4)">
          <am-list :no-border="false">
            <am-list-item
              :title="`${user.data.type}无法查询卫生局病历数据`"
              arrow="empty"
              :brief="`当前版本:${user.data.clipalm_year}-${user.data.clipalm_version}  用户类型:${user.data.type}`"></am-list-item>
          </am-list>
        </div>
      </cell>
    </list>
    <mini-bar :title="menu" rightIcon="home" leftIcon="back"></mini-bar>
  </div>
</template>

<script>
import { WxcRichText, WxcSpecialRichText, WxcPopup, WxcCell, WxcIndexlist, WxcLoading, WxcPartLoading, WxcButton } from 'weex-ui'
import { getServer, customSearch } from '../../utils/server'
import { AmListItem, AmList } from 'weex-amui'
import { getDetails } from '../../utils/details'
import MiniBar from '../common/MiniBar.vue'
import Category from '../common/category.vue'
const icon = require('../../utils/icon.js')
export default {
  components: { WxcIndexlist, AmListItem, AmList, WxcRichText, WxcSpecialRichText, WxcPopup, WxcCell, WxcLoading, WxcPartLoading, WxcButton, MiniBar, Category },
  data () {
    return {
      forceValue: 0,
      refreshing: false,
      arrawSrc: icon['more'],
      cellStyle: {
      },
      showData: true
    }
  },
  created () {
    this.getData()
  },
  computed: {
    customQueryShowType () {
      return this.$store.state.Home.customQuery[0].show
    },
    custom () {
      return this.$store.state.Home.customQuery
    },
    customQuery () {
      const query = Object.keys(this.$store.state.Home.customQuery[0].query)
      const obj = {}
      query.map((x) => {
        if (x !== 'tab' && x !== 'page') {
          obj[x] = this.$store.state.Home.customQuery[0].query[x]
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
    wt4Case () {
      return this.$store.state.Edit.wt4Case
    },
    showStat () {
      let show = false
      if (this.wt4Case.length > 0) {
        show = true
      }
      return show
    },
    showMore () {
      return this.$store.state.Home.showMore
    },
    user () {
      // console.log(this.$store.state.Home.user)
      return this.$store.state.Home.user
    },
    stat () {
      return this.$store.state.Edit.wt4Info
    },
    panel: {
      get () {
        const tabPageHeight = weex.config.env.deviceHeight
        const style = {
          height: tabPageHeight
        }
        return style
      }
    }
  },
  methods: {
    wxcRichTextLinkClick () {},
    getData () {
      const i = this.$store.state.Home.activeTab
      const menu = this.$store.state.Home.menu[i]
      if (this.wt4Case.length === 0 && this.user.data.type !== '个人用户') {
        getServer(this, i, menu)
        this.showData = true
      } else if (this.user.data.type === '个人用户') {
        this.showData = false
      }
    },
    wxcCellClicked (e) {
      // this.$store.commit('SET_infoLevel', 1)
      // const details = getDetails(this, this.menu, e)
      // this.$store.commit('SET_info', details)
      if (['未入组病历', 'QY病历', '低风险死亡病历', '费用异常病历'].includes(this.menu)) {
        getServer(this, this.activeTab, `${this.menu}列表`, e)
      } else {
        this.$store.commit('SET_infoLevel', 1)
        const details = getDetails(this, this.menu, e)
        this.$store.commit('SET_info', details)
      }
    },
    fetch () {
      this.$store.commit('SET_wt4Page', this.$store.state.Edit.wt4Page + 1)
      if (this.menu === '自定义查询结果') {
        customSearch(this, this.$store.state.Home.customQuery[0].query)
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
        return '      |'
      }
    }
  }
}
</script>

<style scoped>
  .demo {
    width: 750px;
  }
  .submits{
    position: relative;
    left: 210px;
    top: 1
  }
  .count {
    flex-direction: row;
    justify-content: space-around;
    margin-top: 91px;
  }
  .count1 {
    flex-direction: row;
    justify-content: space-around;
  }
</style> -->
