<template>
   <div>
        <div>
            <h1>用户反馈管理</h1>
        </div> 
        <div style="margin-top:15px;">
            <div>
                <Row :gutter="16" type="flex" align="middle" class="advanced-router">
                    <Col span="2">
                        <Select v-model="type" clearable style="" placeholder="请选择反馈类型">
                        <Option v-for="item in typeList" :value="item.typeId" :key="item.typeId">{{ item.typeName }}</Option>
                        </Select>
                    </Col>
                    <Col span="3">                    
                        <Select v-model="returnReceipt" clearable style="" placeholder="请选择是否需要回访">
                        <Option v-for="item in returnReceiptList" :value="item.returnReceiptId" :key="item.returnReceiptId">{{ item.returnReceiptName }}</Option>
                        </Select>
                    </Col>
                    <Col span="2">                    
                        <Select v-model="userType" clearable style="" placeholder="请选择用户类型">
                        <Option v-for="item in userTypeList" :value="item.userTypeId" :key="item.userTypeId">{{ item.userTypeName }}</Option>
                        </Select>
                    </Col>
                    <Col span="3"> 
                        <Input v-model="title" placeholder="输入反馈标题关键字" style="width: 100%"></Input>
                    </Col>
                    <Col span="2"> 
                        <Button v-on:click="adviseQuery(1)" type="success" style="background-color:#00c693" icon="ios-search">查询</Button>                        
                    </Col>
                </Row>
            </div>
            <br>
            <div>
                <Row>
                    <div style="">
                        <Table border :columns="resultColumns" :data="resultData"></Table>
                    </div>
                    <br>           
                    <div style="float: right;">
                        <Page :total="total" :current="pageNum" :page-size="pageSize" @on-change='pageNumChange' @on-page-size-change='pageSizechange' show-total show-sizer></Page>
                    </div>
                </Row>
            </div> 
        </div>        
    </div>       
</template>

<script>
export default {
        name: 'homeList'
        ,data(){
           return {
                   typeList:[{typeId:1,typeName:'建议'},{typeId:2,typeName:'需求'}],
                       type:'',
           returnReceiptList:[{returnReceiptId:1, returnReceiptName:'是'},{ returnReceiptId:0, returnReceiptName:'否'}],
               returnReceipt:'',
             userTypeList:[{userTypeId:1, userTypeName:'学员'},{ userTypeId:2, userTypeName:'教练'}],
                 userType:'',
                    title:'',
               resultColumns:[
                            {
                            title: '反馈时间',
                            key: 'createTime',
                            align:'center',
                             width: 250
                            },
                            {
                            title: '反馈类型',
                            key: 'type',
                            align:'center',
                            width: 150,
                            render: (h, params) => {
                                const data=params.row;
                                return h('div',[h('span',data.type=='1'?'建议':'需求')]);
                                }
                            },                            
                            {
                            title: '标题',
                            key: 'title',
                            align:'center',
                            minWidth:300
                            },
                            {
                            title: '是否需要回访',
                            key: 'returnReceipt',
                            align:'center',
                            width:150,
                            render: (h, params) => {
                                const data=params.row;
                                return h('div',[h('span',data.returnReceipt=='1'?'是':'否')]);
                                }
                            },
                            {
                            title: '用户昵称',
                            key: 'nickName',
                            align:'center',
                            width:200
                            },
                            {
                            title: '用户类型',
                            key: 'userType',
                            align:'center',
                            width:100,
                            render: (h, params) => {
                                const data=params.row;
                                return h('div',[h('span',data.userType=='1'?'学员':'教练')]);
                                }
                            },
                            {
                            title: '所在城市',
                            key: 'cityName',
                            align:'center',
                            width:150
                            },
                            {
                            title: '阅读状态',
                            key: 'redStatus',
                            align:'center',
                            width:100,
                            render: (h, params) => {
                                 const data=params.row;
                                 let showtext = (data.redStatus=='1'?"已读":"未读");
                                 let showColor= (data.redStatus=='1'?"#19be6b":"red");
                                return h('div',[h('span',{style:{color:showColor}},showtext)]);
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
                                            type: 'success',
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                this.pageToAdviseDetail(params.row.adviseId);
                                            }
                                        }
                                    }, '查看')
                                ]);
                            }
                        },                                       
                    ],
               resultData:[],
                  pageNum:1,
                 pageSize:10,
                    total:0
            }              
        }
        ,methods:{
                adviseQuery(QueryMethod){//查询方法  QueryMethod 查询方式 1:查询按钮；0 翻页
                        
                        if(QueryMethod == 1){ //查询按钮查询页码设置为1
                        this.pageNum = 1  
                        }
                     let queryData={
                                     "title":this.title,
                                     "type":this.type,
                                     "userType": this.userType,                                                                          
                                     "returnReceipt":this.returnReceipt,
                                     "pageNo":this.pageNum,
                                     "pageSize":this.pageSize
                                    }    
                     this.$axios.post("/v1/advise/getAdviseInfoList",queryData).then(res => {
                             if(res.data.code==10000){                   
                             this.resultData=res.data.response.result;
                             this.pageNum=res.data.response.pageNum;
                             this.pageSize=res.data.response.pageSize
                             this.total=res.data.response.total
                             }else{
                              this.$Message.info(res.data.msg);
                             }
                         });
                }
                ,pageNumChange(value){  //页码改变方法处理
                    if(this.pageNum !=value){
                    this.pageNum =value
                    this.adviseQuery(0);
                    }         
                }
                ,pageSizechange(value){  //页面大小改变方法处理
                    if(this.pageSize!=value){
                    this.pageSize=value
                    this.adviseQuery(1);
                    }
                }
                ,pageToAdviseDetail(adviseId){   //页面迁移

                      let queryData={
                            "title": this.title,
                            "type":this.type,
                            "userType": this.userType,                                                                          
                            "returnReceipt":this.returnReceipt,
                            "pageNum":this.pageNum,
                            "pageSize":this.pageSize
                            }
               //缓存查询条件                
                sessionStorage.setItem('adviseList-queryData',JSON.stringify(queryData)); 

                    sessionStorage.setItem('adviseList-adviseDetail-adviseId',adviseId);
                    this.$router.push({name: 'adviseDetail'});
                }
        }
        ,watch: {

        }
        ,created() {
          
        }
        ,mounted() {
              if(sessionStorage.getItem('adviseList-queryData')!=undefined
              && sessionStorage.getItem('isAdviseDetailBack')!=undefined){  
               //页面返回时 根据缓存的查询条件查询             
               let queryData=JSON.parse(sessionStorage.getItem('adviseList-queryData'));             
                  this.title=queryData.title;                 
                  this.type=queryData.type; 
                  this.userType=queryData.userType,
                  this.returnReceipt=queryData.returnReceipt;                
                  this.pageNum=queryData.pageNum;
                  this.pageSize=queryData.pageSize;
                 
                 this.adviseQuery(0);
            }else{
                this.adviseQuery(1);
            }
             sessionStorage.removeItem('adviseList-queryData');
             sessionStorage.removeItem('isAdviseDetailBack');
        }
};
</script>