function drgrule (menu, data) {
  const result = {}
  result.showInfo = true
  result.info = [
    {'title': '编码', 'desc': data.code, 'hasArrow': 'empty'},
    {'title': '名称', 'desc': data.name, 'hasArrow': 'empty'},
    {'title': '年份', 'desc': data.year, 'hasArrow': 'empty'}]
  let nextMenu = ''
  switch (menu) {
    case 'MDC规则':
      nextMenu = 'ADRG规则'
      break
    case 'ADRG规则':
      nextMenu = 'DRG规则'
      break
    default:
      nextMenu = ''
  }
  result.title = `${menu}详情`
  // 子规则
  if (data.rule) {
    result.showSubRule = true
    result.subRule = {}
    result.subRule.title = nextMenu
    result.subRule.rules = data.rule.map((x) => {
      const obj = {'title': x.code, 'extraContent': '', 'desc': x.name, 'hasArrow': 'right', menu: nextMenu, all: x}
      return obj
    })
  }
  // 规则详细规则
  result.grid = {}
  if (data.icd9_a && menu === 'MDC规则') {
    result.grid['非QY小手术规则'] = data.icd9_a.map((x) => {
      const obj = { title: x }
      return obj
    })
  }
  if (data.icd10_a && menu === 'ADRG规则') {
    result.grid['主要诊断规则'] = data.icd10_a.map((x) => {
      const obj = { title: x }
      return obj
    })
  }
  if (data.icd10_b && menu === 'ADRG规则') {
    result.grid['其他诊断规则'] = data.icd10_b.map((x) => {
      const obj = { title: x }
      return obj
    })
  }
  if (data.icd9_a && menu === 'ADRG规则') {
    result.grid['主要手术规则'] = data.icd9_a.map((x) => {
      const obj = { title: x }
      return obj
    })
  }
  if (data.icd9_b && menu === 'ADRG规则') {
    result.grid['其他手术规则'] = data.icd9_b.map((x) => {
      const obj = { title: x }
      return obj
    })
  }
  return result
}

function icdrule (menu, data) {
  const result = {}
  let nextMenu = ''
  if (['ICD10', 'ICD9'].includes(menu)) {
    result.showInfo = false
    if (['ICD10', 'ICD9'].includes(menu)) {
      nextMenu = `${menu}-亚目`
    } else if (['ICD10-亚目', 'ICD9-亚目'].includes(menu)) {
      nextMenu = menu.split('-')[0]
      nextMenu = `${nextMenu}-细目`
    }
  } else {
    result.showInfo = true
    nextMenu = menu.split('-')[0]
    nextMenu = `${nextMenu}-细目`
  }
  result.title = nextMenu
  // 规则详情
  if (menu === 'ICD10-细目') {
    result.showInfo = true
    result.info = [
      {'title': '编码', 'desc': data.code, 'hasArrow': 'empty'},
      {'title': '年份', 'desc': data.year, 'hasArrow': 'empty'},
      {'title': 'MCC', 'desc': data.mcc ? '是' : '否', 'hasArrow': 'empty'},
      {'title': 'CC', 'desc': data.cc ? '是' : '否', 'hasArrow': 'empty'}]
  } else if (menu === 'ICD9-细目') {
    result.showInfo = true
    result.info = [
      {'title': '编码', 'desc': data.code, 'hasArrow': 'empty'},
      {'title': '年份', 'desc': data.year, 'hasArrow': 'empty'},
      {'title': '手术室手术', 'desc': data.p_type === 0 ? '是' : '否', 'hasArrow': 'empty'}]
  }
  // 子规则
  if (data.icd) {
    result.showSubRule = true
    result.subRule = {}
    result.subRule.title = ''
    result.subRule.rules = data.icd.map((x) => {
      const obj = {'title': x.code, 'extraContent': '', 'desc': x.name, 'hasArrow': 'right', menu: nextMenu, all: x}
      return obj
    })
  }
  // 规则详细规则
  result.grid = {}
  if (data.adrg) {
    result.grid['ADRG规则'] = data.adrg.map((x) => {
      const obj = { title: x }
      return obj
    })
  }
  return result
}

function stat (menu, data) {
  const result = {}
  result.showInfo = true
  result.info = [
    {'title': '编码', 'desc': data.code, 'hasArrow': 'empty'},
    {'title': '名称', 'desc': data.name, 'hasArrow': 'empty'},
    {'title': '年份', 'desc': data.year, 'hasArrow': 'empty'},
    {'title': '平均费用', 'desc': `${data.fee_avg}`, 'hasArrow': 'empty'},
    {'title': '平均住院天数', 'desc': `${data.day_avg}`, 'hasArrow': 'empty'},
    {'title': '病历数', 'desc': `${data.num_sum}`, 'hasArrow': 'empty'}]
  let nextMenu = ''
  switch (menu) {
    case 'MDC分析':
      nextMenu = 'ADRG分析'
      break
    case 'ADRG分析':
      nextMenu = 'DRG分析'
      break
    case 'DRG分析':
      nextMenu = ''
      result.info = [
        {'title': '编码', 'desc': data.code, 'hasArrow': 'empty'},
        {'title': '名称', 'desc': data.name, 'hasArrow': 'empty'},
        {'title': '年份', 'desc': data.year, 'hasArrow': 'empty'},
        {'title': '平均费用', 'desc': `${data.fee_avg}`, 'hasArrow': 'empty'},
        {'title': '平均住院天数', 'desc': `${data.day_avg}`, 'hasArrow': 'empty'},
        {'title': '病历数', 'desc': `${data.num_sum}`, 'hasArrow': 'empty'},
        {'title': '费用变异系数', 'desc': `${data.fee_cv}`, 'hasArrow': 'empty'},
        {'title': '时间变异系数', 'desc': `${data.day_cv}`, 'hasArrow': 'empty'},
        {'title': '死亡风险等级', 'desc': `${data.death_rate_level}`, 'hasArrow': 'empty'}]
      break
    case '诊断基础':
      nextMenu = '诊断基础-亚目'
      break
    case '诊断基础-亚目':
      result.showInfo = true
      nextMenu = '诊断DRG分析'
      result.info = [
        {'title': '诊断编码', 'desc': data.code, 'hasArrow': 'empty'},
        {'title': '诊断名称', 'desc': data.name, 'hasArrow': 'empty'},
        {'title': '平均费用', 'desc': `${data.fee_avg}`, 'hasArrow': 'empty'},
        {'title': '平均住院天数', 'desc': `${data.day_avg}`, 'hasArrow': 'empty'},
        {'title': '病历数', 'desc': `${data.num_sum}`, 'hasArrow': 'empty'}]
      break
    case '手术基础':
      nextMenu = '手术基础-亚目'
      result.info = [
        {'title': '诊断编码', 'desc': data.code, 'hasArrow': 'empty'},
        {'title': '诊断名称', 'desc': data.name, 'hasArrow': 'empty'},
        {'title': '平均费用', 'desc': `${data.fee_avg}`, 'hasArrow': 'empty'},
        {'title': '平均住院天数', 'desc': `${data.day_avg}`, 'hasArrow': 'empty'},
        {'title': '病历数', 'desc': `${data.num_sum}`, 'hasArrow': 'empty'}]
      break
    case '手术基础-亚目':
      result.showInfo = true
      nextMenu = '手术DRG分析'
      result.info = [
        {'title': '诊断编码', 'desc': data.code, 'hasArrow': 'empty'},
        {'title': '诊断名称', 'desc': data.name, 'hasArrow': 'empty'},
        {'title': '平均费用', 'desc': `${data.fee_avg}`, 'hasArrow': 'empty'},
        {'title': '平均住院天数', 'desc': `${data.day_avg}`, 'hasArrow': 'empty'},
        {'title': '病历数', 'desc': `${data.num_sum}`, 'hasArrow': 'empty'}]
      break
    case 'DRG机构分析':
      nextMenu = ''
      result.info = [
        {'title': '年份', 'desc': data.code, 'hasArrow': 'empty'},
        {'title': '机构ID', 'desc': data.name, 'hasArrow': 'empty'},
        {'title': '平均费用', 'desc': `${data.fee_avg}`, 'hasArrow': 'empty'},
        {'title': '平均住院天数', 'desc': `${data.day_avg}`, 'hasArrow': 'empty'},
        {'title': '病历数', 'desc': `${data.num_sum}`, 'hasArrow': 'empty'}]
      break
    default:
      break
  }
  result.title = `${menu}详情`
  // 子规则
  if (data.stat) {
    result.showSubRule = true
    result.subRule = {}
    result.subRule.title = nextMenu
    result.subRule.rules = data.stat.map((x) => {
      const obj = {'title': x.code, 'extraContent': '', 'desc': x.name, 'hasArrow': 'right', menu: nextMenu, all: x}
      return obj
    })
  }
  // 子规则
  if (data.icd) {
    result.showInfo = false
    result.showSubRule = true
    result.subRule = {}
    result.subRule.title = ''
    result.subRule.rules = data.icd.map((x) => {
      const obj = {'title': x.code, 'extraContent': '', 'desc': x.name, 'hasArrow': 'right', menu: nextMenu, all: x}
      return obj
    })
  }
  return result
}

function wt4 (menu, data) {
  const result = {}
  result.title = `${menu}详情`
  if (['未入组病历详情', 'QY病历详情', '低风险死亡病历详情', '费用异常病历详情', '填报异常病历', '填报异常病历详情'].includes(menu)) {
    result.showInfo = true
    result.log = data.log.map((x) => {
      const obj = { date: '', desc: '', highlight: false, title: x }
      return obj
    })
    result.info = [
      {'title': '入组DRG', 'desc': data.drg, 'hasArrow': 'empty'},
      {'title': '病案ID', 'desc': data.b_wt4_v1_id, 'hasArrow': 'empty'},
      {'title': '主要诊断', 'desc': data.disease_code, 'hasArrow': 'empty'},
      {'title': '其他诊断', 'desc': data.diags_code, 'hasArrow': 'empty'},
      {'title': '手术/操作', 'desc': data.opers_code, 'hasArrow': 'empty'},
      {'title': '住院天数', 'desc': data.acctual_days, 'hasArrow': 'empty'},
      {'title': '住院总费用', 'desc': data.total_expense, 'hasArrow': 'empty'},
      {'title': '性别', 'desc': data.gender, 'hasArrow': 'empty'},
      {'title': '年龄', 'desc': data.age, 'hasArrow': 'empty'},
      {'title': '新生儿天数', 'desc': data.sf0100 === undefined || data.sf0100 === '-1' ? '未填写' : `${data.sf0100}`, 'hasArrow': 'empty'},
      {'title': '新生儿体重', 'desc': data.sf0102 === undefined || data.sf0102 === '-1' ? '未填写' : `${data.sf0102}`, 'hasArrow': 'empty'},
      {'title': '呼吸机使用时间', 'desc': data.sf0104 === undefined || data.sf0104 === '-1' ? '未填写' : `${data.sf0104}`, 'hasArrow': 'empty'},
      {'title': '出院转归', 'desc': data.sf0108, 'hasArrow': 'empty'},
      {'title': '错误日志', 'desc': data.error_log, 'hasArrow': 'empty'}]
  }
  // 子规则
  if (data.wt4) {
    result.title = `${menu}`
    result.showSubRule = true
    result.subRule = {}
    result.subRule.title = ''
    result.subRule.rules = data.wt4.map((x) => {
      let desc = ''
      let title = ''
      switch (menu) {
        case '未入组病历列表':
          title = x.diags_code === '' ? '-' : x.diags_code
          desc = `病案ID:${x.b_wt4_v1_id}`
          break
        case 'QY病历列表':
          title = x.disease_code
          desc = `主要手术:${x.oper_code}`
          break
        case '低风险死亡病历列表':
          title = x.disease_code
          desc = `年龄：${x.age}; 其他诊断：${x.diags_code}; DRG：${x.drg}`
          break
        case '费用异常病历列表':
          title = x.disease_code
          desc = `总费用：${x.total_expense}; 年龄：${x.age}; 其他诊断：${x.diags_code};住院日${x.acctual_days}; DRG：${x.drg}`
          break
        case '填报异常病历':
          title = x.disease_code
          desc = `性别：${x.gender}·年龄：${x.age}岁·费用：${x.total_expense}元·住院天数：${x.acctual_days}天·drg：${x.drg}`
          break
      }
      const obj = {'title': title, 'extraContent': '', 'desc': desc, 'hasArrow': 'right', menu: `${menu}详情`, all: x}
      return obj
    })
  }
  return result
}

export function getDetails (obj, menu, data) {
  let result = {}
  if (['MDC规则', 'ADRG规则', 'DRG规则'].includes(menu)) {
    result = drgrule(menu, data)
  } else if (['ICD10', 'ICD9', 'ICD10-亚目', 'ICD9-亚目', 'ICD10-细目', 'ICD9-细目'].includes(menu)) {
    result = icdrule(menu, data)
  } else if (['MDC分析', 'ADRG分析', 'DRG分析', '诊断基础', '手术基础', '诊断DRG分析', '手术DRG分析', '主诊未入组', '手术QY', 'DRG机构分析', '诊断基础-亚目', '手术基础-亚目'].includes(menu)) {
    result = stat(menu, data)
  } else if (['未入组病历列表', 'QY病历列表', '低风险死亡病历列表', '费用异常病历列表', '填报异常病历', '未入组病历详情', 'QY病历详情', '低风险死亡病历详情', '费用异常病历详情', '填报异常病历详情'].includes(menu)) {
    result = wt4(menu, data)
  }
  return result
}
