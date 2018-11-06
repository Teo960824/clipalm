<template>
  <scroller class="container">
    <div>
      <text class="title">邮箱</text>
      <input type="email" name="Email" placeholder="请输入邮箱" class="input" :autofocus="true" v-model="user.email">
    </div>
     <div>
      <text class="title">密码</text>
      <input type="password" name="password" placeholder="请输入密码" class="input" :autofocus="true"  v-model="user.password" />
    </div>
    <div>
      <text class="title">确认密码</text>
      <input type="password" name="password_again" placeholder="请再次输入密码" class="input" :autofocus="true"  v-model="user.repassword" />
     </div>
    <div>
      <text class="title">手机号码</text>
      <input type="number" name="mobile" placeholder="请输入手机号码" class="input" :autofocus="true"  v-model="user.tel" />
    </div>
      <text class="title">推荐码</text>
      <input type="text" name="recommend_number" placeholder="请输入推荐码" class="input" :autofocus="true"/>
      <text class="hint">*专家用户、机构用户需输入推荐码</text>
    </div>
    <div class="row">
      <wxc-button text="注册"
                  type="red"
                  size="medium"
        @wxcButtonClicked='submit'></wxc-button>
      <wxc-button text="重置"
                  type="blue"
                  size="medium"
        @wxcButtonClicked='reset'></wxc-button>
    </div>
  </scroller>
</template>
<script>
import { WxcButton } from 'weex-ui'
const qs = require('qs')
const stream = weex.requireModule('stream')
const modal = weex.requireModule('modal')
const urlConfig = require('../../utils/config.js')
export default {
  components: { WxcButton },
  data () {
    return {
      user: { email: '', password: '', repassword: '', tel: '', username: '' }
    }
  },
  methods: {
    submit () {
      this.user.username = this.user.email
      stream.fetch({
        method: 'POST',
        type: 'json',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        responseType: 'json',
        url: `${urlConfig.http}:${urlConfig.port}/${urlConfig.router}/drg_admin_user`,
        body: qs.stringify({ drg_admin_user: this.user })
      }, res => {
        if (res.ok) {
          const i = this.$store.state.Home.activeTab
          if (res.data.is_success === false) {
            modal.toast({ 'message': res.data.log, 'duration': 1 })
          } else {
            modal.toast({ 'message': '账号注册成功', 'duration': 3 })
            this.$store.commit('SET_menu', [i, '用户登陆'])
          }
        } else {
          this.$store.commit('SET_user', { login: false, data: { clipalm_version: 'BJ编码版' } })
          modal.toast({ 'message': '网络连接失败', 'duration': 1 })
        }
      })
    },
    reset () {
      this.user = { email: '', password: '', repassword: '', tel: '', username: '' }
    }
  }
}
</script>
<style scoped>
.container {
  width: 750px;
  margin-top: 91px;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
}
.input {
  font-size: 30px;
  height: 50px;
  width: 740px;
  border-width: 1px;
  border-color: #ffffff;
  border-radius: 40px;
}
.title{
  font-size:35px;
}
.wxc-grid-select{
  font-size: 20px;
  height: 50px;
  width: 50px;
}
.hint
{
  color:red;
  font-size:25px;

}
.row {
  width: 750px;
  flex-direction: row;
  justify-content: space-around;
  padding-bottom: 10px;
}
</style>
