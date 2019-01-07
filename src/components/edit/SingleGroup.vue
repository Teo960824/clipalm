<template>
  <div class="container" v-bind:style="panel">
    <mini-bar :title="menu" :rightIcon="['home']" :leftIcon="['left']"></mini-bar>
    <list >
      <cell>
        <div>
          <am-list :no-border="false">
            <am-list-input v-model="wt4.B_WT4_V1_ID" title="诊断编码" placeholder="请输入主要诊断编码，如'B25.901'"></am-list-input>
            <am-list-input v-model="wt4.AGE" title="年龄" placeholder="请输入年龄"></am-list-input>
            <am-list-input v-model="wt4.GENDER" title="性别" placeholder="请输入性别"></am-list-input>
            <am-list-input v-model="wt4.ACCTUAL_DAYS" title="住院天数" placeholder="请输入住院天数"></am-list-input>
            <am-list-input v-model="wt4.TOTAL_EXPEMSE" title="总费用" placeholder="请输入总费用"></am-list-input>
            <am-list-input v-model="wt4.SF0100" title="新生儿出生天数" placeholder="请输入新生儿出生天数"></am-list-input>
            <am-list-input v-model="wt4.SF0102" title="新生儿入院体重" placeholder="请输入新生儿入院体重"></am-list-input>
            <am-list-input v-model="wt4.SF0104" title="呼吸机使用时间" placeholder="请输入呼吸机使用时间"></am-list-input>
          </am-list>
        </div>
        <div>
          <am-list :no-border="false">
            <am-picker
              title="请选择"
              :placeholder="'请选择'"
              :data="testData1"
              @ok="exchangeOk"
              @hide="onHide">
              <am-list-item
                slot-scope="{ extra, show }"
                title="出院转归"
                :extra="extra"
                @click="show">
              </am-list-item>
            </am-picker>
          </am-list>
        </div>
        <div>
          <am-list :no-border="false">
            <am-list-input v-model="wt4.diages_code" title="其他诊断编码" placeholder="请输入其他诊断编码，中间以逗号分隔，如'B25.901,B25.902'"></am-list-input>
            <am-list-input v-model="wt4.oeprs_code" title="手术/操作编码" placeholder="请输入手术/操作编码，中间以逗号分隔，如'B25.901,B25.902'"></am-list-input>
          </am-list>
        </div>
        <div class="sub">
          <wxc-button text="提交分组"
            class="submits"
            type="blue"
            @wxcButtonClicked='submit'></wxc-button>
        </div>
        <div class="cell">
          <wxc-simple-flow class="cell" :list="groupResult" :themeColor="themeColor"></wxc-simple-flow>
        </div>
        <div style="height:400px"></div>
      </cell>
    </list>
  </div>
</template>

<script>
import { WxcGridSelect, WxcButton, WxcCell, WxcSimpleFlow } from 'weex-ui'
import { AmList, AmListInput, AmListItem, AmPicker } from 'weex-amui'
import { compDrg } from '../../utils/comp'
import MiniBar from '../common/MiniBar.vue'
const modal = weex.requireModule('modal')
export default {
  components: { WxcGridSelect, AmList, AmPicker, AmListItem, AmListInput, WxcButton, MiniBar, WxcCell, WxcSimpleFlow },
  data: () => ({
    themeColor: {
      lineColor: '#bf280b',
      pointInnerColor: '#b95048',
      pointBorderColor: '#bf280b',
      highlightTitleColor: '#bf280b',
      highlightPointInnerColor: '#bf280b',
      highlightPointBorderColor: '#d46262'
    },
    customStyles: {
      lineSpacing: '14px',
      width: '140px',
      height: '60px',
      icon: '',
      color: '#333333',
      checkedColor: '#ffffff',
      disabledColor: '#eeeeee',
      borderColor: '#666666',
      checkedBorderColor: '#ffb200',
      backgroundColor: '#ffffff',
      checkedBackgroundColor: '#ffb200'
    },
    wt4: { B_WT4_V1_ID: -1, DISEASE_CODE: 'B25.000y001+J17.1*', AGE: '12', GENDER: '男', SF0100: -1, SF0102: -1, SF0108: -1, SF0104: -1, ACCTUAL_DAYS: 1, TOTAL_EXPENSE: 1234.5, diages_code: '', oeprs_code: '' },
    testData1: [
      { label: '缺失', value: '缺失' },
      { label: '医嘱离院', value: '医嘱离院' },
      { label: '医嘱转院', value: '医嘱转院' },
      { label: '医嘱转入社区', value: '医嘱转入社区' },
      { label: '非医嘱离院', value: '非医嘱离院' },
      { label: '死亡', value: '死亡' },
      { label: '其他', value: '其他' }],
    testData2: [{ title: '男', checked: true }, { title: '女' }]
  }),
  computed: {
    scroller () {
      const tabPageHeight = weex.config.env.deviceHeight
      const style = {
        height: tabPageHeight
      }
      return style
    },
    panel () {
      const tabPageHeight = weex.config.env.deviceHeight
      const style = {
        height: tabPageHeight
      }
      return style
    },
    menu: {
      get () {
        const i = this.$store.state.Home.activeTab
        const menu = this.$store.state.Home.menu[i]
        return menu
      }
    },
    groupResult: {
      get () {
        const groupResult = this.$store.state.Edit.groupResult
        const datas = []
        if (groupResult.details !== undefined) {
          const arr = groupResult.info.log.split(';')
          arr.map((x) => {
            const data = {
              'highlight': false,
              'title': x
            }
            datas.push(data)
          })
        }
        return datas
      }
    }
  },
  methods: {
    // {selectIndex, checked, checkedList}
    onSelect (res, a) {
      console.log(a)
    },
    exchangeOk (year, labels) {
      modal.toast({ message: `已设置出院转归`, duration: 1 })
    },
    onOverLimit (limit) {
      modal.toast({ message: `最多选择${limit}个`, duration: 0.8 })
    },
    onHide (type) {
      // console.log('hide', type)
    },
    input (e) {
    },
    focus (e) {
    },
    blur (e) {
    },
    wxcButtonClicked (e) {
      console.log(e)
    },
    submit () {
      compDrg(this, this.wt4, this.$store.state.Home.activeTab)
      // const details = getDetails('分组结果', this.wt4)
      // this.$store.commit('SET_groupResult', this.wt4)
      // const menu = '分组结果'
      // const i = this.$store.state.Home.activeTab
      // this.$store.commit('SET_menu', [i, menu])
    }
  }
}
</script>
<style scoped>
.container {
  width: 750px;
}
.input {
  font-size: 30px;
  height: 50px;
  width: 350px;
  border-width: 1px;
  border-color: #000000;
}
.title {
  text-align: center;
  font-size: 35px;
}
.wxc-grid-select{
  font-size: 20px;
  height: 50px;
  width: 50px;
}
.row {
  width: 750px;
  flex-direction: row;
  justify-content: space-around;
  padding-bottom: 20px;
}
.submits {
  position: relative;
  left: 23px;
  margin-top: 70px;
}
.panel {
  margin-top: 91px;
}
.cell {
  background-color: #C6e2FF;
}
.textarea {
  font-size: 30px;
  width: 750px;
  height: 80px;
  margin-top: 0px;
  margin-left: 0px;
  padding-bottom: 0px;
  padding-left: 0px;
  padding-right: 0px;
  border-width: 1px;
  border-style: solid;
  border-color: #000000;
}
</style>
