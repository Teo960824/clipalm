<template>
  <div class="demo" v-bind:style="panel">
    <mini-bar :title="menu" rightIcon="home" leftIcon="left" rightButtonShow="true"></mini-bar>
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
import { Utils, WxcSpecialRichText, WxcButton, WxcRichText, WxcPopover, WxcCell, WxcTag, WxcIcon } from 'weex-ui'
import { AmGrid } from 'weex-amui'
import MiniBar from '../common/MiniBar.vue'
import Category from '../common/category.vue'
import { getServer } from '../../utils/server'
const modal = weex.requireModule('modal')
const urlConfig = require('../../utils/config.js')
const iconConfig = require('../../utils/icon.js')
export default {
  components: { AmGrid, WxcButton, WxcSpecialRichText, WxcRichText, Category, MiniBar, WxcPopover, WxcCell, WxcTag, WxcIcon },
  data () {
    return {
      height: Utils.env.getPageHeight() - 120,
      iconUrl: `${urlConfig.static}/images`
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
    }
  },
  methods: {
    genGrid (menu) {
      const datas = menu.map((x) => {
        const icon = `${this.iconUrl}/${iconConfig[x]}`
        return { text: x, icon: icon }
      })
      return datas
    },
    wxcButtonClicked (menu) {
      menu = menu.text
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
    },
    onSelect (params) {
      console.log(params)
    }
  }
}
</script>
<style scoped>
  .demo-title {
    font-size: 28px;
    background-color: #F8F8FF;
    text-align: center;
    border-style: solid;
    border-width: 1px;
    border-radius: 14px;
    padding: 5px;
  }
  .demo {
    width: 750px;
    /* flex-direction: column;
    align-items: center; */
    /* justify-content: center; */
  }
  .submits {
    position: relative;
    left: 23px;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .submitss {
    position: relative;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .panel {
    margin-top: 140px;
  }
  .demo1 {
    margin-top: 50px;
    margin-left: 20px;
  }
  .title {
    text-align: center;
    height: 40px;
    font-size: 35px;
    background-color: rgb(224, 221, 220)
  }
  .special-rich {
    margin-top: 14px;
  }
  .bigdiv {
    margin-top: 91px;
    /* width: 550px; */
  }
  .item{
    flex:1;
    align-items: center;
    /* border-width: 2px 1px 2px 1px; */
    border-left-width: 2px;
    border-right-width: 2px;
    border-top-width: 2px;
    border-bottom-width: 2px;
    border-style: solid;
    border-color: gray;
    margin: 20px;
    background-color: #87CEFF;
  }
  .row{
    flex-direction: row;
    width: 740px;
  }
  .text {
    font-size: 27px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .icon {
    margin-top: 20px;
  }
</style>
