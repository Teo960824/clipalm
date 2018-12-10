<template>
  <div class="panel" v-bind:style="panel">
    <category class="category" :title="`用户积分信息`"></category>
    <text class="bpStyle">当前积分：{{user.bp}}</text>
    <category title="--选择用户功能--"></category>
    <wxc-grid-select
      class="gridSelect"
      :single="true"
      :cols="5"
      :customStyles="customStyles"
      :list="list_1"
      @select="params => onSelect(params, 'user')">
    </wxc-grid-select>
    <category title="--选择字典--"></category>
    <wxc-grid-select
      class="gridSelect"
      :single="true"
      :cols="5"
      :customStyles="customStyles"
      :list="list_2"
      @select="params => onSelect(params, 'version')">
    </wxc-grid-select>
    <category title="--选择ICD版本--"></category>
    <wxc-grid-select
      class="gridSelect"
      :single="true"
      :cols="5"
      :customStyles="customStyles"
      :list="list_3"
      @select="params => onSelect(params, 'icd')">
    </wxc-grid-select>
    <category title="--选择DRG版本--"></category>
    <wxc-grid-select
      class="gridSelect"
      :single="true"
      :cols="5"
      :customStyles="customStyles"
      :list="list_4"
      @select="params => onSelect(params, 'drg')">
    </wxc-grid-select>
    <div style="height:20px;"></div>
    <wxc-button text="退出登录"
        size="full"
        class="submits"
        type="blue"
        @wxcButtonClicked="wxcButtonClicked"></wxc-button>
    <mini-bar :title="`用户信息-${user.username}`" rightIcon="table" leftIcon="setting" :rightButtonShow="rightButtonShow"></mini-bar>
  </div>
</template>

<script>
import { WxcMinibar, WxcGridSelect, WxcButton, WxcCell } from 'weex-ui'
import Category from '../common/category.vue'
import MiniBar from '../common/MiniBar.vue'
import { userLogout, updateUser } from '../../utils/user'
const modal = weex.requireModule('modal')

export default {
  name: 'user-doc',
  components: { WxcMinibar, WxcGridSelect, Category, WxcButton, WxcCell, MiniBar },
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
    }
  }),
  computed: {
    user: {
      get () {
        return this.$store.state.Home.user.data
      }
    },
    rightButtonShow: {
      get () {
        return this.user.admin
      }
    },
    list_1: {
      get () {
        // const types = {
        //   专家用户: { title: '专家用户', value: 1 },
        //   // 机构用户: { title: '机构用户', value: 2, disabled: 'true' },
        //   个人用户: { title: '个人用户', value: 2 }
        // }
        let types = {}
        // let serverType = ''
        if (this.$store.state.Home.user.data.type) {
          types[this.$store.state.Home.user.data.type] = { title: this.$store.state.Home.user.data.type, value: 1, checked: true }
          // serverType = this.$store.state.Home.user.data.type
        } else {
          types = { 专家用户: { title: '专家用户', value: 1, checked: true } }
        }
        // if (types[serverType]) {
        //   types[serverType].checked = true
        // }
        return Object.values(types)
      }
    },
    list_2: {
      get () {
        const versions = {
          BJ编码版: { title: 'BJ编码版', value: 1 },
          GB编码版: { title: 'GB编码版', value: 1 },
          // CC编码版: { title: 'CC编码版', value: 1, disabled: 'true' },
          术语版: { title: '术语版', value: 3 }
        }
        let serverVersion = ''
        if (this.$store.state.Home.user.data.clipalm_version) {
          serverVersion = this.$store.state.Home.user.data.clipalm_version
        } else {
          serverVersion = 'BJ编码版'
        }
        if (versions[serverVersion]) {
          versions[serverVersion].checked = true
        }
        return Object.values(versions)
      }
    },
    list_3: {
      get () {
        const icds = [
          { title: 'ICD10 6.0', value: 1 },
          { title: 'ICD10 5.0', value: 1 }
        ]
        return icds
      }
    },
    list_4: {
      get () {
        const drgs = {
          2013: { title: '2013', value: 1 },
          2014: { title: '2014', value: 1 },
          2015: { title: '2015', value: 1 },
          2016: { title: '2016', value: 1 },
          2017: { title: '2017', value: 1 },
          2018: { title: '2018', value: 1 }
        }
        let drgVersion = ''
        if (this.$store.state.Home.user.data.clipalm_year) {
          drgVersion = this.$store.state.Home.user.data.clipalm_year
        } else {
          drgVersion = '2017'
        }
        if (drgs[drgVersion]) {
          drgs[drgVersion].checked = true
        }
        return Object.values(drgs)
      }
    },
    mdcs: {
      get () {
        const arr = this.$store.state.Home.user.data.mdc
        if (arr) {
          return arr.map((value, index) => { return {'title': 'MDC' + value} })
        }
        return []
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
  methods: {
    minibarRightButtonClick (e) {
      this.$store.commit('SET_menu', [0, '用户登录'])
    },
    onSelect (params, type) {
      const user = {}
      if (type === 'user') {
        this.list_1[params.selectIndex].checked = true
      } else {
        switch (type) {
          case 'mdc':
            const mdc = this.mdcs[params.selectIndex].title
            this.$store.commit('SET_mdc', mdc)
            user.clipalm_mdc = mdc
            break
          case 'version':
            const version = this.list_2[params.selectIndex].title
            user.clipalm_version = version
            modal.toast({ message: `已设置${version}为默认查询版本`, duration: 1 })
            break
          // case 'user':
            // const types = this.list_1[params.selectIndex].title
            // user.type = types
            // break
          case 'icd':
            const icd = this.list_3[params.selectIndex].title
            user.icd_version = icd
            break
          case 'drg':
            const drg = this.list_4[params.selectIndex].title
            user.clipalm_year = drg
            break
        }
        updateUser(this, user)
      }
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
</style>
