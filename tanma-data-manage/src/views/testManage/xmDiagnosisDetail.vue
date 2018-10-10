<template>
  <Tabs type="card">
    <TabPane label="条件设置" name="xm">
      <Card style="margin-top:20px">
        <div style="height:68px;">
          <span>{{baseInfo.gender == '1' ?'男':'女'}} | {{baseInfo.age}}岁 | {{baseInfo.testNum}}项测试 | {{baseInfo.conditionNum}} 个判断条件</span>
          <Button style="float:right;" type="success" @click="addNewCondition">添加新条件</Button>
        </div>
      </Card>
      <Card style="margin-top:20px;height:200px;">
        <div style="height:40px;">
          <span>未完成测试（如果用户未完成至少一次所有测试，则显示本栏内容。）</span>
        </div>
        <Input v-model="notFinished" type="textarea" :autosize="{minRows: 5,maxRows:10}" style="height:120px" />
      </Card>
      <Card style="margin-top:20px;height:200px;">
        <div style="height:40px;">
          <span>默认条件（如果所有下面设置条件都不满足，则显示本栏内容。）</span>
        </div>
        <Input v-model="defaultValue" type="textarea" :autosize="{minRows: 5,maxRows: 10}" style="height:120px" />
      </Card>
      <Card style="margin-top:20px;height:380px;" v-if="conditionList" v-for="(condition,aindex) in conditionList" :key="aindex">
        <div style="height:140px;">
          <span>条件{{aindex+1}}</span>

          <div style="height:200px">
            <div v-for="(test,bindex) in condition.piecewiseVOS" :key="bindex" style="display: inline;">
              <div style="width:500px;display: inline;margin-left:50px;">
                <span>{{bindex+1}}:{{test.testName}}</span>
                <Select v-model="test.scoreStart" size="small" style="width:100px;margin-left:10px;">
                  <Option v-for="item in scoreList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                </Select>
                <Select v-model="test.scoreEnd" size="small" style="width:100px;margin-left:10px;">
                  <Option v-for="item in scoreList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                </Select>
              </div>
              <br v-if="bindex==2" /><br v-if="bindex==5" /><br v-if="bindex==8" /><br v-if="bindex==11" />
            </div>
          </div>

        </div>
        <Input v-model="condition.diagnosisContent" type="textarea" :autosize="{minRows: 5,maxRows: 10}" style="height:100px;margin-top:20px;" />
        <Button type="error" long style="margin-top:20px;" @click="deleteThis(aindex)">删除</Button>
      </Card>
      <div style="margin-top:20px;padding-right:20px">
                    <Button type="success" @click="upsertDiagnosisDetailInfo" style="float:right;">提交结果</Button>
                    <Button style="float:right;margin-right:200px;" type="success" @click="addNewCondition">添加新条件</Button>
                    <!-- <Button type="success" @click="ok" style="float:right;">ss</Button>   -->
                </div>
    </TabPane>
  </Tabs>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'xm',
  data() {
    return {
      baseInfo: '',
      testItemList: [],
      notFinished: '',
      defaultValue: '',
      conditionList: [
        
      ],
      scoreList: [
        {
          name: '分段一',
          value: 1
        },
        {
          name: '分段二',
          value: 2
        },
        {
          name: '分段三',
          value: 3
        },
        {
          name: '分段四',
          value: 4
        },
        {
          name: '分段五',
          value: 5
        },
        {
          name: '分段六',
          value: 6
        },
        {
          name: '分段七',
          value: 7
        },
        {
          name: '分段八',
          value: 8
        },
        {
          name: '分段九',
          value: 9
        },
        {
          name: '分段十',
          value: 10
        }
      ]
    }
  },
  watch: {}, //以V-model绑定数据时使用的数据变化监测

  methods: {
    addNewCondition() {
      var vm = this
      let testItemList = vm.testItemList
      let data = {
        conditionRule: '',
        conditionType: '03',
        diagnosisContent: '',
        diagnosisId: vm.diagnosisId,
        piecewiseVOS: [],
        groupIndex:vm.conditionList.length+1
      }
      for (let i = 0; i < testItemList.length; i++) {
        let piecewise = {
          scoreEnd: 2,
          scoreStart: 1,
          testId: testItemList[i].testItemId,
          testName: testItemList[i].testItemName
        }
        data.piecewiseVOS.push(piecewise)
      }

      vm.conditionList.push(data)
    },
    deleteThis(aindex) {
      var vm = this
      vm.conditionList.splice(aindex, 1);
      vm.baseInfo.conditionNum=vm.baseInfo.conditionNum-1
    },
    getDiagnosisDetailInfo(diagnosisId) {
      var that = this
      console.log(diagnosisId)
      this.$axios
        .get(
          '/v1/diagnosis/getDetailInfoByDiagnosisId?diagnosisId=' + diagnosisId
        )
        .then(function(response) {
          console.log(response)
          that.conditionList = response.data.response.conditionList
          that.defaultValue = response.data.response.defaultValue
          that.notFinished = response.data.response.notFinished
        })
        .catch(function(response) {
          console.log(response)
        })
    },
    getDiagnosisInfoById(diagnosisId) {
      var that = this
      console.log(diagnosisId)
      this.$axios
        .get('/v1/diagnosis/getDiagnosisInfoById?diagnosisId=' + diagnosisId)
        .then(function(response) {
          console.log(response)
          that.baseInfo = response.data.response
          that.getTestItemListByAgeAndGender(
            response.data.response.age,
            response.data.response.gender
          )
        })
        .catch(function(response) {
          console.log(response)
        })
    },
    getTestItemListByAgeAndGender(age, gender) {
      var that = this
      //  console.log(diagnosisId)
      this.$axios
        .get(
          '/v1/diagnosis/getTestItemListByAgeAndGender?age=' +
            age +
            '&gender=' +
            gender
        )
        .then(function(response) {
          console.log(response)
          that.testItemList = response.data.response
        })
        .catch(function(response) {
          console.log(response)
        })
    },

    upsertDiagnosisDetailInfo(testId, effectiveStatus) {
      var that = this
      let data = {
        "conditionList":that.conditionList,
        "defaultValue": that.defaultValue,
        "diagnosisId": that.diagnosisId,
        "notFinished": that.notFinished
      }
      this.$axios
        .post(
          '/v1/diagnosis/upsertDiagnosisDetailInfo',data
        )
        .then(function(response) {
          console.log(response)
          if (response.data.code == 10000) {
            let numCode = response.data.response;
            if (numCode == "01") {
              that.$Message.info("保存成功！");
              that.$router.go(-1);  
            }
            if (numCode == "02") {
              that.$Message.error("分段的前值大于了后值，请检查");
            }
           
          } else {
            that.$Message.info("保存失败！");
          }
        })
        .catch(function(response) {
          console.log(response)
        })
    }
  },
  mounted() {
    var vm = this
    let height = (document.body.offsetHeight - 300) / 2
    let diagnosisId = sessionStorage.getItem(
      'testManage-xmDiagnosis-diagnosisId'
    )
    vm.diagnosisId = diagnosisId
    vm.getDiagnosisDetailInfo(diagnosisId)
    vm.getDiagnosisInfoById(diagnosisId)
  },
  destroyed() {
    var vm = this
  }
}
</script>