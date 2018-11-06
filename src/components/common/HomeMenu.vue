<template>
  <div class="demo">
    <wxc-button class="submits"
      v-for="(menu, index) in menus" :key="index"
      :text="menu"
      type="white"
      @wxcButtonClicked="wxcButtonClicked(menu)"></wxc-button>
    <!-- <wxc-cell
        :label="menu"
        :title="menu"
        :has-arrow="false"
        :has-margin="true"
        @wxcCellClicked="wxcCellClicked(menu)"></wxc-cell> -->
  </div>
</template>

<script>
import { WxcPopup, WxcCell, Utils, WxcButton } from 'weex-ui'
import { getServer } from '../../utils/server'

export default {
  components: { WxcPopup, WxcCell, WxcButton },
  data () {
    return {
      height: Utils.env.getPageHeight() - 120
    }
  },
  computed: {
    visible () {
      return this.$store.state.Home.visible
    },
    menus () {
      return this.$store.state.Home.menus
    }
  },
  methods: {
    wxcRichTextLinkClick () {
    },
    popupOverlayBottomClick () {
      this.$store.commit('SET_visible', false)
    },
    wxcButtonClicked (menu) {
      this.$store.commit('SET_visible', false)
      const i = this.$store.state.Home.activeTab
      this.$store.commit('SET_menu', [i, menu])
      this.$store.commit('SET_miniBarTitle', `${menu}`)
      if (['未入组病历', '低风险死亡病历', '高CV病历', 'QY病历', '单条分组'].includes(menu)) {
        this.$store.commit('SET_editMenu', menu)
        this.$store.commit('SET_wt4Page', 1)
        this.$store.commit('SET_wt4Case', [])
        this.$store.commit('SET_wt4Info', '')
        getServer(this, 'all', menu)
      } else if (menu === '自定义查询') {
      } else if (['MDC', 'ADRG', 'DRG', 'ICD10', 'ICD9'].includes(menu)) {
        this.$store.commit('SET_library_menu', menu)
        getServer(this, 'all', menu)
      } else if (menu === '论坛') {
        this.$store.commit('SET_post', [])
        this.$store.commit('SET_forumPage', 1)
        this.$store.commit('SET_forumMenu', menu)
        getServer(this, 'all', '论坛', null)
      } else {
        getServer(this, 'all', menu)
      }
    }
  }
}
</script>
<style scoped>
  .demo-title {
    font-size: 28px;
    background-color: #C6E2FF;
    text-align: center;
    border-style: solid;
    border-width: 1px;
    border-radius: 14px;
    padding: 10px;
  }
  .demo {
    width: 750px;
    height: 1250px;
    margin-top: 140px;
  }
  .row {
    width: 750px;
  }
  .submits{
    position: relative;
    left: 23px;
    margin-top: 30px;
    margin-bottom: 30px;
  }
</style>
