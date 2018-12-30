<template>
  <div class="panel" v-bind:style="panel">
    <scroller>
      <div>
        <div style="height: 91px;"></div>
        <div>
          <text style="height: 55px;font-size: 35px;text-align: center;">所在机构</text>
          <input type="text" placeholder="请输入所在机构" class="input" :autofocus=false v-model="personal.org" />
        </div>
          <text style="height: 55px;font-size: 35px;text-align: center;">科室信息</text>
          <input type="text" placeholder="请输入科室信息" class="input" :autofocus=false value="" v-model="personal.Department" />
          <text style="height: 55px;font-size: 35px;text-align: center;">职称</text>
          <input type="text" placeholder="请输入职称" class="input" :autofocus=false value="" v-model="personal.Title" />
          <text style="height: 55px;font-size: 35px;text-align: center;">姓名</text>
          <input type="text" placeholder="请输入姓名" class="input" :autofocus=false value="" v-model="personal.Name" />
          <!--<wxc-radio :list="list" @wxcRadioListChecked="wxcRadioListChecked"></wxc-radio>-->
      </div>
      <wxc-button text="提交"
              type="blue"
              size="full"
              class="submits"
              @wxcButtonClicked="wxcButtonClicked"></wxc-button>
    </scroller>
    <mini-bar title="完善个人信息" rightIcon="home" leftIcon="back"></mini-bar>
  </div>
</template>

<script>
import { WxcMinibar, WxcGridSelect, WxcButton, WxcRadio, WxcCell } from 'weex-ui'
import Category from '../common/category.vue'
import MiniBar from '../common/MiniBar.vue'
import { updateUser } from '../../utils/user'
var modal = weex.requireModule('modal')
export default {
  name: 'user-person',
  components: { WxcMinibar, WxcGridSelect, Category, WxcRadio, WxcButton, WxcCell, MiniBar },
  data: () => ({
    list: [
      { title: '男', value: 1 },
      { title: '女', value: 2, checked: true }
    ],
    checkedInfo: { title: '女', value: 2 },
    personal: { Department: '', org: '', Title: '', Name: '' }
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
      if (this.personal.Department === '') {
        modal.alert({
          message: '请输入科室信息',
          duration: 0.3
        })
      } else if (this.personal.Title === '') {
        modal.alert({
          message: '请输入职称',
          duration: 0.3
        })
      } else if (this.personal.org === '') {
        modal.alert({
          message: '请输入所在机构',
          duration: 0.3
        })
      } else if (this.personal.Name === '') {
        modal.alert({
          message: '请输入姓名',
          duration: 0.3
        })
      } else {
        updateUser(this, this.personal)
        console.log(this.personal)
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
