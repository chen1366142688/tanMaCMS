<template>
    <div style="margin-left:15px;">
        <Tabs type="card">

            <TabPane label="功能设置">
                <Card>
                    <Form :label-width="160" class="function">

                        <FormItem label="地址" class="functionItem">
                            <span style="margin-left:4px;">{{provinceName}}-{{cityName}}</span>
                        </FormItem>
                        <FormItem label="学校名称" class="functionItem">
                            <span style="margin-left:4px;">{{schoolName}}</span>
                        </FormItem>
                        <FormItem label="记录组" class="functionItem">
                            <span style="margin-left:4px;">{{groupName}}</span>
                        </FormItem>
                        <FormItem label="测试时间" class="functionItem">
                            <span style="margin-left:4px;">{{testTime}}</span>
                        </FormItem>
                        <FormItem label="学生信息" class="functionItem">
                            <span style="margin-left:4px;">{{studentName}} | {{studentGender=='1'?'男':'女'}} | {{studentAge}}岁 | {{gradeName}}</span>
                        </FormItem>
                        <FormItem label="测试项目" class="functionItem">
                            <span style="margin-left:4px;">{{testName}}</span>
                        </FormItem>
                        <FormItem label="测试成绩" class="functionItem">
                            <Input v-model="resultValue" />
                            <span style="margin-left:4px;">{{valueUnit}}</span>
                            <span v-if="containDecimal == '1'">(数值请保留 1 位小数。)</span>
                        </FormItem>
                        <FormItem label="成绩得分" class="functionItem">
                            <span style="margin-left:4px;">{{score}}分 - {{scoreType=='1'?'优秀':scoreType=='2'?'良好':scoreType=='3'?'及格':'不及格'}}</span>
                            <span style="color:red;margin-left:80px;">*身高和体重的测试不会计算分数</span>
                        </FormItem>
                        <FormItem label="修改说明" class="functionItem">
                            <Input v-model="remark" type="textarea" :autosize="{minRows: 4,maxRows: 8}" style="width:750px;" />
                        </FormItem>
                    </Form>
                </Card>
                <div style="margin-top:20px;padding-right:20px">
                    <Button type="success" @click="baseSubmit" style="float:right;">提交结果</Button>
                </div>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
import Vue from 'vue'

export default {
  data() {
    return {
      cityName: '',
      containDecimal: '',
      gradeName: '',
      groupName: '',
      itemName: '',
      provinceName: '',
      remark: '',
      resultValue: '',
      schoolName: '',
      score: '',
      scoreType: '',
      studentAge: '',
      studentBirthday: '',
      studentGender: '',
      studentName: '',
      teacherName: '',
      teacherType: '',
      testName: '',
      testTime: '',
      valueUnit: ''
    }
  },
  watch: {}, //以V-model绑定数据时使用的数据变化监测

  created: function() {},
  methods: {
    getStudentTestDetailInfoByResultId(resultId) {
      var that = this
      this.$axios
        .get(
          '/v1/schooltest/getStudentTestDetailInfoByResultId?resultId=' +
            resultId
        )
        .then(function(response) {
          //   console.log(response)
          let data = response.data.response
          //   console.log(data)
          that.cityName = data.cityName ? data.cityName : ''
          that.containDecimal = data.containDecimal ? data.containDecimal : ''
          that.gradeName = data.gradeName ? data.gradeName : ''
          that.groupName = data.groupName ? data.groupName : ''
          that.itemName = data.itemName ? data.itemName : ''
          that.provinceName = data.provinceName ? data.provinceName : ''
          that.remark = data.remark ? data.remark : ''
          that.resultValue = data.resultValue ? data.resultValue : ''
          that.schoolName = data.schoolName ? data.schoolName : ''
          that.score = data.score 
          that.scoreType = data.scoreType ? data.scoreType : ''
          that.studentAge = data.studentAge ? data.studentAge : ''
          that.studentBirthday = data.studentBirthday
            ? data.studentBirthday
            : ''
          that.studentGender = data.studentGender ? data.studentGender : ''
          that.studentName = data.studentName ? data.studentName : ''
          that.teacherName = data.teacherName ? data.teacherName : ''
          that.teacherType = data.teacherType ? data.teacherType : ''
          that.testName = data.testName ? data.testName : ''
          that.testTime = data.testTime ? data.testTime : ''
          that.valueUnit = data.valueUnit ? data.valueUnit : ''
        })
        .catch(function(response) {
          console.log(response)
        })
    },
    baseSubmit() {
      var that = this
      this.$axios
        .get(
          '/v1/schooltest/updateStudentTestResult?resultId=' +
            that.resultId +
            '&resultValue=' +
            that.resultValue+'&remark='+that.remark
        )
        .then(function(response) {
          console.log(response)
          that.resultId=response.data.response;
          that.getStudentTestDetailInfoByResultId(response.data.response);
        })
        .catch(function(response) {
          console.log(response)
        })
    }
  },
  mounted() {
    var vm = this
    let resultId = sessionStorage.getItem(
      'countryStudentTest-countryStudentTestDetail-resultId'
    )
    if (resultId) {
      vm.resultId = resultId
      vm.getStudentTestDetailInfoByResultId(resultId);
      sessionStorage.removeItem('countryStudentTest-countryStudentTestDetail-resultId')
    }
  },
  destroyed() {
    // tinymce.get('articleEditor').destroy();
  }
}
</script>
