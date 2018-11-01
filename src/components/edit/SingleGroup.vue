<template>
  <scroller class="container">
    <div class="row">
      <div class="col-md-6">
      <text class="title">主要诊断编码(必填)</text>
      <input type="text" name="DISEASE_CODE" placeholder="请输入主要诊断编码，如'B25.901'" class="input" :autofocus="true" value="B25.001"/>
    </div>
    <div class="col-md-6">
      <text class="title">年龄(必填)</text>
      <input type="number" name="AGE" placeholder="请输入年龄" class="input" :autofocus="true" v-model="wt4.AGE"/>
    </div>
    </div>
    <div class="row">
      <div class="col-md-6">
      <text class="title">性别(必填)</text>
      <input type="text" name="SEX" placeholder="请输入性别" class="input" :autofocus="true" v-model="wt4.GENDER"/>
    </div>
    <div class="col-md-6">
      <text class="title">住院天数(必填)</text>
      <input type="number" name="ACCTUAL_DAYS" placeholder="请输入住院天数" class="input" :autofocus="true" v-model="wt4.ACCTUAL_DAYS"/>
    </div>
    </div>
    <div class="row">
      <div class="col-md-6">
      <text class="title">总费用(必填)</text>
      <input type="text" name="TOTAL_EXPENSE" placeholder="请输入总费用" class="input" :autofocus="true" v-model="wt4.TOTAL_EXPEMSE"/>
    </div>
    <div class="col-md-6">
      <text class="title">新生儿出生天数</text>
      <input type="number" name="SF0100" placeholder="请输入新生儿出生天数，缺省填'-1'" class="input" :autofocus="true" v-model="wt4.SF0100"/>
    </div>
    </div>
    <div class="row">
      <div class="col-md-6">
      <text class="title">新生儿入院体重</text>
      <input type="number" name="SF0102" placeholder="新生儿入院体重，缺省填'-1'" class="input" :autofocus="true" v-model="wt4.SF0102"/>
    </div>
    <div class="col-md-6">
      <text class="title">呼吸机使用时间</text>
      <input type="number" name="SF0104" placeholder="呼吸机使用时间，缺省填'-1'" class="input" :autofocus="true" v-model="wt4.SF0104"/>
    </div>
    </div>
    <div>
      <text class="title">出院转归(必填)</text>
      <wxc-grid-select
        :single="true"
        :cols="5"
        :customStyles="customStyles"
        :list="testData1"
        @select="params => onSelect('res3', params)">
      </wxc-grid-select>
      </div>
    </div>
    <div>
      <text class="title">其他诊断编码</text>
      <textarea placeholder="请输入其他诊断编码，中间以逗号分隔，如'B25.901,B25.902" rows='3' name="diags_code"></textarea>
    </div>
    <div>
      <text class="title">手术/操作编码</text>
      <textarea placeholder="请输入手术/操作编码，中间以逗号分隔，如'B25.901,B25.902" rows='3' name="opers_code"></textarea>
    </div>
    <div>
      <wxc-button text="提交分组"
        class="submits"
        @wxcButtonClicked='submit'></wxc-button>
    </div>
  </scroller>
</template>

<script>
import { WxcGridSelect, WxcButton } from 'weex-ui'
import { compDrg } from '../../utils/server'
const modal = weex.requireModule('modal')
export default {
  components: { WxcGridSelect, WxcButton },
  data: () => ({
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
    wt4: { B_WT4_V1_ID: -1, DISEASE_CODE: 'B25.001', AGE: '12', GENDER: '男', SF0100: -1, SF0102: -1, SF0108: -1, SF0104: -1, ACCTUAL_DAYS: 1, TOTAL_EXPEMSE: 1234.5, diages_code: '', oeprs_code: '' },
    testData1: [
      { title: '缺失' },
      { title: '医嘱离院' },
      { title: '医嘱转院', checked: true },
      { title: '医嘱转入社区' },
      { title: '非医嘱离院' },
      { title: '死亡' },
      { title: '其他' }],
    testData2: [{ title: '男', checked: true }, { title: '女' }]
  }),
  methods: {
    // {selectIndex, checked, checkedList}
    onSelect (res, a) {
      console.log(a)
    },
    onOverLimit (limit) {
      modal.toast({ message: `最多选择${limit}个`, duration: 0.8 })
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
      compDrg(this, this.wt4)
    }
  }
}
</script>
<style scoped>
.container {
  width: 750px;
  margin-top: 91px;
}
.input {
  font-size: 30px;
  height: 50px;
  width: 350px;
  border-width: 1px;
  border-color: #ffffff;
  border-radius: 40px;
}
.title{
  font-size: 25px;
  /* height:60; */
  /* padding: 10; */
  /* color:ghostwhite;
  background: gray; */
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

.textarea{
  font-size: 15px;
  width: 750px;
  border-width: 1px;
  border-color: #aaa;
  border-radius: 40px;
}
.submits{
  position: relative;
  left: 23px;
  top: 1px;
}
</style>
