<template>
  <div>
    <am-nav-bar
      title="mask"
    ></am-nav-bar>
    <wxc-mask height="150"
        width="150"
        :animation="animation"
        :show="show"
        border-radius="0"
        duration="200"
        mask-bg-color="rgba(193, 187, 187, 0.2)"
        :overlay-can-close="false"
        :has-animation="false"
        :has-overlay="true"
        :show-close="false"
        @wxcMaskSetHidden="wxcMaskSetHidden">
      <div class="content">
        <am-image :image-style="{width: '150px'}" auto-height src="http://www.jiankanglaifu.com/images/loading2.gif"></am-image>
      </div>
    </wxc-mask>
  </div>
</template>

<style scoped>
.button {
  width: 600px;
  margin-top: 30px;
}
</style>

<script>
import { AmNavBar, AmMask, AmButton, AmFlex, AmImage } from 'weex-amui'
import { WxcMask } from 'weex-ui'
export default {
  components: { AmNavBar, AmMask, AmButton, AmFlex, WxcMask, AmImage },
  props: {
    show: {
      type: Boolean,
      default: () => false
    }
  },
  data () {
    return {
      animation: false,
      overlayCanClose: true,
      isFalse: false,
      hasAnimation: true
    }
  },
  methods: {
    show1 () {
      this.animation = true
    },
    show2 () {
      this.animation = false
    },
    show3 () {
    },
    openMask (e) {
      this.hasAnimation = true
    },
    wxcMaskSetHidden () {
    },
    openNoAnimationMask (e) {
      this.hasAnimation = false
    }
  }
}
</script>
