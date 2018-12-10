<template>
  <div class="panel" v-bind:style="panel">
    <list class="list">
      <cell v-for="(value, key) in userAnalyse" v-bind:key="key">
        <category class="category" :title="`--${key}--`"></category>
        <wxc-cell
          v-for="(data, index) in value"
          v-bind:key="`${key}-${index}`"
          :title="`${data.time}`"
          :desc="`${data.count}`"
          :has-margin="false"
          :has-arrow="false"
          @wxcCellClicked="wxcCellClicked(wt4)">
        </wxc-cell>
      </cell>
      <cell style="height:100px"> </cell>
    </list>
    <mini-bar title="用户统计" rightIcon="home" leftIcon="left" rightButtonShow="true"></mini-bar>
  </div>
</template>

<script>
import { WxcMinibar, WxcGridSelect, WxcButton, WxcCell } from 'weex-ui'
import Category from '../common/category.vue'
import MiniBar from '../common/MiniBar.vue'
import { analyse } from '../../utils/user'

export default {
  name: 'user-doc',
  components: { WxcMinibar, WxcGridSelect, Category, WxcButton, WxcCell, MiniBar },
  data: () => ({
  }),
  computed: {
    userAnalyse: {
      get () {
        return this.$store.state.Home.userAnalyse
      }
    },
    panel: {
      get () {
        const tabPageHeight = weex.config.env.deviceHeight
        const style = {
          width: '750px',
          height: tabPageHeight
        }
        return style
      }
    }
  },
  created () {
    this.getAnalyse()
  },
  methods: {
    getAnalyse () {
      analyse(this)
    }
  }
}
</script>

<style scoped>
  .panel {
    margin-left: 0px;
    border-color: #BBBBBB;
    padding-top: 0;
    background-color: #F8F8FF;
  }
  .text {
    color: #666666;
    font-size: 32px;
  }
  .gridSelect {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .submits{
    position: relative;
    left: 23px;
    top: 1px;
  }
  .red{
    text-align: left;
  }
  .demo-title {
    font-size: 28px;
    background-color: #F8F8FF;
    text-align: center;
    border-style: solid;
    border-width: 1px;
    border-radius: 14px;
    padding: 10px;
  }
  .category {
    margin-top: 91px;
  }
</style>
