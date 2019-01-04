<template>
  <div class="demo" v-bind:style="panel" v-if="infoLevel === 1">
    <mini-bar :title="menu" rightIcon="home" leftIcon="back"></mini-bar>
    <!-- <div style="height:90px;"></div> -->
    <category class="category" :title="forum.title"></category>
    <list class="list" loadmoreoffset="20">
      <cell v-for="(data, index) in content" v-bind:key="index">
        <div class="panel">
          <!-- <wxc-cell
            :label="`${index + 1}#`"
            :title="`${data.content}`"
            :desc="`${data.username}  ${data.datetime}`"
            :extraContent="`${data.reply.length}`"
            :has-margin="false"
            :has-vertical-indent="false"
            :has-arrow="true"
            :arrow-icon="arrawSrc"
            @wxcCellClicked="wxcCellClicked(data, index)">
          </wxc-cell> -->
          <am-list :no-border="false">
            <am-list-item
              :title="`${data.username}`"
              :extra="`第${index + 1}楼 | ${data.datetime}`"
              arrow="empty"
              :thumb="usernames"
              @click="wxcCellClicked(data, index)"></am-list-item>
            <am-list-item
              :title="`        ${data.content}`"
              arrow="empty"
              :extra="`${data.reply.length}条回复`"
              @click="wxcCellClicked(data, index)"></am-list-item>
          </am-list>
        </div>
      </cell>
      <cell>
        <text v-if="textShow" style="font-size:35px;">{{text}}</text>
        <textarea class="textarea" placeholder="输入回复内容" @input="oninput2" value="" ></textarea>
        <wxc-button text="回复"
          class="submit"
          size="full"
          type="blue"
          @wxcButtonClicked="wxcButtonClicked"></wxc-button>
        <wxc-button text="删帖"
          class="submits"
          size="full"
          type="blue"
          @wxcButtonClicked="wxcDeleteButtonClicked"></wxc-button>
      </cell>
    </list>
  </div>

  <div class="demo" v-bind:style="panel" v-else>
    <mini-bar :title="menu" rightIcon="home" leftIcon="back"></mini-bar>
    <div style="height:90px;"></div>
      <!-- <wxc-cell
        :label="`${replyIndex + 1}#`"
        :title="`${content[replyIndex].content}`"
        :desc="`${content[replyIndex].username} | ${content[replyIndex].datetime}`"
        :has-margin="false"
        :has-vertical-indent="false"
        :has-arrow="false">
      </wxc-cell> -->
      <am-list :no-border="false">
        <am-list-item
          :title="`${content[replyIndex].username}`"
          :extra="`第${replyIndex + 1}楼 | ${content[replyIndex].datetime}`"
          arrow="empty"
          :thumb="usernames"></am-list-item>
        <am-list-item
          :title="`        ${content[replyIndex].content}`"
          arrow="empty"></am-list-item>
      </am-list>
    <category class="category" title="该楼的回复"></category>
    <list class="list" loadmoreoffset="20">
      <cell v-if="reply.length > 0">
        <div class="panel">
          <wxc-cell
            v-for="(r, index) in reply" v-bind:key="index"
            :label="`${index + 1}#`"
            :title="`${r.content}`"
            :desc="`${r.username}  ${r.datetime}`"
            :has-margin="false"
            :has-vertical-indent="false"
            :has-arrow="false"
            :arrow-icon="arrawSrc">
          </wxc-cell>
          <!-- <am-list :no-border="false">
            <am-list-item
              v-for="(r, index) in reply" v-bind:key="index"
              :title="`${r.username}`"
              :extra="`第${index + 1}楼 | ${r.datetime}`"
              arrow="empty"
              :thumb="usernames"></am-list-item>
            <am-list-item
              :title="`        ${r.content}`"
              arrow="empty"></am-list-item>
          </am-list> -->
        </div>
      </cell>
      <cell v-else>
        <div class="panel">
          <wxc-cell
            title="无回复"
            :has-margin="false"
            :has-vertical-indent="false"
            :has-arrow="false"
            :arrow-icon="arrawSrc">
          </wxc-cell>
        </div>
      </cell>
      <cell>
        <textarea class="textarea" placeholder="输入回复内容" @input="oninput2" value="" ></textarea>
        <wxc-button text=" 再回复"
          class="submits"
          size="full"
          type="blue"
          @wxcButtonClicked="wxcButtonClicked"></wxc-button>
      </cell>
    </list>
  </div>
</template>
<script>
import { WxcPopup, WxcCell, WxcButton, WxcRichText, WxcSpecialRichText } from 'weex-ui'
import { AmListItem, AmList } from 'weex-amui'
import MiniBar from '../common/MiniBar.vue'
import Category from '../common/category.vue'
import { createForum, deleteForum } from '../../utils/forum'
const modal = weex.requireModule('modal')
const icon = require('../../utils/icon.js')
export default {
  components: { WxcPopup, WxcCell, AmListItem, AmList, WxcButton, MiniBar, WxcRichText, WxcSpecialRichText, Category },
  data () {
    return {
      textContent: '1234',
      textShow: false,
      seen: true,
      text: '',
      data: null,
      reply: [],
      usernames: icon('usernames'),
      replyId: null,
      replyIndex: null,
      arrawSrc: icon['message']
    }
  },
  computed: {
    activeTab () {
      return this.$store.state.Home.activeTab
    },
    username () {
      return this.$store.state.Home.user.data.username
    },
    menu () {
      return this.$store.state.Home.menu[this.activeTab]
    },
    infoLevel () {
      return this.$store.state.Home.infoLevel[this.activeTab]
    },
    posts () {
      return this.$store.state.Forum.post
    },
    forum () {
      return this.$store.state.Forum.forumContent
    },
    title () {
      return `${this.forum.module}`
    },
    content () {
      return this.$store.state.Forum.forumContent.content
    },
    forumIndex () {
      return this.$store.state.Forum.forumIndex
    },
    forumModule () {
      return this.$store.state.Forum.forumModule
    },
    panel () {
      const tabPageHeight = weex.config.env.deviceHeight
      const style = {
        height: tabPageHeight
      }
      return style
    }
  },
  methods: {
    oninput2 (event) {
      this.textContent = event.value
    },
    change () {
      this.seen = false
    },
    wxcButtonClicked () {
      let ForumContent = {}
      if (this.$store.state.Home.user.login && this.infoLevel === 1) {
        ForumContent = { forum_id: this.forum.id, content: this.textContent, username: this.username, module: this.forumModule }
        createForum(this, { forum_all: { forum_content: ForumContent } }, 'reply', this.activeTab)
      } else if (this.$store.state.Home.user.login && this.infoLevel === 2) {
        ForumContent = { sid: this.forum.id, forum_content_id: this.replyId, content: this.textContent, username: this.username, module: this.forumModule }
        createForum(this, { forum_all: { forum_content: ForumContent } }, 'reply', this.activeTab)
        this.$store.commit('SET_infoLevel', this.infoLevel - 1)
      } else {
        modal.toast({ message: '请先登录', duration: 1 })
      }
    },
    wxcRichNextLinkClick () {
    },
    wxcCellClicked (data, index) {
      this.$store.commit('SET_infoLevel', this.infoLevel + 1)
      this.reply = data.reply
      this.replyId = data.id
      this.replyIndex = index
    },
    wxcDeleteButtonClicked () {
      if (this.$store.state.Forum.forumContent.content.length > 1) {
        modal.toast({ 'message': '该回复禁止删除', 'duration': 0.8 })
      } else {
        deleteForum(this, this.forum.id, this.forumModule)
      }
    }
  }
}
</script>
<style scoped>
.demo-title {
  font-size: 28px;
  background-color: #F8F8FF;
  text-align: center;
  border-style: solid;
  border-width: 1px;
  border-radius: 14px;
  padding: 10px;
}
.demo {
  width: 750px;
}
.submits {
  color: #ffffff;
  font-size: 32px;
  margin-left: 23px;
  margin-top: 12px;
  margin-bottom: 120px;
}
.submit {
  color: #ffffff;
  font-size: 32px;
  margin-left: 23px;
  margin-top: 12px;
  margin-bottom: 12px;
}
.textarea {
  border-width: 1.5px;
  border-style: solid;
  border-color: #000000;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
