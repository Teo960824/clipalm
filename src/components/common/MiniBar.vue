<template>
  <div class="wxc-demo">
    <scroller class="scroller">
      <div class="demo">
        <wxc-minibar :title="miniBarTitle"
                    background-color="#009ff0"
                    text-color="#FFFFFF"
                    :show="isShow"
                    left-button=""
                    :use-default-return="false"
                    @wxcMinibarRightButtonClicked="minibarRightButtonClick">
          <!-- <wxc-icon slot="left" name="back" v-if="rightButtonShow"></wxc-icon> -->
          <image src="http://210.75.199.113/images/menu.png"
                 slot="right"
                 style="height: 32px;width: 32px;"></image>
        </wxc-minibar>
        <wxc-popup popup-color="#FFFFFF" class="popup"
            :show="isBottomShow"
            @wxcPopupOverlayClicked="popupOverlayBottomClick"
            pos="right"
            width="320"
            height="200">
          </wxc-cell>
          <wxc-button text="前进" class="button"
            size="medium"
            :disabled="rightButtonShow"
            @wxcButtonClicked="wxcButtonClicked('前进')"></wxc-button>
          <br/><br/><br/>
          <wxc-button text="后退" class="button"
            size="medium"
            :disabled="leftButtonShow"
            @wxcButtonClicked="wxcButtonClicked('后退')"></wxc-button>
          <br/><br/><br/>
          <wxc-button text="返回首页" class="button"
            size="medium"
            @wxcButtonClicked="wxcButtonClicked('返回首页')"></wxc-button>
          <br/><br/><br/>
          <wxc-button text="跳转论坛" class="button"
            size="medium"
            @wxcButtonClicked="wxcButtonClicked('跳转论坛')"></wxc-button>
          </wxc-popup>
      </div>
    </scroller>
  </div>
</template>

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

<script>
import { WxcMinibar, WxcIcon, WxcPopup, WxcButton, WxcCell } from 'weex-ui'
// const modal = weex.requireModule('modal')
export default {
  components: { WxcMinibar, WxcIcon, WxcPopup, WxcButton, WxcCell },
  data () {
    return {
      rightButton: '',
      leftButton: '',
      isBottomShow: false
    }
  },
  created () {
  },
  computed: {
    infoLevel () {
      return this.$store.state.Home.infoLevel
    },
    isShow () {
      let show = this.$store.state.Home.isMiniShow
      if (this.$store.state.Home.menu[0] === '个人信息' || this.$store.state.Home.menu[0] === '注册用户') {
        show = true
      }
      return show
    },
    wxcCellTitle () {
      return this.$store.state.Edit.editMenu
    },
    infoPage () {
      let result = {}
      switch (this.infoLevel) {
        case 1:
          result = this.$store.state.Home.infoPage1
          break
        case 2:
          result = this.$store.state.Home.infoPage2
          break
        case 3:
          result = this.$store.state.Home.infoPage3
          break
        case 4:
          result = this.$store.state.Home.infoPage4
          break
      }
      return result
    },
    rightButtonShow () {
      let info = ''
      switch (this.infoLevel) {
        case 0:
          info = this.$store.state.Home.infoPage1.info
          break
        case 1:
          info = this.$store.state.Home.infoPage2.info
          break
        case 2:
          info = this.$store.state.Home.infoPage3.info
          break
        case 3:
          info = this.$store.state.Home.infoPage4.info
          break
        case 4:
          info = ''
          break
      }
      let disabled = false
      if (info === '') {
        disabled = true
      } else {
        disabled = false
      }
      return disabled
    },
    leftButtonShow () {
      let disabled = false
      if (this.infoLevel === 0) {
        disabled = true
      } else if (this.$store.state.Home.infoPage1.info === '') {
        disabled = true
      }
      return disabled
    },
    miniBarTitle () {
      return this.$store.state.Home.miniBarTitle
    },
    returnMenu () {
      let menu = ''
      switch (this.$store.state.Home.activeTab) {
        case 1:
          menu = this.$store.state.Edit.editMenu
          break
        case 2:
          menu = this.$store.state.Library.libraryMenu
          break
        case 3:
          menu = '报表'
          break
        case 4:
          menu = '论坛'
          break
      }
      return menu
    }
  },
  methods: {
    minibarRightButtonClick () {
      this.isBottomShow = true
    },
    wxcButtonClicked (e) {
      switch (e) {
        case '返回首页':
          this.$store.commit('SET_menu', [this.$store.state.Home.activeTab, ''])
          break
        case '前进':
          if (this.infoLevel < 4) {
            this.$store.commit('SET_infoLevel', this.infoLevel + 1)
            switch (this.$store.state.Home.activeTab) {
              case 1:
                this.$store.commit('SET_menu', [this.$store.state.Home.activeTab, '病案详情'])
                break
              case 2:
                console.log([this.$store.state.Home.activeTab, '规则详情'])
                this.$store.commit('SET_menu', [this.$store.state.Home.activeTab, '规则详情'])
                break
            }
          }
          break
        case '后退':
          const i = this.$store.state.Home.activeTab
          const level = this.infoLevel - 1
          this.$store.commit('SET_infoLevel', level)
          if (level === 0) {
            this.$store.commit('SET_menu', [i, this.returnMenu])
          }
          break
      }
      this.isBottomShow = false
    },
    popupOverlayBottomClick () {
      this.isBottomShow = false
    }
  }
}
</script>
