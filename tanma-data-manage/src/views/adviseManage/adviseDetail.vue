<template>
<div>
    <div style="margin-left:15px;">
        <Tabs>
             <TabPane name="adviseInfo" label="用户反馈详情">
              <Card>
                  <Form ref="advisedata" :model="advisedata" :label-width="120">
                        <FormItem label="反馈类型：">
                          <Row> 
                             <Col span="20" offset="1"> 
                              {{advisedata.type=='1'?'建议':'需求'}}
                             </Col>
                          </Row> 
                        </FormItem>
                       <FormItem label="反馈时间：">
                          <Row> 
                             <Col span="20" offset="1"> 
                              {{advisedata.createTime}}
                             </Col>
                          </Row> 
                        </FormItem> 
                         <FormItem label="反馈用户信息：">
                          <Row> 
                             <Col span="20" offset="1"> 
                              {{advisedata.userType=='1'?'学员':'教练'}}-{{advisedata.nickName}}（{{advisedata.cityName}}）
                             </Col>
                          </Row> 
                        </FormItem> 
                        <FormItem label="反馈标题：">
                          <Row> 
                             <Col span="20" offset="1"> 
                              {{advisedata.title}}
                             </Col>
                          </Row> 
                        </FormItem> 
                        <FormItem label="反馈详情：">
                          <Row> 
                             <Col span="20" offset="1"> 
                              {{advisedata.content}}
                             </Col>
                          </Row> 
                        </FormItem> 
                        <FormItem label="是否需要回访：">
                          <Row> 
                             <Col span="20" offset="1"> 
                              {{advisedata.returnReceipt=='1'?'是':'否'}}
                             </Col>
                          </Row> 
                        </FormItem>
                        <FormItem label="回访电话：" v-if="advisedata.returnReceipt=='1'">
                          <Row> 
                             <Col span="20" offset="1"> 
                              {{advisedata.receiptCall}}
                             </Col>
                          </Row> 
                        </FormItem>
                        <FormItem label="回访记录：" v-if="advisedata.returnReceipt=='1'">
                          <Row> 
                             <Col span="20" offset="1"> 
                              <Input v-model="advisedata.receiptContent" placeholder="请输入回访记录，不超过800字！" type="textarea" :autosize="{minRows: 6,maxRows: 16}" :maxlength="800" />                             
                             </Col>
                          </Row> 
                        </FormItem>                                                                                                                                               
                </Form>
             </Card>
             <div style="margin-top:10px;padding-left:40%">
                <Button @click="pageToHomeList" style="float:left; margin-right:50px;width:100px" type="success">返回</Button>
                <div style="width:20px;" ></div>
                <Button v-if="advisedata.returnReceipt=='1'" style="float:left;width:100px" @click="updateAdvise"  type="success">提交结果</Button>
             </div>
         </TabPane>
     </Tabs>
</div>
</div>
</template>

<script>
export default {
    name: 'adviseDetail'
    ,data(){
        return {
                  advisedata:{
                              type:'',
                        createTime:'',
                             title:'',
                           content:'',
                     returnReceipt:'',
                          nickName:'',
                          userType:'',
                          cityName:'',
                    receiptContent:'',
                       receiptCall:''
                            },
          
        }
    }
    ,methods:{
            getAdviseData(){

               this.$axios.get("/v1/advise/getAdviseDetail?adviseId="+sessionStorage.getItem('adviseList-adviseDetail-adviseId')).then(res => {
                        if(res.data.code==10000){
                            this.advisedata=res.data.response;
                        }else{
                            this.$Message.info(res.data.msg);
                        }                          
                   });  

            }
            ,pageToHomeList(){ //返回

               sessionStorage.setItem('isAdviseDetailBack',"true");
                this.$router.go(-1);  
            } 
            ,updateAdvise(){//保存处理                
               
                //保存
                let data="?adviseId="+sessionStorage.getItem('adviseList-adviseDetail-adviseId')+"&receiptContent="+this.advisedata.receiptContent;
               this.$axios.get("/v1/advise/updateAdvise"+data).then(res => { 
                        if(res.data.code==10000){ 
                               this.$Message.info("提交成功！");                                     
                        }else{
                              this.$Message.info(res.data.msg);
                        }
                });
         
            }

                     
    }    
    ,mounted(){
     this.getAdviseData();
    }
    ,watch: {

    }   
};
</script>