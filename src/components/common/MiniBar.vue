<template>
  <div class="wxc-demo">
    <scroller class="scroller">
      <div class="demo">
        <wxc-minibar :title="title"
                    background-color="#009ff0"
                    text-color="#FFFFFF"
                    :show="isShow"
                    left-button=""
                    :use-default-return="false"
                    @wxcMinibarRightButtonClicked="homeButtonClick"
                    @wxcMinibarLeftButtonClicked="leftButtonClick">
          <image :src="`${url.static}/images/${leftIcon}2.png`"
                 slot="left"
                 v-if="leftButtonShow"
                 style="height: 48px;width: 88px;"></image>
          <image :src="`${url.static}/images/${rightIcon}2.png`"
                 slot="right"
                 v-if="rightButtonShow"
                 style="height: 48px;width: 88px;"></image>
        </wxc-minibar>
      </div>
    </scroller>
  </div>
</template>

<script>
import { WxcMinibar } from 'weex-ui'
// const modal = weex.requireModule('modal')
const urlConfig = require('../../utils/config.js')
export default {
  components: { WxcMinibar },
  props: {
    title: '',
    rightIcon: '',
    leftIcon: '',
    rightButtonShow: ''
  },
  data () {
    return {
      rightButton: '',
      leftButton: '',
      isBottomShow: false,
      url: urlConfig
    }
  },
  created () {
  },
  computed: {
    activeTab () {
      return this.$store.state.Home.activeTab
    },
    menu () {
      return this.$store.state.Home.menu[this.activeTab]
    },
    infoLevel () {
      return this.$store.state.Home.infoLevel[this.activeTab]
    },
    isShow () {
      let show = true
      if (this.menu === '介绍') {
        show = false
      } else if (this.activeTab === 0 && this.menu === '用户登录') {
        show = false
      }
      return show
    },
    user () {
      return this.$store.state.Home.user
    },
    leftButtonShow () {
      let show = false
      switch (this.menu) {
        case '病案':
          show = false
          break
        case '字典':
          show = false
          break
        case 'DRG分析':
          show = false
          break
        case '论坛':
          show = false
          break
        default:
          show = true
          break
      }
      return show
    }
  },
  methods: {
    homeButtonClick () {
      const menus = ['个人信息', '病案', '字典', 'DRG分析', '论坛']
      if (this.menu === '个人信息') {
        this.$store.commit('SET_menu', [0, '用户统计'])
      } else if (this.menu === '找回密码') {
        this.$store.commit('SET_menu', [0, '用户登录'])
      } else if (this.menu === '用户统计') {
        this.$store.commit('SET_menu', [0, '个人信息'])
      } else if (this.infoLevel === 0) {
        this.$store.commit('SET_menu', [this.activeTab, menus[this.activeTab]])
      } else {
        this.$store.commit('SET_infoLevel', 0)
        this.$store.commit('SET_menu', [this.activeTab, menus[this.activeTab]])
      }
    },
    leftButtonClick () {
      const menus = ['个人信息', '病案', '字典', 'DRG分析', '论坛']
      if (this.menu === '个人信息') {
        this.$store.commit('SET_menu', [0, '完善个人信息'])
      } else if (this.menu === '找回密码') {
        this.$store.commit('SET_menu', [0, '用户登录'])
      } else if (this.menu === '用户统计') {
        this.$store.commit('SET_menu', [0, '个人信息'])
      } else if (this.infoLevel === 0) {
        this.$store.commit('SET_menu', [this.activeTab, menus[this.activeTab]])
      } else {
        this.$store.commit('SET_infoLevel', this.infoLevel - 1)
      }
    }
  }
}
</script>

<style scoped>
  .wxc-demo {
    position: absolute;
    top: 0;
    background-color: #FFFFFF;
  }
  .scroller {
    flex: 1;
  }
  .demo {
    width: 750px;
    align-items: flex-start;
  }
  .button {
    margin-top: 10px;
    margin-left: 30px;
  }
  .popup {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
