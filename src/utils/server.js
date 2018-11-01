const stream = weex.requireModule('stream')
const storage = weex.requireModule('storage')
const urlConfig = require('../utils/config.js')
const qs = require('qs')
export function getServer (obj, type, menu, value = null) {
  // type:判断查询全部还是单项
  // menu:判断查询drg类型（mdc、adrg…）
  // value:单项查询条件
  let version = 'BJ'
  switch (obj.$store.state.Home.user.data.clipalm_version) {
    case 'BJ编码版':
      version = 'BJ'
      break
    case 'CC编码版':
      version = 'CC'
      break
    case 'GB编码版':
      version = 'GB'
      break
    case '术语版':
      version = 'CN'
      break
  }
  let url = null
  if (type === 'all') {
    switch (menu) {
      case 'MDC':
        url = `rule_bj_mdc?plat=client&version=${version}`
        break
      case 'ADRG':
        url = `rule_bj_adrg?plat=client&version=${version}`
        break
      case 'DRG':
        url = `rule_bj_drg?plat=client&version=${version}`
        break
      case 'ICD9':
        url = `rule_bj_icd9?plat=client&page=${obj.$store.state.Library.icd9Page}&version=${version}`
        break
      case 'ICD10':
        url = `rule_bj_icd10?plat=client&page=${obj.$store.state.Library.icd10Page}&version=${version}`
        break
      case '统计分析':
        url = 'wt4_stat_cv?plat=client'
        break
      case 'QY病历':
        url = `wt4_2017?plat=client&drg=QY&page=${obj.$store.state.Edit.wt4Page}`
        break
      case '未入组病历':
        url = `wt4_2017?plat=client&drg=0000&page=${obj.$store.state.Edit.wt4Page}`
        break
      case '低风险死亡病历':
        url = `wt4_2017?plat=client&drg=&page=${obj.$store.state.Edit.wt4Page}`
        break
      case '高CV病历':
        url = `wt4_2017?plat=client&cv=1&page=${obj.$store.state.Edit.wt4Page}`
        break
      case '论坛':
        if (value) {
          url = `forum?plat=client&lable=${value.b_wt4_v1_id}&page=${obj.$store.state.Forum.forumPage}`
        } else {
          url = `forum?plat=client&lable=&page=${obj.$store.state.Forum.forumPage}`
        }
    }
  } else if (type === 'adrgOne') {
    url = `rule_bj_adrg?mdc=${value.mdc}&plat=client`
  } else if (type === 'drgOne') {
    url = `rule_bj_drg?adrg=${value.code}&plat=client`
  } else if (type === 'wt4') {
    url = 'wt4_2017?plat=client'
  } else if (type === 'statOne') {
    url = `wt4_stat_cv?plat=client&drg=${value}`
  } else if (type === 'forumOne') {
    url = `forum?id=${value.id}`
  }
  if (url) {
    // 先取storage
    storage.getItem(url, e => {
      const a = '[]'
      // if (e.result === 'success') {
      if (a === 'success') {
        const edata = JSON.parse(e.data)
        setStore(obj, menu, edata)
      } else {
        obj.$store.commit('SET_isLoadingShow', true)
        stream.fetch({
          method: 'GET',
          type: 'json',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
          responseType: 'json',
          url: `${urlConfig.http}:${urlConfig.port}/${urlConfig.router}/${url}`
        }, res => {
          if (res.ok) {
            storage.setItem(url, JSON.stringify(res.data), e => {
              console.log('storage success')
            })
            setStore(obj, menu, res.data)
          } else {
            obj.info = '- 网络连接失败 -'
          }
        })
      }
    })
  }
}

export function compDrg (obj, wt4) {
  stream.fetch({
    method: 'POST',
    type: 'json',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json',
    url: `127.0.0.1:3001/comp_drg`,
    body: qs.stringify({ params: wt4 })
  }, res => {
    if (res.ok) {
      console.log(res.data)
    } else {
      obj.info = '- 网络连接失败 -'
    }
  })
}

export function getLastVersion (obj) {
  stream.fetch({
    method: 'GET',
    type: 'json',
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

export function updateUser (obj, user) {
  stream.fetch({
    method: 'POST',
    type: 'json',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json',
    url: `${urlConfig.http}:${urlConfig.port}/${urlConfig.router}/drg_admin_user_update`,
    body: qs.stringify({ drg_admin_user: user, id: obj.$store.state.Home.user.data.id })
  }, res => {
    if (res.ok) {
      obj.$store.commit('SET_userData', res.data.data)
    } else {
      obj.info = '- 网络连接失败 -'
    }
  })
}

function setStore (obj, menu, rdata) {
  obj.$store.commit('SET_isLoadingShow', false)
  let data = []
  switch (menu) {
    case 'MDC':
      obj.$store.commit('SET_library_menu', menu)
      obj.$store.commit('SET_mdc_rule', rdata.data)
      break
    case 'ADRG':
      obj.$store.commit('SET_library_menu', menu)
      obj.$store.commit('SET_adrg_rule', rdata.data)
      break
    case 'DRG':
      obj.$store.commit('SET_library_menu', menu)
      obj.$store.commit('SET_drg_rule', rdata.data)
      break
    case 'ICD9':
      obj.$store.commit('SET_library_menu', menu)
      obj.$store.commit('SET_icd9_page', parseInt(rdata.page))
      obj.$store.commit('SET_icd9_rule', rdata.data)
      break
    case 'ICD10':
      obj.$store.commit('SET_library_menu', menu)
      obj.$store.commit('SET_icd10_page', parseInt(rdata.page))
      obj.$store.commit('SET_icd10_rule', rdata.data)
      break
    case 'icd10One':
      obj.$store.commit('SET_icd10_page', parseInt(rdata.page))
      data = obj.$store.state.Library.icd10Rule
      data = data.concat(rdata.data)
      obj.$store.commit('SET_icd10_rule', data)
      break
    case 'icd9One':
      obj.$store.commit('SET_icd9_page', parseInt(rdata.page))
      data = obj.$store.state.Library.icd9Rule
      data = data.concat(rdata.data)
      obj.$store.commit('SET_icd9_rule', data)
      break
    case '统计分析':
      obj.$store.commit('SET_statDrg', rdata.data)
      break
    case '未入组病历':
      if (obj.$store.state.Edit.wt4Page === 1) {
        obj.$store.commit('SET_wt4Info', rdata.info)
      }
      data = obj.$store.state.Edit.wt4Case
      data = data.concat(rdata.data)
      obj.$store.commit('SET_wt4Case', data)
      break
    case 'QY病历':
      if (obj.$store.state.Edit.wt4Page === 1) {
        obj.$store.commit('SET_wt4Info', rdata.info)
      }
      data = obj.$store.state.Edit.wt4Case
      data = data.concat(rdata.data)
      obj.$store.commit('SET_wt4Case', data)
      break
    case '低风险死亡病历':
      if (obj.$store.state.Edit.wt4Page === 1) {
        obj.$store.commit('SET_wt4Info', rdata.info)
      }
      data = obj.$store.state.Edit.wt4Case
      data = data.concat(rdata.data)
      obj.$store.commit('SET_wt4Case', data)
      break
    case '高CV病历':
      if (obj.$store.state.Edit.wt4Page === 1) {
        obj.$store.commit('SET_wt4Info', rdata.info)
      }
      data = obj.$store.state.Edit.wt4Case
      data = data.concat(rdata.data)
      obj.$store.commit('SET_wt4Case', data)
      break
    case '论坛':
      data = obj.$store.state.Forum.post
      data = data.concat(rdata.data)
      obj.$store.commit('SET_icd9_page', parseInt(rdata.page))
      obj.$store.commit('SET_post', data)
      break
    case '帖子':
      obj.$store.commit('SET_forumContent', rdata.data[0])
      break
    case 'info':
      if (rdata.data.length === 1) {
        obj.$store.commit('SET_info', rdata.data[0])
      }
      break
    default:
      break
  }
}
