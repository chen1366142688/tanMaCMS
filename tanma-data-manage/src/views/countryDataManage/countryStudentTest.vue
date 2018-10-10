<template>
  <Tabs type="card">
    <TabPane label="测试项目" name="help">

      <Card>
        <DatePicker :value="dateStart" :clearable="true" format="yyyy年MM月dd日" type="date" placeholder="起始时间" style="width: 200px" on-clear="dateClear"></DatePicker>
        <DatePicker :value="dateEnd" :clearable="true" format="yyyy年MM月dd日" type="date" placeholder="结束时间" style="width: 200px" on-clear="dateClear"></DatePicker>

        <Select v-model="provinceId" size="small" style="width:100px;margin-left:40px;">
          <Option v-for="item in provinceList" :value="item.provinceId" :key="item.provinceId">{{ item.provinceName }}</Option>
        </Select>

        <Select v-model="cityId" size="small" style="width:100px;margin-left:40px;">
          <Option v-for="item in cityList" :value="item.cityId" :key="item.cityId">{{ item.cityName }}</Option>
        </Select>
        <Input v-model="studentName" placeholder="请输入项目名称..." style="width: 300px;margin-left:40px;" />
        <Button type="success" style="margin-left:40px;" @click="search">搜索</Button>
        <Button type="success" style="margin-left:40px;" @click="reset">重置</Button>
      </Card>
      <Card style="margin-top:20px">
        <Table border :columns="columns1" :data="studentInfoList"></Table>
        <div style="margin: 10px;overflow: hidden;height:160px;">
          <div style="float: right;">
            <Page :total="total" :current="pageNo" :page-size="pageSize" @on-change='pageNumChange' @on-page-size-change='pageSizechange' show-total show-sizer></Page>
          </div>
        </div>
      </Card>
      <Modal v-model="deleteTf" title="温馨提示" @on-ok="ok" @on-cancel="cancel">
        <p>确认删除该条数据吗？</p>
      </Modal>
    </TabPane>

  </Tabs>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'test',
  data() {
    return {
      testId: '',
      dateStart: '',
      dateEnd: '',
      provinceId: '',
      provinceList: [],
      cityId: '',
      cityList: [],
      studentName: '',
      studentInfoList: [],
      columns1: [
        {
          title: '记录组',
          key: 'activityName'
        },
        {
          title: '测试时间',
          key: 'createTime'
        },
        {
          title: '姓名',
          key: 'studentName'
        },
        {
          title: '性别',
          key: 'gender',
          render: (h, params) => {
            const row = params.row
            const gender = row.gender == '1' ? '男' : '女'
            return h('Tag', {}, gender)
          }
        },
        {
          title: '年龄',
          key: 'age'
        },
        {
          title: '城市',
          key: 'cityName'
        },
        {
          title: '学校',
          key: 'schoolName'
        },
        {
          title: '年级',
          key: 'gradeName'
        },
        {
          title: '测试成绩',
          key: 'resultValue'
        },
        {
          title: '分数',
          key: 'score'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            // console.log(params)
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      var vm = this
                      vm.editeThis(params.row.resultId)
                    }
                  }
                },
                '修改'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      var vm = this
                      console.log(params)
                      vm.deleteThis(params.row.resultId)
                    }
                  }
                },
                '删除'
              )
            ])
          }
        }
      ],
      pageNo: 1,
      pageSize: 10,
      total: 0,
      deleteTf: false,
      deleteId: ''
    }
  },
  watch: {
    provinceId: function(provinceId) {
      var that = this
      console.log(provinceId)
      if (provinceId) {
        that.getCityListByProvinceId(provinceId)
      }
    }
  }, //以V-model绑定数据时使用的数据变化监测

  methods: {
    editeThis(resultId) {
      sessionStorage.setItem('countryStudentTest-countryStudentTestDetail-resultId', resultId)
      this.$router.push({ name: 'countryStudentTestDetail' })
    },
    deleteThis(resultId) {
      var vm = this
      vm.deleteTf = true
      vm.deleteId = resultId
    },
    ok() {
      var vm = this
      let resultId = vm.deleteId
      this.$axios
        .get('/v1/schooltest/deleteByResultId?resultId=' + resultId)
        .then(function(response) {
          console.log(response)
          if (response.data.code == 10000) {
            var list = vm.studentInfoList

            for (let i = 0; i < list.length; i++) {
              if (list[i].resultId == resultId) {
                vm.studentInfoList.splice(i, 1)
                break
              }
            }
            vm.$Message.success('删除成功')
            vm.deleteId = ''
          } else {
            vm.$Message.error('删除失败')
          }
        })
        .catch(function(response) {
          console.log(response)
        })
    },
    cancel() {},
    search() {
      var vm = this
      vm.getSchoolStudentTestListByTestId(vm.testId)
      vm.countSchoolStudentTestNum(vm.testId)
    },
    reset() {
      var vm = this
      vm.provinceId = ''
      vm.dateStart = ''
      vm.dateEnd = ''
      vm.studentName = ''
      vm.cityId = ''
    },
    pageNumChange(value) {
      //页码改变方法处理
      if (this.pageNo != value) {
        this.pageNo = value
        var vm = this
        vm.getSchoolStudentTestListByTestId(vm.testId)
        vm.countSchoolStudentTestNum(vm.testId)
      }
    },
    pageSizechange(value) {
      //页面大小改变方法处理
      if (this.pageSize != value) {
        this.pageSize = value
        var vm = this
        vm.getSchoolStudentTestListByTestId(vm.testId)
        vm.countSchoolStudentTestNum(vm.testId)
      }
    },
    getSchoolStudentTestListByTestId(testId) {
      var that = this
      let data = {
        cityId: that.cityId,
        dateEnd: that.dateEnd,
        dateStart: that.dateStart,
        pageNo: that.pageNo,
        pageSize: that.pageSize,
        provinceId: that.provinceId,
        studentName: that.studentName,
        testId: testId
      }
      this.$axios
        .post('/v1/schooltest/getSchoolStudentTestListByTestId', data)
        .then(function(response) {
          console.log(response)
          that.studentInfoList = response.data.response
          // console.log(that.testList)
        })
        .catch(function(response) {
          console.log(response)
        })
    },
    countSchoolStudentTestNum(testId) {
      var that = this
      let data = {
        cityId: that.cityId,
        dateEnd: that.dateEnd,
        dateStart: that.dateStart,
        pageNo: that.pageNo,
        pageSize: that.pageSize,
        provinceId: that.provinceId,
        studentName: that.studentName,
        testId: testId
      }
      this.$axios
        .post('/v1/schooltest/countSchoolStudentTestNum', data)
        .then(function(response) {
          console.log(response)
          that.total = response.data.response
          // console.log(that.testList)
        })
        .catch(function(response) {
          console.log(response)
        })
    },

    updateStatus(testId, effectiveStatus) {
      var that = this
      let data = {
        testId: testId,
        effectiveStatus: effectiveStatus
      }
      this.$axios
        .get(
          '/v1/corporeitytest/updateTestEffectiveStatusByTestId?testId=' +
            testId +
            '&effectiveStatus=' +
            effectiveStatus
        )
        .then(function(response) {
          console.log(response)
          if (response.data.code == 10000) {
            let numCode = response.data.response
            if (numCode == '1') {
              for (let i = 0; i < that.testList.length; i++) {
                if (that.testList[i].testId == testId) {
                  that.testList[i].effectiveStatus = effectiveStatus
                  break
                }
              }
            }
            if (numCode == '3') {
              that.$Message.error('暂时无法关闭该测试')
            }
          } else {
            that.$Message.info('修改失败！')
          }
        })
        .catch(function(response) {
          console.log(response)
        })
    },
    getProvinceList() {
      var that = this
      this.$axios
        .get('/v1/region/get/allProvinceInfo')
        .then(function(response) {
          console.log(response)
          that.provinceList = [{ provinceId: '0', provinceName: '请选择' }]
          that.provinceList = that.provinceList.concat(response.data.response)
        })
        .catch(function(response) {
          console.log(response)
        })
    },
    getCityListByProvinceId(provinceId) {
      var that = this
      this.$axios
        .get('/v1/region/get/allCityInfoByProvinceId?provinceId=' + provinceId)
        .then(function(response) {
          console.log(response)
          that.cityList = [{ cityId: '0', cityName: '请选择' }]
          that.cityList = that.cityList.concat(response.data.response)
        })
        .catch(function(response) {
          console.log(response)
        })
    }
  },
  mounted() {
    var vm = this
    let height = (document.body.offsetHeight - 300) / 2
    let testId = sessionStorage.getItem(
      'countryTestDetail-countryStudentTest-testId'
    )
    if (testId) {
      vm.testId = testId
      vm.getSchoolStudentTestListByTestId(testId)
      vm.countSchoolStudentTestNum(testId)
      vm.getProvinceList()
    }
  },
  destroyed() {
    var vm = this
  }
}
</script>