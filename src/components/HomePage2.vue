<template>
  <div class="homepage" v-if="showNewVersion">
    <Version></Version>
  </div>
  <div class="homepage" v-bind:class="homepage" v-else>
    <Waiting
    :name="isLoadingShow"
    ref="fm-waiting"
    :can-auto-close="false"
    title="正在查询"></Waiting>
    <am-nav-bar
      :title="tabBar[selected].title"
      :left-btn="[]"
    ></am-nav-bar>
  <div v-if="Object.keys(forumInfo).length < 0">{{forumInfo}}</div>
    <am-tab-container :index="selected">
      <am-tab-container-item>
        <div>
          <am-tabs v-model="tabSelected" :tabs="['Tab1', 'Tab2', 'Tab3']"/>
          <am-tab-container>
            <am-tab-container-item>
              <div class="homepage">
                <!-- library页 -->
                <div class="panel" v-bind:class="panel">
                  <PopRight v-if="infoLevel[0] > 0"></PopRight>
                  <HomeMenu v-else-if="menu[0] === '字典'"></HomeMenu>
                  <Introduce v-else-if="menu[0] === '介绍'"></Introduce>
                  <CustomSelect v-else-if="menu[0] == '自定义查询'"></CustomSelect>
                  <Library v-else></Library>
                </div>
              </div>
            </am-tab-container-item>
            <am-tab-container-item>
              <div>
                <div class="homepage">
                  <div style="height:180px;"></div>
                </div>
              </div>
            </am-tab-container-item>
            <am-tab-container-item>
              <div>
                <div class="homepage">
                </div>
              </div>
            </am-tab-container-item>
          </am-tab-container>
        </div>
      </am-tab-container-item>
      <am-tab-container-item>
        <!-- edit页 -->
        <div>
          <div class="panel" v-bind:class="panel">
            <PopRight v-if="infoLevel[1] > 0"></PopRight>
            <HomeMenu v-else-if="menu[1] === '病案'"></HomeMenu>
            <Introduce v-else-if="menu[1] === '介绍'"></Introduce>
            <SingleGroup v-else-if="menu[1] == '单条分组'"></SingleGroup>
            <CustomSelect v-else-if="menu[1] == '自定义查询'"></CustomSelect>
            <Edit v-else></Edit>
          </div>
        </div>
      </am-tab-container-item>
      <am-tab-container-item>
        <div>
          <!-- stat页 -->
          <div class="panel" v-bind:class="panel">
            <PopRight v-if="infoLevel[2] > 0"></PopRight>
            <HomeMenu v-else-if="menu[2] === 'DRG分析'"></HomeMenu>
            <Introduce v-else-if="menu[2] === '介绍'"></Introduce>
            <!-- <Charts v-else-if="menu[3] == '报表'"></Charts> -->
            <CustomSelect v-else-if="menu[2] == '自定义查询'"></CustomSelect>
            <Report v-else></Report>
          </div>
        </div>
      </am-tab-container-item>
      <am-tab-container-item>
        <div>
          <!-- forum页 -->
          <div class="panel" v-bind:class="panel">
            <ForumContent v-if="infoLevel[3] > 0"></ForumContent>
            <HomeMenu v-else-if="menu[3] === '论坛'"></HomeMenu>
            <Introduce v-else-if="menu[3] === '介绍'"></Introduce>
            <!-- <New v-else-if="menu[4] === '新建帖子'"></New> -->
            <!-- <ForumContent v-else-if="menu[4] === '帖子'"></ForumContent> -->
            <Forum v-else></Forum>
          </div>
        </div>
      </am-tab-container-item>
      <am-tab-container-item>
        <div>
          <!-- user页 -->
          <div class="panel" v-bind:class="panel">
            <Analyse v-if="menu[4] == '用户统计'"></Analyse>
            <Personal v-else-if="menu[4] == '完善个人信息'"></Personal>
            <Login v-else-if="menu[4] == '用户登录'"></Login>
            <User v-else-if="menu[4] == '个人信息'"></User>
            <Retrieve v-else-if="menu[4] == '找回密码'"><text>></text></Retrieve>
          </div>
        </div>
      </am-tab-container-item>
    </am-tab-container>
    <am-tab-bar
      icon-font-family="testIcon"
    >
      <am-tab-bar-item
        v-for="(item, index) in tabBar"
        :key="item.title"
        :icon="item.icon"
        :title="item.title"
        :selected="selected === index"
        @click="selected = index"
      />
    </am-tab-bar>
  </div>
</template>
<script>
import { WxcTabBar, Utils } from 'weex-ui'
import { getServer, getLastVersion } from '../utils/server'
import { AmNavBar, AmTabBar, AmTabBarItem, AmTabContainer, AmTabContainerItem, AmTabs } from 'weex-amui'
import Waiting from './common/packages/waiting'
import Version from './common/Version'
import CustomSelect from './common/CustomSelect'
import PopRight from './common/PopRight'
import HomeMenu from './common/HomeMenu'
import Introduce from './common/Introduce'
import Edit from './edit/Edit'
import SingleGroup from './edit/SingleGroup'
import ForumContent from './forum/ForumContent'
import Forum from './forum/Forum'
import Library from './library/Library'
import Report from './stat/Report'
import Charts from './stat/Charts'
import Analyse from './user/Analyse'
import User from './user/User'
import Login from './user/Login'
import Personal from './user/Personal'
import Retrieve from './user/Retrieve'
import { userLogin } from '../utils/user'
const storage = weex.requireModule('storage')
const modal = weex.requireModule('modal')
const dom = weex.requireModule('dom')
const urlConfig = require('../utils/config.js')
export default {
  components: { AmNavBar, AmTabBar, WxcTabBar, AmTabBarItem, AmTabContainer, AmTabContainerItem, AmTabs, WxcTabBar, User, Login, Personal, Retrieve, Edit, SingleGroup, Library,
    Report, Forum, PopRight, ForumContent, Version, Charts, HomeMenu, Introduce, Analyse, CustomSelect, Waiting },
  data () {
    return {
      selected: 0,
      tabSelected: 0,
      tabBar: [
        {
          icon: '\ue7ce',
          title: '字典'
        },
        {
          icon: '\ue7ac',
          title: '病案'
        },
        {
          icon: '\ue800',
          title: 'DRG分析'
        },
        {
          icon: '\ue7e8',
          title: '论坛'
        },
        {
          icon: '\ue7e8',
          title: '用户'
        }
      ],
      tabStyles: {
        bgColor: '#F8F8FF',
        titleColor: '#666666',
        activeTitleColor: '#3D3D3D',
        activeBgColor: '#F8F8FF',
        isActiveTitleBold: true,
        iconWidth: 54,
        iconHeight: 54,
        width: 160,
        height: 100,
        fontSize: 24,
        textPaddingLeft: 10,
        textPaddingRight: 10
      }
    }
  },
  computed: {
    forumInfo () {
        const forumInfo = this.$store.state.Home.forumInfo
        // if (Object.keys(forumInfo).length > 0) {
        //   this.setPage(4)
        // }
        return forumInfo
      },
    activeTab () {
      return this.$store.state.Home.activeTab
    },
    user () {
      return this.$store.state.Home.user
    },
    infoLevel () {
      return this.$store.state.Home.infoLevel
    },
    menu () {
      // if (this.activeTab === 3) {
      //   this.setPage(this.activeTab)
      // }
      return this.$store.state.Home.menu
    },
    isLoadingShow () {
      if (this.$store.state.Home.isLoadingShow === true) {
        this.$refs['fm-waiting'].active()
      } else if (this.$store.state.Home.isLoadingShow === false) {
        setTimeout(() => {
          this.$refs['fm-waiting'].hide()
        }, 300)
      }
      return this.$store.state.Home.isLoadingShow
    },
    showNewVersion () {
      let show = false
      if (this.$store.state.Home.version < this.$store.state.Home.serverVersion.version) {
        show = true
      }
      return show
    },
    height () {
      const { tabStyles } = this
      const tabPageHeight = weex.config.env.deviceHeight
      const height = (tabPageHeight - tabStyles.height) + 'px'
      return height
    },
    homepage () {
      const style = {
        height: this.height,
      }
      return style
    },
    panel () {
      const style = {
        width: '750px',
        height: this.height,
      }
      return style
    }
  },
  beforeCreate () {
    dom.addRule('fontFace', {
      'fontFamily': 'testIcon',
      'src': "url('https://at.alicdn.com/t/font_666154_scqtwgh1e27kqpvi.ttf')"
    })
  },
  created: function () {
    storage.getItem('user', e => {
      if (e.result === 'success') {
        const edata = JSON.parse(e.data)
        if (edata.username && edata.password) {
          this.$store.commit('SET_menu_all', [ '字典', '病案', 'DRG分析', '论坛', '个人信息'])
          userLogin(this, edata)
        } else {
          this.$store.commit('SET_menu_all', ['介绍', '介绍', '介绍', '介绍', '用户登录'])
        }
      } else {
        this.$store.commit('SET_menu_all', ['介绍', '介绍', '介绍', '介绍', '用户登录'])
      }
    })
    this.newVersion()
    const tabPageHeight = Utils.env.getPageHeight();
    // 如果页面没有导航栏，可以用下面这个计算高度的方法
    // const tabPageHeight = env.deviceHeight / env.deviceWidth * 750;
    const { tabStyles } = this
    this.contentStyle = { height: (tabPageHeight - tabStyles.height) + 'px' }
  },
  methods: {
      newVersion () {
        getLastVersion(this)
      },
      setPage (num) {
        if (this.$refs['wxc-tab-bar']) {
          this.$refs['wxc-tab-bar'].setPage(num)
        }
      },
      wxcTabBarCurrentTabSelected (e) {
        const i = e.page
        const menus = this.tabs[i].menu
        console.log(menus)
        const menu = this.$store.state.Home.menu[i]
        const activeTab = this.$store.state.Home.activeTab
        this.$store.commit('SET_activeTab', i)
        this.$store.commit('SET_menus', menus)
        this.$store.commit('SET_menu', [i, menu])
        // 论坛
        if (i === 3 && menu === '介绍') {
          this.$store.commit('SET_menu', [i, menu])
        } else if (i === 3) {
          this.$store.commit('SET_menu', [i, menu])
          this.$store.commit('SET_forumLabel', this.$store.state.Home.menu[activeTab])
          // getServer(this, i, '帖子列表', { username: this.user.data.username })
        }
      }
    }
}
</script>

<style scoped lang="less">
  // 设置 web 端的root节点高度为100% (native端默认是100%)
  .weex-root {
    height: 100%;
  }
  .panel {
    width: 750px;
    margin-bottom: 35px;
    flex-direction: column;
    justify-content: center;
    border-width: 2px;
    border-style: solid;
    border-color: rgb(162, 217, 192);
    background-color: rgba(162, 217, 192, 0.2);
  }
  .homepage {
    height: 1243px;
  }
  .text {
    font-size: 50px;
    text-align: center;
    color: #41B883;
  }
</style>
