<!-- <template>
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
          <image :src="miniBarLeftIcon"
                 v-if="leftButtonShow"
                 slot="left"
                 style="height: 36px;width: 36px;"></image>
          <image :src="miniBarRighttIcon"
                 slot="right"
                 style="height: 36px;width: 36px;"></image>
        </wxc-minibar>
         <am-icon type="left" size="lg" />
      </div>
    </scroller>
  </div>
</template> -->
<template>
  <div>
    <nav-bar
      :title="title"
      :left-btn="leftIcon"
      :right-btn="rightIcon"
      @click="handleClick"
    ></nav-bar>
  </div>
</template>
<script>
import { WxcMinibar } from 'weex-ui'
import { NavBar } from './packages'
const icon = require('../../utils/icon.js')

export default {
  components: { WxcMinibar, NavBar },
  props: {
    title: {
      type: String,
      default: () => ' '
    },
    rightIcon: {
      type: Array,
      default: () => ['home']
    },
    leftIcon: {
      type: Array,
      default: () => ['left']
    }
  },
  data () {
    return {
      rightButton: '',
      leftButton: '',
      isBottomShow: false,
      miniBarLeftIcon: icon(this.leftIcon),
      miniBarRighttIcon: icon(this.rightIcon)
    }
  },
  created () {
    console.log(this.miniBarLeftIcon)
  },
  // beforeCreate () {
  //   dom.addRule('fontFace', {
  //     'fontFamily': 'AMUIIconFont',
  //     'src': "url('https://at.alicdn.com/t/font_942818_pfnuxuocl2.ttf')"
  //   })
  // },
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
      } else if (this.activeTab === 4 && this.menu === '用户登录') {
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
    handleClick (value) {
      switch (value) {
        case 'left': case 'setting':
          this.leftButtonClick()
          break
        case 'home': case 'stat-card':
          this.homeButtonClick()
          break
        case 'search':
          this.$store.commit('SET_menu', [this.activeTab, '自定义查询'])
          break
        default:
          break
      }
    },
    homeButtonClick () {
      const menus = ['字典', '病案', 'DRG分析', '论坛', '个人信息']
      if (this.menu === '个人信息') {
        this.$store.commit('SET_menu', [4, '用户统计'])
      } else if (this.menu === '找回密码') {
        this.$store.commit('SET_menu', [4, '用户登录'])
      } else if (this.menu === '用户统计') {
        this.$store.commit('SET_menu', [4, '个人信息'])
      } else if (this.infoLevel === 0) {
        this.$store.commit('SET_menu', [this.activeTab, menus[this.activeTab]])
      } else {
        this.$store.commit('SET_infoLevel', 0)
        this.$store.commit('SET_menu', [this.activeTab, menus[this.activeTab]])
      }
    },
    leftButtonClick () {
      const menus = ['字典', '病案', 'DRG分析', '论坛', '个人信息']
      console.log(this.menu)
      if (this.menu === '个人信息') {
        this.$store.commit('SET_menu', [4, '完善个人信息'])
      } else if (this.menu === '找回密码') {
        this.$store.commit('SET_menu', [4, '用户登录'])
      } else if (this.menu === '用户统计') {
        this.$store.commit('SET_menu', [4, '个人信息'])
      } else if (this.menu === '自定义查询结果' && this.infoLevel === 0) {
        this.$store.commit('SET_menu', [this.activeTab, '自定义查询'])
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
