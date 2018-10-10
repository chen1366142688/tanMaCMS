<template>
   <div>
        <div>
            <h1>评论管理</h1>
        </div> 
        <div style="margin-top:15px;">
            <div>
                <Row :gutter="16" type="flex" align="middle" class="advanced-router">
                    <Col span="2">
                        <Select v-model="sexId" placeholder="适合性别" clearable>
                        <Option v-for="item in sexList" :value="item.itemCode" :key="item.itemCode">{{ item.itemName }}</Option>
                        </Select>
                    </Col>
                    <Col span="2">
                        <Select v-model="orientationId" placeholder="类型" clearable>
                        <Option v-for="item in orientationList" :value="item.itemCode" :key="item.itemCode">{{ item.itemName }}</Option>
                        </Select>
                    </Col>
                     <Col span="2">
                        <Select v-model="levelId" placeholder="等级" clearable>
                        <Option v-for="item in levelList" :value="item.itemCode" :key="item.itemCode">{{ item.itemName }}</Option>
                        </Select>
                    </Col> 
                     <Col span="2">
                        <Select v-model="openStatus" placeholder="启用状态" clearable>
                        <Option v-for="item in openStatusList" :value="item.itemCode" :key="item.itemCode">{{ item.itemName }}</Option>
                        </Select>
                    </Col>                                                                                  
                   <Col span="4">                    
                        <Select v-model="ageStart" clearable style="width:40%" placeholder="年龄开始">
                        <Option v-for="item in ageList" :value="item" :key="item">{{ item }}</Option>
                        </Select>
                        至
                        <Select v-model="ageEnd" clearable style="width:40%" placeholder="年龄结束">
                        <Option v-for="item in ageList" :value="item" :key="item">{{ item }}</Option>
                        </Select>
                    </Col>
                    <Col span="4"> 
                        <Input v-model="planName" placeholder="输入计划名称关键字" style="width: 100%"></Input>
                    </Col>
                    <Col span="2"> 
                        <Button v-on:click="classQuery(1)" type="success" style="background-color:#00c693" icon="ios-search">查询</Button>                        
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
        name: 'exerciseCommentList'
        ,data(){
           return {
                    sexList:[
                                {
                                    itemCode:'1',
                                    itemName:'男'
                                },                  
                                {
                                    itemCode:'2',
                                    itemName:'女'
                                },
                             ],
                       sexId:'',
              openStatusList:[
                                {
                                    itemCode:'1',
                                    itemName:'启用中'
                                },                  
                                {
                                    itemCode:'0',
                                    itemName:'已关闭'
                                },
                             ],                       
                  openStatus:'',
                      ageList:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],                     
             orientationList:[],
               orientationId:'',
                  levelList:[],
                    levelId:'',
                   planName:'',
                    ageStart:'',
                      ageEnd:'',                  
               resultColumns:[
                            {
                            title: '计划名称',
                            key: 'planName',
                            align:'center',
                            minWidth:250
                            },
                            {
                            title: '类型',
                            key: 'itemOrientationName',
                            align:'center',
                            width: 150
                            },
                            {
                            title: '难度',
                            key: 'itemLevelName',
                            align:'center',
                            width: 150
                            },                             
                            {
                            title: '年龄段（岁）',
                            key: 'ageScope',
                            align:'center',
                            minWidth: 200,
                            maxWidth: 500
                            },                            
                            {
                            title: '适合性别',
                            key: 'sex',
                            align:'center',
                            width:150,
                            render: (h, params) => {
                                   return h('div',[h('span',params.row.sex=='1'?'男':'女')]);
                                  }
                            },
                            {
                            title: '展示评论（条）',
                            key: 'showCount',
                            align:'center',
                            width: 150
                            }, 
                            {
                            title: '总评论（条）',
                            key: 'totalCount',
                            align:'center',
                            width: 150
                            },                                                        
                            {
                            title: '是否启用',
                            key: 'openStatus',
                            align:'center',
                            width: 150,
                           render: (h, params) => {
                                   return h('div',[h('span',params.row.openStatus=='1'?'启用中':'已关闭')]);
                                  }
                            },
                            {
                            title: '操作',
                            key: 'action',
                            align:'center',
                            width: 300,
                            render: (h, params) => {
                                if(params.row.totalCount<=0){
                                   return h('div');
                                }
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
                                                this.pageToExerciseCommentDetail(params.row);
                                            }
                                        }
                                    }, '查看'),
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
                getOrientationList(){ //获取类别信息        
                    this.$axios.get("/v1/exercisePlan/getExerciseConfigByItemType?itemType=plan_orientation").then(res => {
                        this.orientationList=res.data.response;
                        });
                },
                getLevelList(){ //获取类别信息        
                    this.$axios.get("/v1/exercisePlan/getExerciseConfigByItemType?itemType=plan_level").then(res => {
                        this.levelList=res.data.response;
                        });
                },
                classQuery(QueryMethod){//查询方法  QueryMethod 查询方式 1:查询按钮；0 翻页
                        
                        if(QueryMethod == 1){ //查询按钮查询页码设置为1
                        this.pageNum = 1  
                        }
                     let queryData={
                                     "planName": this.planName,
                                     "sex":this.sexId,
                                     "itemLevelCode": this.levelId, 
                                     "itemOrientationCode": this.orientationId,                                                                                                              
                                     "openStatus":this.openStatus,
                                     "ageStart":this.ageStart,
                                     "ageEnd":this.ageEnd,                                     
                                     "pageNo":this.pageNum,
                                     "pageSize":this.pageSize
                                    }    
                     this.$axios.post("/v1/exercisePlan/getExercisePlanListForComment",queryData).then(res => {
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
                    this.classQuery(0);
                    }         
                }
                ,pageSizechange(value){  //页面大小改变方法处理
                    if(this.pageSize!=value){
                    this.pageSize=value
                    this.classQuery(1);
                    }
                }              
                ,pageToExerciseCommentDetail(plan){   //计划评论详情
                      let queryData={
                                     "planName": this.planName,
                                     "sex":this.sexId,
                                     "itemLevelCode": this.levelId, 
                                     "itemOrientationCode": this.orientationId,                                                                                                              
                                     "openStatus":this.openStatus,
                                     "ageStart":this.ageStart,
                                     "ageEnd":this.ageEnd,                                     
                                     "pageNo":this.pageNum,
                                     "pageSize":this.pageSize
                            }
               //缓存查询条件                
                sessionStorage.setItem('exerciseCommentList-queryData',JSON.stringify(queryData)); 
                let sexName=(plan.sex==1?'男':'女');
                let planInfo=plan.planName+" | "+plan.itemOrientationName+" | "+plan.itemLevelName+" | "+sexName+" | "+plan.ageScope+"岁"; 
                sessionStorage.setItem('exerciseCommentList-exerciseCommentDetail-planId',plan.planId);
                sessionStorage.setItem('exerciseCommentList-exerciseCommentDetail-planInfo',planInfo);
                this.$router.push({name: 'exerciseCommentDetail'});
                }

        }
        ,watch: {
        //   provinceId:'getCityList',
        }
        ,created() {
              this.getOrientationList();
              this.getLevelList();
        }
        ,mounted() {
            if(sessionStorage.getItem('exerciseCommentList-queryData')!=undefined
            && sessionStorage.getItem('isExerciseCommentDetailBack')!=undefined){  
               //页面返回时 根据缓存的查询条件查询             
               let queryData=JSON.parse(sessionStorage.getItem('exerciseCommentList-queryData'));             
                  this.planName=queryData.planName;
                  this.sexId=queryData.sex;
                  this.levelId=queryData.itemLevelCode; 
                  this.orientationId=queryData.itemOrientationCode;
                  this.openStatus=queryData.openStatus;
                  this.ageStart=queryData.ageStart;
                  this.ageEnd=queryData.ageEnd;           
                  this.pageNum=queryData.pageNo;
                  this.pageSize=queryData.pageSize;                
                  this.classQuery(0);
            }else{
                this.classQuery(1);
            }
             sessionStorage.removeItem('exerciseCommentList-queryData');
             sessionStorage.removeItem('isExerciseCommentDetailBack');
        }
};
</script>