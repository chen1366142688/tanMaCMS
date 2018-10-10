<template>
  <Tabs type="card">
    <TabPane label="测试项目" name="help">
      <Card>
        <div>
          <Button type="success" icon="plus-round" style="margin-left:85%" @click="addNewTest">添加测试项目</Button>
        </div>
      </Card>
      <Card>
        <Select v-model="sexSelect" size="small" style="width:100px;margin-left:40px;">
          <Option v-for="item in sexList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Select v-model="ageSelect" size="small" style="width:100px;margin-left:40px;">
          <Option v-for="item in ageList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Select v-model="effectiveStatus" size="small" style="width:100px;margin-left:40px;">
          <Option v-for="item in accountList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Input v-model="testName" placeholder="请输入项目名称..." style="width: 300px;margin-left:40px;" />
        <Button type="success" style="margin-left:40px;" @click="search">搜索</Button>
      </Card>
      <Card style="margin-top:20px">
        <Table border :columns="columns1" :data="testList"></Table>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :total="total" :current="pageNo" :page-size="pageSize" @on-change='pageNumChange' @on-page-size-change='pageSizechange' show-total show-sizer></Page>
          </div>
        </div>
      </Card>
    </TabPane>
    <TabPane label="测试准备说明" name="wiki">

    </TabPane>
  </Tabs>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'test',
  data() {
    return {
      sexSelect: '0',
      sexList: [
        {
          value: '1',
          label: '男'
        },
        {
          value: '2',
          label: '女'
        },
        {
          value: '0',
          label: '全选'
        }
      ],
      ageSelect: '0',
      ageList: [
        {
          value: '0',
          label: '全选'
        },
        {
          value: '1',
          label: '1岁'
        },
        {
          value: '2',
          label: '2岁'
        },
        {
          value: '3',
          label: '3岁'
        },
        {
          value: '4',
          label: '4岁'
        },
        {
          value: '5',
          label: '5岁'
        },
        {
          value: '6',
          label: '6岁'
        },
        {
          value: '7',
          label: '7岁'
        },
        {
          value: '8',
          label: '8岁'
        },
        {
          value: '9',
          label: '9岁'
        },
        {
          value: '10',
          label: '10岁'
        },
        {
          value: '11',
          label: '11岁'
        },
        {
          value: '12',
          label: '12岁'
        },
        {
          value: '13',
          label: '13岁'
        },
        {
          value: '14',
          label: '14岁'
        },
        {
          value: '15',
          label: '15岁'
        },
        {
          value: '16',
          label: '16岁'
        },
        {
          value: '17',
          label: '17岁'
        },
        {
          value: '18',
          label: '18岁'
        },
        {
          value: '19',
          label: '19岁'
        },
        {
          value: '20',
          label: '20岁'
        }
      ],
      effectiveStatus: '3',
      accountList: [
        {
          value: '3',
          label: '全选'
        },
        {
          value: '1',
          label: '启用'
        },
        {
          value: '0',
          label: '关闭'
        }
      ],
      testName: '',
      testList: [],
      columns1: [
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
          title: '适用年龄（岁）',
          key: 'age'
        },
        {
          title: '测试项目名称',
          key: 'testName'
        },
        {
          title: '使用次数',
          key: 'useTimes',
          render: (h, params) => {
            const row = params.row
            const useTimes = row.useTimes ? row.useTimes : 0
            return h('Tag', {}, useTimes)
          }
        },
        {
          title: '排序序号',
          key: 'sortIndex'
        },
        {
          title: '是否启用',
          key: 'effectiveStatus',
          render: (h, params) => {
            const row = params.row
            const color = row.effectiveStatus == '1' ? 'green' : 'gray'
            const text = row.effectiveStatus == '1' ? '启用中' : '已关闭'
            return h(
              'Tag',
              {
                props: {
                  type: 'dot',
                  color: color
                }
              },
              text
            )
          }
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
                      vm.editeTest(params.row.testId)
                    }
                  }
                },
                '编辑'
              ),

              params.row.effectiveStatus == '0'
                ? h(
                    'Button',
                    {
                      props: {
                        type: 'success',
                        size: 'small'
                      },
                      on: {
                        click: () => {
                          var vm = this
                          console.log(params)
                          vm.updateStatus(params.row.testId, '1')
                        }
                      }
                    },
                    '开启'
                  )
                : h(
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
                          vm.updateStatus(params.row.testId, '0')
                        }
                      }
                    },
                    '关闭'
                  )
            ])
          }
        }
      ],
      pageNo: 1,
      pageSize: 10,
      total: 0
    }
  },
  watch: {}, //以V-model绑定数据时使用的数据变化监测

  methods: {
    closable() {
      this.$Message.info({
        content: 'Tips for manual closing',
        duration: 10,
        closable: true
      })
    },

    addNewTest() {
      sessionStorage.setItem('testManage-testItem-testId', '')
      this.$router.push({ name: 'testDetail' })
    },
    editeTest(testId) {
      sessionStorage.setItem('testManage-testItem-testId', testId)
      this.$router.push({ name: 'testDetail' })
    },
    pageNumChange(value) {
      //页码改变方法处理
      if (this.pageNo != value) {
        this.pageNo = value
        this.getTestList()
      }
    },
    pageSizechange(value) {
      //页面大小改变方法处理
      if (this.pageSize != value) {
        this.pageSize = value
        this.getTestList()
      }
    },
    search() {
      this.getTestList()
      this.getTestNum()
    },

    getTestList() {
      var that = this
      let data = {
        age: that.ageSelect == '0' ? '' : that.ageSelect,
        effectiveStatus:
          that.effectiveStatus == '3' ? '' : that.effectiveStatus,
        gender: that.sexSelect == '0' ? '' : that.sexSelect,
        pageNo: that.pageNo,
        pageSize: that.pageSize,
        testName: that.testName
      }
      this.$axios
        .post('/v1/corporeitytest/getTestList', data)
        .then(function(response) {
          console.log(response)
          that.testList = response.data.response
          console.log(that.testList)
        })
        .catch(function(response) {
          console.log(response)
        })
    },
    getTestNum() {
      var that = this
      let data = {
        age: that.ageSelect == '0' ? '' : that.ageSelect,
        effectiveStatus:
          that.effectiveStatus == '3' ? '' : that.effectiveStatus,
        gender: that.sexSelect == '0' ? '' : that.sexSelect,
        testName: that.testName
      }
      this.$axios
        .post('/v1/corporeitytest/countAllTestNum', data)
        .then(function(response) {
          console.log(response)
          that.total = response.data.response
        })
        .catch(function(response) {
          console.log(response)
        })
    },

    // editeTest(testId){
    //         sessionStorage.setItem('testManage-testItem-testId',testId);
    //         this.$router.push({name: 'testDetail'});
    // },
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

    show(index) {
      this.$Modal.info({
        title: 'User Info',
        content: `Name：${this.testList[index].a}<br>Age：${
          this.testList[index].b
        }<br>Address：${this.testList[index].e}`
      })
    },
    remove(index) {
      this.testList.splice(index, 1)
    }
  },
  mounted() {
    var vm = this
    let height = (document.body.offsetHeight - 300) / 2
    vm.getTestList()
    vm.getTestNum()
  },
  destroyed() {
    var vm = this
  }
}
</script>