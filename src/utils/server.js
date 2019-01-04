import { getDetails } from './details'
const stream = weex.requireModule('stream')
const storage = weex.requireModule('storage')
const modal = weex.requireModule('modal')
const urlConfig = require('./config.js')
const routers = require('./routers.js')
const qs = require('qs')

export function getServer (obj, activeTab, menu, value = null) {
  // activeTab:页面, menu:判断查询菜单, value:查询条件
  // 先取storage
  const url = routers(obj, activeTab, menu, value)
  let timeout = 7000
  if (activeTab === 1) {
    timeout = 30000
  }
  storage.getItem(url, e => {
    if (e.result === 'success!') {
      const edata = JSON.parse(e.data)
      setStore(obj, menu, 'type', edata)
    } else {
      obj.$store.commit('SET_isLoadingShow', true)
      stream.fetch({
        method: 'GET',
        type: 'json',
        timeout: timeout,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        responseType: 'json',
        url: url
      }, function (res) {
        obj.$store.commit('SET_isLoadingShow', false)
        if (res.ok) {
          storage.setItem(url, JSON.stringify(res.data))
          setStore(obj, activeTab, menu, res.data)
        } else {
          modal.toast({ message: '- 网络连接超时 -', duration: 1 })
        }
      })
    }
  })
}

export function getLastVersion (obj) {
  stream.fetch({
    method: 'GET',
    type: 'json',
    timeout: 7000,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json',
    url: `${urlConfig.http}:${urlConfig.port}/${urlConfig.router}/clipalm_last_version`
  }, res => {
    if (res.ok) {
      obj.$store.commit('SET_serverVersion', res.data)
    } else {
      obj.info = '- 网络连接失败 -'
    }
  })
}

function setStore (obj, activeTab, menu, rdata) {
  let data = []
  let wt4Data = []
  let details = {}
  const infoLevel = obj.$store.state.Home.infoLevel
  switch (activeTab) {
    case 0:
      if (['ADRG规则', 'DRG规则', 'ICD10-亚目', 'ICD10-细目', 'ICD9-亚目', 'ICD9-细目'].includes(menu)) {
        if (['ICD10-亚目', 'ICD9-亚目'].includes(menu)) {
          data.icd = rdata.data.map((x) => {
            x.name = x.desc
            return x
          })
          obj.$store.commit('SET_infoLevel', infoLevel + 1)
          details = getDetails(obj, menu, data)
          obj.$store.commit('SET_info', details)
        } else {
          obj.$store.commit('SET_infoLevel', infoLevel + 1)
          details = getDetails(obj, menu, rdata.data[0])
          obj.$store.commit('SET_info', details)
        }
      } else {
        data = obj.$store.state.Library.rule
        data = data.concat(rdata.data)
        obj.$store.commit('SET_rule', data)
      }
      break
    case 1:
      if (['未入组病历列表', 'QY病历列表', '低风险死亡病历列表', '费用异常病历列表'].includes(menu)) {
        data = obj.$store.state.Edit.wt4PopRight
        data = data.concat(rdata.data[0].wt4)
        obj.$store.commit('SET_wt4PopRight', data)
        wt4Data = rdata.data[0]
        wt4Data.wt4 = data
        obj.$store.commit('SET_infoLevel', infoLevel + 1)
        details = getDetails(obj, menu, wt4Data)
        obj.$store.commit('SET_info', details)
      } else {
        obj.$store.commit('SET_wt4PopRight', [])
        data = obj.$store.state.Edit.wt4Case
        data = data.concat(rdata.data)
        obj.$store.commit('SET_wt4Info', rdata.info)
        obj.$store.commit('SET_wt4Case', data)
      }
      break
    case 2:
      if (['ADRG分析', 'DRG分析', '诊断基础-亚目', '诊断DRG分析', '手术基础-亚目', '手术DRG分析'].includes(menu)) {
        obj.$store.commit('SET_infoLevel', infoLevel + 1)
        details = getDetails(obj, menu, rdata.data[0])
        obj.$store.commit('SET_info', details)
      } else {
        if (['DRG机构分析-年', 'DRG机构分析-半年', 'DRG机构分析-季度', 'DRG机构分析-月'].includes(menu)) {
          rdata.data = rdata.data.map((x) => {
            x.name1 = `机构：${x.name}`
            return x
          })
        } else if (['主诊未入组', '手术QY'].includes(menu)) {
          rdata.data = rdata.data.map((x) => {
            x.name1 = `病历数：${x.num_sum}`
            return x
          })
        } else {
          rdata.data = rdata.data.map((x) => {
            x.name1 = x.name
            return x
          })
        }
        data = obj.$store.state.Stat.statDrg
        data = data.concat(rdata.data)
        obj.$store.commit('SET_statDrg', data)
      }
      break
    case 3:
      switch (menu) {
        case '帖子列表':
          obj.$store.commit('SET_post', rdata.data)
          break
        case '最新帖子':
          obj.$store.commit('SET_post', rdata.data)
          break
        case '帖子':
          obj.$store.commit('SET_forumContent', rdata.data[0])
          break
      }
      break
  }
  // 判断是否有数据
  if (data.length === 0) {
    obj.$store.commit('SET_showData', false)
  }
  // 判断是否有更多数据
  if (rdata.data.length === 0) {
    modal.toast({ message: '没有更多内容了', duration: 1 })
    obj.$store.commit('SET_showMore', false)
  } else {
    obj.$store.commit('SET_showData', true)
    obj.$store.commit('SET_showMore', true)
  }
}

export function customSearch (obj, value) {
  value['版本'] = 'BJ'
  value['年份'] = '2017'
  // value['ICDB'] = '6.0'
  switch (obj.$store.state.Home.user.data.clipalm_version) {
    case 'BJ编码版':
      value['版本'] = 'BJ'
      break
    case 'CC编码版':
      value['版本'] = 'CC'
      break
    case 'GB编码版':
      value['版本'] = 'GB'
      break
    case '术语版':
      value['版本'] = 'CN'
      break
    default:
      value['版本'] = 'BJ'
      break
  }
  if (obj.$store.state.Home.user.data.clipalm_year) {
    value['年份'] = obj.$store.state.Home.user.data.clipalm_year
  }
  let data = []
  switch (obj.$store.state.Home.activeTab) {
    case 0:
      value.tab = '字典'
      value.page = obj.$store.state.Library.page
      break
    case 1:
      value.tab = '病案'
      value.page = obj.$store.state.Edit.wt4Page
      break
    case 2:
      value.tab = 'DRG分析'
      value.page = obj.$store.state.Stat.statPage
      break
    default:
      break
  }
  stream.fetch({
    method: 'POST',
    type: 'json',
    timeout: 7000,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json',
    url: `${urlConfig.http}:${urlConfig.port}/${urlConfig.router}/custom_query`,
    body: qs.stringify(value)
  }, res => {
    if (res.ok) {
      obj.$store.commit('SET_menu', [obj.$store.state.Home.activeTab, '自定义查询结果'])
      switch (obj.$store.state.Home.activeTab) {
        case 0:
          data = obj.$store.state.Library.rule
          data = data.concat(res.data.data)
          obj.$store.commit('SET_rule', data)
          break
        case 1:
          data = obj.$store.state.Edit.wt4Case
          data = data.concat(res.data.data)
          obj.$store.commit('SET_wt4Case', data)
          break
        case 2:
          res.data.data = res.data.data.map((x) => {
            x.name1 = x.name
            return x
          })
          data = obj.$store.state.Stat.statDrg
          data = data.concat(res.data.data)
          obj.$store.commit('SET_statDrg', data)
          break
        default:
          break
      }
    } else {
      obj.info = '- 网络连接超时 -'
    }
  })
}
