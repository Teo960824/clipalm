<template>
  <div class="panel" style="margin-top:91px">
    <!-- <wxc-simple-flow :list="testData" :themeColor="themeColor"></wxc-simple-flow> -->
    <web :src="url" style="width: 750px; height: 1250px"></web>
  </div>
</template>
<script>
import { WxcSimpleFlow } from 'weex-ui'
const urlConfig = require('../../utils/config.js')
export default {
  components: { WxcSimpleFlow },
  data () {
    return {
      height: 400,
      isShow: false
    }
  },
  computed: {
    url: {
      get () {
        return `${urlConfig.http}:${urlConfig.port}/charts_page`
      }
    }
  },
  methods: {
  }
}
</script>

<style scoped>
  .wrapper {
    /* flex-direction: column; */
    justify-content: center;
  }
  .panel {
    width: 750px;
    background-color: #f2f3f4;
    align-items: center;
    justify-content: center;
    margin-left: 0px;
    border-width: 2px;
    border-style: solid;
    border-color: #BBBBBB;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 15px;
    padding-right: 15px;
    margin-bottom: 30px;
  }
</style>
