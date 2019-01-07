<template>
  <image :src="iconSrc"
         class="am-icon"
         :class="iconClass"></image>
</template>

<script>
const icon = require('../../../../utils/icon.js')
export default {
  name: 'icon',
  props: {
    type: {
      type: String,
      default: null
    },
    size: {
      type: [String, Number],
      default: 'sm' // xxs,xs,sm,md,lg
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
  }
}
</script>

<style scoped lang="less">
@import "./index.less";
</style>
