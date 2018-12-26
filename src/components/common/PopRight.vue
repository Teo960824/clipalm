<template>
  <div class="demo"
    v-bind:style="panel">
    <list class="list" :show="true">
      <wxc-button text="相关发帖"
              v-if="detailsStyle"
              type="blue"
              size="full"
              class="submits"
              @wxcButtonClicked="wxcButtonClicked"></wxc-button>
      <cell class="cell">
        <div v-for="(detail, index) in infoPage.details" :key="index">
          <am-list :no-border="false">
            <am-list-item
              :key="index"
              :title="detail.label"
              :brief="`${infoPage.info[detail.title]}`"
              arrow="empty"
              @click="wxcCellClicked(detail)"></am-list-item>
          </am-list>
        </div>
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
        <div v-if="infoPage.showSubRule" v-for="(subRule, index) in infoPage.subRules" :key="`subRules-${index}`">
          <category :title="`${subRule.title}`"></category>
          <am-list :no-border="false">
            <am-list-item v-for="(rule, index) in subRule.rules"
              :key="index"
              :title="rule.label"
              :brief="rule.title"
              @click="wxcCellClicked1(rule)"></am-list-item>
          </am-list>
          <!-- <category v-if="infoPage.showSubRuleTitle2" :title="`--${infoPage.subRuleTitle2}--`"></category>
          <wxc-cell v-for="(rule, index) in infoPage.subRule2"
            :key="`sub2-${index}`"
            :label="rule.label"
            :title="rule.title"
            :has-arrow="rule.hasArrow"
            @wxcCellClicked="wxcCellClicked1(rule)">
          </wxc-cell> -->
        </div>
        <!-- 部位表现特例 -->
        <div v-if="infoPage.showDissRule">
          <category :title="`--${infoPage.dissRuleTitle}--`"></category>
          <wxc-grid-select
            :single="true"
            :cols="5"
            :list="infoPage.dissRule"
            @select="params => wxcCellClicked2(params)">
          </wxc-grid-select>
          </wxc-cell>
          <category v-if="infoPage.showDissRuleTitle2" :title="`--${infoPage.dissRuleTitle2}--`"></category>
          <wxc-grid-select
              v-if="infoPage.showDissRuleTitle2"
              :single="true"
              :cols="5"
              :list="infoPage.dissRule2"
              @select="params => wxcCellClicked2(params)"></wxc-grid-select>
        </div>
        <wxc-button text="相关发帖"
              v-if="detailsStyle"
              type="blue"
              size="full"
              class="submits"
              @wxcButtonClicked="wxcButtonClicked"></wxc-button>
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
    },
    detailsStyle () {
      let style = false
      if (this.activeTab !== 4) {
        console.log(this.activeTab)
        console.log(this.$store.state.Home.infoPages[this.activeTab])
        const details = this.$store.state.Home.infoPages[this.activeTab][0].details
        if (details.length > 0) {
          style = true
        } else {
          style = false
        }
      }
      return style
    }
  },
  methods: {
    wxcCellClicked (detail) {
      console.log(detail)
      // switch (detail.label) {
      //   case '入组DRG':
      //     const drg = this.infoPage.info[detail.title]
      //     getServer(this, this.activeTab, 'statInfo', drg)
      //     break
      //   default:
      //     break
      // }
    },
    wxcCellClicked1 (e) {
      getServer(this, this.activeTab, `${e.menu}`, e.all)
    },
    wxcCellClicked2 ({selectIndex, checked, checkedList}) {
      getServer(this, this.activeTab, `${checkedList[0].menu}`, checkedList[0].all)
    },
    wxcButtonClicked () {
      const module = this.menu
      let name = ''
      let title = ''
      const details = this.$store.state.Home.infoPages[this.activeTab][0].details
      details.map((x) => {
        if (x.label === '名称') {
          name = this.infoPage.info[x.title]
        } else if (x.label === '编码') {
          title = this.infoPage.info[x.title]
        }
      })
      const forumInfo = { module, name, title }
      this.$store.commit('SET_forumInfo', forumInfo)
      switch (this.activeTab) {
        case 1:
          this.$store.commit('SET_menu', [4, '病案讨论'])
          break
        case 2:
          this.$store.commit('SET_menu', [4, '字典交流'])
          break
        case 3:
          this.$store.commit('SET_menu', [4, 'DRG分析'])
          break
      }
      this.$store.commit('SET_showNew', true)
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
  .submits {
    position: relative;
    left: 23px;
    top: 20px;
  }
</style>
