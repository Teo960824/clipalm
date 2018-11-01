<template>
  <div class="panel">
    <category title="--选择用户功能--"></category>
    <wxc-grid-select
      :single="true"
      :cols="5"
      :customStyles="customStyles"
      :list="list_1"
      @select="params => onSelect(params, 'user')">
    </wxc-grid-select>
    <category title="--选择字典版本--"></category>
    <wxc-grid-select
      :single="true"
      :cols="5"
      :customStyles="customStyles"
      :list="list_2"
      @select="params => onSelect(params, 'version')">
    </wxc-grid-select>
    <category title="--选择MDC修订--"></category>
    <wxc-grid-select
      :single="true"
      :cols="5"
      :customStyles="customStyles"
      :list="mdcs"
      @select="params => onSelect(params, 'mdc')">
    </wxc-grid-select>
  </div>
</template>

<script>
import { WxcMinibar, WxcGridSelect } from 'weex-ui'
import Category from '../common/category.vue'
import { updateUser } from '../../utils/server'
const modal = weex.requireModule('modal')
export default {
  name: 'user-doc',
  components: { WxcMinibar, WxcGridSelect, Category },
  data: () => ({
    list_1: [
      { title: '专家用户', value: 1, checked: true },
      { title: '机构用户', value: 2 },
      { title: '个人用户', value: 3 }
    ],
    customStyles: {
      width: '150px',
      lineSpacing: '12px',
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
    list_2: {
      get () {
        const versions = {
          BJ编码版: { title: 'BJ编码版', value: 1 },
          GB编码版: { title: 'GB编码版', value: 1 },
          CC编码版: { title: 'CC编码版', value: 1 },
          术语版: { title: '术语版', value: 4 }
        }
        let serverVersion = ''
        if (this.$store.state.Home.user.data.clipalm_version) {
          serverVersion = this.$store.state.Home.user.data.clipalm_version
        } else {
          serverVersion = 'BJ编码版'
        }
        versions[serverVersion].checked = true
        return Object.values(versions)
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
    }
  },
  methods: {
    minibarRightButtonClick (e) {
      this.$store.commit('SET_menu', [0, '用户登陆'])
    },
    onSelect (params, type) {
      const user = {}
      switch (type) {
        case 'mdc':
          const mdc = this.mdcs[params.selectIndex].title
          this.$store.commit('SET_mdc', mdc)
          user.clipalm_mdc = mdc
          break
        case 'version':
          let version = this.list_2[params.selectIndex].title
          user.clipalm_version = version
          modal.toast({ message: `已设置${version}为默认查询版本`, duration: 1 })
          break
      }
      updateUser(this, user)
    }
  }
}
</script>

<style scoped>
  .wrapper {
    justify-content: center;
  }
  .panel {
    margin-left: 0px;
    border-color: #BBBBBB;
    padding-top: 0;
    padding-bottom: 15px;
    padding-left: 15px;
    padding-right: 15px;
    margin-top: 91px;
  }
  .text {
    color: #666666;
    font-size: 32px;
  }
</style>
