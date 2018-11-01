<template>
  <div class="container">
    <div class="demo">
      <text class="value-text">基础输入框</text>
      <wxc-searchbar ref="wxc-searchbar"
                    @wxcSearchbarCancelClicked="wxcSearchbarCancelClicked"
                     @wxcSearchbarInputReturned="wxcSearchbarInputReturned"
                     @wxcSearchbarInputOnInput="wxcSearchbarInputOnInput"
                     @wxcSearchbarCloseClicked="wxcSearchbarCloseClicked"
                     @wxcSearchbarInputOnFocus="wxcSearchbarInputOnFocus"
                     @wxcSearchbarInputOnBlur="wxcSearchbarInputOnBlur"></wxc-searchbar>
      <text class="value-text">{{value}}</text>
    </div>
    <div class="demo demo1">
      <text class="value-text">输入框禁用</text>
      <wxc-searchbar :disabled="true"></wxc-searchbar>
    </div>
    <div class="demo demo1">
      <text class="value-text">带有目的地模式的输入框</text>
      <wxc-searchbar :disabled="true"
                     placeholder="搜索目的地"
                     mod="hasDep"
                     dep-name="杭州出发"></wxc-searchbar>
    </div>
  </div>
</template>
<script>
import { WxcSearchbar } from 'weex-ui'
const modal = weex.requireModule('modal')
export default {
  components: { WxcSearchbar },
  data: () => ({
    value: ''
  }),
  methods: {
    wxcSearchbarInputOnInput (e) {
      this.value = e.value
    },
    wxcSearchbarInputOnFocus () {
      modal.toast({ 'message': 'onfocus', 'duration': 1 })
    },
    wxcSearchbarInputOnBlur () {
      modal.toast({ 'message': 'onfocus', 'duration': 1 })
    },
    wxcSearchbarInputReturned () {
      modal.toast({ 'message': 'onfocus', 'duration': 1 })
    },
    wxcSearchbarCloseClicked () {
      modal.toast({ 'message': 'onfocus', 'duration': 1 })
    },
    wxcSearchbarCancelClicked () {
      modal.toast({ 'message': 'onfocus', 'duration': 1 })
    },
    wxcSearchbarInputDisabledClicked () {
      modal.toast({ 'message': 'onfocus', 'duration': 1 })
    },
    wxcSearchbarDepChooseClicked () {
      modal.toast({ 'message': 'onfocus', 'duration': 1 })
    }
  }
}
</script>
<style scoped>
.container {
  margin-top: 91px;
  width: 750px;
  height: 1250px;
}
</style>
