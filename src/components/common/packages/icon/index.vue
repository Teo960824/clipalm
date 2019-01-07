<template>
  <image :src="iconSrc"
         class="am-icon"
         :class="iconClass"></image>
</template>

<script>
const icon = require('../../../../utils/icon.js')
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
      default: 'xs' // xxs,xs,sm,md,lg
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
      iconSrc: icon(this.type)
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
