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
    <category v-if="[2, 3].includes(activeTab)" title="请选择要查询的字典"></category>
    <wxc-grid-select
      v-if="[2, 3].includes(activeTab)"
      :single="true"
      :cols="5"
      :customStyles="customStyles"
      :list="library"
      @select="params => onSelect(params, 'drg')"></wxc-grid-select>
    <div v-if="selected.length">
    </div>
    <div v-for="(value, key) in condition" :key="key">
      <div v-if="showStyle.includes(key)">
        <text style="font-size: 35px;margin: 5px">{{key}}</text>
        <input type="text" :placeholder="key" class="input" :autofocus=true v-model="condition[key]"/>
      </div>
      <div v-else>
        <text style="font-size: 35px;margin: 5px">{{key}}</text>
        <div class="numStyle">
          <input type="text" :placeholder="key" class="input1" :autofocus=true @input="onChange" :name="`${key}1`" />
          <text style="margin-top: 40px">   ---   </text>
          <input type="text" :placeholder="key" class="input1" :autofocus=true @input="onChange" :name="`${key}2`"/>
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
import Category from '../common/category.vue'
// var modal = weex.requireModule('modal')
export default {
  components: { WxcButton, WxcGridSelect, MiniBar, Category },
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
      selected: [],
      // selected1: [],
      condition: {},
      conditions: { },
      showStyle: ['入组DRG', '主要诊断', '其他诊断', '编码', '名称', '年份', '版本'],
      library: [
        {'title': 'MDC'},
        {'title': 'ADRG'},
        {'title': 'DRG'}
      ],
      drg: ''
    }
  },
  computed: {
    menus () {
      return this.$store.state.Home.menu
    },
    activeTab () {
      return this.$store.state.Home.activeTab
    },
    menu () {
      return this.menus[this.activeTab]
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
    }
  },
  methods: {
    onSelect ({selectIndex, checked, checkedList}, drg) {
      const key = this.list[selectIndex].title
      if (drg) {
        this.drg = checkedList[0].title
      } else if (this.selected.includes(key)) {
        delete this.condition[key]
        this.selected = this.selected.filter(i => i !== key)
      } else {
        this.condition[key] = ''
        this.selected.push(key)
      }
    },
    onChange (e) {
      this.conditions[e.target.name] = e.target.value
      const key1 = `${e.target.placeholder}1`
      const key2 = `${e.target.placeholder}2`
      if (!this.conditions[key1]) {
        this.conditions[key1] = ''
      }
      if (!this.conditions[key2]) {
        this.conditions[key2] = ''
      }
    },
    wxcButtonClicked () {
      Object.keys(this.condition).map((key) => {
        if (!this.showStyle.includes(key)) {
          this.condition[key] = [this.conditions[`${key}1`], this.conditions[`${key}2`]]
        }
      })
      if (this.activeTab === 2) {
        this.condition['字典'] = this.drg
      } else if (this.activeTab === 3) {
        this.condition['分析'] = this.drg
      }
      switch (this.activeTab) {
        case 1:
          this.$store.commit('SET_wt4Page', 1)
          this.$store.commit('SET_wt4Case', [])
          break
        case 2:
          this.$store.commit('SET_libraryPage', 1)
          this.$store.commit('SET_rule', [])
          break
        case 3:
          this.$store.commit('SET_statPage', 1)
          this.$store.commit('SET_statDrg', [])
          break
      }
      customSearch(this, this.condition)
      this.$store.commit('SET_customQuery', [this.activeTab - 1, {show: true, query: this.condition}])
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
