<template>
  <wxc-mask height="800"
      width="702"
      border-radius="0"
      duration="200"
      mask-bg-color="#F8F8FF"
      :has-animation="hasAnimation"
      :has-overlay="true"
      :show-close="false"
      :show="true"
      @wxcMaskSetHidden="wxcMaskSetHidden">
    <div class="content">
      <am-nav-bar
        mode="dark"
        title="有新版本更新"
        :left-btn="[]"
        :right-btn="[]"
        @click="wxcButtonClicked">
      </am-nav-bar>
      <am-list-item
        title="版本号"
        arrow="empty"
        :tapActive="false"
        :extra="serverVersion.version"></am-list-item>
      <am-list-item
        title="更新时间"
        arrow="empty"
        :tapActive="false"
        :extra="serverVersion.datetime"></am-list-item>
      <am-list-item
        title="更新日志"
        arrow = "empty"
        :brief="serverVersion.record"></am-list-item>
      <am-list-item
        title="提示"
        arrow = "empty"
        brief="请点击复制将下载链接复制到剪贴板后,打开浏览器下载新版本的软件,完成安装"></am-list-item>
      <am-wing-blank size="sm">
        <am-button
          width="680px"
          text="复制下载链接到剪贴板"
          @click="wxcButtonClicked"></am-button>
      </am-wing-blank>
    </div>
  </wxc-mask>
</template>
<script>
import { AmNavBar, AmListItem, AmButton, AmWingBlank } from 'weex-amui'
import { WxcMask, WxcButton } from 'weex-ui'
const clipboard = weex.requireModule('clipboard')
const modal = weex.requireModule('modal')
export default {
  components: { WxcMask, WxcButton, AmNavBar, AmListItem, AmButton, AmWingBlank },
  data: () => ({
    show: false,
    overlayCanClose: true,
    isFalse: false,
    hasAnimation: true
  }),
  computed: {
    serverVersion () {
      return this.$store.state.Home.serverVersion
    }
  },
  methods: {
    openMask (e) {
      this.show = true
      this.hasAnimation = true
    },
    wxcMaskSetHidden () {
      this.show = false
    },
    openNoAnimationMask (e) {
      this.show = true
      this.hasAnimation = false
    },
    wxcButtonClicked () {
      modal.toast({ message: '已复制到剪帖板，请打开浏览器粘帖下载', duration: 3 })
      clipboard.setString(`${this.serverVersion.path}`)
    }
  }
}
</script>
<style scoped>
.title {
  color: #333333;
  font-size: 40px;
}
.content-text {
  color: #333333;
  font-size: 30px;
  margin-top: 20px;
}
</style>
