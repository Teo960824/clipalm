<template>
  <div class="panel" v-bind:style="panel">
    <div style="height: 91px;"></div>
    <am-list style="width:750px;">
      <div style="height:20px;"></div>
      <am-list-item
        title="用户名"
        arrow="empty"
        :thumb="usernames"
        :extra="`${user.username}`">
      </am-list-item>
      <am-list-item
        title="积分"
        :extra="`${user.bp}`"
        arrow="empty"
        :thumb="integral"
        ></am-list-item>
      <div style="height:25px;"></div>
      <am-picker
        title="请选择"
        :placeholder="user.type"
        :data="types"
        @ok="typeOk"
        @hide="onHide">
        <am-list-item
          slot-scope="{ extra, show }"
          title="用户类型"
          :extra="extra"
          :thumb="choice"
          @click="show">
        </am-list-item>
      </am-picker>
      <div style="height:25px;"></div>
      <am-picker
        title="请选择"
        :placeholder="`${user.clipalm_icd}`"
        :data="icds"
        @ok="icdOk"
        @hide="onHide">
        <am-list-item
          slot-scope="{ extra, show }"
          title="ICD"
          :thumb="icd"
          :extra="extra"
          @click="show">
        </am-list-item>
      </am-picker>
      <am-picker
        title="请选择"
        :placeholder="user.clipalm_version"
        :data="versions"
        @ok="versionOk"
        @hide="onHide">
        <am-list-item
          slot-scope="{ extra, show }"
          title="版本"
          :thumb="version"
          :extra="extra"
          @click="show">
        </am-list-item>
      </am-picker>
      <am-picker
        title="请选择"
        :placeholder="user.clipalm_year"
        :data="year"
        @ok="yearOk"
        @hide="onHide">
        <am-list-item
          slot-scope="{ extra, show }"
          title="时间"
          :thumb="time"
          :extra="extra"
          @click="show">
        </am-list-item>
      </am-picker>
      <div style="height:25px;"></div>
      <am-list-item
        :thumb="supplement"
        title="完善用户信息"
        @click="click"></am-list-item>
      <div style="height:25px;"></div>
    <am-nav-bar
      mode="light"
      title="退出登录"
      :left-btn="[]"
      :right-btn="[]"
      @click="wxcButtonClicked">
    </am-nav-bar>
  </am-list>
  <mini-bar title="用户信息" rightIcon="user_stat" leftIcon="setting" :rightButtonShow="rightButtonShow"></mini-bar>
  </div>
  </template>

<script>
import { AmPicker, AmList, AmListItem, AmButton, AmNavBar } from 'weex-amui'
import { WxcMinibar, WxcGridSelect, WxcButton, WxcCell } from 'weex-ui'
import Category from '../common/category.vue'
import MiniBar from '../common/MiniBar.vue'
import { userLogout, updateUser } from '../../utils/user'
// import { defaultCoreCipherList } from 'constants';
const modal = weex.requireModule('modal')
const icon = require('../../utils/icon.js')

export default {
  name: 'user-doc',
  components: { AmPicker, AmList, AmListItem, WxcMinibar, WxcGridSelect, Category, AmButton, WxcButton, WxcCell, MiniBar, AmNavBar },
  data: () => ({
    customStyles: {
      lineSpacing: '14px',
      width: '150px',
      height: '60px',
      icon: '',
      color: '#333333',
      checkedColor: '#ffffff',
      disabledColor: '#eeeeee',
      borderColor: '#666666',
      checkedBorderColor: '#ffb200',
      backgroundColor: '#ffffff',
      checkedBackgroundColor: '#1E90FF'
    },
    show: false,
    time: icon('time'),
    usernames: icon('usernames'),
    integral: icon('integral'),
    choice: icon('choice'),
    icd: icon('icd'),
    version: icon('version'),
    supplement: icon('supplement'),
    types: [{ value: '专家用户', label: '专家用户' }, { value: '机构用户', label: '机构用户' }, { value: '个人用户', label: '个人用户' }],
    versions: [{ label: 'BJ编码版', value: 'BJ编码版' }, { label: 'GB编码版', value: 'GB编码版' }, { label: '术语版', value: '术语版' }],
    icds: [{ label: 'ICD10 6.0', value: 'ICD10 6.0' }, { label: 'ICD10 5.0', value: 'ICD10 5.0' }],
    year: [{ label: '2013', value: '2013' }, { label: '2014', value: '2014' }, { label: '2015', value: '2015' }, { label: '2016', value: '2016' }, { label: '2017', value: '2017' }, { label: '2018', value: '2018' }]
  }),
  computed: {
    user () {
      return this.$store.state.Home.user.data
    },
    rightButtonShow () {
      return this.user.admin
    },
    panel () {
      const tabPageHeight = weex.config.env.deviceHeight
      const style = {
        width: '750px',
        height: tabPageHeight
      }
      return style
    }
  },
  methods: {
    minibarRightButtonClick (e) {
      this.$store.commit('SET_menu', [0, '用户登录'])
    },
    yearOk (year, labels) {
      updateUser(this, { clipalm_year: labels[0] })
      modal.toast({ message: `已设置${labels[0]}为默认年份`, duration: 1 })
    },
    typeOk (type, labels) {
      updateUser(this, { type: labels[0] })
      // modal.toast({ message: `已设置${version}为默认查询版本`, duration: 1 })
    },
    versionOk (version, labels) {
      updateUser(this, { clipalm_version: labels[0] })
      modal.toast({ message: `已设置${labels[0]}为默认版本`, duration: 1 })
    },
    icdOk (icd, labels) {
      updateUser(this, { clipalm_icd: labels[0] })
      modal.toast({ message: `已设置${labels[0]}为默认版本`, duration: 1 })
    },
    click () {
      this.$store.commit('SET_menu', [0, '完善个人信息'])
    },
    onHide (type) {
      // console.log('hide', type)
    },
    wxcButtonClicked () {
      userLogout(this)
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
    width: 750px;
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
  .bpStyle {
    font-size: 30px;
    margin: 10 0 10 30;
  }
  .bnt {
    width: 750px;
  }
</style>
