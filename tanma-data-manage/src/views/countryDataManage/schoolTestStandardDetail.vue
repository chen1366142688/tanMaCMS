<style>
.ivu-table-row .ivu-table-cell {
  padding-left: 2px;
  padding-right: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-break: break-all;
  box-sizing: border-box;
}
.greyClass {
  background-color: grey;
}
</style>

<template>
    <div style="margin-left:15px;">
        <Tabs type="card">
            <TabPane label="体测数据标准">

                <Card>
                    <Form :label-width="80" class="baseInfo" v-for="(testDetailInfo,index) in testDetailInfoList">
                        <FormItem label="项目名称" class="baseInfoitem">
                            <p>
                                <span>{{testDetailInfo.schoolItemName}} | {{testDetailInfo.schoolTestName}}</span>
                                <span style="float:right;color:green" v-if="testDetailInfo.effectiveStatus == '1'">
                                    启用中</span>
                                <span style="float:right;color:red" v-if="testDetailInfo.effectiveStatus == '0'">已关闭</span>
                            </p>

                        </FormItem>
                        <FormItem label="测试类型" class="baseInfoitem">
                            <p>
                                <span>{{testDetailInfo.schoolItemName}} (单位：{{testDetailInfo.valueUnit}})</span>
                                <span style="float:right;" v-if="testDetailInfo.containDecimal == '1'">保留小数位：1位</span>
                                <span style="float:right;" v-if="testDetailInfo.containDecimal == '0'">保留小数位：0位</span>
                            </p>
                        </FormItem>
                    </Form>
                </Card>

                <Card style="margin-top:20px">
                    <Table border :columns="columns1" :data="primaryList"></Table>
                </Card>
                <Card style="margin-top:20px">
                    <Table border :columns="columns2" :data="highSchoolList"></Table>
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
export default {
  name: 'test',
  data() {
    return {
      itemId: '',
      testDetailInfoList: [],
      columns1: [
        {
          title: '等级',
          key: 'scoreType',
          render: (h, params) => {
            // console.log(params)
            return h('div', [
              h(
                'Input',
                {
                  props: {
                    type: 'text',
                    size: 'small',
                    disabled: true,
                    value: params.row.scoreType
                  },
                  style: {
                    marginRight: '5px'
                  }
                },
                params.row.scoreType
              )
            ])
          }
        },
        {
          title: '单项得分',
          key: 'score',
          render: (h, params) => {
            // console.log(params)
            return h('div', [
              h(
                'Input',
                {
                  props: {
                    type: 'text',
                    size: 'small',
                    disabled: true,
                    value: params.row.score
                  },
                  style: {
                    marginRight: '5px'
                  }
                },
                params.row.score
              )
            ])
          }
        },
        {
          title: '小一男',
          key: 'b1Start',
          className: 'greyClass',
          render: (h, params) => {
            // console.log(params)
            var vm = this
            return h('div', [
              h('Input', {
                props: {
                  type: 'text',
                  size: 'small',
                  placeholder: '下限值',
                  value:params.row.b1Start/10
                },
                style: {
                  //   border: green
                },
                on: {
                  input(value) {
                    vm.primaryList[params.index] = params.row
                    params.row.b1Start = value*10
                  }
                }
              })
            ])
          }
        },
        {
          title: '小一男',
          key: 'b1End',
          render: (h, params) => {
            // console.log(params)
            var vm = this
            return h('div', [
              h('Input', {
                props: {
                  type: 'text',
                  size: 'small',
                  placeholder: '上限值',
                  value:params.row.b1End/10
                },
                style: {
                  // marginRight: '5px'
                  // width:'100%'
                },
                on: {
                  input(value) {
                    vm.primaryList[params.index] = params.row
                    params.row.b1End = value*10
                  }
                }
              })
            ])
          }
        },
        {
          title: '小一女',
          key: 'g1Start',
          render: (h, params) => {
            var vm = this
            return h('div', [
              h('Input', {
                props: {
                  type: 'text',
                  size: 'small',
                  placeholder: '下限值',
                  value:params.row.g1Start/10
                },
                style: {
                  // marginRight: '5px'
                },
                on: {
                  input(value) {
                    vm.primaryList[params.index] = params.row
                    params.row.g1Start = value*10
                  }
                }
              })
            ])
          }
        },
        {
          title: '小一女',
          key: 'g1End',
          render: (h, params) => {
            var vm = this
            return h('div', [
              h('Input', {
                props: {
                  type: 'text',
                  size: 'small',
                  placeholder: '上限值',
                  value:params.row.g1End/10
                },
                style: {
                  // marginRight: '5px'
                },
                on: {
                  input(value) {
                    vm.primaryList[params.index] = params.row
                    params.row.g1End = value*10
                  }
                }
              })
            ])
          }
        },
        {
          title: '小二男',
          key: 'b2Start',
          render: (h, params) => {
            var vm = this
            return h('div', [
              h('Input', {
                props: {
                  type: 'text',
                  size: 'small',
                  placeholder: '下限值',
                  value:params.row.b2Start/10
                },
                style: {
                  // marginRight: '5px'
                },
                on: {
                  input(value) {
                    vm.primaryList[params.index] = params.row
                    // console.log(value)
                    params.row.b2Start = value*10
                    // console.log(vm.primaryList)
                  }
                }
              })
            ])
          }
        },
        {
          title: '小二男',
          key: 'b2End',
          render: (h, params) => {
            var vm = this
            return h('div', [
              h('Input', {
                props: {
                  type: 'text',
                  size: 'small',
                  placeholder: '上限值',
                  value:params.row.b2End/10
                },
                style: {
                  // marginRight: '5px'
                },
                on: {
                  input(value) {
                    vm.primaryList[params.index] = params.row
                    params.row.b2End = value*10
                  }
                }
              })
            ])
          }
        },
        {
          title: '小二女',
          key: 'g2Start',
          render: (h, params) => {
            var vm = this
            return h('div', [
              h('Input', {
                props: {
                  type: 'text',
                  size: 'small',
                  placeholder: '下限值',
              
                  value:params.row.g2Start/10
                },
                style: {
                  // marginRight: '5px'
                },
                on: {
                  input(value) {
                    vm.primaryList[params.index] = params.row
                    params.row.g2Start = value*10
                  }
                }
              })
            ])
          }
        },
        {
          title: '小二女',
          key: 'g2End',
          render: (h, params) => {
            var vm = this
            return h('div', [
              h('Input', {
                props: {
                  type: 'text',
                  size: 'small',
                  placeholder: '上限值',
                
                  value:params.row.g2End/10
                },
                style: {
                  // marginRight: '5px'
                },
                on: {
                  input(value) {
                    vm.primaryList[params.index] = params.row
                    params.row.g2End = value*10
                  }
                }
              })
            ])
          }
        },
        {
          title: '小三男',
          key: 'b3Start',
          render: (h, params) => {
            var vm = this
            return h('div', [
              h('Input', {
                props: {
                  type: 'text',
                  size: 'small',
                  placeholder: '下限值',
               
                  value:params.row.b3Start/10
                },
                style: {
                  // marginRight: '5px'
                },
                on: {
                  input(value) {
                    vm.primaryList[params.index] = params.row
                    params.row.b3Start = value*10
                  }
                }
              })
            ])
          }
        },
        {
          title: '小三男',
          key: 'b3End',
          render: (h, params) => {
            var vm = this
            return h('div', [
              h('Input', {
                props: {
                  type: 'text',
                  size: 'small',
                  placeholder: '上限值',
             
                  value:params.row.b3End/10
                },
                style: {
                  // marginRight: '5px'
                },
                on: {
                  input(value) {
                    vm.primaryList[params.index] = params.row
                    params.row.b3End = value*10
                  }
                }
              })
            ])
          }
        },
        {
          title: '小三女',
          key: 'g3Start',
          render: (h, params) => {
            var vm = this
            return h('div', [
              h('Input', {
                props: {
                  type: 'text',
                  size: 'small',
                  placeholder: '下限值',
               
                  value:params.row.g3Start/10
                },
                style: {
                  // marginRight: '5px'
                },
                on: {
                  input(value) {
                    vm.primaryList[params.index] = params.row
                    params.row.g3Start = value*10
                  }
                }
              })
            ])
          }
        },
        {
          title: '小三女',
          key: 'g3End',
          render: (h, params) => {
            var vm = this
            return h('div', [
              h('Input', {
                props: {
                  type: 'text',
                  size: 'small',
                  placeholder: '上限值',
              
                  value:params.row.g3End/10
                },
                style: {
                  // marginRight: '5px'
                },
                on: {
                  input(value) {
                    vm.primaryList[params.index] = params.row
                    params.row.g3End = value*10
                  }
                }
              })
            ])
          }
        },
        {
          title: '小四男',
          key: 'b4Start',
          render: (h, params) => {
            var vm = this
            return h('div', [
              h('Input', {
                props: {
                  type: 'text',
                  size: 'small',
                  placeholder: '下限值',
               
                  value:params.row.b4Start/10
                },
                style: {
                  // marginRight: '5px'
                },
                on: {
                  input(value) {
                    vm.primaryList[params.index] = params.row
                    params.row.b4Start = value*10
                  }
                }
              })
            ])
          }
        },
        {
          title: '小四男',
          key: 'b4End',
          render: (h, params) => {
            var vm = this
            return h('div', [
              h('Input', {
                props: {
                  type: 'text',
                  size: 'small',
                  placeholder: '上限值',
                
                  value:params.row.b4End/10
                },
                style: {
                  // marginRight: '5px'
                },
                on: {
                  input(value) {
                    vm.primaryList[params.index] = params.row
                    params.row.b4End = value*10
                  }
                }
              })
            ])
          }
        },
        {
          title: '小四女',
          key: 'g4Start',
          render: (h, params) => {
            var vm = this
            return h('div', [
              h('Input', {
                props: {
                  type: 'text',
                  size: 'small',
                  placeholder: '下限值',
                
                  value:params.row.g4Start/10
                },
                style: {
                  // marginRight: '5px'
                },
                on: {
                  input(value) {
                    vm.primaryList[params.index] = params.row
                    params.row.g4Start = value*10
                  }
                }
              })
            ])
          }
        },

        {
          title: '小四女',
          key: 'g4End',
          render: (h, params) => {
            var vm = this
            return h('div', [
              h('Input', {
                props: {
                  type: 'text',
                  size: 'small',
                  placeholder: '上限值',
                
                  value:params.row.g4End/10
                },
                style: {
                  // marginRight: '5px'
                },
                on: {
                  input(value) {
                    vm.primaryList[params.index] = params.row
                    params.row.g4End = value*10
                  }
                }
              })
            ])
          }
        },
        {
          title: '小五男',
          key: 'b5Start',
          render: (h, params) => {
            var vm = this
            return h('div', [
              h('Input', {
                props: {
                  type: 'text',
                  size: 'small',
                  placeholder: '下限值',
                 
                  value: params.row.b5Start/10
                },
                style: {
                  // marginRight: '5px'
                },
                on: {
                  input(value) {
                    vm.primaryList[params.index] = params.row
                    params.row.b5Start = value*10
                  }
                }
              })
            ])
          }
        },
        {
          title: '小五男',
          key: 'b5End',
          render: (h, params) => {
            var vm = this
            return h('div', [
              h('Input', {
                props: {
                  type: 'text',
                  size: 'small',
                  placeholder: '上限值',
                 
                  value:  params.row.b5End/10
                },
                style: {
                  // marginRight: '5px'
                },
                on: {
                  input(value) {
                    vm.primaryList[params.index] = params.row
                    params.row.b5End = value*10
                  }
                }
              })
            ])
          }
        },
        {
          title: '小五女',
          key: 'g5Start',
          render: (h, params) => {
            var vm = this
            return h('div', [
              h('Input', {
                props: {
                  type: 'text',
                  size: 'small',
                  placeholder: '下限值',
                 
                  value: params.row.g5Start/10
                },
                style: {
                  // marginRight: '5px'
                },
                on: {
                  input(value) {
                    vm.primaryList[params.index] = params.row
                    params.row.g5Start = value*10
                  }
                }
              })
            ])
          }
        },
        {
          title: '小五女',
          key: 'g5End',
          render: (h, params) => {
            var vm = this
            return h('div', [
              h('Input', {
                props: {
                  type: 'text',
                  size: 'small',
                  placeholder: '上限值',
                 
                  value: params.row.g5End/10
                },
                style: {
                  // marginRight: '5px'
                },
                on: {
                  input(value) {
                    vm.primaryList[params.index] = params.row
                    params.row.g5End = value*10
                  }
                }
              })
            ])
          }
        },
        {
          title: '小六男',
          key: 'b6Start',
          render: (h, params) => {
            var vm = this
            return h('div', [
              h('Input', {
                props: {
                  type: 'text',
                  size: 'small',
                  placeholder: '下限值',
                 
                  value:  params.row.b6Start/10
                },
                style: {
                  // marginRight: '5px'
                },
                on: {
                  input(value) {
                    vm.primaryList[params.index] = params.row
                    params.row.b6Start = value*10
                  }
                }
              })
            ])
          }
        },
        {
          title: '小六男',
          key: 'b6End',
          render: (h, params) => {
            var vm = this
            return h('div', [
              h('Input', {
                props: {
                  type: 'text',
                  size: 'small',
                  placeholder: '上限值',
                  
                  value:  params.row.b6End/10
                },
                style: {
                  // marginRight: '5px'
                },
                on: {
                  input(value) {
                    vm.primaryList[params.index] = params.row
                    params.row.b6End = value*10
                  }
                }
              })
            ])
          }
        },
        {
          title: '小六女',
          key: 'g6Start',
          render: (h, params) => {
            var vm = this
            return h('div', [
              h('Input', {
                props: {
                  type: 'text',
                  size: 'small',
                  placeholder: '下限值',
                 
                  value:params.row.g6Start/10
                },
                style: {
                  // marginRight: '5px'
                },
                on: {
                  input(value) {
                    vm.primaryList[params.index] = params.row
                    params.row.g6Start = value*10
                  }
                }
              })
            ])
          }
        },
        {
          title: '小六女',
          key: 'g6End',
          render: (h, params) => {
            var vm = this
            return h('div', [
              h('Input', {
                props: {
                  type: 'text',
                  size: 'small',
                  placeholder: '上限值',
                
                  value:  params.row.g6End/10
                },
                style: {
                  // marginRight: '5px'
                },
                on: {
                  input(value) {
                    vm.primaryList[params.index] = params.row
                    params.row.g6End = value*10
                  }
                }
              })
            ])
          }
        }
      ],
      columns2: [
        {
          title: '等级',
          key: 'scoreType',
          render: (h, params) => {
            // console.log(params)
            return h('div', [
              h(
                'Input',
                {
                  props: {
                    type: 'text',
                    size: 'small',
                    disabled: true,
                    value: params.row.scoreType
                  },
                  style: {
                    marginRight: '5px'
                  }
                },
                params.row.scoreType
              )
            ])
          }
        },
        {
          title: '单项得分',
          key: 'score',
          render: (h, params) => {
            // console.log(params)
            return h('div', [
              h(
                'Input',
                {
                  props: {
                    type: 'text',
                    size: 'small',
                    disabled: true,
                    value: params.row.score
                  },
                  style: {
                    marginRight: '5px'
                  }
                },
                params.row.score
              )
            ])
          }
        },
        {
          title: '初一男',
          key: 'b7Start',
          render: (h, params) => {
            var vm = this
            return h('div', [
              h('Input', {
                props: {
                  type: 'text',
                  size: 'small',
                  placeholder: '下限值',
                 
                  value: params.row.b7Start/10
                },
                style: {
                  // marginRight: '5px'
                },
                on: {
                  input(value) {
                    vm.highSchoolList[params.index] = params.row
                    params.row.b7Start = value*10
                  }
                }
              })
            ])
          }
        },
        {
          title: '初一男',
          key: 'b7End',
          render: (h, params) => {
            var vm = this
            return h('div', [
              h('Input', {
                props: {
                  type: 'text',
                  size: 'small',
                  placeholder: '上限值',
                  
                  value:  params.row.b7End/10
                },
                style: {
                  // marginRight: '5px'
                },
                on: {
                  input(value) {
                    vm.highSchoolList[params.index] = params.row
                    params.row.b7End = value*10
                  }
                }
              })
            ])
          }
        },
        {
          title: '初一女',
          key: 'g7Start',
          render: (h, params) => {
            var vm = this
            return h('div', [
              h('Input', {
                props: {
                  type: 'text',
                  size: 'small',
                  placeholder: '下限值',
                
                  value: params.row.g7Start/10
                },
                style: {
                  // marginRight: '5px'
                },
                on: {
                  input(value) {
                    vm.highSchoolList[params.index] = params.row
                    params.row.g7Start = value*10
                  }
                }
              })
            ])
          }
        },
        {
          title: '初一女',
          key: 'g7End',
          render: (h, params) => {
            var vm = this
            return h('div', [
              h('Input', {
                props: {
                  type: 'text',
                  size: 'small',
                  placeholder: '上限值',
                 
                  value:  params.row.g7End/10
                },
                style: {
                  // marginRight: '5px'
                },
                on: {
                  input(value) {
                    vm.highSchoolList[params.index] = params.row
                    params.row.g7End = value*10
                  }
                }
              })
            ])
          }
        },
        {
          title: '初二男',
          key: 'b8Start',
          render: (h, params) => {
            var vm = this
            return h('div', [
              h('Input', {
                props: {
                  type: 'text',
                  size: 'small',
                  placeholder: '下限值',
                  value:  params.row.b8Start/10
                },
                style: {
                  // marginRight: '5px'
                },
                on: {
                  input(value) {
                    vm.highSchoolList[params.index] = params.row
                    params.row.b8Start = value*10
                  }
                }
              })
            ])
          }
        },
        {
          title: '初二男',
          key: 'b8End',
          render: (h, params) => {
            var vm = this
            return h('div', [
              h('Input', {
                props: {
                  type: 'text',
                  size: 'small',
                  placeholder: '上限值',
                 
                  value:  params.row.b8End/10
                },
                style: {
                  // marginRight: '5px'
                },
                on: {
                  input(value) {
                    vm.highSchoolList[params.index] = params.row
                    params.row.b8End = value*10
                  }
                }
              })
            ])
          }
        },
        {
          title: '初二女',
          key: 'g8Start',
          render: (h, params) => {
            var vm = this
            return h('div', [
              h('Input', {
                props: {
                  type: 'text',
                  size: 'small',
                  placeholder: '下限值',
                  
                  value:  params.row.g8Start/10
                },
                style: {
                  // marginRight: '5px'
                },
                on: {
                  input(value) {
                    vm.highSchoolList[params.index] = params.row
                    params.row.g8Start = value*10
                  }
                }
              })
            ])
          }
        },
        {
          title: '初二女',
          key: 'g8End',
          render: (h, params) => {
            var vm = this
            return h('div', [
              h('Input', {
                props: {
                  type: 'text',
                  size: 'small',
                  placeholder: '上限值',
                  
                  value:  params.row.g8End/10
                },
                style: {
                  // marginRight: '5px'
                },
                on: {
                  input(value) {
                    vm.highSchoolList[params.index] = params.row
                    params.row.g8End = value*10
                  }
                }
              })
            ])
          }
        },
        {
          title: '初三男',
          key: 'b9Start',
          render: (h, params) => {
            var vm = this
            return h('div', [
              h('Input', {
                props: {
                  type: 'text',
                  size: 'small',
                  placeholder: '下限值',
                  
                  value:  params.row.b9Start/10
                },
                style: {
                  // marginRight: '5px'
                },
                on: {
                  input(value) {
                    vm.highSchoolList[params.index] = params.row
                    params.row.b9Start = value*10
                  }
                }
              })
            ])
          }
        },
        {
          title: '初三男',
          key: 'b9End',
          render: (h, params) => {
            var vm = this
            return h('div', [
              h('Input', {
                props: {
                  type: 'text',
                  size: 'small',
                  placeholder: '上限值',
                  
                  value:  params.row.b9End/10
                },
                style: {
                  // marginRight: '5px'
                },
                on: {
                  input(value) {
                    vm.highSchoolList[params.index] = params.row
                    params.row.b9End = value*10
                  }
                }
              })
            ])
          }
        },
        {
          title: '初三女',
          key: 'g9Start',
          render: (h, params) => {
            var vm = this
            return h('div', [
              h('Input', {
                props: {
                  type: 'text',
                  size: 'small',
                  placeholder: '下限值',
                 
                  value:  params.row.g9Start/10
                },
                style: {
                  // marginRight: '5px'
                },
                on: {
                  input(value) {
                    vm.highSchoolList[params.index] = params.row
                    params.row.g9Start = value*10
                  }
                }
              })
            ])
          }
        },
        {
          title: '初三女',
          key: 'g9End',
          render: (h, params) => {
            var vm = this
            return h('div', [
              h('Input', {
                props: {
                  type: 'text',
                  size: 'small',
                  placeholder: '上限值',
                 
                  value:  params.row.g9End/10
                },
                style: {
                  // marginRight: '5px'
                },
                on: {
                  input(value) {
                    vm.highSchoolList[params.index] = params.row
                    params.row.g9End = value*10
                  }
                }
              })
            ])
          }
        },
        {
          title: '高一男',
          key: 'b10Start',
          render: (h, params) => {
            var vm = this
            return h('div', [
              h('Input', {
                props: {
                  type: 'text',
                  size: 'small',
                  placeholder: '下限值',
                 
                  value: params.row.b10Start/10
                },
                style: {
                  // marginRight: '5px'
                },
                on: {
                  input(value) {
                    vm.highSchoolList[params.index] = params.row
                    params.row.b10Start = value*10
                  }
                }
              })
            ])
          }
        },
        {
          title: '高一男',
          key: 'b10End',
          render: (h, params) => {
            var vm = this
            return h('div', [
              h('Input', {
                props: {
                  type: 'text',
                  size: 'small',
                  placeholder: '上限值',
                  
                  value: params.row.b10End/10
                },
                style: {
                  // marginRight: '5px'
                },
                on: {
                  input(value) {
                    vm.highSchoolList[params.index] = params.row
                    params.row.b10End = value*10
                  }
                }
              })
            ])
          }
        },
        {
          title: '高一女',
          key: 'g10Start',
          render: (h, params) => {
            var vm = this
            return h('div', [
              h('Input', {
                props: {
                  type: 'text',
                  size: 'small',
                  placeholder: '下限值',
                  
                  value:  params.row.g10Start/10
                },
                style: {
                  // marginRight: '5px'
                },
                on: {
                  input(value) {
                    vm.highSchoolList[params.index] = params.row
                    params.row.g10Start = value*10
                  }
                }
              })
            ])
          }
        },
        {
          title: '高一女',
          key: 'g10End',
          render: (h, params) => {
            var vm = this
            return h('div', [
              h('Input', {
                props: {
                  type: 'text',
                  size: 'small',
                  placeholder: '上限值',
                 
                  value:  params.row.g10End/10
                },
                style: {
                  // marginRight: '5px'
                },
                on: {
                  input(value) {
                    vm.highSchoolList[params.index] = params.row
                    params.row.g10End = value*10
                  }
                }
              })
            ])
          }
        },
        {
          title: '高二男',
          key: 'b11Start',
          render: (h, params) => {
            var vm = this
            return h('div', [
              h('Input', {
                props: {
                  type: 'text',
                  size: 'small',
                  placeholder: '下限值',
                 
                  value:  params.row.b11Start/10
                },
                style: {
                  // marginRight: '5px'
                },
                on: {
                  input(value) {
                    vm.highSchoolList[params.index] = params.row
                    params.row.b11Start = value*10
                  }
                }
              })
            ])
          }
        },
        {
          title: '高二男',
          key: 'b11End',
          render: (h, params) => {
            var vm = this
            return h('div', [
              h('Input', {
                props: {
                  type: 'text',
                  size: 'small',
                  placeholder: '上限值',
                  
                  value:  params.row.b11End/10
                },
                style: {
                  // marginRight: '5px'
                },
                on: {
                  input(value) {
                    vm.highSchoolList[params.index] = params.row
                    params.row.b11End = value*10
                  }
                }
              })
            ])
          }
        },
        {
          title: '高二女',
          key: 'g11Start',
          render: (h, params) => {
            var vm = this
            return h('div', [
              h('Input', {
                props: {
                  type: 'text',
                  size: 'small',
                  placeholder: '下限值',
                 
                  value:  params.row.g11Start/10
                },
                style: {
                  // marginRight: '5px'
                },
                on: {
                  input(value) {
                    vm.highSchoolList[params.index] = params.row
                    params.row.g11Start = value*10
                  }
                }
              })
            ])
          }
        },
        {
          title: '高二女',
          key: 'g11End',
          render: (h, params) => {
            var vm = this
            return h('div', [
              h('Input', {
                props: {
                  type: 'text',
                  size: 'small',
                  placeholder: '上限值',
                 
                  value:  params.row.g11End/10
                },
                style: {
                  // marginRight: '5px'
                },
                on: {
                  input(value) {
                    vm.highSchoolList[params.index] = params.row
                    params.row.g11End = value*10
                  }
                }
              })
            ])
          }
        },
        {
          title: '高三男',
          key: 'b12Start',
          render: (h, params) => {
            var vm = this
            return h('div', [
              h('Input', {
                props: {
                  type: 'text',
                  size: 'small',
                  placeholder: '下限值',
                  
                  value:  params.row.b12Start/10
                },
                style: {
                  // marginRight: '5px'
                },
                on: {
                  input(value) {
                    vm.highSchoolList[params.index] = params.row
                    params.row.b12Start = value*10
                  }
                }
              })
            ])
          }
        },
        {
          title: '高三男',
          key: 'b12End',
          render: (h, params) => {
            var vm = this
            return h('div', [
              h('Input', {
                props: {
                  type: 'text',
                  size: 'small',
                  placeholder: '上限值',
                 
                  value:  params.row.b12End/10
                },
                style: {
                  // marginRight: '5px'
                },
                on: {
                  input(value) {
                    vm.highSchoolList[params.index] = params.row
                    params.row.b12End = value*10
                  }
                }
              })
            ])
          }
        },
        {
          title: '高三女',
          key: 'g12Start',
          render: (h, params) => {
            var vm = this
            return h('div', [
              h('Input', {
                props: {
                  type: 'text',
                  size: 'small',
                  placeholder: '下限值',
                 
                  value:  params.row.g12Start/10
                },
                style: {
                  // marginRight: '5px'
                },
                on: {
                  input(value) {
                    vm.highSchoolList[params.index] = params.row
                    params.row.g12Start = value*10
                  }
                }
              })
            ])
          }
        },
        {
          title: '高三女',
          key: 'g12End',
          render: (h, params) => {
            var vm = this
            return h('div', [
              h('Input', {
                props: {
                  type: 'text',
                  size: 'small',
                  placeholder: '上限值',
                  
                  value:  params.row.g12End/10
                },
                style: {
                  // marginRight: '5px'
                },
                on: {
                  input(value) {
                    vm.highSchoolList[params.index] = params.row
                    params.row.g12End = value*10
                  }
                }
              })
            ])
          }
        }
      ],
      standardInfo: '',
      primaryList: [],
      highSchoolList: []
    }
  },
  watch: {}, //以V-model绑定数据时使用的数据变化监测

  methods: {
    getTestDetailInfoByItemId(itemId) {
      var that = this
      // that.detail.splice(detailId, 1);
      this.$axios
        .get('/v1/schooltest/getTestDetailInfoByItemId?itemId=' + itemId)
        .then(function(response) {
          //   console.log(response)
          that.testDetailInfoList = response.data.response
        })
        .catch(function(response) {
          console.log(response)
        })
    },
    getAllTestStandardInfoByItemId(itemId) {
      var that = this
      // that.detail.splice(detailId, 1);
      this.$axios
        .get('/v1/schooltest/getAllTestStandardInfoByItemId?itemId=' + itemId)
        .then(function(response) {
          console.log(response)
          let data = response.data.response
          that.primaryList = data.primaryList
          that.highSchoolList = data.highSchoolList
          //   that.testList = response.data.response
        })
        .catch(function(response) {
          console.log(response)
        })
    },
    baseSubmit() {
      var that = this

    //   let data = {
    //     that.
    //   }
      //   if (g12 != 100) {
      //     that.$Message.info('女孩17岁总比例未达到或已超出百分百')
      //     return false
      //   }
    //   console.log(data)
    console.log(that.highSchoolList)

      this.$axios
        .post(
          '/v1/schooltest/upsertTestStandard',
          that.primaryList.concat(that.highSchoolList)
        )
        .then(function(response) {
          console.log(response)
          if (response.data.code == 10000) {
            that.$Message.info('保存成功')
          } else {
            that.$Message.info('保存失败')
          }

          // that.testDetailInfo = response.data.response
        })
        .catch(function(response) {
          console.log(response)
        })
    }
  },
  mounted() {
    var vm = this
    let height = (document.body.offsetHeight - 300) / 2

    let itemId = sessionStorage.getItem(
      'schoolTestStandard-schoolTestStandardDetail-itemId'
    )
    vm.itemId = itemId
    if (itemId) {
      vm.getTestDetailInfoByItemId(itemId)
      vm.getAllTestStandardInfoByItemId(itemId)
    }
  },
  destroyed() {
    var vm = this
  }
}
</script>