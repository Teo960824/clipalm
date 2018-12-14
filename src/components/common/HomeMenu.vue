<template>
  <div class="demo" v-bind:style="panel">
    <mini-bar :title="menu" rightIcon="home" leftIcon="search"></mini-bar>
    <div class="bigdiv" v-for="(v, i) in menus" :key="`menus${i}`">
      <div v-for="(text, i) in v" :key="`menus${i}`">
        <category :title="i"></category>
        <am-grid
          @click="wxcButtonClicked"
          :data="genGrid(text)"
          :column-num="4"
        ></am-grid>
      </div>
    </div>
  </div>
</template>

<script>
import { Utils, WxcSpecialRichText, WxcButton, WxcRichText, WxcPopover, WxcCell, WxcTag, WxcIcon, WxcGridSelect } from 'weex-ui'
import { AmGrid } from 'weex-amui'
import MiniBar from '../common/MiniBar.vue'
import Category from '../common/category.vue'
import { getServer } from '../../utils/server'
const modal = weex.requireModule('modal')
const icon = require('../../utils/icon.js')
export default {
  components: { AmGrid, WxcButton, WxcSpecialRichText, WxcRichText, Category, MiniBar, WxcPopover, WxcCell, WxcTag, WxcIcon, WxcGridSelect },
  data () {
    return {
      height: Utils.env.getPageHeight() - 120,
      customStyles: {
        lineSpacing: '14px',
        icon: '',
        color: '#333333',
        checkedColor: '#ffffff',
        disabledColor: '#eeeeee',
        checkedBorderColor: '#ffb200',
        backgroundColor: '#ffffff',
        checkedBackgroundColor: '#ffb200'
      },
      selection: []
    }
  },
  computed: {
    menus () {
      return this.$store.state.Home.menus
    },
    activeTab () {
      return this.$store.state.Home.activeTab
    },
    menu () {
      return this.$store.state.Home.menu[this.activeTab]
    },
    panel () {
      const tabPageHeight = weex.config.env.deviceHeight
      const style = {
        height: tabPageHeight
      }
      return style
    },
    user () {
      return this.$store.state.Home.user
    },
    list () {
      let value = []
      switch (this.activeTab) {
        case 1:
          value = [
            {'title': '入组DRG'},
            {'title': '主要诊断'},
            {'title': '其他诊断'},
            {'title': '住院天数'},
            {'title': '住院总费用'},
            {'title': '年龄'}]
          break
        case 2:
          value = [
            {'title': '编码'},
            {'title': '名称'},
            {'title': '年份'}]
          break
        case 3:
          value = [
            {'title': '编码'},
            {'title': '年份'},
            {'title': '版本'},
            {'title': '平均费用'},
            {'title': '平均住院天数'},
            {'title': '病例数'},
            {'title': '费用变异系数'},
            {'title': '时间变异系数'},
            {'title': '权重'}]
          break
        default:
          break
      }
      return value
    }
  },
  methods: {
    genGrid (menu) {
      const datas = menu.map((x) => {
        const iconPath = icon(x)
        return { text: x, icon: iconPath }
      })
      return datas
    },
    wxcButtonClicked (menu) {
      menu = menu.text
      this.$store.commit('SET_customQuery', [this.activeTab - 1, {show: false, query: {}}])
      switch (this.activeTab) {
        case 1:
          this.$store.commit('SET_wt4Page', 1)
          this.$store.commit('SET_wt4Case', [])
          break
        case 2:
          this.$store.commit('SET_libraryPage', 1)
          this.$store.commit('SET_rule', [])
          break
        case 3:
          this.$store.commit('SET_statPage', 1)
          this.$store.commit('SET_statDrg', [])
          break
        case 4:
          this.$store.commit('SET_post', [])
          this.$store.commit('SET_forumModule', menu)
          break
      }
      if (['年', '半年', '季度', '月'].includes(menu)) {
        menu = `DRG机构分析-${menu}`
      }
      this.$store.commit('SET_menu', [this.activeTab, menu])
    },
    wxcRichTextLinkClick (i) {
      this.$store.commit('SET_menu', [this.$store.state.Home.activeTab, '帖子'])
      this.$store.commit('SET_forumIndex', i)
      getServer(this, this.activeTab, '帖子', this.posts[i])
    },
    popoverButtonClicked (obj) {
      modal.toast({ 'message': `key:${obj.key}, index:${obj.index}`, 'duration': 1 })
    },
    wxcButtonClickedMenu (ref) {
      this.$refs[ref].wxcPopoverShow()
    }
  }
}
</script>
<style scoped>
  .demo {
    width: 750px;
    /* flex-direction: column;
    align-items: center; */
    /* justify-content: center; */
  }
  .bigdiv {
    margin-top: 90px;
    /* width: 550px; */
  }
</style>
