<style>
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}

.demo-upload-list img {
  width: 100%;
  height: 100%;
}

.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}

.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}

.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
<template>
  <div style="margin-left:15px;">
    <Tabs type="card">
      <TabPane label="测试项目详情">
        <Card>
          <div style="margin-left:20px;" v-if="testId">
            <span>本测试项目已被使用 {{haveTestNum}}次</span>
            <Button type="success" @click="toTestHistory" style="float:right;">查看测试数据</Button>
          </div>
          <Form :label-width="80" class="baseInfo" style="margin-top:20px;">
            <FormItem label="是否启用" class="baseInfoitem">
              <RadioGroup v-model="effectiveStatus">
                <Radio label="1">开启</Radio>
                <Radio label="0">关闭</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="测试名称" class="baseInfoitem">
              <Input v-model="schoolTestName" placeholder="请输入项目名称" />
            </FormItem>
            <FormItem label="项目名称" class="baseInfoitem">
              <Input v-model="schoolItemName" disabled />
            </FormItem>
            <FormItem label="年级（男）" class="address">
              <CheckboxGroup v-model="boyGrade" >
                <Checkbox label="1" :disabled="disabled">小一</Checkbox>
                <Checkbox label="2" :disabled="disabled">小二</Checkbox>
                <Checkbox label="3" :disabled="disabled">小三</Checkbox>
                <Checkbox label="4" :disabled="disabled">小四</Checkbox>
                <Checkbox label="5" :disabled="disabled">小五</Checkbox>
                <Checkbox label="6" :disabled="disabled">小六</Checkbox>
                <Checkbox label="7" :disabled="disabled">初一</Checkbox>
                <Checkbox label="8" :disabled="disabled">初二</Checkbox>
                <Checkbox label="9" :disabled="disabled">初三</Checkbox>
                <Checkbox label="10" :disabled="disabled">高一</Checkbox>
                <Checkbox label="11" :disabled="disabled">高二</Checkbox>
                <Checkbox label="12" :disabled="disabled">高三</Checkbox>
              </CheckboxGroup>
            </FormItem>
            <FormItem label="年级（女）" class="baseInfoitem">
              <CheckboxGroup v-model="girlGrade" >
                <Checkbox label="1" :disabled="disabled">小一</Checkbox>
                <Checkbox label="2" :disabled="disabled">小二</Checkbox>
                <Checkbox label="3" :disabled="disabled">小三</Checkbox>
                <Checkbox label="4" :disabled="disabled">小四</Checkbox>
                <Checkbox label="5" :disabled="disabled">小五</Checkbox>
                <Checkbox label="6" :disabled="disabled">小六</Checkbox>
                <Checkbox label="7" :disabled="disabled">初一</Checkbox>
                <Checkbox label="8" :disabled="disabled">初二</Checkbox>
                <Checkbox label="9" :disabled="disabled">初三</Checkbox>
                <Checkbox label="10" :disabled="disabled">高一</Checkbox>
                <Checkbox label="11" :disabled="disabled">高二</Checkbox>
                <Checkbox label="12" :disabled="disabled">高三</Checkbox>
              </CheckboxGroup>
            </FormItem>
            <FormItem label="数据单位">
              <Select v-model="valueUnit" style="width:200px">
                <Option v-for="item in UnitList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>

            <FormItem label="数据范围">
              <Input v-model="valueStart" placeholder="起始数" style="width:75px;" />
              <i style="margin-left:10px;">---</i>
              <Input v-model="valueEnd" placeholder="结尾数" style="width:75px;margin-left:10px;" />
              <Checkbox v-model="containOneDecimals" style="margin-left:40px;">保留一位小数（如果未勾选，则默认保留到整数）</Checkbox>
            </FormItem>

            <FormItem label="测试说明" class="baseInfoitem">
                <Input v-model="testRemark" type="textarea" :autosize="{minRows: 4,maxRows: 8}" style="width:750px;"></Input>
            </FormItem>
            <!-- <FormItem label="测试原理" class="baseInfoitem">
              <Card shadow>
                <textarea class='tinymce-textarea' id="testTheory" placeholder="这里输入文字..........." style="width:750px;"></textarea>
              </Card>
            </FormItem> -->
          </Form>
        </Card>
        <div style="margin-top:20px;padding-right:20px">
          <Button type="success" @click="baseSubmit" style="float:right;">提交结果</Button>
          <!-- <Button type="success" @click="ok" style="float:right;">ss</Button>   -->
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import Vue from 'vue'
import '../tinymce/js/tinymce/langs/zh_CN.js'
import tinymce from 'tinymce'
// Vue.prototype.$Message = Message ;
export default {
  name: 'test',
  data() {
    return {
      testId: '',
      haveTestNum: 0,
      effectiveStatus: '1',
      schoolTestName: '',
      schoolItemName:'',
      UnitList: [
        {
          value: 'cm',
          label: 'cm'
        },
        {
          value: 'kg',
          label: 'kg'
        },
        {
          value: 'kg/m2',
          label: 'kg/m2'
        },
        {
          value: 'ml',
          label: 'ml'
        },
        {
          value: 's',
          label: 's'
        },
        {
          value: '次',
          label: '次'
        },
        {
          value: 's/次',
          label: 's/次'
        }
      ],
      valueUnit:'',
      boyGrade: [],
      girlGrade: [],
      disabled:true,
      valueStart: '',
      valueEnd: '',
      testRemark: '',
      containOneDecimals:false
    }
  },
  watch: {}, //以V-model绑定数据时使用的数据变化监测

  methods: {
    toTestHistory(){
      var vm=this;
         sessionStorage.setItem('countryTestDetail-countryStudentTest-testId', vm.testId)
      this.$router.push({ name: 'countryStudentTest' }) 
    },

    getTestDetailInfoByTestId(testId) {
      var that = this
      this.$axios
        .get('/v1/schooltest/getTestDetailInfoByTestId?testId='+testId)
        .then(function(response) {
          console.log(response)
          let detailInfo= response.data.response;
          that.haveTestNum = detailInfo.testNum;

          that.schoolItemName = detailInfo.schoolItemName;

          that.effectiveStatus = detailInfo.effectiveStatus;
          that.schoolTestName = detailInfo.schoolTestName;
          that.valueUnit = detailInfo.valueUnit;
          that.boyGrade =detailInfo.boyGrades? detailInfo.boyGrades.split(","):[];
          that.girlGrade =detailInfo.girlGrades? detailInfo.girlGrades.split(","):[];
          that.valueStart = detailInfo.dataStart;

           that.valueEnd = detailInfo.dataEnd;
          that.testRemark = detailInfo.testRemark;
          that.containOneDecimals = detailInfo.containDecimal == '1'?true:false;
        })
        .catch(function(response) {
          console.log(response)
        })
    },
    baseSubmit() {
      var that = this

      if (!that.schoolItemName) {
        this.$Message.error('项目名称不能为空')
        return false
      }
      if (!that.effectiveStatus) {
        this.$Message.error('启用状态不能为空')
        return false
      }
      if (!that.schoolTestName) {
        this.$Message.error('测试名称不能为空')
        return false
      }
      if (!that.valueUnit) {
        this.$Message.error('请选择值单位')
        return false
      }
      if (!that.boyGrade) {
        this.$Message.error('请选择男性的年级')
        return false
      }
      if (!that.girlGrade) {
        this.$Message.error('请选择女性的年级')
        return false
      }
      if (!that.valueStart) {
        this.$Message.error('请填写数据最小值')
        return false
      }
      if (!that.valueEnd) {
        this.$Message.error('请填写数据最大值!')
        return false
      }
      // if (!that.containOneDecimals) {
      //   this.$Message.error('请选择是否包含以为小数')
      //   return false
      // }
      if (!that.testRemark) {
        this.$Message.error('请填写测试说明')
        return false
      }
      // var activeEditor = tinymce.activeEditor
      // var editBody = activeEditor.getBody()
      // activeEditor.selection.select(editBody)
      // var text = activeEditor.selection.getContent({ format: 'text' })
      // console.log(text)
      // if (!text) {
      //   this.$Message.error('请填写原理详情')
      //   return false
      // }
      
      let data = {
        // "boyGrades": "string",
        "containDecimal": that.containOneDecimals?"1":"0",
        "dataEnd": that.valueEnd,
        "dataStart": that.valueStart,
        "effectiveStatus": that.effectiveStatus,
        // "girlGrades": "string",
        // "schoolItemName": "string",
        "schoolTestId": that.testId,
        "schoolTestName": that.schoolTestName,
        // "testNum": 0,
        "testRemark":that.testRemark,
        "valueUnit": that.valueUnit
      }
      this.$axios
        .post('/v1/schooltest/upsertSchoolTestDetailInfo', data)
        .then(function(response) {
          console.log(response)
          if (response.data.code == 10000) {
            let numCode = response.data.response
            if (numCode == '1') {
              that.$Message.info('保存成功！')
              that.$router.go(-1)
            }
            if (numCode == '2') {
              that.$Message.error('测试名称重复，请检查')
            }
            if (numCode == '3') {
              that.$Message.error('暂时无法关闭该测试')
            }
          } else {
            that.$Message.info('保存失败！')
          }
        })
        .catch(function(response) {
          console.log(response)
        })
    },
    
  },
  mounted() {
    var vm = this
    // vm.getTanmaTestItem();
    let height = (document.body.offsetHeight - 300) / 2
    let testId = sessionStorage.getItem('countryTest-countryTestDetail-testId')
    if (testId) {
      vm.testId = testId
      vm.getTestDetailInfoByTestId(testId);
    }
   
  },
  destroyed() {
    var vm = this
    // tinymce.get('testTheory').destroy()
  }
}
</script>