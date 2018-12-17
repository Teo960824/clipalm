<template>
  <div class="panel" style="margin-top:91px">
    <!-- <wxc-simple-flow :list="testData" :themeColor="themeColor"></wxc-simple-flow> -->
    <canvas id="myChart" width="750" height="900"></canvas>
  </div>
</template>
<script>
import { WxcSimpleFlow } from 'weex-ui'
const F2 = require('@antv/f2')
const urlConfig = require('../../utils/config.js')
export default {
  components: { WxcSimpleFlow },
  data () {
    return {
      data: [{ genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 115 },
        { genre: 'Action', sold: 120 },
        { genre: 'Shooter', sold: 350 },
        { genre: 'Other', sold: 150 }],
      isShow: false,
      chart: null
    }
  },
  mounted: function () {
    this.chart = new F2.Chart({ id: 'myChart', pixelRatio: window.devicePixelRatio })
    this.chart.source(this.data)
    this.chart.interval().position('genre*sold').color('genre')
    this.chart.render()
  },
  created: function () {
  },
  computed: {
    chartType: {
      get () {
        return this.$store.state.Stat.chartType
      }
    },
    url: {
      get () {
        let u = `${urlConfig.static}:${urlConfig.port}/drgwork/charts_page`
        if (this.chartType === '用户报表') {
          u = `${urlConfig.static}:${urlConfig.port}/drgwork/user_charts_page`
        }
        return u
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
