<template>
  <div class="panel" v-bind:style="panel">
    <div style="height: 91px;"></div>
    <am-list style="width:750px;">
      <div style="height:20px;"></div>
      <am-list-item
        title="用户名"
        arrow="empty"
        thumb="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546242737&di=b52b9a97e6b5ad8f01b091eb01e283d2&imgtype=jpg&er=1&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic2%2Fcover%2F00%2F41%2F91%2F58137026987d2_610.jpg"
        :extra="`${user.username}`">
      </am-list-item>
      <am-list-item
        title="积分"
        :extra="`${user.bp}`"
        arrow="empty"
        thumb="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545647386399&di=90ad8e3c24d9daf2205a8681caffdc64&imgtype=0&src=http%3A%2F%2Fimg.aso.aizhan.com%2Ficon%2F42%2Ff2%2Fb9%2F42f2b96fe14362ba813cb61e3f394474.jpg"
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
          thumb="https://image.flaticon.com/icons/svg/909/909252.svg"
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
          thumb="https://image.flaticon.com/icons/svg/1088/1088535.svg"
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
          thumb="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546242526&di=d7cba8d4e39c26ec502bcf4f897774ac&imgtype=jpg&er=1&src=http%3A%2F%2Farticle.fd.zol-img.com.cn%2Ft_s500x2000%2Fg5%2FM00%2F09%2F03%2FChMkJ1e1MLiIEnjOAACI7--HV7UAAUiDALndXoAAIkH147.png"
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
          thumb="https://image.flaticon.com/icons/svg/138/138294.svg"
          :extra="extra"
          @click="show">
        </am-list-item>
      </am-picker>
      <div style="height:25px;"></div>
      <am-list-item
        thumb="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545647959108&di=12433d659026642071f5d348fd494867&imgtype=0&src=http%3A%2F%2Fwww.archcollege.com%2Fimages%2Fdefault.png"
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
const modal = weex.requireModule('modal')

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
