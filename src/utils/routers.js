const urlConfig = require('./config.js')
const routers = function (obj, activeTab, menu, value) {
  let version = 'BJ'
  let year = '2017'
  let icd = '6.0'
  let url = ''
  let router = urlConfig.router
  obj.$store.commit('SET_showData', true)
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
    default:
      version = 'BJ'
      break
  }
  if (obj.$store.state.Home.user.data.clipalm_year) {
    year = obj.$store.state.Home.user.data.clipalm_year
  }
  if (obj.$store.state.Home.user.data.clipalm_icd) {
    icd = obj.$store.state.Home.user.data.clipalm_icd
  }
  if (value && !value.version) {
    value.version = 'CN'
  }
  if (value === null) {
    switch (menu) {
      case 'QY病历':
        url = `wt4_clipalm?type=QY&page=${obj.$store.state.Edit.wt4Page}&version=${version}`
        router = 'drgwork_wt4/expert'
        break
      case '未入组病历':
        url = `wt4_clipalm?type=0000&page=${obj.$store.state.Edit.wt4Page}&version=${version}`
        router = 'drgwork_wt4/expert'
        break
      case '低风险死亡病历':
        url = `wt4_clipalm?type=sf0108&page=${obj.$store.state.Edit.wt4Page}&version=${version}`
        router = 'drgwork_wt4/expert'
        break
      case '费用异常病历':
        url = `wt4_clipalm?type=cv&page=${obj.$store.state.Edit.wt4Page}&version=${version}`
        router = 'drgwork_wt4/expert'
        break
      case '填报异常病历':
        url = `wt4_error?plat=client&page=${obj.$store.state.Edit.wt4Page}&version=${version}`
        router = 'drgwork_wt4/expert'
        break
      case '我的病案':
        url = `wt4_comp?plat=client&page=${obj.$store.state.Edit.wt4Page}&version=${version}`
        break
      case 'CN-DRG':
        url = `rule_bj_mdc?plat=client&version=${version}&year=${year}&page=${obj.$store.state.Library.page}`
        break
      case 'ADRG':
        url = `rule_bj_adrg?plat=client&version=${version}&year=${year}&page=${obj.$store.state.Library.page}`
        break
      case 'DRG':
        url = `rule_bj_drg?plat=client&version=${version}&year=${year}&page=${obj.$store.state.Library.page}`
        break
      case 'BJ-ICD10':
        url = `icd10c?plat=client&year=2017&page=${obj.$store.state.Library.page}`
        break
      case 'BJ-ICD9':
        url = `icd9c?plat=client&year=2017&page=${obj.$store.state.Library.page}`
        break
      case 'GB-ICD10':
        url = `icd10c?plat=client&version=GB&year=2018&page=${obj.$store.state.Library.page}`
        break
      case 'GB-ICD9':
        url = `icd9c?plat=client&version=GB&year=2018&page=${obj.$store.state.Library.page}`
        break
      case '疾病分类/诊断术语':
        url = `rule_bj_mdc?plat=client&version=CN&type=dissect_icd10`
        break
      case '临床手术/操作术语':
        url = `rule_bj_mdc?plat=client&version=CN&type=dissect_icd9`
        break
      case '主诊未入组':
        url = `wt4_stat_cv_disease?plat=client&version=${version}&page=${obj.$store.state.Stat.statPage}`
        router = 'drgwork_wt4/expert'
        break
      case '手术QY':
        url = `wt4_stat_cv_qy?plat=client&version=${version}&page=${obj.$store.state.Stat.statPage}`
        router = 'drgwork_wt4/expert'
        break
      case 'DRG基础':
        url = `wt4_stat_mdc?plat=client&order=code&page=${obj.$store.state.Stat.statPage}`
        break
      case '偏差分布':
        url = `wt4_stat_mdc?plat=client&order=code&page=${obj.$store.state.Stat.statPage}&type=dd`
        break
      case 'DRG机构分析-年':
        url = `wt4_stat_cv_org?type=year&plat=client&version=${version}&page=${obj.$store.state.Stat.statPage}`
        router = 'drgwork_wt4/expert'
        break
      case 'DRG机构分析-半年':
        url = `wt4_stat_cv_org?type=half_year&plat=client&version=${version}&page=${obj.$store.state.Stat.statPage}`
        router = 'drgwork_wt4/expert'
        break
      case 'DRG机构分析-季度':
        url = `wt4_stat_cv_org?type=season&plat=client&version=${version}&page=${obj.$store.state.Stat.statPage}`
        router = 'drgwork_wt4/expert'
        break
      case 'DRG机构分析-月':
        url = `wt4_stat_cv_org?type=month&plat=client&version=${version}&page=${obj.$store.state.Stat.statPage}`
        router = 'drgwork_wt4/expert'
        break
      case '帖子列表':
        url = `forum?plat=client&table=`
        break
      case '最新帖子':
        url = `forum?plat=client&table=&order=time`
        break
    }
  } else {
    switch (menu) {
      case 'ADRG':
        url = `rule_bj_adrg?plat=client&page=1&code=${value.code}&version=${version}`
        break
      case 'DRG':
        url = `rule_bj_drg?plat=client&page=1&code=${value.code}&version=${version}`
        break
      case 'ICD10亚目':
        url = `rule_bj_icd10?plat=client&version=${value.version}&year=${value.year}&page=1&code=${value.code}&icd=${icd}`
        break
      case 'ICD10细目':
        url = `rule_bj_icd10?plat=client&version=${value.version}&year=${value.year}&page=1&code=${value.code}&icd=${icd}`
        break
      case 'ICD9亚目':
        url = `rule_bj_icd9?plat=client&version=${value.version}&year=${value.year}&page=1&code=${value.code}&icd=${icd}`
        break
      case 'ICD9细目':
        url = `rule_bj_icd9?plat=client&version=${value.version}&year=${value.year}&page=1&code=${value.code}&icd=${icd}`
        break
      case 'ADRG分析':
        url = `wt4_stat_adrg?plat=client&order=code&code=${value.code}`
        break
      case 'DRG分析':
        url = `wt4_stat_cv?plat=client&order=code&drg=${value.code}`
        break
      case '诊断术语':
        url = `rule_bj_icd10?plat=client&version=CN&page=1&dissect=${value.name}&mdc=${value.mdc}`
        break
      case '操作术语':
        url = `rule_bj_icd9?plat=client&version=CN&page=1&dissect=${value.name}&mdc=${value.mdc}`
        break
      case '帖子列表':
        url = `forum?plat=client&table=${value.b_wt4_v1_id}&username=${value.username}&module=${value.module}`
        break
      case '帖子':
        url = `forum?id=${value.id}`
        break
    }
  }
  return `${urlConfig.http}:${urlConfig.port}/${router}/${url}`
}
module.exports = routers
