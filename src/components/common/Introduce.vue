<template>
  <scroller v-bind:style="scroller">
    <div class="panel" v-bind:style="panel">
      <div v-if="show">
        <wxc-rich-text :config-list='introduce.title'
                    :has-text-margin="true"
                   ></wxc-rich-text>
        <div class="type-container">
          <wxc-rich-text class="special-rich"
            :config-list="introduce.text"></wxc-rich-text>
        </div>
        <div v-for="(data, indexs) in introduce.contents" v-bind:key="indexs">
          <wxc-rich-text :config-list="data.header"
            :has-text-margin="true"></wxc-rich-text>
          <div v-for="(c, index) in data.content" v-bind:key="`c${index}`">
            <wxc-special-rich-text class="special-rich"
              :config-list="c"></wxc-special-rich-text>
          </div>
        </div>
      </div>
    </div>
  </scroller>
</template>

<script>
import { WxcRichText, WxcSpecialRichText } from 'weex-ui'

export default {
  components: { WxcRichText, WxcSpecialRichText },
  data () {
    return {
      // 病案
      caseConfigTitle: [{
        type: 'text',
        value: '病案说明',
        theme: 'blue',
        style: {
          fontSize: 36
        }
      }],
      caseConfigString: '病案模块主要分为入组异常病案查询及分析，单条分组，自定义病案查询，三个模块。',
      caseConfigHeader1: [{
        type: 'tag',
        value: '1.入组异常病案查询',
        theme: 'blue',
        style: {
          fontSize: 26,
          height: 36
        }
      }],
      caseConfigContent1: [{
        type: 'tag',
        value: ''
      },
      {
        type: 'text',
        value: '入组异常病案查询主要针对以下三个方面对未入组病历进行归类，并对其异常点进行分析。',
        theme: 'black',
        style: {
          fontSize: 28
        }
      }],
      caseConfigHeader2: [{
        type: 'tag',
        value: '1.1 未入组病案(0000组)',
        theme: 'blue',
        style: {
          fontSize: 26,
          height: 36
        }
      }],
      caseConfigContent2: [{
        type: 'tag',
        value: ''
      },
      {
        type: 'text',
        value: '未入组病案是指对主诊填写错误，导致分组异常分析。',
        theme: 'black',
        style: {
          fontSize: 28
        }
      }],
      caseConfigHeader3: [{
        type: 'tag',
        value: '1.2 费用异常病案',
        theme: 'blue',
        style: {
          fontSize: 26,
          height: 36
        }
      }],
      caseConfigContent3: [{
        type: 'tag',
        value: ''
      },
      {
        type: 'text',
        value: '是对影响高CV的费用以及住院日的病案，以及住院天数大于60天、住院费用小于4元（9999组）进行归类，并对其进行分析。',
        theme: 'black',
        style: {
          fontSize: 28
        }
      }],
      caseConfigHeader4: [{
        type: 'tag',
        value: '1.3 质量异常病案',
        theme: 'blue',
        style: {
          fontSize: 26,
          height: 36
        }
      }],
      caseConfigContent4: [{
        type: 'tag',
        value: ''
      },
      {
        type: 'text',
        value: '质量异常是对低风险死亡病历，7日内再入院病历，再手术等涉及到质量相关的病案归类。',
        theme: 'black',
        style: {
          fontSize: 28
        }
      }],
      caseConfigHeader5: [{
        type: 'tag',
        value: '2.单条分组',
        theme: 'blue',
        style: {
          fontSize: 26,
          height: 36
        }
      }],
      caseConfigHeader6: [{
        type: 'tag',
        value: '2.1 单条分组说明',
        theme: 'blue',
        style: {
          fontSize: 26,
          height: 36
        }
      }],
      caseConfigContent6: [{
        type: 'tag',
        value: ''
      },
      {
        type: 'text',
        value: '录入分组所需的字段，按照分组字段说明填写好分组信息，点击单条分组进行调用分组器，即可展示分组结果。',
        theme: 'black',
        style: {
          fontSize: 28
        }
      }],
      caseConfigHeader7: [{
        type: 'tag',
        value: '2.2 分组病历字段说明',
        theme: 'blue',
        style: {
          fontSize: 26,
          height: 36
        }
      }],
      caseConfigContent7: [{
        type: 'tag',
        value: ''
      },
      {
        type: 'text',
        value: '1、主要诊断（DISEASE_CODE），必填，空缺入0000组',
        theme: 'black',
        style: {
          fontSize: 28
        }
      }],
      caseConfigContent8: [{
        type: 'tag',
        value: ''
      },
      {
        type: 'text',
        value: '2、年龄（AGE），必填，空缺影响drg入组',
        theme: 'black',
        style: {
          fontSize: 28
        }
      }],
      caseConfigContent9: [{
        type: 'tag',
        value: ''
      },
      {
        type: 'text',
        value: '3、性别（GENDER），必填，空缺影响MS1、MT1、NS1、NT1的入组',
        theme: 'black',
        style: {
          fontSize: 28
        }
      }],
      caseConfigContent10: [{
        type: 'tag',
        value: ''
      },
      {
        type: 'text',
        value: '4、新生儿出生天数（SF0100），新生儿必填，空缺不能入MDCP',
        theme: 'black',
        style: {
          fontSize: 28
        }
      }],
      caseConfigContent11: [{
        type: 'tag',
        value: ''
      },
      {
        type: 'text',
        value: '5、新生儿出生体重（SF0102），新生儿必填，空缺影响MDCP分组',
        theme: 'black',
        style: {
          fontSize: 28
        }
      }],
      caseConfigContent12: [{
        type: 'tag',
        value: ''
      },
      {
        type: 'text',
        value: '6、呼吸机使用时间（SF0104） 选填',
        theme: 'black',
        style: {
          fontSize: 28
        }
      }],
      caseConfigContent13: [{
        type: 'tag',
        value: ''
      },
      {
        type: 'text',
        value: '7、出院转归（SF0108），必填，空缺影响drg入组',
        theme: 'black',
        style: {
          fontSize: 28
        }
      }],
      caseConfigContent14: [{
        type: 'tag',
        value: ''
      },
      {
        type: 'text',
        value: '8、住院日（ACCTUAL_DAYS），必填，空缺影响drg入组，大于60天入9999组',
        theme: 'black',
        style: {
          fontSize: 28
        }
      }],
      caseConfigContent15: [{
        type: 'tag',
        value: ''
      },
      {
        type: 'text',
        value: '9、住院费用(TOTAL_EXPENSE)，必填，空缺影响drg权重计算，小于4元入9999组',
        theme: 'black',
        style: {
          fontSize: 28
        }
      }],
      caseConfigContent16: [{
        type: 'tag',
        value: ''
      },
      {
        type: 'text',
        value: '10、其他诊断(diags_code)，选填',
        theme: 'black',
        style: {
          fontSize: 28
        }
      }],
      caseConfigContent17: [{
        type: 'tag',
        value: ''
      },
      {
        type: 'text',
        value: '11、手术/操作(opers_code)，选填',
        theme: 'black',
        style: {
          fontSize: 28
        }
      }],
      caseConfigHeader18: [{
        type: 'tag',
        value: '3、自定义病案查询',
        theme: 'blue',
        style: {
          fontSize: 26,
          height: 36
        }
      }],
      caseConfigHeader19: [{
        type: 'tag',
        value: '3.1 自定义病案查询说明',
        theme: 'blue',
        style: {
          fontSize: 26,
          height: 36
        }
      }],
      caseConfigContent19: [{
        type: 'tag',
        value: ''
      },
      {
        type: 'text',
        value: '选择筛选的查询条件，对病案进行自定义查询，如果未选择筛选条件，则查询的是全部病案。',
        theme: 'black',
        style: {
          fontSize: 28
        }
      }],
      // 字典
      libConfigTitle: [{
        type: 'text',
        value: '病案说明',
        theme: 'blue',
        style: {
          fontSize: 36
        }
      }],
      libConfigString: '提供现阶段临床上使用的所有疾病编码，肿瘤编码，DRG编码，病理编码等等，并提供编码的历史修订记录，可切换各版本。',
      libConfigHeader1: [{
        type: 'tag',
        value: '1.1 DRG字典',
        theme: 'blue',
        style: {
          fontSize: 26,
          height: 36
        }
      }],
      libConfigContent1: [{
        type: 'tag',
        value: ''
      },
      {
        type: 'text',
        value: '提供MDC、ADRG、DRG，北京版本、国标版本，供用户查询。',
        theme: 'black',
        style: {
          fontSize: 28
        }
      }],
      libConfigHeader2: [{
        type: 'tag',
        value: '1.2 ICD字典',
        theme: 'blue',
        style: {
          fontSize: 26,
          height: 36
        }
      }],
      libConfigContent2: [{
        type: 'tag',
        value: ''
      },
      {
        type: 'text',
        value: '提供ICD9手术编码、ICD10疾病编码的北京版本、国标版本供用户查询。',
        theme: 'black',
        style: {
          fontSize: 28
        }
      }],
      libConfigHeader3: [{
        type: 'tag',
        value: '2.术语名称查询',
        theme: 'blue',
        style: {
          fontSize: 26,
          height: 36
        }
      }],
      libConfigContent3: [{
        type: 'tag',
        value: ''
      },
      {
        type: 'text',
        value: '用名称查询术语。',
        theme: 'black',
        style: {
          fontSize: 28
        }
      }],
      // DRG
      drgConfigTitle: [{
        type: 'text',
        value: 'DRG分析',
        theme: 'blue',
        style: {
          fontSize: 36
        }
      }],
      drgConfigString: '运用DRG对病历进行分组，从而进行分析。对不同的用户提供定制不同的分析文案。可以将数据进行同期对比，环比等等，各不同机构同样提供对比。',
      drgConfigHeader1: [{
        type: 'tag',
        value: '1.专家用户',
        theme: 'blue',
        style: {
          fontSize: 26,
          height: 36
        }
      }],
      drgConfigContent1: [{
        type: 'tag',
        value: ''
      },
      {
        type: 'text',
        value: '对各DRG算出其CV、CMI等数值，供专家修改DRG提出参考。',
        theme: 'black',
        style: {
          fontSize: 28
        }
      }],
      drgConfigHeader2: [{
        type: 'tag',
        value: '2.机构用户',
        theme: 'blue',
        style: {
          fontSize: 26,
          height: 36
        }
      }],
      drgConfigContent2: [{
        type: 'tag',
        value: ''
      },
      {
        type: 'text',
        value: '利用DRG对机构的科室、个人进行绩效上的考核。',
        theme: 'black',
        style: {
          fontSize: 28
        }
      }],
      drgConfigHeader3: [{
        type: 'tag',
        value: '3.个人用户',
        theme: 'blue',
        style: {
          fontSize: 26,
          height: 36
        }
      }],
      drgConfigContent3: [{
        type: 'tag',
        value: ''
      },
      {
        type: 'text',
        value: '新注册用户可看到基础分析。',
        theme: 'black',
        style: {
          fontSize: 28
        }
      }],
      // 论坛
      forConfigTitle: [{
        type: 'text',
        value: '论坛说明',
        theme: 'blue',
        style: {
          fontSize: 36
        }
      }],
      forConfigString: '本模块包括5个主题版块，即用户反馈、病案讨论、字典交流、DRG分析、论坛建议。',
      forConfigHeader1: [{
        type: 'tag',
        value: '1.1 用户反馈',
        theme: 'blue',
        style: {
          fontSize: 26,
          height: 36
        }
      }],
      forConfigContent1: [{
        type: 'tag',
        value: ''
      },
      {
        type: 'text',
        value: '涉及到用户注册、用户登录相关发帖。',
        theme: 'black',
        style: {
          fontSize: 28
        }
      }],
      forConfigHeader2: [{
        type: 'tag',
        value: '1.2 病案讨论',
        theme: 'blue',
        style: {
          fontSize: 26,
          height: 36
        }
      }],
      forConfigContent2: [{
        type: 'tag',
        value: ''
      },
      {
        type: 'text',
        value: '对未入组的病案、QY病案、病案等相关发帖。',
        theme: 'black',
        style: {
          fontSize: 28
        }
      }],
      forConfigHeader3: [{
        type: 'tag',
        value: '1.3字典交流',
        theme: 'blue',
        style: {
          fontSize: 26,
          height: 36
        }
      }],
      forConfigContent3: [{
        type: 'tag',
        value: ''
      },
      {
        type: 'text',
        value: '各版本字典相关发帖。',
        theme: 'black',
        style: {
          fontSize: 28
        }
      }],
      forConfigHeader4: [{
        type: 'tag',
        value: '1.4DRG分析',
        theme: 'blue',
        style: {
          fontSize: 26,
          height: 36
        }
      }],
      forConfigContent4: [{
        type: 'tag',
        value: ''
      },
      {
        type: 'text',
        value: 'DRG分析、DRG规则相关发帖。',
        theme: 'black',
        style: {
          fontSize: 28
        }
      }],
      forConfigHeader5: [{
        type: 'tag',
        value: '1.5论坛建议',
        theme: 'blue',
        style: {
          fontSize: 26,
          height: 36
        }
      }],
      forConfigContent5: [{
        type: 'tag',
        value: ''
      },
      {
        type: 'text',
        value: '对论坛功能的建议相关发帖。',
        theme: 'black',
        style: {
          fontSize: 28
        }
      }],
      forConfigHeader6: [{
        type: 'tag',
        value: '2.1 我的帖子',
        theme: 'blue',
        style: {
          fontSize: 26,
          height: 36
        }
      }],
      forConfigContent6: [{
        type: 'tag',
        value: ''
      },
      {
        type: 'text',
        value: '自己发送的帖子都会在此处显示。',
        theme: 'black',
        style: {
          fontSize: 28
        }
      }],
      forConfigHeader7: [{
        type: 'tag',
        value: '2.2 最新帖子',
        theme: 'blue',
        style: {
          fontSize: 26,
          height: 36
        }
      }],
      forConfigContent7: [{
        type: 'tag',
        value: ''
      },
      {
        type: 'text',
        value: '最新发的帖子会在这里展示出来。',
        theme: 'black',
        style: {
          fontSize: 28
        }
      }]
    }
  },
  computed: {
    activeTab () {
      return this.$store.state.Home.activeTab
    },
    show () {
      if (this.activeTab === 0) {
        return false
      } else {
        return true
      }
    },
    panel () {
      const tabPageHeight = weex.config.env.deviceHeight + 1
      const style = {
        height: tabPageHeight
      }
      return style
    },
    scroller () {
      const tabPageHeight = weex.config.env.deviceHeight
      const style = {
        height: tabPageHeight,
        width: '750px'
      }
      return style
    },
    introduce () {
      let data = { title: {} }
      switch (this.activeTab) {
        case 1:
          data.title = this.caseConfigTitle
          data.text = this.caseConfigString
          data.contents = [
            { header: this.caseConfigHeader1, content: [this.caseConfigContent1] },
            { header: this.caseConfigHeader2, content: [this.caseConfigContent2] },
            { header: this.caseConfigHeader3, content: [this.caseConfigContent3] },
            { header: this.caseConfigHeader4, content: [this.caseConfigContent4] },
            { header: this.caseConfigHeader5, content: [] },
            { header: this.caseConfigHeader6, content: [this.caseConfigContent6] },
            { header: this.caseConfigHeader7, content: [this.caseConfigContent7, this.caseConfigContent8, this.caseConfigContent9, this.caseConfigContent10, this.caseConfigContent11, this.caseConfigContent12, this.caseConfigContent13, this.caseConfigContent14, this.caseConfigContent15, this.caseConfigContent16, this.caseConfigContent17] },
            { header: this.caseConfigHeader18, content: [] },
            { header: this.caseConfigHeader19, content: [this.caseConfigContent19] }]
          break
        case 0:
          data.title = this.libConfigTitle
          data.text = this.libConfigString
          data.contents = [
            { header: this.libConfigHeader1, content: [this.libConfigContent1] },
            { header: this.libConfigHeader2, content: [this.libConfigContent2] },
            { header: this.libConfigHeader3, content: [this.libConfigContent3] }]
          break
        case 2:
          data.title = this.drgConfigTitle
          data.text = this.drgConfigString
          data.contents = [
            { header: this.drgConfigHeader1, content: [this.drgConfigContent1] },
            { header: this.drgConfigHeader2, content: [this.drgConfigContent2] },
            { header: this.drgConfigHeader3, content: [this.drgConfigContent3] }]
          break
        case 3:
          data.title = this.forConfigTitle
          data.text = this.forConfigString
          data.contents = [
            { header: this.forConfigHeader1, content: [this.forConfigContent1] },
            { header: this.forConfigHeader2, content: [this.forConfigContent2] },
            { header: this.forConfigHeader3, content: [this.forConfigContent3] },
            { header: this.forConfigHeader4, content: [this.forConfigContent4] },
            { header: this.forConfigHeader5, content: [this.forConfigContent5] },
            { header: this.forConfigHeader6, content: [this.forConfigContent6] },
            { header: this.forConfigHeader7, content: [this.forConfigContent7] }]
          break
      }
      return data
    }
  },
  methods: {
  }
}
</script>
<style scoped>
  .text {
    font-size: 35px;
  }
  .panel {
    flex-direction: column;
    align-items: center;
    margin: 10px;
    /* justify-content: center; */
  }
  .special-rich {
    margin: 15px;
  }
  .rich {
    margin-top: 10px;
  }
</style>
