<style>
    
</style>

<template>
<div>
    <div style="margin-left:15px;">
        <Tabs>
             <TabPane name="schoolInfo" :label="pageTitle" style="height:100%">
              <Card>
                  <Form ref="schoolData" :model="schoolData" :label-width="120">
                        <FormItem label="学校类型">
                          <Row> 
                             <Col span="4"> 
                                <RadioGroup v-model="schoolData.schoolType">
                                    <Radio label="1">幼儿园</Radio>
                                    <Radio label="2">小学</Radio>
                                    <Radio label="3">初中</Radio>
                                    <Radio label="4">高中</Radio>
                                </RadioGroup>
                             </Col>
                          </Row> 
                        </FormItem>
                        <FormItem label="体测样本学校">
                          <Row> 
                             <Col span="4"> 
                                <RadioGroup v-model="schoolData.experimentType">
                                    <Radio  label="1">是</Radio>
                                    <Radio  label="0">否</Radio>
                                </RadioGroup>
                             </Col>                            
                          </Row> 
                        </FormItem>
                        <FormItem label="学校名称">
                          <Row> 
                             <Col span="4"> 
                             <Input v-model="schoolData.name" :maxlength="255" />
                             </Col>  
                          </Row> 
                        </FormItem>
                        <FormItem label="学校代码">
                          <Row> 
                             <Col span="4"> 
                             <Input v-model="schoolData.schoolCode" :maxlength="255" />
                             </Col>
                             <Col span="2" offset="1" style="text-align: right;"> 
                              <Label>学校邮编</Label>
                             </Col>   
                             <Col span="4" style="margin-left: 12px;"> 
                             <Input v-model="schoolData.postalCode" :maxlength="255" />
                             </Col>   
                          </Row> 
                        </FormItem>                                                 
                        <FormItem label="学校地址">
                          <Row>
                            <Col> 
                            <Select v-model="addrProvinceId" style="width:150px">
                                <Option v-for="item in provinceList" :value="item.provinceId" :key="item.provinceId">{{ item.provinceName }}</Option>
                            </Select>
                            <Select v-model="addrCityId" style="width:150px">
                                <Option v-for="item in cityList" :value="item.cityId" :key="item.cityId">{{ item.cityName }}</Option>
                            </Select>
                            <Select v-model="addrCountryId" style="width:150px">
                                <Option v-for="item in countyList" :value="item.countyId" :key="item.countyId">{{ item.countyName }}</Option>
                            </Select>
                            <Input v-model="schoolData.addrDetail" placeholder="请输入详细地址"  style="width:400px" :maxlength="255" /> 
                            </Col>
                          </Row>                            
                        </FormItem>
                    <!--    <FormItem label="学校定位" style="margin-bottom:150px">
                          <Row> 
                             <Col span="8"> 
                             <Input v-model="schoolData.longitude"  placeholder="经度" style="width:150px" :maxlength="20" />
                             <Input v-model="schoolData.latitude" placeholder="纬度" style="width:150px" :maxlength="20"/> 
                             <Button style="margin-left:5px;" type="success">选择位置</Button>
                             </Col>
                          </Row> 
                        </FormItem>-->
                        <FormItem label="学校校长">
                          <Row> 
                             <Col span="4"> 
                              <Input v-model="schoolData.principal"  :maxlength="20" />
                             </Col>
                             <Col span="2" offset="1" style="text-align: right;"> 
                              <Label>分管副校长</Label>
                             </Col>   
                             <Col span="4" style="margin-left: 12px;"> 
                              <Input v-model="schoolData.vicePrincipal" :maxlength="255" />
                             </Col>                               
                          </Row> 
                        </FormItem> 
                        <FormItem label="数据部门">
                          <Row> 
                             <Col span="4"> 
                              <Input v-model="schoolData.dataDepartment" :maxlength="20" />
                             </Col>
                             <Col span="2" offset="1" style="text-align: right;"> 
                              <Label>部门负责人</Label>
                             </Col>   
                             <Col span="4" style="margin-left: 12px;"> 
                              <Input v-model="schoolData.dataCharge" :maxlength="255" />
                             </Col>                               
                          </Row> 
                        </FormItem> 
                        <FormItem label="联系电话">
                          <Row> 
                             <Col span="4"> 
                              <Input v-model="schoolData.phone"  :maxlength="20" />
                             </Col>
                             <Col span="2" offset="1" style="text-align: right;"> 
                              <Label>联系邮箱</Label>
                             </Col>   
                             <Col span="4" style="margin-left: 12px;"> 
                              <Input v-model="schoolData.mail" :maxlength="255" />
                             </Col>                               
                          </Row> 
                        </FormItem> 
                        <FormItem label="管理员账号" v-if="schoolData.schoolId!=''">
                          <Row> 
                             <Col span="4"> 
                              <Label style="width: 150px;">管理员账号{{schoolData.phone}}</Label>  
                              <Button style="margin-left:5px;" type="success">修改</Button>
                             </Col>

                             <Col span="2" offset="1" style="text-align: right;"> 
                              <Label>教师账号数量</Label>
                             </Col>   
                             <Col span="6" style="margin-left: 12px;"> 
                              <Label style="width: 150px;" v-if="schoolData.teacherNumber>0">教师账号数量{{schoolData.teacherNumber}}</Label>                             
                              <Button style="margin-left:5px;" v-if="schoolData.teacherNumber>0" type="success">管理账号</Button>
                              <Button style="margin-left:5px;" v-if="schoolData.teacherNumber==null" type="success">添加账号</Button>
                             </Col>                               
                          </Row> 
                        </FormItem>                                                                                                                      
                </Form>
             </Card>
             <div style="margin-top:10px;padding-left:40%">
                <Button @click="pageToSchoolList" style="float:left; margin-right:50px;width:100px" type="success">返回</Button>
                <div style="width:20px;" ></div>
                <Button  style="float:left;width:100px" @click="saveOrUpdateSchool"  type="success">提交结果</Button>
             </div>          
         </TabPane>
     </Tabs>
</div>
</div>
</template>

<script>
export default {
    name: 'schoolDetail'
    ,data(){
        return {
                   pageTitle:"学校新增",               
                  schoolData:{
                             schoolId:'',
                       experimentType:'',                      
                           schoolType:'',
                                 name:'',                                
                           schoolCode:'',
                           postalCode:'',
                            principal:'',
                        vicePrincipal:'',
                       dataDepartment:'',
                           dataCharge:'',
                                phone:'',
                                 mail:''
                            },
              provinceList:[],
                  cityList:[],
                countyList:[],
            addrProvinceId:'',
                addrCityId:'',
             addrCountryId:'',
                          
        }
    }
    ,methods:{
            getSchoolData(schoolId){//编辑时获取场馆数据
               this.pageTitle="学校编辑";
               this.$axios.get("/v1/school/getSchoolDetail?schoolId="+schoolId).then(res => {
                        if(res.data.code==10000){
                            let data=res.data.response;
                            this.schoolData=data; 
                            this.addrProvinceId=data.addrProvinceId;
                            this.addrCityId=data.addrCityId;
                            this.addrCountryId= data.addrCountryId;      
                        }else{
                            this.$Message.info(res.data.msg);
                        }                          
                   });
            }
            ,getProvinceList(){ //获取省信息        
                this.$axios.get("/v1/region/get/allProvinceInfo").then(res => {
                    this.provinceList=res.data.response;
                 });
            }
            ,getCityList(newVal,oldVal){ //根据省iD获取市信息
                if(newVal !=oldVal){
                    if(newVal==''){
                        this.cityList=[];
                    }else{
                        this.$axios.get("/v1/region/get/allCityInfoByProvinceId?provinceId="+newVal).then(res => {
                          this.cityList=res.data.response;
                        });
                    }               
                }
            } 
            ,getCountyList(newVal,oldVal){ //根据市iD获取区/县信息
                if(newVal !=oldVal){
                    if(newVal==''){
                        this.countyList=[];
                    }else{
                       this.$axios.get("/v1/region/get/allCountyInfoByCityId?cityId="+newVal).then(res => {
                          this.countyList=res.data.response;
                       });
                    }               
                }
            }
            ,pageToSchoolList(){ //返回
                sessionStorage.setItem('isSchoolDetailBack',"true");
                this.$router.go(-1);  
            } 
            ,saveOrUpdateSchool(){//保存处理                
                  var paramData=this.schoolData;
                  if(paramData.experimentType==''){
                      this.$Message.error("请选择试点学校！");
                      return false;
                  } 
                  if(paramData.schoolType==''){
                      this.$Message.error("请选择学校类型！");
                      return false;
                  } 
                  if(paramData.name==''){
                      this.$Message.error("学校名称不能为空！");
                      return false;
                  } 
                //   if(paramData.described==''){
                //       this.$Message.error("学校简介不能为空！");
                //       return false;
                //   }                 
                  if(this.addrProvinceId==''){
                      this.$Message.error("学校所属省不能为空！");
                      return false;
                  }
                  if(this.addrCityId==''){
                      this.$Message.error("学校所属市不能为空！");
                      return false;
                  }                  
                  if(this.addrCountryId==''){
                      this.$Message.error("学校所属区不能为空！");
                      return false;
                  }
                  if(paramData.addrDetail==''){
                      this.$Message.error("学校详细地址不能为空！");
                      return false;
                  }
                //   if(paramData.longitude==''){
                //       this.$Message.error("学校定位经度不能为空！");
                //       return false;
                //   }
                //   if(paramData.latitude==''){
                //       this.$Message.error("学校定位纬度不能为空！");
                //       return false;
                //   }
                  paramData.addrProvinceId=this.addrProvinceId;
                  paramData.addrCityId=this.addrCityId;
                  paramData.addrCountryId=this.addrCountryId;
                //保存
               this.$axios.post("/v1/school/saveOrUpdateSchoolInfo",paramData).then(res => { 
                        if(res.data.code==10000){ 
                            var returnSchoolId=res.data.response;                  
                            if(returnSchoolId!=null){
                               this.schoolData.schoolId=returnSchoolId;
                               this.$Message.info("保存成功！");
                            }else{
                              this.$Message.info("保存失败！");
                            }
                                     
                        }else{
                              this.$Message.info(res.data.msg);
                        }
                });
         
            }
                     
    }    
    ,mounted(){
         this.getProvinceList();
         if(sessionStorage.getItem('schoolList-schoolDetail-schoolId')!= null){
                this.getSchoolData(sessionStorage.getItem('schoolList-schoolDetail-schoolId'));//编辑时获取场馆数据
         }

    }
    ,watch: {
          addrProvinceId:'getCityList',
              addrCityId:'getCountyList'
    }   
};
</script>