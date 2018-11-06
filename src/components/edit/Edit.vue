<template>
  <div class="demo" @swipe="swipe" style="height:1000px;">
    <text class="demo-title" v-if="showTitle">{{title}}</text>
    <list class="list" @loadmore="fetch" loadmoreoffset="20">
      <cell class="cell" v-for="(wt4, index) in wt4Case" v-bind:key="index">
        <div class="panel" @longpress="longpress(wt4)">
          <wxc-cell
            :label="wt4.disease_name"
            :has-margin="false"
            @wxcCellClicked="wxcCellClicked(wt4)"
            :extraContent="wt4.extraContent">
          </wxc-cell>
        </div>
      </cell>
    </list>
  </div>
</template>

<script>
import { WxcRichText, WxcSpecialRichText, WxcPopup, WxcCell, WxcIndexlist, WxcLoading, WxcPartLoading, WxcButton } from 'weex-ui'
import { getServer } from '../../utils/server'
import { getDetails } from '../../utils/details'
const modal = weex.requireModule('modal')
export default {
  components: { WxcIndexlist, WxcRichText, WxcSpecialRichText, WxcPopup, WxcCell, WxcLoading, WxcPartLoading, WxcButton },
  data () {
    return {
      forceValue: 0,
      refreshing: false
    }
  },
  created () {
  },
  computed: {
    wt4Case: {
      get () {
        const data = this.$store.state.Edit.wt4Case.map((x) => {
          const obj = x
          let extraContent = ``
          switch (this.$store.state.Edit.editMenu) {
            case '未入组病历':
              extraContent = `${x.diags_code}`
              break
            case 'QY病历':
              extraContent = `${x.opers_code}`
              break
            case '高CV病历':
              extraContent = `${x.total_expense}元·入组DRG平均费用`
              break
            default:
              extraContent = `${x.gender}·${x.age}岁·${x.total_expense}元·${x.acctual_days}天·${x.drg}`
          }
          if (extraContent === '') {
            obj.extraContent = '无'
          } else {
            obj.extraContent = extraContent
          }
          return obj
        })
        return data
      }
    },
    showTitle: {
      get () {
        let show = false
        if (this.$store.state.Edit.wt4Info !== '') {
          show = true
        }
        return show
      }
    },
    title: {
      get () {
        const data = this.$store.state.Edit.wt4Info
        return `病历数:${data.count} 平均费用${data.fee_avg} 平均住院天数${data.day_avg}`
      }
    }
  },
  methods: {
    wxcCellClicked (e) {
      this.$store.commit('SET_visible', false)
      this.$store.commit('SET_isBottomShow', true)
      const i = this.$store.state.Home.activeTab
      const menu = '病案详情'
      this.$store.commit('SET_menu', [i, menu])
      this.$store.commit('SET_infoMenu', this.wxcCellTitle)
      this.$store.commit('SET_infoLevel', 1)
      const details = getDetails(menu, e)
      this.$store.commit('SET_miniBarTitle', `病案ID-${e.b_wt4_v1_id}病案详情`)
      this.$store.commit('SET_infoPage', details)
    },
    swipe (e) {
      if (e.direction === 'left' && this.$store.state.Home.infoPage1.info !== '') {
        this.$store.commit('SET_infoMenu', this.wxcCellTitle)
        this.$store.commit('SET_menu', [this.$store.state.Home.activeTab, '病案详情'])
        this.$store.commit('SET_infoLevel', 1)
      }
    },
    fetch () {
      this.$store.commit('SET_wt4Page', this.$store.state.Edit.wt4Page + 1)
      getServer(this, 'all', this.$store.state.Edit.editMenu)
      // modal.toast({ message: '加载下一页', duration: 1 })
    },
    longpress (wt4) {
      modal.toast({ message: '跳转论坛', duration: 1 })
      this.$store.commit('SET_showForum', true)
      this.$store.commit('SET_menus', ['论坛', '自定义查询'])
      this.$store.commit('SET_menu', [4, '论坛'])
      this.$store.commit('SET_forumMenu', `关于病案${wt4.b_wt4_v1_id}帖子`)
      this.$store.commit('SET_post', [])
      this.$store.commit('SET_forumLabel', wt4.b_wt4_v1_id)
      this.$store.commit('SET_forumPage', 1)
      getServer(this, 'all', '论坛', wt4)
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
