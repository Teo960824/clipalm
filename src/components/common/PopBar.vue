<template>
  <wxc-popup popup-color="#FFFFFF"
            :show="visible"
            @wxcPopupOverlayClicked="popupOverlayBottomClick"
            pos="bottom"
            :height="height"
            width="540">
    <div class="demo-content">
    <wxc-cell v-for="(menu, index) in menus" :key="index"
        :label="menu"
        :title="menu"
        :has-arrow="false"
        :has-margin="true"
        @wxcCellClicked="wxcCellClicked(menu)"></wxc-cell>
    </div>
  </wxc-popup>
</template>

<script>
import { WxcPopup, WxcCell, Utils } from 'weex-ui'
import { getServer } from '../../utils/server'

export default {
  components: { WxcPopup, WxcCell },
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
    wxcCellClicked (menu) {
      this.$store.commit('SET_visible', false)
      const i = this.$store.state.Home.activeTab
      this.$store.commit('SET_menu', [i, menu])
      if (['未入组病历', '低风险死亡病历', '高CV病历', 'QY病历'].includes(menu)) {
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
