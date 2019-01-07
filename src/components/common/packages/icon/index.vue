<template>
  <!-- <text
    v-if="type"
    class="am-icon"
    :class="iconClass"
    :style="iconStyle"
  >{{Icon['solution']}}</text> -->
  <image :src="`http://192.168.0.79/images/${type}.png`"
         class="am-icon"
         :class="iconClass"></image>
</template>

<script>
import Icon from './icon'
const dom = weex.requireModule('dom')

export default {
  name: 'icon',
  props: {
    type: {
      type: String,
      default: null
    },
    size: {
      type: [String, Number],
      default: 'md' // xxs,xs,sm,md,lg
    },
    color: {
      type: String,
      default: null
    },
    fontFamily: {
      type: String,
      default: 'AMUIIconFont'
    }
  },
  data () {
    return {
      Icon
    }
  },
  computed: {
    iconClass () {
      if (isNaN(this.size)) {
        return [`am-icon-${this.size}`]
      } else {
        return null
      }
    },
    iconStyle () {
      const style = {
        color: this.color,
        fontFamily: this.fontFamily
      }
      if (!isNaN(this.size)) {
        style.fontSize = this.size + 'px'
        style.lineHeight = this.size + 'px'
      }
      return style
    }
  },
  beforeCreate () {
    dom.addRule('fontFace', {
      'fontFamily': 'AMUIIconFont',
      'src': "url('http://127.0.0.1/images/font_942818_pfnuxuocl2.ttf')"
    })
  },
  created () {
    console.log(this.iconClass)
    console.log(this.iconStyle)
  }
}
</script>

<style scoped lang="less">
@import "./index.less";
</style>
