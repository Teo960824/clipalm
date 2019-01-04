<template>
  <div class="demo" v-bind:style="panel">
    <mini-bar :title="menu" :rightIcon="['search', 'home']" :leftIcon="[]"></mini-bar>
    <div v-for="(v, i) in menus" :key="`menus${i}`">
      <div v-for="(text, i) in v" :key="`menus${i}`">
        <category :title="i"></category>
        <!-- <div class="demos">
          <wxc-cell :has-arrow="false"
                    :has-top-border="false"
                    :auto-accessible="false">
            <image class="image"
                  slot="label"
                  :src="title"></image>
            <text class="red"
                  style="backgroud-color: white;"
                  slot="title">{{i}}
            </text>
          </wxc-cell>
        </div> -->
        <!-- <am-list style="width:750px;">
          <am-list-item
            :title="    i"
            arrow="empty">
          </am-list-item>
        </am-list> -->
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
import { AmGrid, AmList, AmListItem } from 'weex-amui'
import MiniBar from '../common/MiniBar.vue'
import Category from '../common/category.vue'
import { getServer } from '../../utils/server'
const modal = weex.requireModule('modal')
const icon = require('../../utils/icon.js')
export default {
  components: { AmGrid, WxcButton, AmList, AmListItem, WxcSpecialRichText, WxcRichText, Category, MiniBar, WxcPopover, WxcCell, WxcTag, WxcIcon, WxcGridSelect },
  data () {
    return {
      height: Utils.env.getPageHeight() - 120,
      customStyles: {
        lineSpacing: '14px',
        color: '#333333',
        checkedColor: '#ffffff',
        disabledColor: '#eeeeee',
        checkedBorderColor: '#ffb200',
        backgroundColor: '#ffffff',
        checkedBackgroundColor: '#ffb200'
      },
      selection: [],
      title: icon('title')
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
        case 0:
          this.$store.commit('SET_libraryPage', 1)
          this.$store.commit('SET_rule', [])
          break
        case 2:
          this.$store.commit('SET_statPage', 1)
          this.$store.commit('SET_statDrg', [])
          break
        case 3:
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
  .demos {
    font-size: 50px;
    height: 50px;
    text-align: center;
  }
  .image {
    width: 7px;
    height: 27px;
    margin-right: 20px;
  }
</style>
