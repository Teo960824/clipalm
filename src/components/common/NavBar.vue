<template>
  <div>
    <div class="tabbar">
      <div class="tab active" :style="{ left: activeTab * 150 + 'px'}"></div>
      <div v-for="(tab, i) in tabs" :key="i" class="tab" @click="onClick(i)">
        <image class="icon" :src="tab.icon"></image>
        <text class="title">{{tab.title}}</text>
      </div>
    </div>
  </div>
</template>

<script>
import { WxcMinibar, Utils, WxcIcon } from 'weex-ui'

export default {
  name: 'App',
  components: { WxcMinibar, WxcIcon },
  data () {
    return {
      height: 400,
      tabs: [{
        title: '用户',
        menu: [],
        icon: '//img.alicdn.com/tfs/TB1D4RzQFXXXXcoXpXXXXXXXXXX-45-45.png'
      }, {
        title: '病案',
        menu: ['录入', '查询', 'DRG分组'],
        icon: '//gw.alicdn.com/tfs/TB1I2E9OVXXXXbFXVXXXXXXXXXX-45-45.png'
      }, {
        title: '字典',
        menu: ['MDC', 'ADRG', 'DRG', 'ICD10', 'ICD9'],
        icon: '//gw.alicdn.com/tfs/TB1gUhyPXXXXXX5XXXXXXXXXXXX-45-45.png'
      }, {
        title: 'DRG',
        menu: ['报表', '查询'],
        icon: '//gw.alicdn.com/tfs/TB1N1.6OVXXXXXqaXXXXXXXXXXX-45-45.png'
      }, {
        title: '论坛',
        menu: ['论坛', '论坛'],
        icon: '//gw.alicdn.com/tfs/TB19YESOVXXXXaNaXXXXXXXXXXX-45-45.png'
      }]
    }
  },
  computed: {
    visible () {
      return this.$store.state.Home.visible
    },
    panels () {
      return this.tabs.map(tab => ({ content: tab.title, menu: tab.menu }))
    },
    activeTab () {
      return this.$store.state.Home.activeTab
    }
  },
  created () {
    const tabPageHeight = Utils.env.getPageHeight()
    // 如果页面没有导航栏，可以用下面这个计算高度的方法
    // const tabPageHeight = env.deviceHeight / env.deviceWidth * 750
    this.height = tabPageHeight + 'px'
  },
  methods: {
    onClick (i) {
      if (i === this.$store.state.Home.activeTab) {
        this.$store.commit('SET_visible', true)
      }
      this.$store.commit('SET_activeTab', i)
      switch (i) {
        case 0:
          this.$store.commit('SET_menus', this.tabs[0]['menu'])
          this.$router.push('/')
          break
        case 1:
          this.$store.commit('SET_menus', this.tabs[1]['menu'])
          this.$router.push('/edit')
          break
        case 2:
          this.$store.commit('SET_menus', this.tabs[2]['menu'])
          this.$router.push('/library')
          break
        case 3:
          this.$store.commit('SET_menus', this.tabs[3]['menu'])
          this.$router.push('/stat')
          break
        case 4:
          this.$store.commit('SET_menus', this.tabs[4]['menu'])
          this.$router.push('/forum')
          break
        default :
          this.$store.commit('SET_menus', this.tabs[0]['menu'])
          this.$router.push('/')
      }
    }
  }
}
</script>

<style scoped>
  .tabbar {
    flex-direction: row;
    background-color: #FF4563;
  }
  .tab {
    height: 120px;
    width: 150px;
    justify-content: center;
    align-items: center;
  }
  .active {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgb(218, 59, 85);
    transition: left 200 ease-in-out;
  }
  .icon {
    width: 45px;
    height: 45px;
  }
  .title {
    font-size: 28px;
    color: #FFFFFF;
    margin-top: 10px;
  }
  .tab-panels {
    /* position: relative; */
    width: 3750;
    flex: 1;
    flex-direction: row;
    /* align-items: stretch; */
    background-color: #F5F5F5;
    transition: left 200 ease-in-out;
  }
  .panel {
    width: 750px;
    justify-content: center;
    align-items: center;
  }
  .content {
    font-size: 100px;
    color: #707070;
  }
</style>
