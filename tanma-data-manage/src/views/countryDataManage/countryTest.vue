<template>
  <Tabs type="card">
    <TabPane label="测试项目" name="help">
      <!-- <Card>
        <div>
          <Button type="success" icon="plus-round" style="margin-left:85%" @click="addNewTest">添加测试项目</Button>
        </div>
      </Card> -->
      <!-- <Card>
        <Select v-model="sexSelect" size="small" style="width:100px;margin-left:40px;">
          <Option v-for="item in sexList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        
        <Select v-model="effectiveStatus" size="small" style="width:100px;margin-left:40px;">
          <Option v-for="item in accountList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Input v-model="testName" placeholder="请输入项目名称..." style="width: 300px;margin-left:40px;" />
        <Button type="success" style="margin-left:40px;" @click="search">搜索</Button>
      </Card> -->
      <Card style="margin-top:20px">
        <Table border :columns="columns1" :data="testList"></Table>
        <!-- <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :total="total" :current="pageNo" :page-size="pageSize" @on-change='pageNumChange' @on-page-size-change='pageSizechange' show-total show-sizer></Page>
          </div>
        </div> -->
      </Card>
    </TabPane>
    <TabPane label="学校数据" name="wiki">

    </TabPane>
  </Tabs>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'test',
  data() {
    return {
      testList: [],
      columns1: [
        {
          title: '测试项目名称',
          key: 'schoolTestName'
        },
        {
          title: '年级男',
          key: 'boyGrades'
        },
        {
          title: '年级女',
          key: 'girlGrades'
        },
        {
          title: '测试数据（条）',
          key: 'testNum',
          render: (h, params) => {
            const row = params.row
            const testNum = row.testNum ? row.testNum : 0
            return h('Tag', {}, testNum)
          }
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
                      vm.editeTest(params.row.schoolTestId)
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
                          vm.updateStatus(params.row.schoolTestId, '1')
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
                          vm.updateStatus(params.row.schoolTestId, '0')
                        }
                      }
                    },
                    '关闭'
                  )
            ])
          }
        }
      ],
      
    }
  },
  watch: {}, //以V-model绑定数据时使用的数据变化监测

  methods: {
    
    editeTest(testId) {
      sessionStorage.setItem('countryTest-countryTestDetail-testId', testId)
      this.$router.push({ name: 'countryTestDetail' })
    },
    

    getTestList() {
      var that = this
      
      this.$axios
        .get('/v1/schooltest/getList')
        .then(function(response) {
          console.log(response)
          that.testList = response.data.response
          console.log(that.testList)
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

    
  },
  mounted() {
    var vm = this
    let height = (document.body.offsetHeight - 300) / 2
    vm.getTestList()
    
  },
  destroyed() {
    var vm = this
  }
}
</script>