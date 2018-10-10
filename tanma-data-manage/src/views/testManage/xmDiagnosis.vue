<template>
  <Tabs type="card">
    <TabPane label="综合评估" name="help">
      <Card style="margin-top:20px">
        <Table border :columns="columns1" :data="diagnosisList"></Table>
        <!-- <div style="margin: 10px;overflow: hidden">
                    <div style="float: right;">
                        <Page :total="total" :current="pageNo" :page-size="pageSize" @on-change='pageNumChange' @on-page-size-change='pageSizechange' show-total show-sizer></Page>
                    </div>
                </div> -->
      </Card>
    </TabPane>
    <TabPane label="单项评估" name="x">
      <Card style="margin-top:20px">
        <Table border :columns="columns2" :data="itemList"></Table>
      </Card>
    </TabPane>
  </Tabs>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'test',
  data() {
    return {
      diagnosisList: [],
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
          title: '年龄（岁）',
          key: 'age'
        },
        {
          title: '条件个数',
          key: 'conditionNum',
          render: (h, params) => {
            const row = params.row
            const conditionNum = row.conditionNum ? row.conditionNum : 0
            return h('Tag', {}, conditionNum)
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
                      vm.editeTest(params.row.diagnosisId)
                    }
                  }
                },
                '编辑'
              )
            ])
          }
        }
      ],
      columns2: [
        {
          title: '素质类型',
          key: 'itemName'
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
                      vm.editeItemDiagnosis(params.row.itemId)
                    }
                  }
                },
                '编辑'
              )
            ])
          }
        }
      ],
      itemList: [],
      pageNo: 1,
      pageSize: 24,
      total: 24
    }
  },
  watch: {}, //以V-model绑定数据时使用的数据变化监测

  methods: {
    editeTest(diagnosisId) {
      sessionStorage.setItem('testManage-xmDiagnosis-diagnosisId', diagnosisId)
      this.$router.push({ name: 'xmDiagnosisDetail' })
    },
    editeItemDiagnosis(itemId) {
      sessionStorage.setItem('testManage-itemDiagnosis-itemId', itemId)
      this.$router.push({ name: 'itemDiagnosis' })
    },
    getDiagnosisList() {
      var that = this
      this.$axios
        .get('/v1/diagnosis/getDiagnosisList')
        .then(function(response) {
          console.log(response)
          that.diagnosisList = response.data.response
        })
        .catch(function(response) {
          console.log(response)
        })
    },
    getTestItemList() {
      var that = this
      this.$axios
        .get('/v1/diagnosis/getTestItemList')
        .then(function(response) {
          console.log(response)
          that.itemList = response.data.response
        })
        .catch(function(response) {
          console.log(response)
        })
    }
  },
  mounted() {
    var vm = this
    let height = (document.body.offsetHeight - 300) / 2
    vm.getDiagnosisList()
    vm.getTestItemList()
  },
  destroyed() {
    var vm = this
  }
}
</script>