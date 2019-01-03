<template>
  <div class="panel">
    <div class="row">
      <image style="width:344px;height:177px" :src="logo"></image>
    </div>
    <div v-bind:style="panel">
      <div class="input-bar">
        <input class="input" type="text" placeholder="用户名" v-model="user.username" />
      </div>
      <div class="input-bar">
        <input class="input" type="password" placeholder="密码" v-model="user.password"/>
      </div>
      <!-- 注册显示 -->
      <div class="input-bar" v-if="showRegister">
        <input class="input" type="password" placeholder="确认密码" v-model="user.confirm"/>
      </div>
      <div class="input-bar" v-if="showRegister">
        <input class="input" type="email" placeholder="邮箱" v-model="user.email"/>
      </div>
      <text v-if="showRegister" style="color: red; paddingLeft: 30px; fontSize: 30px">* 用户名为手机号码</text>
      <text v-if="showRegister" style="color: red; paddingLeft: 30px; fontSize: 30px">* 密码为至少6位的任意字符</text>
      <!-- 注册显示 -->
      <div class="row">
        <wxc-button v-if="showRegister" text="注册" type="blue" size="null" :btnStyle="btnStyle" @wxcButtonClicked="register"></wxc-button>
        <wxc-button v-else type="blue" text="登录" size="null" :btnStyle="btnStyle" @wxcButtonClicked="login"></wxc-button>
      </div>
      <div class="row">
      <text v-if="showRegister" class="input-immediate" @click="returnLogin" style="color: rgb(0, 159, 240); paddingLeft: 30px; fontSize: 30px">-- 返回登录 --</text>
      </div>
      <div class="row" v-if="!showRegister">
        <div class="col-md-5">
        <text class="input-forget" @click="retrieve">找回密码</text>
        </div>
        <div class="col-md-2"></div>
        <div class="col-md-5">
          <text class="input-immediate" @click="immediate">立即注册</text>
        </div>
      </div>
      <wxc-button :text="loginResult" size="full" :textStyle="textStyle" :btnStyle="btnStyle2"></wxc-button>
    </div>
  </div>
</template>

<script>
import { WxcButton, WxcSearchbar, WxcCell } from 'weex-ui'
import { userLogin, register } from '../../utils/user'
import Category from '../common/category.vue'
// const modal = weex.requireModule('modal')
const icon = require('../../utils/icon.js')
export default {
  name: 'login-page',
  components: { WxcButton, WxcSearchbar, WxcCell, Category },
  data () {
    return {
      visible: false,
      user: { password: '', username: '', confirm: '', plat: 'client', email: '' },
      barStyle: {
        backgroundColor: '#F8F8FF'
      },
      btnStyle: {
        marginTop: '20px'
      },
      btnStyle2: {
        paddingLeft: '15px',
        backgroundColor: 'rgba(224, 221, 220, 0)',
        borderWidth: '0px'
      },
      textStyle: {
        color: 'rgb(166, 162, 162)'
      },
      cellStyle: {
        backgroundColor: '#F8F8FF',
        flexDirection: 'row',
        justifyContent: 'space-around',
        color: '#FFFFFF'
      },
      logo: icon('logo')
    }
  },
  created () {
    if (weex.config.env.platform === 'Web') {
      this.user = { password: '123456', username: 'hitb', plat: 'client', email: '123456@hitb.com' }
    }
  },
  computed: {
    panel () {
      const tabPageHeight = weex.config.env.deviceHeight
      const style = {
        height: tabPageHeight
      }
      return style
    },
    loginResult () {
      return this.$store.state.Home.user.loginResult
    },
    showRegister: {
      get () {
        if (this.loginResult === '确认') {
          return false
        } else if (this.loginResult === '账号或密码错误') {
          return false
        } else if (this.loginResult === '网络连接失败') {
          return false
        } else if (this.loginResult === '') {
          return false
        } else {
          return true
        }
      }
    }
  },
  methods: {
    login () {
      userLogin(this, this.user)
    },
    immediate () {
      this.$store.commit('SET_loginResult', ' ')
      if (weex.config.env.platform === 'Web') {
        this.user = { password: '123456acs', username: '18515290906', confirm: '123456acs', plat: 'client', email: '123456@hitb.com' }
      } else {
        this.user = { password: '', username: '', confirm: '', plat: 'client', email: '' }
      }
    },
    retrieve () {
      this.$store.commit('SET_menu', [4, '找回密码'])
    },
    register () {
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
        this.$store.commit('SET_loginResult', '手机号码输入有误')
      } else if (!regexp1.test(this.user.password)) {
        this.$store.commit('SET_loginResult', '密码输入有误')
      } else if (!regexp2.test(this.user.email)) {
        this.$store.commit('SET_loginResult', '邮箱输入有误')
      } else {
        register(this, this.user)
        // this.$store.commit('SET_loginResult', this.loginResult)
      }
    },
    NameOnInput (e) {
      this.user.username = e.value
    },
    PwdOnInput (e) {
      this.user.password = e.value
    },
    returnLogin () {
      this.$store.commit('SET_loginResult', '')
    }
  }
}
</script>

<style scoped>
  .wrapper {
    justify-content: center;
  }
  .input-bar {
    height: 78px;
    margin-left: 25px;
    border-top-width: 2px;
    border-top-color: #DDD;
    background-color: #FFFFFF;
    flex-direction: row;
    justify-content: space-between;
  }
  .input {
    width: 700px;
    height: 78px;
    padding-left: 30px;
    color: #606060;
    background-color: #FFFFFF;
    font-size: 36px;
    border-width: 0.5px;
    border-style: solid;
    border-color: #000000;
  }
  .panel {
    flex-direction: column;
    justify-content: center;
    /* height: 750; */
    margin-left: 0px;
    /* border-width: 2px; */
    /* border-style: solid; */
    border-color: #BBBBBB;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 15px;
    padding-right: 15px;
    margin-bottom: 30px;
    margin-top: 201px;
  }
  .text {
    color: #666666;
    font-size: 32px;
    margin-left: 30px;
    margin-bottom: 15px;
  }
  .row {
    width: 750px;
    flex-direction: row;
    justify-content: space-around;
    padding-bottom: 10px;
  }
  .input-forget{
    font-size: 30px;
  }
  .input-immediate{
    font-size: 30px;
  }
</style>
