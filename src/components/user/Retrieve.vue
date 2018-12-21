<template>
  <div class="panel" v-bind:style="panel">
    <scroller>
      <div>
        <div style="height: 91px;"></div>
          <text style="height: 55px;font-size: 35px;">手机号码</text>
        <input type="text" placeholder="请输入手机号" class="input" :autofocus=true value="" v-model="user.username" />
      </div>
      <div>
          <text style="height: 55px;font-size: 35px;">邮箱</text>
        <input type="text" placeholder="请输入邮箱" class="input" :autofocus=true value="" v-model="user.email"/>
      </div>
      <div>
        <text style="height: 55px;font-size: 35px;">密码</text>
        <input type="text" placeholder="请输入密码" class="input" :autofocus=true value="" v-model="user.password" />
      </div>
      <div>
          <text style="height: 55px;font-size: 35px;">确认密码</text>
        <input type="text" placeholder="再输一次密码" class="input" :autofocus=true value="" v-model="user.confirm"/>
      </div>
      <text style="color: red; paddingLeft: 30px; fontSize: 30px">* 密码为至少6位的任意字符</text>
      <wxc-button text="提交"
              type="blue"
              size="full"
              class="submits"
              @wxcButtonClicked="wxcButtonClicked"></wxc-button>
      <wxc-button :text="loginResult" size="full" :textStyle="textStyle" :btnStyle="btnStyle2"></wxc-button>
    </scroller>
        <mini-bar title="找回密码" rightIcon="home" leftIcon="back"></mini-bar>
  </div>
</template>

<script>
import { WxcMinibar, WxcGridSelect, WxcButton, WxcCell } from 'weex-ui'
import { forgetPassword } from '../../utils/user'
import Category from '../common/category.vue'
import MiniBar from '../common/MiniBar.vue'

export default {
  name: 'user-psw',
  components: { WxcMinibar, WxcGridSelect, Category, WxcButton, WxcCell, MiniBar },
  data: () => ({
    seen: true,
    user: { username: '', email: '', plat: '', password: '', confirm: '' },
    textStyle: {
      color: 'rgb(166, 162, 162)'
    },
    btnStyle2: {
      paddingLeft: '15px',
      backgroundColor: 'rgba(224, 221, 220, 0)',
      borderWidth: '0px'
    }
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
    },
    loginResult () {
      return this.$store.state.Home.user.loginResult
    },
    showRegister: {
      get () {
        if (this.loginResult === '确认') {
          return false
        } else if (this.loginResult === ' ') {
          return true
        } else if (this.loginResult === '用户名已存在') {
          return true
        } else if (this.loginResult === '') {
          return false
        } else {
          return true
        }
      }
    }
  },
  created () {
  },
  methods: {
    wxcButtonClicked () {
      const regexp = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
      const regexp1 = /^.{6,}$/
      const regexp2 = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
      if (this.user.username === '') {
        this.$store.commit('SET_loginResult', '请输入手机号码')
      } else if (this.user.password === '') {
        this.$store.commit('SET_loginResult', '请输入密码')
      } else if (this.user.confirm === '') {
        this.$store.commit('SET_loginResult', '请确认密码')
      } else if (this.user.email === '') {
        this.$store.commit('SET_loginResult', '请确认邮箱')
      } else if (this.user.password !== this.user.confirm) {
        this.$store.commit('SET_loginResult', '两次密码输入不一致')
      } else if (!regexp.test(this.user.username)) {
        this.$store.commit('SET_loginResult', '手机号输入有误')
      } else if (!regexp1.test(this.user.password)) {
        this.$store.commit('SET_loginResult', '密码输入有误')
      } else if (!regexp2.test(this.user.email)) {
        this.$store.commit('SET_loginResult', '邮箱输入有误')
      } else {
        this.$store.commit('SET_loginResult', this.loginResult)
        forgetPassword(this, this.user)
        // this.$store.commit('SET_menu', [0, '用户登录'])
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
  .input {
    width: 750px;
    height: 78px;
    color: #606060;
    background-color: #FFFFFF;
    font-size: 36px;
    border-width: 0.5px;
    border-style: solid;
    border-color: #BBBBBB;
  }
</style>
