<template>
  <div class="demo"
    @swipe="swipe"
    v-bind:style="panel">
    <list class="list" :show="true">
      <cell class="cell">
        <div v-for="(detail, index) in infoPage.details" :key="index">
          <wxc-cell
            :key="index"
            :label="detail.label"
            :title="`${infoPage.info[detail.title]}`"
            :has-arrow="detail.hasArrow"
            @wxcCellClicked="wxcCellClicked(detail)"
            ></wxc-cell>
        </div>
        <div v-for="(g, index) in infoPage.grid"
              :key="index">
          <category :title="`--${index}--`"></category>
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
        <div v-if="infoPage.showSubRule">
          <category :title="`--${infoPage.subRuleTitle}--`"></category>
          <wxc-cell v-for="(rule, index) in infoPage.subRule"
            :key="index"
            :label="rule.label"
            :title="rule.title"
            :has-arrow="rule.hasArrow"
            @wxcCellClicked="wxcCellClicked1(rule)">
          </wxc-cell>
          <category v-if="infoPage.showSubRuleTitle2" :title="`--${infoPage.subRuleTitle2}--`"></category>
          <wxc-cell v-for="(rule, index) in infoPage.subRule2"
            :key="`sub2-${index}`"
            :label="rule.label"
            :title="rule.title"
            :has-arrow="rule.hasArrow"
            @wxcCellClicked="wxcCellClicked1(rule)">
          </wxc-cell>
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
        <div style="height:200px"></div>
      </cell>
    </list>
    <mini-bar :title="title" rightIcon="home" leftIcon="left" rightButtonShow="true"></mini-bar>
  </div>
</template>
<script>
import { WxcCell, WxcButton, WxcGridSelect, WxcSimpleFlow } from 'weex-ui'
import { getServer } from '../../utils/server'
import MiniBar from '../common/MiniBar.vue'
import Category from '../common/category.vue'
// const modal = weex.requireModule('modal')
export default {
  components: { WxcCell, WxcButton, WxcGridSelect, WxcSimpleFlow, MiniBar, Category },
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
