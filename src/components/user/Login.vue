<template>
  <div class="panel">
    <div class="row">
      <image style="width:344px;height:177px" src="http://210.75.199.113/images/clipalm.png"></image>
    </div>
    <wxc-searchbar ref="wxc-searchbar"
      input-type='text'
      v-model = 'user.username'
      :default-value='name'
      cancel-label='用户名'
      placeholder='用户名'
      theme='yellow'
      :bar-style='barStyle'
      @wxcSearchbarInputOnInput="NameOnInput">
    </wxc-searchbar>

    <wxc-searchbar ref="wxc-searchbar"
      input-type='password'
      v-model = 'user.password'
      :default-value='pwd'
      cancel-label='密码'
      placeholder='密码'
      theme='yellow'
      :bar-style='barStyle'
      @wxcSearchbarInputOnInput="PwdOnInput">
    </wxc-searchbar>
    <div class="row">
      <wxc-button type="blue" text="登录" size="null" :btnStyle="btnStyle" @wxcButtonClicked="login"></wxc-button>
      <!-- <wxc-button text="注册" size="big" :btnStyle="btnStyle" @wxcButtonClicked="register"></wxc-button> -->
    </div>
  </div>
</template>

<script>
import { WxcButton, WxcSearchbar } from 'weex-ui'
import { getServer } from '../../utils/server'
const qs = require('qs')
const stream = weex.requireModule('stream')
const storage = weex.requireModule('storage')
const modal = weex.requireModule('modal')
const urlConfig = require('../../utils/config.js')

export default {
  name: 'login-page',
  components: { WxcButton, WxcSearchbar },
  data () {
    return {
      info: '...',
      value: '输入框内容。。。',
      // name: '',
      // pwd: '',
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
            storage.setItem('user', JSON.stringify(res.data))
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
      const i = this.$store.state.Home.activeTab
      this.$store.commit('SET_menu', [i, '注册用户'])
    },
    NameOnInput (e) {
      this.value = e.value
    },
    PwdOnInput (e) {
      this.value = e.value
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
