<template>
  <div class="demo"
    v-bind:style="panel">
    <list class="list" :show="true">
      <!-- 当前规则详情 -->
      <cell v-if="infoPage.showInfo">
        <am-list :no-border="false">
          <am-list-item
            v-for="(info, index) in infoPage.info"
            :key="index"
            :title="info.title"
            :brief="info.desc"
            :arrow="info.hasArrow"></am-list-item>
        </am-list>
      </cell>
      <!-- grid规则详情 -->
      <cell>
        <div v-for="(g, index) in infoPage.grid"
              :key="index">
          <category :title="`${index}`"></category>
          <div v-if="index === '分组日志'">
            <wxc-simple-flow :list="g" :themeColor="themeColor"></wxc-simple-flow>
          </div>
          <wxc-grid-select
              v-else-if="Object.keys(g).length !== 0"
              :single="true"
              :cols="1"
              :list="g"></wxc-grid-select>
          <text class="title" style="font-size: 20px;" v-else >无</text>
        </div>
      </cell>
      <!-- 子规则详情 -->
      <cell v-if="infoPage.showSubRule">
        <category v-if="infoPage.subRule.title !== ''" :title="`${infoPage.subRule.title}`"></category>
        <am-list :no-border="false">
          <am-list-item
            v-for="(rule, index) in infoPage.subRule.rules"
            :key="index"
            :title="rule.title"
            :brief="rule.desc"
            :arrow="rule.hasArrow"
            @click="wxcCellClicked(rule)"></am-list-item>
        </am-list>
      </cell>
      <!--  -->
      <cell v-if="infoPage.log">
        <category title="分组日志"></category>
        <wxc-simple-flow :list="infoPage.log" :themeColor="themeColor"></wxc-simple-flow>
      </cell>
      <!-- <am-list :no-border="false" v-if="infoPage.showSubRule">
        <category :title="`${infoPage.subRule.title}`"></category>
        <am-list-item
          v-for="(rule, index) in infoPage.subRule.rules"
          :key="index"
          :title="rule.title"
          :extra="rule.extraContent"
          :brief="rule.desc"
          arrow="empty"
          @click="wxcCellClicked(rule)"></am-list-item>
      </am-list> -->
      <cell>
        <div style="height:200px"></div>
      </cell>
    </list>
    <mini-bar :title="title" rightIcon="home" leftIcon="back"></mini-bar>
  </div>
</template>
<script>
import { WxcCell, WxcButton, WxcGridSelect, WxcSimpleFlow } from 'weex-ui'
import { AmListItem, AmList } from 'weex-amui'
import { getServer } from '../../utils/server'
import MiniBar from '../common/MiniBar.vue'
import Category from '../common/category.vue'
import { getDetails } from '../../utils/details'
// const modal = weex.requireModule('modal')
export default {
  components: { WxcCell, WxcButton, AmListItem, AmList, WxcGridSelect, WxcSimpleFlow, MiniBar, Category },
  props: {
    page: ''
  },
  data () {
    return {
      themeColor: {
        lineColor: '#bf280b',
        pointInnerColor: '#b95048',
        pointBorderColor: '#bf280b',
        highlightTitleColor: '#bf280b',
        highlightPointInnerColor: '#bf280b',
        highlightPointBorderColor: '#d46262'
      }
    }
  },
  computed: {
    activeTab () {
      return this.$store.state.Home.activeTab
    },
    menu () {
      return this.$store.state.Home.menu[this.activeTab]
    },
    infoLevel () {
      return this.$store.state.Home.infoLevel[this.activeTab] - 1
    },
    infoPage () {
      let infoPage = this.$store.state.Home.infoPages[this.activeTab][this.infoLevel]
      if (!infoPage) {
        infoPage = {}
      }
      // modal.toast({ 'message': infoPage.info, 'duration': 1 })
      return infoPage
    },
    title () {
      return this.infoPage.title
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
    wxcCellClicked (e) {
      const infoLevel = this.$store.state.Home.infoLevel[this.activeTab]
      if (['未入组病历详情', 'QY病历详情', '低风险死亡病历详情', '费用异常病历详情', '填报异常病历详情'].includes(e.menu)) {
        this.$store.commit('SET_infoLevel', infoLevel + 1)
        const details = getDetails(this, e.menu, e.all)
        this.$store.commit('SET_info', details)
      } else {
        getServer(this, this.activeTab, `${e.menu}`, e.all)
      }
    },
    wxcCellClicked1 (e) {
      getServer(this, this.activeTab, `${e.menu}`, e.all)
    },
    wxcCellClicked2 ({selectIndex, checked, checkedList}) {
      getServer(this, this.activeTab, `${checkedList[0].menu}`, checkedList[0].all)
    }
  }
}
</script>
<style scoped>
  .demo {
    width: 750px;
    /* background-color: #f2f3f4; */
  }
  .text {
    font-size: 35px;
  }
  .title {
    text-align: center;
    font-size: 35px;
  }
  .btns {
    margin-left: 200px;
  }
  .list {
    margin-top: 91px;
  }
</style>
