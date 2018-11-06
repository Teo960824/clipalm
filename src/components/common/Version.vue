<template>
<wxc-mask height="800"
    width="702"
    border-radius="0"
    duration="200"
    mask-bg-color="#FFFFFF"
    :has-animation="hasAnimation"
    :has-overlay="true"
    :show-close="false"
    :show="true"
    @wxcMaskSetHidden="wxcMaskSetHidden">
  <div class="content">
    <div class="demo-title">
      <text class="title">有新版本更新</text>
    </div>
    <text class="content-text">
      版本号：{{serverVersion.version}}
      更新时间：{{serverVersion.datetime}}
      更新日志：{{serverVersion.record}}
    </text>
    <wxc-button text="复制下载链接到剪贴板"
          :show="true"
          size="full"
          @wxcButtonClicked="wxcButtonClicked"></wxc-button>
  </div>
</wxc-mask>
</template>
<script>
import { WxcMask, WxcButton } from 'weex-ui'
const clipboard = weex.requireModule('clipboard')
const modal = weex.requireModule('modal')
export default {
  components: { WxcMask, WxcButton },
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
      modal.toast({ message: '已复制到剪贴板，请打开浏览器粘贴下载', duration: 3 })
      clipboard.setString(`${this.serverVersion.path}`)
    }
  }
}
</script>
<style>
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
