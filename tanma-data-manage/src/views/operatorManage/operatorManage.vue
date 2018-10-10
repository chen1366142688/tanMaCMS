<style lang="less">
.baseInfoitem {
    .ivu-input-wrapper {
        width: 10%;
    }
}
.functionItem {
    .ivu-input-wrapper {
        width: 6%;
    }
    .ivu-form-item-label {
        text-align: left !important;
    }
}
.address {
    .ivu-col-span-8 {
        width: 15%
    }
}
.add-button{

}
</style>
<template>
    <div style="margin-left:15px;">
        <Tabs type="card"  @on-click="queryList" >
            <TabPane name="operator" label="管理人员权限">
                <Card>
                    <div style="float: right;margin-right:55px;">
                          <Button class="add-button" v-on:click="pageToOperatorDetail('')" type="success" icon="plus" style="background-color:#00c693"  >添加人员</Button>
                     </div>
                    <br />
                    <br />
                    <div style="">
                        <Table border :columns="resultOperatorColumns" row :data="resultOperatorData"></Table>
                    </div>
                    <br>           
                </Card>
            </TabPane>
            <TabPane name="group" label="权限组设置">
                <Card>
                    <div style="float: right;margin-right:55px;">
                        <Button class="add-button" v-on:click="pageToGroupDetail('')" type="success" icon="plus" style="background-color:#00c693" >添加权限组</Button>
                     </div>
                    <br />
                    <br />
                    <div>
                        <Table border :columns="resultGroupColumns" :data="resultGroupData"></Table>
                    </div>
                    <br>           
                </Card>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
import tinymce from 'tinymce';
import Vue from 'vue';
import iviewArea from 'iview-area';
Vue.use(iviewArea);

export default {
    data() {

        return {
            resultOperatorColumns:[
                {
                    title: '登录账号',
                    key: 'operationCode',
                    align:'center'
                },
                {
                    title: '姓名',
                    key: 'name',
                    align:'center'
                },
                {
                    title: '权限组',
                    key: 'groupName',
                    align:'center'
                },
                {
                    title: '账户生效状态',
                    key: 'validStatus',
                    align:'center',
                    render: (h, params) => {
                        const param = params.row;
                        return h('i-switch',
                                {
                                    props: {
                                    type: 'primary',
                                    value:param.validStatus === '1'
                                    }
                                    ,slots:{
                                        open:'有效',
                                        close:'无效'
                                    }
                                    ,on: {
                                        'on-change': (status) => {
                                            if(status){
                                                param.validStatus= '1'                                                      
                                            }else{
                                                param.validStatus= '0'  
                                            }  
                                            this.changeOperatorStatus(param);
                                        }  
                                    }
                                }
                                ,[
                                    h('span',{props: {slot: 'open'}},'有效'),
                                    h('span',{props: {slot: 'close'}},'无效')
                                ]
                            );
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    align:'center',
                    width: 200,
                    render: (h, params) => {
                    return h('div', [
                        h('Button', {
                            props: {
                                type: 'success'
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                    this.pageToOperatorDetail(params.row.operationId);
                                }
                            }
                        }, '编辑'),
                        h('Button', {
                            props: {
                                type: 'success'
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                    this.deleteOperator(params.row.operationId);
                                }
                            }
                        }, '删除')
                    ]);
                    }
                },                                       
            ],
            resultOperatorData:[],
            resultGroupColumns:[
                {
                    title: '权限组名称',
                    key: 'groupName',
                    align:'center'
                },
                {
                    title: '拥有权限数量',
                    key: 'menuCount',
                    align:'center'
                },
                {
                    title: '权限组启用状态',
                    key: 'validStatus',
                    align:'center',
                    render: (h, params) => {
                        const param = params.row;
                        return h('i-switch',
                                {
                                    props: {
                                    type: 'primary',
                                    value:param.validStatus === '1'
                                }
                                ,slots:{
                                    open:'有效',
                                    close:'失效'
                                }
                                ,on: {  
                                    'on-change': (status) => {
                                            if(status){
                                                param.validStatus= '1'                                                      
                                            }else{
                                                param.validStatus= '0'  
                                            }  
                                                this.changeGroupStatus(param);
                                            }  
                                    }
                                }
                                ,[
                                h('span',{props: {slot: 'open'}},'有效'),
                                h('span',{props: {slot: 'close'}},'失效')
                                ]
                            );
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    align:'center',
                    width: 200,
                    render: (h, params) => {
                    return h('div', [
                        h('Button', {
                            props: {
                                type: 'success'
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                    this.pageToGroupDetail(params.row.groupId);
                                }
                            }
                        }, '编辑'),
                        h('Button', {
                            props: {
                                type: 'success'
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                    this.deleteGroup(params.row.groupId);
                                }
                            }
                        }, '删除')
                    ]);
                    }
                },                                        
            ],
            resultGroupData:[]
        }
    },
    created: function() {

    },
    methods: {
      addOperation(){

      },
      queryList(name){
          if(name=='operator'){
                this.$axios.get("/v1/operation/query/queryOperationList").then(res => {
                this.resultOperatorData=[];
                if(res.data.code==10000){
                    var info = res.data.response;
                    for(let i=0;i<info.length;i++){
                        this.resultOperatorData.push(info[i]);
                    }
                }
            });
          }else{
            this.$axios.get("/v1/operation/query/queryGroupList").then(res => {
                this.resultGroupData=[];
                if(res.data.code==10000){
                    var info = res.data.response;
                    for(let i=0;i<info.length;i++){
                        this.resultGroupData.push(info[i]);
                    }
                }
            });
          }
      },
      changeOperatorStatus(info){
        let data={
            operationId:info.operationId,
            validStatus:info.validStatus,
            groupId:info.groupId
         }
         this.changeOperator(data);
      },
      changeGroupStatus(info){
          let data='groupId='+info.groupId+'&validStatus='+info.validStatus;
          this.changeGroup(data);
      },
      pageToOperatorDetail(operationId){
           sessionStorage.setItem('operatorManage-operatorDetail-operationId', operationId);
           this.$router.push({name: 'operatorDetail'});
      },
      deleteOperator(operationId){
         let info={
            operationId:operationId,
            status:'0'
         }
         this.changeOperator(info);
      },
      changeOperator(operation){
        let this_ = this;
        this.$axios.post('/v1/operation/addOrUpdateOperationDO',operation)
        .then(function(res){
            if(res.data.code==10000){
                this_.queryList('operator');
            }else{
                this_.$Message.info(res.data.msg);
            }
        })
        .catch(function(error){
            console.log(error);
        });
      },
      pageToGroupDetail(groupId){
          sessionStorage.setItem('operatorManage-groupDetail-groupId', groupId);
          this.$router.push({name: 'groupDetail'});
      },
      deleteGroup(groupId){
          let data='groupId='+groupId+'&status=0';
          this.changeGroup(data);
      },
      changeGroup(data){
          let this_ = this;
            this.$axios.get('/v1/operation/updateGroupStatus?'+data)
            .then(function(res){
                if(res.data.code==10000){
                   this_.$Message.success('操作成功！');
                   this_.queryList('group');
                }else{
                    this_.$Message.info(res.data.msg);
                }
            })
            .catch(function(error){
                console.log(error);
            });
      }
    },
    mounted() {
        this.queryList('operator');
    },
    destroyed() {
    }
}

</script>
