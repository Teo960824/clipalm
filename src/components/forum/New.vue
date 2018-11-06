<template>
  <div class="container">
    <input type="text" style="height:80;padding:20;" placeholder="输入帖子标题" class="input" :autofocus=true value="" @input="oninput"/>
    <div class="wrapper">
      <textarea class="textarea" placeholder="输入帖子内容" @input="oninput2" :autofocus=true value="" ></textarea>
    </div>
    <wxc-button text="发布"
          size="full"
          class="submits"
          @wxcButtonClicked="wxcButtonClicked"></wxc-button>
  </div>
</template>

<script>
import { WxcRichText, WxcSpecialRichText, WxcButton } from 'weex-ui'
import { createForum } from '../../utils/server'
const modal = weex.requireModule('modal')
export default {
  components: { WxcRichText, WxcSpecialRichText, WxcButton },
  data: () => ({
    title: '',
    content: ''
  }),
  computed: {
    posts () {
      return ''
    },
    specialConfigList () {
      return ''
    }
  },
  created: function () {
  },
  methods: {
    oninput (event) {
      this.title = event.value
    },
    oninput2 (event) {
      this.content = event.value
    },
    wxcButtonClicked () {
      if (this.$store.state.Home.user.login) {
        const forum = { username: this.$store.state.Home.user.data.username, label: this.$store.state.Forum.forumLabel, title: this.title }
        const ForumContent = { content: this.content, username: this.$store.state.Home.user.data.username }
        createForum(this, { forum: forum, forum_content: ForumContent })
      } else {
        modal.toast({ message: '请先登录', duration: 1 })
      }
    }
  }
}
</script>

<style scoped>
  .panel {
    width: 750px;
    background-color: #f2f3f4;
    font-size: 30px;
    border-style: solid;
    border-left-width: 0px;
    border-right-width: 0px;
    border-top-width: 0px;
    border-bottom-width: 1px;
    border-bottom-color: gray;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 15px;
    padding-right: 15px;
  }
.container {
  margin-top: 91px;
  width: 750px;
  height: 1250px;
  font-size: 30px;
}
.input {
  font-size: 40px;
  height: 80px;
  width: 1250px;
}
.textarea {
  font-size: 40px;
  width: 746px;
  height: 400px;
  margin-top: 50px;
  margin-left: 0px;
  padding-top: 20px;
  padding-bottom: 0px;
  padding-left: 0px;
  padding-right: 0px;
  color: #666666;
  border-width: 2px;
  border-style: solid;
  border-color: #FCFCFC;
}
.submits{
  position: relative;
  margin-top: 20px;
  left: 23px;
  top: 1px;
}
</style>
