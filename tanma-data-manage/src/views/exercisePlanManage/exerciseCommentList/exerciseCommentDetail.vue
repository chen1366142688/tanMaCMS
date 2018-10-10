<template>
<div>
    <div style="margin-left:15px;">
        <Tabs>
             <TabPane name="schoolInfo" label="评论详情" style="height:100%">
              <Card>
                    <div style="margin-top:10px;">
                        <Row :gutter="16" type="flex" align="middle" class="advanced-router">
                            <Col span="2">
                              <h4>训练计划信息：</h4>                
                            </Col>
                            <Col span="20">
                              <Label>{{planInfo}}</Label>                
                            </Col>                
                        </Row>           
                    </div> 
                    <div style="margin-top:30px;">
                        <div>
                            <Row :gutter="16" type="flex" align="middle" class="advanced-router">
                                <Col span="2">
                                    <Select v-model="isShow" placeholder="是否展示" clearable>
                                    <Option v-for="item in showList" :value="item.itemCode" :key="item.itemCode">{{ item.itemName }}</Option>
                                    </Select>
                                </Col>                                                                                  
                                <Col span="3">                    
                                <DatePicker type="date" v-model="dateStart" placeholder="请选择日期开始" style="width: 180px"></DatePicker> 
                                </Col>
                                <Label>至</Label>                                 
                                <Col span="3">                    
                                 <DatePicker type="date" v-model="dateEnd" placeholder="请选择日期结束" style="width: 180px"></DatePicker>    
                                </Col>                                
                                <Col span="4"> 
                                    <Input v-model="name" placeholder="输入昵称/手机号" style="width: 100%"></Input>
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
                                <div style="float: right;margin-bottom:100px;">
                                    <Page :total="total" :current="pageNum" :page-size="pageSize" @on-change='pageNumChange' @on-page-size-change='pageSizechange' show-total show-sizer></Page>
                                </div>
                            </Row>
                        </div> 
                    </div>      
             </Card>
             <div style="margin-top:10px;padding-left:45%">
                <Button @click="pageToExerciseCommentList" style="float:left; margin-right:50px;width:100px" type="success">返回</Button>
             </div>          
         </TabPane>
     </Tabs>
  </div>
</div>     
</template>
<script>
export default {
        name: 'exerciseCommentDetail'
        ,data(){
           return {
                    showList:[  
                                {
                                    itemCode:'1',
                                    itemName:'展示'
                                },                  
                                {
                                    itemCode:'0',
                                    itemName:'不展示'
                                },
                             ],
                      isShow:'',
                        name:'',
                   dateStart:'',
                     dateEnd:'',
                    planInfo:'',
                      planId:'',
               resultColumns:[
                            {
                            title: '用户昵称',
                            key: 'nickName',
                            align:'center',
                            width:150
                            },
                            {
                            title: '手机号',
                            key: 'phoneNum',
                            align:'center',
                            width:150
                            },
                            {
                            title: '所属区域',
                            key: 'belongArea',
                            align:'center',
                            width: 150
                            },
                            {
                            title: '内容',
                            key: 'commentDetail',
                            align:'center',
                            minWidth: 300,
                            maxWidth: 600
                            },                                                                                    
                            {
                            title: '评论时间',
                            key: 'createTime',
                            align:'center',
                            width: 150
                            },                             
                            {
                            title: '展示状态',
                            key: 'isShow',
                            align:'center',
                            width:150,
                            render: (h, params) => {
                                    const param = params.row;
                                    return h('i-switch',
                                        {
                                            props: {
                                                type: 'primary',
                                               value:param.isShow === '1'
                                            }
                                            ,on: {  
                                            'on-change': (status) => {
                                                            if(status){
                                                            param.isShow= '1'                                                      
                                                            }else{
                                                            param.isShow= '0'  
                                                            }  
                                                        this.changeCommentIsShowStatus(param);
                                                        }  
                                                }
                                            }                                        
                                        );
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
                classQuery(QueryMethod){//查询方法  QueryMethod 查询方式 1:查询按钮；0 翻页
                        if(QueryMethod == 1){ //查询按钮查询页码设置为1
                        this.pageNum = 1  
                        }
                        let start="";
                        let end="";
                        if(this.dateStart!=''){
                         start=this.dateStart.getFullYear()+"-"+(this.dateStart.getMonth()+1)+"-"+this.dateStart.getDate();
                        }
                        if(this.dateEnd!=''){
                         end=this.dateEnd.getFullYear()+"-"+(this.dateEnd.getMonth()+1)+"-"+this.dateEnd.getDate();
                        }
                     let queryData={
                                     "planId":this.planId,
                                     "name": this.name,                                                                                                           
                                     "isShow":this.isShow,
                                     "dateStart":start,
                                     "dateEnd":end,                                     
                                     "pageNo":this.pageNum,
                                     "pageSize":this.pageSize
                                    }    
                     this.$axios.post("/v1/exercisePlan/getExerciseCommentList",queryData).then(res => {
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
                ,changeCommentIsShowStatus(param){ //更新评论展示状态                    
                    this.$axios.get("/v1/exercisePlan/updateCommentIsShowStatus?commentId="+param.commentId+"&isShow="+param.isShow).then(res => {
                            if(res.data.code==10000){                   
                            this.$Message.info('更新成功！');
                            }else{
                            this.$Message.info('更新失败！');
                            this.classQuery(0);
                            }
                        });
                }               
                ,pageToExerciseCommentList(){ //返回
                sessionStorage.setItem('isExercisePlanDetailBack',"true");
                this.$router.go(-1);  
            } 

        }
        ,watch: {
 
        }
        ,created() {
 
        }
        ,mounted() {
         this.planId=sessionStorage.getItem('exerciseCommentList-exerciseCommentDetail-planId');
         this.planInfo=sessionStorage.getItem('exerciseCommentList-exerciseCommentDetail-planInfo');
         this.classQuery(0);
        }
};
</script>