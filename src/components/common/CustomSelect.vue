<template>
  <div class="demo" v-bind:style="panel">
    <mini-bar :title="menu" rightIcon="home" leftIcon="back"></mini-bar>
    <wxc-grid-select
      class="bigdiv"
      :single="false"
      :cols="5"
      :customStyles="customStyles"
      :list="list"
      @select="params => onSelect(params)"></wxc-grid-select>
    <div v-for="(text, i) in selection" :key="i">
      <div v-if="showStyle.includes(text.key)">
        <text style="font-size: 35px;margin: 5px">{{text.key}}</text>
        <input type="text" :placeholder="text.key" class="input" :autofocus=true @blur="onChange(text)" v-model="searchObj[text.key]"/>
      </div>
      <div v-else>
        <text style="font-size: 35px;margin: 5px">{{text.key}}</text>
        <div class="numStyle">
          <input type="text" :placeholder="text.key" class="input1" :autofocus=true @blur="onChange1(text, 'great')" v-model="searchObj[text.key]"/>
          <text style="margin-top: 40px">   ---   </text>
          <input type="text" :placeholder="text.key" class="input1" :autofocus=true @change="onChange1(text, 'less')" v-model="searchObj[text.key]"/>
        </div>
      </div>
    </div>
    <wxc-button text="查询"
              type="blue"
              size="full"
              class="submits"
              @wxcButtonClicked="wxcButtonClicked"></wxc-button>
  </div>
</template>

<script>
import { WxcButton, WxcGridSelect } from 'weex-ui'
import MiniBar from './MiniBar.vue'
import { customSearch } from '../../utils/server'
// var modal = weex.requireModule('modal')
export default {
  components: { WxcButton, WxcGridSelect, MiniBar },
  data () {
    return {
      customStyles: {
        lineSpacing: '14px',
        icon: '',
        color: '#333333',
        checkedColor: '#ffffff',
        disabledColor: '#eeeeee',
        checkedBorderColor: '#ffb200',
        backgroundColor: '#ffffff',
        checkedBackgroundColor: '#ffb200'
      },
      selection: []
    }
  },
  computed: {
    showStyle () {
      const arr = ['入组DRG', '主要诊断', '其他诊断', '编码', '名称', '年份', '版本']
      // const value = this.selection.map((x) => {
      //   if (arr.indexOf(x.key) > -1) {
      //     return true
      //   } else {
      //     return false
      //   }
      // })
      return arr
    },
    menus () {
      return this.$store.state.Home.menus
    },
    activeTab () {
      return this.$store.state.Home.activeTab
    },
    menu () {
      return this.$store.state.Home.menu[this.activeTab]
    },
    panel () {
      const tabPageHeight = weex.config.env.deviceHeight
      const style = {
        height: tabPageHeight
      }
      return style
    },
    list () {
      let value = []
      switch (this.activeTab) {
        case 1:
          value = [
            {'title': '入组DRG'},
            {'title': '主要诊断'},
            {'title': '其他诊断'},
            {'title': '住院天数'},
            {'title': '住院总费用'},
            {'title': '年龄'}]
          break
        case 2:
          value = [
            {'title': '编码'},
            {'title': '名称'},
            {'title': '年份'}]
          break
        case 3:
          value = [
            {'title': '编码'},
            {'title': '年份'},
            {'title': '版本'},
            {'title': '平均费用'},
            {'title': '平均住院天数'},
            {'title': '病历数'},
            {'title': '费用变异系数'},
            {'title': '时间变异系数'},
            {'title': '权重'}]
          break
        default:
          break
      }
      return value
    },
    searchObj () {
      const obj = {}
      this.selection.map((x) => {
        obj.key = x.key
        obj.great = x.great
        if (x.great) {
          obj.great = x.great
        }
        if (x.less) {
          obj.less = x.less
        }
        return obj
      })
      return obj
    }
  },
  methods: {
    onSelect ({selectIndex, checked, checkedList}) {
      let index = null
      this.selection.map((x, i) => {
        if (x.key === this.list[selectIndex].title) {
          index = i
        }
      })
      if (checked === false) {
        this.selection.splice(index, 1)
      } else {
        const obj = {}
        obj.key = this.list[selectIndex].title
        this.selection.push(obj)
      }
    },
    onChange (value) {
      this.selection.map((x) => {
        if (x.key === value.key) {
          x.value = this.searchObj[value.key]
        }
      })
    },
    onChange1 (value, symbol) {
      this.selection.map((x) => {
        if (x.key === value.key) {
          x[symbol] = this.searchObj[value.key]
        }
      })
    },
    wxcButtonClicked () {
      console.log(this.selection)
      customSearch(this, this.selection[0])
      const value = {show: true, query: this.searchObj}
      this.$store.commit('SET_customQuery', [this.activeTab - 1, value])
    }
  }
}
</script>
<style scoped>
  .demo {
    width: 750px;
  }
  .bigdiv {
    margin-top: 91px;
  }
  .input {
    width: 750px;
    height: 78px;
    color: #606060;
    background-color: #FFFFFF;
    font-size: 36px;
    border-width: 0.5px;
    border-style: solid;
    border-color: #000000;
    margin: 5px;
  }
  .input1 {
    width: 350px;
    height: 78px;
    color: #606060;
    background-color: #FFFFFF;
    font-size: 36px;
    border-width: 0.5px;
    border-style: solid;
    border-color: #000000;
    /* margin: 10px; */
  }
  .submits {
    position: relative;
    left: 23px;
    top: 20px;
  }
  .numStyle {
    width: 750px;
    flex-direction: row;
    justify-content: center;
  }
</style>
