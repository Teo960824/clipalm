<template>
  <div class="panel" v-bind:style="panel">
    <mini-bar style="width:750px;" title="完善个人信息" :rightIcon="['home']" :leftIcon="['left']"></mini-bar>
    <scroller>
      <!-- <div> -->
        <!-- <div style="height: 91px;"></div> -->
        <!-- <div> -->
          <!-- <text style="height: 55px;font-size: 35px;text-align: center;">所在机构</text>
          <input type="text" placeholder="请输入所在机构" class="input" :autofocus=false v-model="personal.org" />
        </div>
          <text style="height: 55px;font-size: 35px;text-align: center;">科室信息</text>
          <input type="text" placeholder="请输入科室信息" class="input" :autofocus=false value="" v-model="personal.department" />
          <text style="height: 55px;font-size: 35px;text-align: center;">职称</text>
          <input type="text" placeholder="请输入职称" class="input" :autofocus=false value="" v-model="personal.title" />
          <text style="height: 55px;font-size: 35px;text-align: center;">姓名</text>
          <input type="text" placeholder="请输入姓名" class="input" :autofocus=false value="" v-model="personal.name" />
          <wxc-radio :list="list" @wxcRadioListChecked="wxcRadioListChecked"></wxc-radio>
      </div> -->
      <am-list :no-border="false">
        <am-list-input v-model="personal.org" title="所在机构" placeholder="请输入所在机构"></am-list-input>
        <am-list-input v-model="personal.department" title="科室信息" placeholder="请输入科室信息"></am-list-input>
        <am-list-input v-model="personal.title" title="职称" placeholder="请输入职称"></am-list-input>
        <am-list-input v-model="personal.name" title="姓名" placeholder="请输入姓名"></am-list-input>
      </am-list>
      <wxc-button text="提交"
              type="blue"
              size="full"
              class="submits"
              @wxcButtonClicked="wxcButtonClicked"></wxc-button>
    </scroller>
  </div>
</template>

<script>
import { WxcMinibar, WxcGridSelect, WxcButton, WxcRadio, WxcCell } from 'weex-ui'
import { AmList, AmListInput } from 'weex-amui'
import Category from '../common/category.vue'
import MiniBar from '../common/MiniBar.vue'
import { updateUser } from '../../utils/user'
var modal = weex.requireModule('modal')
export default {
  name: 'user-person',
  components: { WxcMinibar, WxcGridSelect, AmList, AmListInput, Category, WxcRadio, WxcButton, WxcCell, MiniBar },
  data: () => ({
    list: [
      { title: '男', value: 1 },
      { title: '女', value: 2, checked: true }
    ],
    checkedInfo: { title: '女', value: 2 },
    personal: { department: '', org: '', title: '', name: '' }
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
  },
  methods: {
    wxcRadioListChecked (e) {
      console.log(e)
      this.personal.gender = e.title
    },
    wxcButtonClicked () {
      if (this.personal.org === '') {
        modal.toast({
          message: '请输入所在机构',
          duration: 0.3
        })
      } else if (this.personal.department === '') {
        modal.toast({
          message: '请输入科室信息',
          duration: 0.3
        })
      } else if (this.personal.title === '') {
        modal.toast({
          message: '请输入职称',
          duration: 0.3
        })
      } else if (this.personal.name === '') {
        modal.toast({
          message: '请输入姓名',
          duration: 0.3
        })
      } else {
        updateUser(this, this.personal)
        console.log(this.personal)
        modal.toast({
          message: '信息提交成功',
          duration: 1
        })
        this.$store.commit('SET_menu', [4, '个人信息'])
      }
    }
  }
}
</script>

<style scoped>
  .panel {
    margin-left: 0px;
    border-color: #BBBBBB;
    padding-top: 0;
    /* background-color: #F8F8FF; */
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
    margin-top: 20px;
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
  .input {
    width: 750px;
    height: 78px;
    color: #606060;
    background-color: #FFFFFF;
    font-size: 36px;
    border-width: 0.5px;
    border-style: solid;
    border-color: #000000;
  }
  /* .submits{
    position: relative;
    left: 23px;
    top: 1px;
  } */
</style>
