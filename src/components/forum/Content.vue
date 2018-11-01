<template>
  <div class="demo">
      <div class="demo-content">
        <wxc-cell v-for="(data, index) in datas"
          :key="index"
          :label="data.username"
          :title="data.content"
          :extraContent="data.datetime"
          :has-arrow="false"
          ></wxc-cell>
      </div>
  </div>
</template>
<script>
import { WxcPopup, WxcCell, WxcButton, WxcGridSelect } from 'weex-ui'

export default {
  components: { WxcPopup, WxcCell, WxcButton, WxcGridSelect },
  data () {
    return {
    }
  },
  computed: {
    datas () {
      console.log(this.$store.state.Forum.forumContent.content)
      return this.$store.state.Forum.forumContent.content
    }
  },
  methods: {

  }
}
</script>
<style scoped>
  .demo {
    width: 750px;
    background-color: #f2f3f4;
    margin-top: 91px;
  }
</style>
