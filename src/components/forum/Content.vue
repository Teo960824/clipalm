<template>
  <div class="demo">
      <list class="list" loadmoreoffset="20">
        <cell class="cell" v-for="(data, index) in datas" v-bind:key="index">
          <wxc-cell
            :label="data.username"
            :title="data.content"
            :extraContent="data.datetime"
            :has-margin="false"
            @wxcCellClicked="wxcCellClicked(wt4)">
          </wxc-cell>
        </cell>
      </list>
      <div class="wrapper">
        <textarea class="textarea" placeholder="输入帖子内容" @input="oninput2"></textarea>
      </div>
      <wxc-button text="回复"
        class="submits"
        size="full"
        @wxcButtonClicked="wxcButtonClicked"></wxc-button>
  </div>
</template>
<script>
import { WxcPopup, WxcCell, WxcButton, WxcGridSelect } from 'weex-ui'
import { createForum } from '../../utils/server'
const modal = weex.requireModule('modal')
export default {
  components: { WxcPopup, WxcCell, WxcButton, WxcGridSelect },
  data () {
    return {
      content: '123'
    }
  },
  computed: {
    datas () {
      return this.$store.state.Forum.forumContent.content
    }
  },
  methods: {
    oninput2 (event) {
      this.content = event.value
    },
    wxcButtonClicked () {
      if (this.$store.state.Home.user.login) {
        const ForumContent = { forum_id: this.$store.state.Forum.forumContent.id, content: this.content, username: this.$store.state.Home.user.data.username }
        createForum(this, { forum_content: ForumContent })
      } else {
        modal.toast({ message: '请先登录', duration: 1 })
      }
    }
  }
}
</script>
<style scoped>
.demo-title {
  font-size: 28px;
  background-color: #C6E2FF;
  text-align: center;
  border-style: solid;
  border-width: 1px;
  border-radius: 14px;
  padding: 10px;
}
.demo {
  width: 750px;
  height: 1250px;
  margin-top: 91px;
}
</style>
