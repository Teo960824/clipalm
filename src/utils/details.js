function caseInfo (data) {
  const result = {
    info: data,
    infoTitle: '病案详情',
    isInfoButtonShow: false,
    buttonText: ``,
    gridList: [],
    details: [
      {'label': '入组DRG', 'title': 'drg'},
      {'label': '病案ID', 'title': 'b_wt4_v1_id'},
      {'label': '主要诊断编码', 'title': 'disease_code'},
      {'label': '主要诊断名称', 'title': 'disease_name'},
      {'label': '其他诊断', 'title': 'diags_code'},
      {'label': '手术/操作', 'title': 'opers_code'},
      {'label': '住院天数', 'title': 'acctual_days'},
      {'label': '住院总费用', 'title': 'total_expense'},
      {'label': '性别', 'title': 'gender'},
      {'label': '年龄', 'title': 'age'},
      {'label': '新生儿天数', 'title': 'sf0100'},
      {'label': '新生儿体重', 'title': 'sf0102'},
      {'label': '呼吸机使用时间', 'title': 'sf0104'},
      {'label': '出院转归', 'title': 'sf0108'},
      {'label': '分组日志', 'title': 'log'}]
  }
  return result
}
function statInfo (data) {
  const result = {
    info: data,
    infoTitle: '分析详情',
    isInfoButtonShow: false,
    buttonText: ``,
    gridList: [],
    details: [
      {'label': '编码', 'title': 'code'},
      {'label': '名称', 'title': 'desc'},
      {'label': '费用变异系数', 'title': 'fee_cv'},
      {'label': '时间变异系数', 'title': 'day_cv'},
      {'label': '死亡风险等级', 'title': 'death_level'},
      {'label': '权重', 'title': 'weight'},
      {'label': '平均费用', 'title': 'fee_avg'},
      {'label': '平均住院天数', 'title': 'day_avg'},
      {'label': '病历数', 'title': 'num_sum'}]
  }
  return result
}
function mdcInfo (data) {
  const gridList = {}
  gridList['非QY小手术'] = data.icd9_aa.map((x) => {
    const obj = {}
    obj.title = x
    return obj
  })
  const result = {
    info: data,
    infoTitle: 'MDC规则详情',
    isInfoButtonShow: true,
    buttonText: `${data.code}-ADRG规则`,
    gridList: gridList,
    details: [
      {'label': '编码', 'title': 'code'},
      {'label': '名称', 'title': 'desc'},
      {'label': '年份', 'title': 'year'},
      {'label': '版本', 'title': 'version'}]
  }
  return result
}
function adrgInfo (data) {
  const gridList = {}
  gridList['主要诊断'] = data.icd10_aa.map((x) => {
    const obj = {}
    obj.title = x
    return obj
  })
  gridList['其他诊断'] = data.icd10_bb.map((x) => {
    const obj = {}
    obj.title = x
    return obj
  })
  gridList['主要手术'] = data.icd9_aa.map((x) => {
    const obj = {}
    obj.title = x
    return obj
  })
  gridList['主要手术'] = data.icd9_bb.map((x) => {
    const obj = {}
    obj.title = x
    return obj
  })
  gridList['其他手术'] = data.icd9_bb.map((x) => {
    const obj = {}
    obj.title = x
    return obj
  })
  const result = {
    info: data,
    infoTitle: 'ADRG规则详情',
    isInfoButtonShow: true,
    buttonText: `${data.code}-DRG规则`,
    gridList: gridList,
    details: [
      {'label': '编码', 'title': 'code'},
      {'label': '名称', 'title': 'desc'},
      {'label': '年份', 'title': 'year'},
      {'label': '版本', 'title': 'version'}]
  }
  return result
}
function drgInfo (data) {
  const result = {
    info: data,
    infoTitle: 'DRG规则详情',
    isInfoButtonShow: false,
    buttonText: ``,
    gridList: [],
    details: [
      {'label': '编码', 'title': 'code'},
      {'label': '名称', 'title': 'desc'},
      {'label': '年份', 'title': 'year'},
      {'label': '版本', 'title': 'version'}]
  }
  return result
}
function icd10Info (data) {
  const gridList = {}
  gridList['ADRG'] = data.adrg.map((x) => {
    const obj = {}
    obj.title = x
    return obj
  })
  const result = {
    info: data,
    infoTitle: 'ICD10规则详情',
    isInfoButtonShow: false,
    buttonText: ``,
    gridList: gridList,
    details: [
      {'label': '编码', 'title': 'code'},
      {'label': '名称', 'title': 'desc'},
      {'label': '年份', 'title': 'year'},
      {'label': '版本', 'title': 'version'},
      {'label': 'MCC', 'title': 'mcc'},
      {'label': 'CC', 'title': 'cc'}]
  }
  return result
}
function icd9Info (data) {
  const gridList = {}
  gridList['ADRG'] = data.adrg.map((x) => {
    const obj = {}
    obj.title = x
    return obj
  })
  const result = {
    info: data,
    infoTitle: 'ICD9规则详情',
    isInfoButtonShow: false,
    buttonText: ``,
    gridList: gridList,
    details: [
      {'label': '编码', 'title': 'code'},
      {'label': '名称', 'title': 'desc'},
      {'label': '年份', 'title': 'year'},
      {'label': '版本', 'title': 'version'},
      {'label': '手术室手术', 'title': 'p_type'}]
  }
  return result
}
const info = {
  infoTitle: '',
  isInfoButtonShow: false,
  buttonText: '',
  gridList: [],
  details: []
}

export function getDetails (menu, data) {
  let result = info
  switch (menu) {
    case '病案详情':
      result = caseInfo(data)
      break
    case '分析详情':
      result = statInfo(data)
      break
    case 'MDC规则详情':
      result = mdcInfo(data)
      break
    case 'ADRG规则详情':
      result = adrgInfo(data)
      break
    case 'DRG规则详情':
      result = drgInfo(data)
      break
    case 'ICD10规则详情':
      result = icd10Info(data)
      break
    case 'ICD9规则详情':
      result = icd9Info(data)
      break
    default:
      break
  }
  return result
}
