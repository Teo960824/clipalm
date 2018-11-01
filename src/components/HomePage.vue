<template>
<div class="homepage" v-if="showNewVersion">
  <Version></Version>
</div>
<div class="homepage" v-else>
  <wxc-loading :show="isLoadingShow" type="default" loading-text="正在查询"></wxc-loading>
  <mini-bar></mini-bar>
  <wxc-tab-bar
    ref="wxcTabBar"
    :tab-titles="tabs"
    :tab-styles="tabStyles"
    title-type="icon"
    duration="10"
    @wxcTabBarCurrentTabSelected="wxcTabBarCurrentTabSelected">
    <!-- user页 -->
    <div class="panel">
      <Login v-if="menu[0] == '用户登陆'"></Login>
      <User v-if="menu[0] == '个人信息'"></User>
    </div>
    <!-- edit页 -->
    <div class="panel">
      <Edit v-if="['未入组病历', '低风险死亡病历', '高CV病历', 'QY病历'].includes(menu[1])"></Edit>
      <Edit v-else-if="menu[1] == '数据展示'"></Edit>
      <Query v-else-if="menu[1] == '自定义查询'"></Query>
      <SingleGroup v-else-if="menu[1] == '单条分组'"></SingleGroup>
      <PopRight v-else></PopRight>
    </div>
    <!-- library页 -->
    <div class="panel">
      <Query v-if="menu[2] == '自定义查询'"></Query>
      <PopRight v-else-if="menu[2] == '规则详情'"></PopRight>
      <Library v-else></Library>
    </div>
    <!-- stat页 -->
    <div class="wrapper">
      <Report v-if="menu[3] == '统计分析'"></Report>
      <Charts v-if="menu[3] == '报表'"></Charts>
      <Query v-else-if="menu[3] == '自定义查询'"></Query>
      <PopRight v-else></PopRight>
    </div>
    <!-- forum页 -->
    <div class="panel">
      <Forum v-if="menu[4] == '论坛'"></Forum>
      <New v-if="menu[4] == '新建'"></New>
      <Content v-if="menu[4] == '帖子'"></Content>
      <Query v-if="menu[4] == '自定义查询'"></Query>
    </div>
  </wxc-tab-bar>
  <pop-bar></pop-bar>
  <mini-bar></mini-bar>
  <!-- <pop-up></pop-up> -->
</div>
</template>

<script>
  import { WxcTabBar, Utils, WxcLoading } from 'weex-ui';
  import { getServer, getLastVersion } from '../utils/server'
  import Version from './common/Version'
  import PopBar from './common/PopBar'
  import PopUp from './common/PopUp'
  import PopRight from './common/PopRight'
  import MiniBar from './common/MiniBar'
  import User from './user/User'
  import Login from './user/Login'
  import Edit from './edit/Edit'
  import SingleGroup from './edit/SingleGroup'
  import Library from './library/Library'
  import Report from './stat/Report'
  import Charts from './stat/Charts'
  import Query from './stat/Query'
  import Forum from './forum/Forum'
  import Content from './forum/Content'
  import New from './forum/New'

  export default {
    components: { WxcTabBar, PopBar, WxcLoading, PopUp, User, Login, Edit, SingleGroup, Library,
      Report, Query, Forum, PopRight, MiniBar, Content, Version, Charts, New },
    data: () => ({
      tabs: [{
        title: '用户',
        menu: [],
        // icon: '//img.alicdn.com/tfs/TB1D4RzQFXXXXcoXpXXXXXXXXXX-45-45.png',
        icon: 'https://gw.alicdn.com/tfs/TB1MWXdSpXXXXcmXXXXXXXXXXXX-72-72.png',
        activeIcon: 'https://gw.alicdn.com/tfs/TB1kCk2SXXXXXXFXFXXXXXXXXXX-72-72.png'
        }, {
          title: '病案',
          menu: ['未入组病历', 'QY病历', '低风险死亡病历', '高CV病历', '自定义查询', '单条分组'],
          // icon: '//gw.alicdn.com/tfs/TB1I2E9OVXXXXbFXVXXXXXXXXXX-45-45.png',
          icon: 'https://gw.alicdn.com/tfs/TB1MWXdSpXXXXcmXXXXXXXXXXXX-72-72.png',
          activeIcon: 'https://gw.alicdn.com/tfs/TB1kCk2SXXXXXXFXFXXXXXXXXXX-72-72.png'
        }, {
          title: '字典',
          menu: ['MDC', 'ADRG', 'DRG', 'ICD10', 'ICD9', '自定义查询'],
          // icon: '//gw.alicdn.com/tfs/TB1gUhyPXXXXXX5XXXXXXXXXXXX-45-45.png',
          icon: 'https://gw.alicdn.com/tfs/TB1MWXdSpXXXXcmXXXXXXXXXXXX-72-72.png',
          activeIcon: 'https://gw.alicdn.com/tfs/TB1kCk2SXXXXXXFXFXXXXXXXXXX-72-72.png'
        }, {
          title: 'DRG',
          menu: ['统计分析', '报表', '自定义查询'],
          // icon: '//gw.alicdn.com/tfs/TB1N1.6OVXXXXXqaXXXXXXXXXXX-45-45.png',
          icon: 'https://gw.alicdn.com/tfs/TB1MWXdSpXXXXcmXXXXXXXXXXXX-72-72.png',
          activeIcon: 'https://gw.alicdn.com/tfs/TB1kCk2SXXXXXXFXFXXXXXXXXXX-72-72.png'
        }, {
          title: '论坛',
          menu: ['论坛', '新帖子'],
          // icon: '//gw.alicdn.com/tfs/TB1N1.6OVXXXXXqaXXXXXXXXXXX-45-45.png',
          icon: 'https://gw.alicdn.com/tfs/TB1MWXdSpXXXXcmXXXXXXXXXXXX-72-72.png',
          activeIcon: 'https://gw.alicdn.com/tfs/TB1kCk2SXXXXXXFXFXXXXXXXXXX-72-72.png'
        }],
      tabStyles: {
        bgColor: '#FFFFFF',
        titleColor: '#666666',
        activeTitleColor: '#3D3D3D',
        activeBgColor: '#FFFFFF',
        isActiveTitleBold: true,
        iconWidth: 70,
        iconHeight: 70,
        width: 160,
        height: 120,
        fontSize: 24,
        textPaddingLeft: 10,
        textPaddingRight: 10
      }
    }),
    computed: {
      menu () {
        if (this.$store.state.Home.showForum) {
          this.$refs['wxcTabBar'].setPage(4)
        }
        return this.$store.state.Home.menu
      },
      showForum () {
        return this.$store.state.Home.showForum
      },
      isShow () {
        let isShow = false
        if (this.$store.state.Home.activeTab > 0) {
          isShow = true
        }
        return isShow
      },
      isLoadingShow () {
        return this.$store.state.Home.isLoadingShow
      },
      showNewVersion () {
        let show = false
        if (this.$store.state.Home.version < this.$store.state.Home.serverVersion.version) {
          show = true
        }
        return show
      }
    },
    created: function () {
      const tabPageHeight = Utils.env.getPageHeight();
      // 如果页面没有导航栏，可以用下面这个计算高度的方法
      // const tabPageHeight = env.deviceHeight / env.deviceWidth * 750;
      const { tabStyles } = this
      this.contentStyle = { height: (tabPageHeight - tabStyles.height) + 'px' }
      this.newVersion()
    },
    methods: {
      newVersion () {
        getLastVersion(this)
      },
      wxcTabBarCurrentTabSelected (e) {
        const i = e.page;
        if (i === this.$store.state.Home.activeTab && i !== 0) {
          this.$store.commit('SET_visible', true)
        }
        this.$store.commit('SET_activeTab', i)
        this.$store.commit('SET_infoPageClear')
        switch (i) {
          case 0:
            this.$store.commit('SET_menus', this.tabs[0]['menu'])
            this.$store.commit('SET_isMiniShow', false)
            break
          case 1:
            this.$store.commit('SET_menus', this.tabs[1]['menu'])
            this.$store.commit('SET_isMiniShow', true)
            // if (this.$store.state.Edit.wt4Case.length === 0) {
            //   getServer(this, 'all', '未入组病历')
            //   this.$store.commit('SET_editMenu', '未入组病历')
            // }
            break
          case 2:
            this.$store.commit('SET_menus', this.tabs[2]['menu'])
            this.$store.commit('SET_isMiniShow', true)
            break
          case 3:
            this.$store.commit('SET_menus', this.tabs[3]['menu'])
            this.$store.commit('SET_isMiniShow', true)
            break
          case 4:
            this.$store.commit('SET_menus', this.tabs[4]['menu'])
            this.$store.commit('SET_isMiniShow', true)
            break
          default :
            this.$store.commit('SET_menus', this.tabs[0]['menu'])
            this.$store.commit('SET_isMiniShow', true)
        }
      }
    }
  };
</script>

<style scoped>
  .homepage {
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #cccccc;
  }
  .panel {
    width: 750px;
    height: 1250px;
    background-color: #C6e2FF;
    align-items: center;
    margin-left: 0px;
    border-color: #BBBBBB;
    padding-top: 0px;
    padding-bottom: 0px;
    padding-left: 15px;
    padding-right: 15px;
    margin-bottom: 0px;
  }
  .item-container {
    width: 750px;
    align-items: center;
    justify-content: center;
  }
</style>
