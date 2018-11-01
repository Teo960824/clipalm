<template>
  <div class="panel">
    <text class="text">掌上医助</text>
    <wxc-searchbar ref="wxc-searchbar"
      input-type='text'
      v-model = 'user.username'
      :default-value='name'
      cancel-label='用户名'
      placeholder='用户名'
      theme='yellow'
      :bar-style='barStyle'
      @wxcSearchbarCancelClicked="NameOnCancel"
      @wxcSearchbarInputReturned="NameOnReturn"
      @wxcSearchbarInputOnInput="NameOnInput"
      @wxcSearchbarCloseClicked="NameOnClose"
      @wxcSearchbarInputOnFocus="NameOnFocus"
      @wxcSearchbarInputOnBlur="NameOnBlur">
    </wxc-searchbar>

    <wxc-searchbar ref="wxc-searchbar"
      input-type='password'
      v-model = 'user.password'
      :default-value='pwd'
      cancel-label='密码'
      theme='yellow'
      :bar-style='barStyle'
      @wxcSearchbarCancelClicked="PwdOnCancel"
      @wxcSearchbarInputReturned="PwdOnReturn"
      @wxcSearchbarInputOnInput="PwdOnInput"
      @wxcSearchbarCloseClicked="PwdOnClose"
      @wxcSearchbarInputOnFocus="PwdOnFocus"
      @wxcSearchbarInputOnBlur="PwdOnBlur">
    </wxc-searchbar>

    <wxc-searchbar ref="wxc-searchbar"
      input-type='password'
      default-value=''
      cancel-label='重复密码'
      placeholder='重复密码'
      v-if="visible"
      theme='yellow'
      :bar-style='barStyle'
      @wxcSearchbarCancelClicked="PwdOnCancel"
      @wxcSearchbarInputReturned="PwdOnReturn"
      @wxcSearchbarInputOnInput="PwdOnInput"
      @wxcSearchbarCloseClicked="PwdOnClose"
      @wxcSearchbarInputOnFocus="PwdOnFocus"
      @wxcSearchbarInputOnBlur="PwdOnBlur">
    </wxc-searchbar>
    <div class="row">
      <wxc-button type="blue" text="登陆" size="big" :btnStyle="btnStyle" @wxcButtonClicked="login"></wxc-button>
      <wxc-button text="注册" size="big" :btnStyle="btnStyle" @wxcButtonClicked="register"></wxc-button>
    </div>
  </div>
</template>

<script>
import { WxcButton, WxcSearchbar } from 'weex-ui'
import { getServer } from '../../utils/server'
const qs = require('qs')
const stream = weex.requireModule('stream')
const modal = weex.requireModule('modal')
const urlConfig = require('../../utils/config.js')

export default {
  name: 'login-page',
  components: { WxcButton, WxcSearchbar },
  data () {
    return {
      info: '...',
      value: '输入框内容。。。',
      name: 'hitb',
      pwd: '123456',
      visible: false,
      user: { password: '123456', username: 'hitb', plat: 'client' },
      barStyle: {
        backgroundColor: '#C6e2FF'
      },
      btnStyle: {
        marginTop: '20px'
      }
    }
  },
  created: function () {
    // this.test()
  },
  methods: {
    login () {
      stream.fetch({
        method: 'POST',
        type: 'json',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        responseType: 'json',
        url: `${urlConfig.http}:${urlConfig.port}/${urlConfig.router}/login`,
        body: qs.stringify({ params: this.user })
      }, res => {
        if (res.ok) {
          if (res.data.login) {
            this.$store.commit('SET_user', res.data)
            this.$router.push('/')
            this.$store.commit('SET_visible', false)
            this.$store.commit('SET_menu', [0, '个人信息'])
            getServer(this, 'all', 'MDC')
            getServer(this, 'all', 'ADRG')
            getServer(this, 'all', 'DRG')
            getServer(this, 'all', 'ICD10')
            getServer(this, 'all', 'ICD9')
            this.$store.commit('SET_library_menu', 'MDC')
          } else {
            modal.toast({ 'message': '账号或密码错误', 'duration': 1 })
            this.$store.commit('SET_user', { login: false, data: { clipalm_version: 'BJ编码版' } })
          }
        } else {
          this.$store.commit('SET_user', { login: false, data: { clipalm_version: 'BJ编码版' } })
          modal.toast({ 'message': '网络连接失败', 'duration': 1 })
        }
      })
    },
    register () {
      if (this.visible) {
        this.info = '- 调用远程方法注册新用户 -'
      } else {
        this.name = ''
        this.pwd = ''
        this.visible = true
      }
    },
    test () {
      console.log('dsadasdsadwqeqweqwrqw')
    },
    NameOnFocus () {
      this.value = '用户名输入中。。。'
      modal.toast({ 'message': 'onfocus', 'duration': 1 })
    },
    NameOnBlur () {
      modal.toast({ 'message': 'onbulr', 'duration': 1 })
    },
    NameOnClose () {
      modal.toast({ 'message': 'close.click', 'duration': 1 })
    },
    NameOnInput (e) {
      this.value = e.value
    },
    NameOnCancel () {
      modal.toast({ 'message': 'cancel.click', 'duration': 1 })
    },
    NameOnReturn () {
      modal.toast({ 'message': 'return.click', 'duration': 1 })
    },
    PwdOnFocus () {
      this.value = '密码输入中。。。'
      modal.toast({ 'message': 'onfocus', 'duration': 1 })
    },
    PwdOnBlur () {
      modal.toast({ 'message': 'onbulr', 'duration': 1 })
    },
    PwdOnClose () {
      modal.toast({ 'message': 'close.click', 'duration': 1 })
    },
    PwdOnInput (e) {
      this.value = e.value
    },
    PwdOnCancel () {
      modal.toast({ 'message': 'cancel.click', 'duration': 1 })
    },
    PwdOnReturn () {
      modal.toast({ 'message': 'return.click', 'duration': 1 })
    }
  }
}
</script>

<style scoped>
  .wrapper {
    justify-content: center;
  }
  .panel {
    flex-direction: column;
    justify-content: center;
    height: 750;
    margin-left: 0px;
    /* border-width: 2px; */
    /* border-style: solid; */
    border-color: #BBBBBB;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 15px;
    padding-right: 15px;
    margin-bottom: 30px;
    margin-top: 0px;
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
</style>
