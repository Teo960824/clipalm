<template>
  <div>
    <am-button @click="show=true">显示</am-button>
    <am-popup
        :show.sync="show"
        position="bottom"
        width="500"
        height="400"
      >
        <text :style="{fontSize: '40px'}">popup</text>
        <am-button
          type="warning"
          @click="show=false"
        >点我关闭</am-button>
      </am-popup>
  </div>
</template>

<script>
  import { AmPopup, AmButton } from 'weex-amui'
  export default {
    components: { AmPopup, AmButton },
    data () {
      return {
        show: false
      }
    }
  }
</script>
