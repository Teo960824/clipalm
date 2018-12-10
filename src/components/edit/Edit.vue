<template>
  <div class="demo" v-bind:style="panel">
    <div class="count" v-if="showStat">
      <wxc-cell v-for="(item, index) in stat" v-bind:key="index"
                :title="index"
                :desc="`${item}`"
                :cell-style="cellStyle"
                :extraContent="aa(stat, index)"></wxc-cell>
    </div>
    <!-- <text class="demo-title"  v-if="wt4Case.length !== 0">{{title.count}}</text> -->
    <list class="list" @loadmore="fetch" loadmoreoffset="20" v-if="showData">
      <cell v-for="(wt4, index) in wt4Case" v-bind:key="index" @longpress="test">
        <div class="panel" @longpress="longpress(wt4)">
          <wxc-cell
            :title="wt4.disease_code"
            :desc="wt4.extraContent"
            :has-margin="false"
            :has-arrow="true"
            :arrow-icon="arrawSrc"
            @wxcCellClicked="wxcCellClicked(wt4)">
          </wxc-cell>
        </div>
      </cell>
      <cell style="height:200px" v-if="showMore">
        <wxc-button text="加载更多"
          class="submits"
          size="big"
          @wxcButtonClicked="fetch"></wxc-button>
      </cell>
    </list>
    <list class="list" loadmoreoffset="20" v-else>
      <cell style="height:91px">
      </cell>
      <cell>
        <div class="panel" @longpress="longpress(wt4)">
          <wxc-cell
            title="无数据"
            :has-margin="false"
            :has-arrow="false"
            :arrow-icon="arrawSrc">
          </wxc-cell>
        </div>
      </cell>
    </list>
    <mini-bar :title="menu" rightIcon="home" leftIcon="left" rightButtonShow="true"></mini-bar>
  </div>
</template>

<script>
import { WxcRichText, WxcSpecialRichText, WxcPopup, WxcCell, WxcIndexlist, WxcLoading, WxcPartLoading, WxcButton } from 'weex-ui'
import { getServer } from '../../utils/server'
import { getDetails } from '../../utils/details'
import MiniBar from '../common/MiniBar.vue'
const urlConfig = require('../../utils/config.js')
export default {
  components: { WxcIndexlist, WxcRichText, WxcSpecialRichText, WxcPopup, WxcCell, WxcLoading, WxcPartLoading, WxcButton, MiniBar },
  data () {
    return {
      forceValue: 0,
      refreshing: false,
      arrawSrc: `${urlConfig.static}/images/more.png`,
      cellStyle: {
        backgroundColor: '#F8F8FF'
      },
      showData: true
    }
  },
  created () {
    this.getData()
  },
  computed: {
    specialConfigList () {
      const configs = []
      this.wt4Case.map((x) => {
        const config = [
          {
            type: 'tag',
            value: '诊断编码:',
            style: {
              fontSize: 34,
              color: '#3D3D3D',
              borderColor: '#FFC900',
              backgroundColor: '#FFC900',
              borderRadius: 14
            }
          },
          {
            type: 'text',
            value: x.disease_code,
            theme: 'black',
            style: { fontSize: 35 }
          },
          {
            type: 'tag',
            value: '诊断名称:',
            style: {
              fontSize: 34,
              color: '#3D3D3D',
              borderColor: '#FFC900',
              backgroundColor: '#FFC900',
              borderRadius: 14
            }
          },
          {
            type: 'text',
            value: x.disease_name,
            theme: 'black',
            style: { fontSize: 35 }
          }
        ]
        configs.push(config)
      })
      return configs
    },
    activeTab () {
      return this.$store.state.Home.activeTab
    },
    menu () {
      return this.$store.state.Home.menu[this.activeTab]
    },
    wt4Case: {
      get () {
        const data = this.$store.state.Edit.wt4Case.map((x) => {
          const obj = x
          let extraContent = ''
          switch (this.$store.state.Home.menu[1]) {
            case '未入组病历':
              extraContent = `其他诊断：${x.diags_code}`
              break
            case 'QY病历':
              extraContent = `主要手术：${x.oper_code}; DRG：${x.drg}`
              break
            case '低风险死亡病历':
              extraContent = `年龄：${x.age}; 其他诊断：${x.diags_code}; DRG：${x.drg}`
              break
            case '费用异常病历':
              extraContent = `总费用：${x.total_expense}; 年龄：${x.age}; 其他诊断：${x.diags_code};住院日${x.acctual_days}; DRG：${x.drg}`
              break
            default:
              extraContent = `性别：${x.gender}·年龄：${x.age}岁·费用：${x.total_expense}元·住院天数：${x.acctual_days}天·drg：${x.drg}`
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
    showStat () {
      let show = false
      if (this.wt4Case.length > 0) {
        show = true
      }
      return show
    },
    showMore () {
      return this.$store.state.Home.showMore
    },
    user () {
      return this.$store.state.Home.user
    },
    stat () {
      return this.$store.state.Edit.wt4Info
    },
    panel: {
      get () {
        const tabPageHeight = weex.config.env.deviceHeight
        const style = {
          height: tabPageHeight
        }
        return style
      }
    }
  },
  methods: {
    wxcRichTextLinkClick () {},
    getData () {
      const i = this.$store.state.Home.activeTab
      const menu = this.$store.state.Home.menu[i]
      if (this.wt4Case.length === 0 && this.user.data.type !== '个人用户') {
        getServer(this, i, menu)
        this.showData = true
      } else if (this.user.data.type === '个人用户') {
        this.showData = false
      }
    },
    wxcCellClicked (e) {
      this.$store.commit('SET_infoLevel', 1)
      const details = getDetails(this, '病案详情', e)
      this.$store.commit('SET_info', details)
    },
    fetch () {
      this.$store.commit('SET_wt4Page', this.$store.state.Edit.wt4Page + 1)
      getServer(this, this.activeTab, this.menu)
    },
    aa (title, index) {
      const keys = Object.keys(title)
      const lastKey = keys[keys.length - 1]
      if (lastKey === index) {
        return ''
      } else {
        return '       |'
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
  .submits{
    position: relative;
    left: 210px;
    top: 1
  }
  .count {
    flex-direction: row;
    justify-content: space-around;
    margin-top: 91px;
    background-color: #F8F8FF;
  }
</style>
