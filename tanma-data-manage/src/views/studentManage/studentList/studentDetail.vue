<style>

</style>

<template>
<div>
    <div style="margin-left:15px;">
        <Tabs>
             <TabPane name="studentInfo" :label="pageTitle" >
              <Card style="height:750px;overflow-y:scroll">
                  <Form ref="studentData" :model="studentData" :label-width="140">
                        <FormItem label="学生姓名">
                          <Row> 
                             <Col span="24"> 
                              <Input v-model="studentData.realName" style="width: 160px" :maxlength="30" />
                              <Label v-if="studentData.childrenId!=''" style="margin-left:30px;">创建时间：{{studentData.createTime}}</Label>                              
                             </Col>                            
                          </Row> 
                        </FormItem>
                        <FormItem label="是否录入身份证">
                          <Row> 
                             <Col span="24"> 
                                <RadioGroup @on-change="haveIdCardChange" v-model="studentData.haveIdCard" style="width: 160px">
                                    <Radio  label="1">是</Radio>
                                    <Radio  label="0">否</Radio>
                                </RadioGroup>
                             </Col>                            
                          </Row> 
                        </FormItem>
                        <FormItem label="身份证">
                          <Row> 
                             <Col span="24"> 
                                <Input @on-blur="getBirthdayAndSex" :disabled="studentData.haveIdCard==0" v-model="studentData.idCard" :maxlength="20" placeholder="请输入身份证" style="width: 160px"/>
                             </Col>                            
                          </Row> 
                        </FormItem>
                        <FormItem label="出生日期">
                          <Row> 
                             <Col span="24"> 
                               <DatePicker @on-change="getStudentAge" :disabled="studentData.haveIdCard==1" type="date" v-model="studentData.birthday" placeholder="请选择日期" style="width: 160px"></DatePicker> 
                               <Label v-if="studentData.childrenAge!=''" style="margin-left:10px;"> {{studentData.childrenAge}}岁</Label> 
                               
                             </Col>                            
                          </Row> 
                        </FormItem>
                        <FormItem label="性别">
                          <Row> 
                             <Col span="24"> 
                                <Select :disabled="studentData.haveIdCard==1" v-model="studentData.gender" clearable style="width: 160px">
                                    <Option v-for="item in sexList" :value="item.itemCode" :key="item.itemCode">{{ item.itemName }}</Option>
                                </Select>
                             </Col>                            
                          </Row> 
                        </FormItem>
                        <FormItem label="所在城市">
                            <Row> 
                              <Col span="24"> 
                                <Select v-model="provinceId" clearable style="width:160px" placeholder="省">
                                <Option v-for="item in provinceList" :value="item.provinceId" :key="item.provinceId">{{ item.provinceName }}</Option>
                                </Select>
                                <Select v-model="cityId" clearable style="width:160px" placeholder="市">
                                <Option v-for="item in cityList" :value="item.cityId" :key="item.cityId">{{ item.cityName }}</Option>
                                </Select>
                             </Col>                            
                          </Row>                                
                        </FormItem>                                                                        
                       <FormItem label="所在学校">
                          <Row> 
                            <Col span="24"> 
                                <Select v-model="schoolProvinceId" clearable style="width:160px" placeholder="省">
                                <Option v-for="item in schoolProvinceList" :value="item.provinceId" :key="item.provinceId">{{ item.provinceName }}</Option>
                                </Select>
                                <Select v-model="schoolCityId" clearable style="width:160px" placeholder="市">
                                <Option v-for="item in schoolCityList" :value="item.cityId" :key="item.cityId">{{ item.cityName }}</Option>
                                </Select>
                                <Select v-model="schoolCountyId" style="width:160px" placeholder="区">
                                    <Option v-for="item in schoolCountyList" :value="item.countyId" :key="item.countyId">{{ item.countyName }}</Option>
                                </Select>                        
                                <Select v-model="schoolTypeId" clearable style="width:120px" placeholder="学校类型">
                                <Option v-for="item in schoolTypeList" :value="item.schoolTypeId" :key="item.schoolTypeId">{{ item.schoolTypeName }}</Option>
                                </Select> 
                                <Select v-model="schoolId" clearable style="width:250px" placeholder="学校名称">
                                <Option v-for="item in schoolList" :value="item.schoolId" :key="item.schoolId">{{ item.schoolName }}</Option>
                                </Select> 
                             </Col>   
                          </Row> 
                        </FormItem>
                        <FormItem label="所在班级">
                          <Row> 
                             <Col span="24"> 
                                <Input v-model="studentData.grade" :maxlength="2" placeholder="请输入年级" style="width: 160px"/>                               
                                <Label style="margin-right:10px;">年级</Label>
                                <Input v-model="studentData.childrenClass" :maxlength="2" placeholder="请输入班级" style="width: 160px"/>                                
                                <Label style="margin-right:10px;"> 班</Label>                             
                             </Col>   
                          </Row> 
                        </FormItem>
                        <FormItem label="身高、体重">
                          <Row> 
                             <Col span="24"> 
                                <Input v-model="childrenHeight" :maxlength="5" placeholder="请输入身高" style="width: 160px"/>
                                <Label style="margin-right:17px;">cm</Label>
                                <Input v-model="childrenWeight" :maxlength="5" placeholder="请输入体重" style="width: 160px"/>
                                <Label style="margin-right:10px;">kg </Label> 
                                <Label style="width: 100px;color:red" v-if="bmi!=''"> BMI:   {{bmi}}</Label>  
                             </Col>   
                          </Row> 
                        </FormItem>
                         <FormItem v-if="studentData.childrenId!=''" label="Ta的测试记录">
                          <Row> 
                             <Col span="2"> 
                              <Label style="color:red;margin-left: 15px;">{{studentData.testCount}} 条</Label>
                             </Col>
                             <Col span="2" v-if="studentData.testCount>0">
                                <Button  v-on:click="showDataModel(1)" type="success" size="small"  style="background-color:#00c693;">查看测试记录</Button>
                             </Col>                               
                          </Row> 
                        </FormItem>  
                        <FormItem v-if="studentData.childrenId!=''" label="Ta的训练记录">
                          <Row> 
                             <Col span="2"> 
                              <Label style="color:red;margin-left: 15px;">{{studentData.exerciseCount}} 条</Label>
                             </Col>
                             <Col span="2" v-if="studentData.exerciseCount>0">
                                <Button  v-on:click="showDataModel(2)" type="success" size="small"  style="background-color:#00c693;">查看训练记录</Button>
                             </Col>                                    
                          </Row> 
                        </FormItem>  
                         <FormItem v-if="studentData.childrenId!=''" label="Ta的体侧记录">
                          <Row> 
                             <Col span="2" > 
                              <Label style="color:red;margin-left: 15px;">{{studentData.corporeityCount}} 条</Label>
                             </Col>
                             <Col span="2" v-if="studentData.corporeityCount>0">
                                <Button  v-on:click="showDataModel(3)" type="success" size="small"  style="background-color:#00c693;">查看体侧记录</Button>
                             </Col>                                    
                          </Row>                                                    
                        </FormItem> 
                        <FormItem label="关联家长账号">  
                             <Row> 
                                <Col span="24"> 
                                 <Button class="add-button" v-on:click="addPatriarch()" type="success" icon="plus" style="background-color:#00c693;width: 300px;"  >添加新账号</Button>
                                </Col>
                            </Row>                                           
                            <Row v-for="(item,index) in studentData.patriarchList" style="margin-top: 5px;"> 
                                 <Col span="2"> 
                                 <Label style="margin-left: 15px;">{{item.relation}}</Label>
                                </Col>
                                <Col span="2"> 
                                    <Label >{{item.nickName}}</Label>
                                </Col>
                                 <Col span="2"> 
                                    <Label >{{item.phoneNum}}</Label>
                                </Col>
                                 <Col span="3"> 
                                    <Button  v-on:click="delPatriarch(index)" type="success" size="small"  style="background-color:#00c693;">解除绑定</Button>
                                 </Col>   
                            </Row>
                        </FormItem>
                </Form>
             </Card>
         </TabPane>
     </Tabs>
</div>
<div style="margin-top:10px;padding-left:40%">
   <Button @click="pageToStudentList" style="float:left; margin-right:50px;width:100px" type="success">返回</Button>
     <div style="width:20px;" ></div>
   <Button  style="float:left;width:100px" :loading="saveLoading" @click="saveOrUpdateStudentData"  type="success">提交结果</Button>
</div>          
   <Modal v-model="showTestModel" title="TA的测试记录" cancel-text="" ok-text="关闭" :mask-closable="false"  width="1200px">
     <div style="margin-top:5px;">
            <div>
                <Row :gutter="16" type="flex" align="middle" class="advanced-router">
                    <Col span="3">                    
                        <DatePicker type="date" v-model="testDateStart" placeholder="请选择日期开始" style="width: 130px"></DatePicker> 
                    </Col>
                    <Label>至</Label>                                 
                    <Col span="3">                    
                        <DatePicker type="date" v-model="testDateEnd" placeholder="请选择日期结束" style="width: 130px"></DatePicker>    
                    </Col>
                    <Col span="4">
                        <Select v-model="testId" placeholder="选择测试项目" clearable>
                        <Option v-for="item in testList" :value="item.itemId" :key="item.itemId">{{ item.itemName }}</Option>
                        </Select>
                    </Col>                                      
                    <Col span="2" offset="1"> 
                        <Button v-on:click="testQuery(1)" type="success" style="background-color:#00c693" icon="ios-search">查询</Button>
                    </Col>
                </Row>
            </div>
            <br>
            <div>
                <Row>
                    <div style="">
                    <Table border :columns="testColumns" :data="testData" :height="520"></Table>
                    </div>
                    <br>           
                    <div style="float: right;">
                    <Page :total="totalTest" :current="pageNumTest" :page-size="pageSizeTest" @on-change='pageNumTestChange' @on-page-size-change='pageSizeTestChange' show-total show-sizer></Page>
                    </div>
               </Row>
            </div>
      </div>  
    </Modal>
   <Modal v-model="showExerciseModel" title="TA的训练记录" cancel-text="" ok-text="关闭" :mask-closable="false"  width="1200px">
     <div style="margin-top:5px;">
            <div>
                <Row :gutter="16" type="flex" align="middle" class="advanced-router">
                    <Col span="3">                    
                        <DatePicker type="date" v-model="exerciseDateStart" placeholder="请选择日期开始" style="width: 130px"></DatePicker> 
                    </Col>
                    <Label>至</Label>                                 
                    <Col span="3">                    
                        <DatePicker type="date" v-model="exerciseDateEnd" placeholder="请选择日期结束" style="width: 130px"></DatePicker>    
                    </Col>
                    <Col span="4">
                        <Select v-model="exerciseId" placeholder="选择训练项目" clearable>
                        <Option v-for="item in exerciseList" :value="item.itemId" :key="item.itemId">{{ item.itemName }}</Option>
                        </Select>
                    </Col>                                      
                    <Col span="2" offset="1"> 
                        <Button v-on:click="exerciseQuery(1)" type="success" style="background-color:#00c693" icon="ios-search">查询</Button>
                    </Col>
                </Row>
            </div>
            <br>
            <div>
                <Row>
                    <div style="">
                    <Table border :columns="exerciseColumns" :data="exerciseData" :height="520"></Table>
                    </div>
                    <br>           
                    <div style="float: right;">
                    <Page :total="totalExercise" :current="pageNumExercise" :page-size="pageSizeExercise" @on-change='pageNumExerciseChange' @on-page-size-change='pageSizeExerciseChange' show-total show-sizer></Page>
                    </div>
               </Row>
            </div>
      </div>  
    </Modal>
   <Modal v-model="showPatriarchModel" title="家长筛选" @on-ok="showPatriarchModelOnOk"  :mask-closable="false" :loading="modelPatriarchLoading" width="800px">
     <div style="margin-top:10px;">
            <div>
                <Row :gutter="16" type="flex" align="middle" class="advanced-router">
                    <Col span="6"> 
                        <Input v-model="phoneNum" placeholder="输入家长手机号" style="width: 100%"></Input>
                    </Col>
                    <Col span="2"> 
                        <Button v-on:click="patriarchQuery(1)" type="success" style="background-color:#00c693" icon="ios-search">查询</Button>
                    </Col>
                </Row>
            </div>
            <br>
            <div>
                <Row>
                    <div style="">
                    <Table border :columns="patriarchColumns" :data="patriarchData" :height="520"></Table>
                    </div>
                    <br>           
                    <div style="float: right;">
                    <Page :total="totalPatriarch" :current="pageNumPatriarch" :page-size="pageSizePatriarch" @on-change='pageNumPatriarchChange' @on-page-size-change='pageSizePatriarchChange' show-total show-sizer></Page>
                    </div>
               </Row>
            </div>
      </div>  
    </Modal>    
</div>
</template>
<script>
export default {
    name: 'studentDetail'
    ,data(){
        return {
                        pageTitle:"学生信息新增",
                schoolTypeList:[
                                    {
                                        schoolTypeId:'1',
                                        schoolTypeName:'幼儿园'
                                    },
                                    {
                                        schoolTypeId:'2',
                                        schoolTypeName:'小学'
                                    },
                                    {
                                        schoolTypeId:'3',
                                        schoolTypeName:'初中'
                                    },
                                    {
                                        schoolTypeId:'4',
                                        schoolTypeName:'高中'
                                    }
                                ],
                    schoolTypeId:'',
                    provinceList:[],
                    provinceId:'',
                        cityList:[],
                        cityId:'',
            schoolProvinceList:[],
                schoolProvinceId:'',
                schoolCityList:[],
                    schoolCityId:'',                     
                    schoolList:[],
                        schoolId:'',
                schoolCountyList:[],
                schoolCountyId:'', 
                childrenHeight:'',
                childrenWeight:'', 
                           bmi:'',
                    studentData:{
                                childrenId:'',
                                realName:'',                                 
                                haveIdCard:'1',
                                idCard:'',
                                provinceId:'',
                                cityId:'',
                                schoolId:'',
                                schoolType:'',
                                grade:'',
                                childrenClass:'',
                                gender:'',
                                birthday:'',
                                childrenAge:'',
                                childrenHeight:'',
                                childrenWeight:'',
                                bmi:'',
                                testCount:0,
                                exerciseCount:0,
                                corporeityCount:0,
                                createTime:'',
                                patriarchList:[],
                            },
                    sexList:[
                                {
                                    itemCode:'1',
                                    itemName:'男'
                                },                  
                                {
                                    itemCode:'2',
                                    itemName:'女'
                                },
                                // {
                                //     itemCode:'3',
                                //     itemName:'未知'
                                // },
                             ],                           
                   ageList:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],  
               saveLoading:false,
            /***************** 测试记录-start*************************/
             showTestModel:false,
             testDateStart:"",
               testDateEnd:"",
                    testId:"",
                  testList:[],
               testColumns:[
                            {
                            title: '测试时间',
                            key: 'createTime',
                            align:'center',
                            width:250
                            },
                            {
                            title: '测试名称',
                            key: 'testName',
                            align:'center',
                            minWidth:250
                            },
                            {
                            title: '性别',
                            key: 'gender',
                            align:'center',
                            width:150,
                           render: (h, params) => {
                                   return h('div',[h('span',params.row.gender=='1'?'男':'女')]);
                                  }
                            },
                            {
                            title: '年龄（岁）',
                            key: 'ageScope',
                            align:'center',
                            width: 100,
                            },
                            {
                            title: '测试结果',
                            key: 'resultValue',
                            align:'center',
                            width: 150,
                            },
                            {
                            title: '测试得分',
                            key: 'score',
                            align:'center',
                            width:150,
                            },                                     
                    ],
                 testData:[],
              pageNumTest:1,
             pageSizeTest:10,
                totalTest:0,
    /***************** 测试记录-end*************************/
    /***************** 锻炼记录-start*************************/
             showExerciseModel:false,
             exerciseDateStart:"",
              exerciseDateEnd:"",
                    exerciseId:"",
                  exerciseList:[],
               exerciseColumns:[
                            {
                            title: '训练时间',
                            key: 'createTime',
                            align:'center',
                            width:200
                            },
                            {
                            title: '训练计划名称',
                            key: 'exerciseName',
                            align:'center',
                            minWidth:200
                            },
                            {
                            title: '性别',
                            key: 'gender',
                            align:'center',
                            width:150,
                           render: (h, params) => {
                                   return h('div',[h('span',params.row.gender=='1'?'男':'女')]);
                                  }
                            },
                            {
                            title: '适合年龄段（岁）',
                            key: 'ageScope',
                            align:'center',
                            width: 200,
                            },
                            {
                            title: '训练时间（min）',
                            key: 'timeDuration',
                            align:'center',
                            width: 150,
                            },
                            {
                            title: '累计训练次数',
                            key: 'exerciseCount',
                            align:'center',
                            width:150,
                            },                                     
                    ],
                 exerciseData:[],
              pageNumExercise:1,
             pageSizeExercise:10,
                totalExercise:0,
    /***************** 锻炼记录-end*************************/ 
    /***************** 绑定家长查询-start*************************/ 
        showPatriarchModel:false,
        modelPatriarchButOk:true,
        modelPatriarchLoading:true,                          
        phoneNum:'',
       patriarchColumns:[
                    {
                      title: '选择',
                        key: 'checked',
                      align:'center',
                      width: 80,
                     render: (h, params) => {                        
                            const param = params.row;
                            return h('Radio',
                                   {
                                     props: {
                                       value: param.checked
                                    }   
                                    ,on: {  
                                     'on-change': (status) => {
                                                for(var i=0;i<this.patriarchData.length;i++){
                                                   if(params.index==i){
                                                     this.patriarchData[i].checked=true;
                                                   }else{
                                                     this.patriarchData[i].checked=false;
                                                   }
                                                }
                                                }  
                                        }
                                    });
                      }                        
                    },                              
                    {
                       title: '家长名称',
                         key: 'nickName',
                       align:'center',
                       minWidth: 300
                    },
                    {
                     title: '电话',
                       key: 'phoneNum',
                     align:'center',
                     width:150
                    },
                    {
                     title: '角色',
                       key: 'relation',
                     align:'center',
                     width:100
                    }, 
               ],
                 patriarchData:[],
              pageNumPatriarch:1,
             pageSizePatriarch:10,
                totalPatriarch:0,                
    /***************** 绑定家长查询-end*************************/ 
        }
    }
    ,methods:{

                getProvinceList(){ //获取省信息        
                    this.$axios.get("/v1/region/get/allProvinceInfo").then(res => {
                        this.provinceList=res.data.response;
                        });
                },
                getCityList(newVal,oldVal){ //根据省iD获取市信息
                    if(newVal !=oldVal){
                        if(newVal==''){
                            this.cityList=[];
                        }else{
                    this.$axios.get("/v1/region/get/allCityInfoByProvinceId?provinceId="+newVal).then(res => {
                        this.cityList=res.data.response;
                        });
                        }               
                    }
                },

                getSchoolProvinceList(){ //获取省信息        
                    this.$axios.get("/v1/region/get/allProvinceInfo").then(res => {
                        this.schoolProvinceList=res.data.response;
                        });
                },
                getSchoolCityList(newVal,oldVal){ //根据省iD获取市信息
                    if(newVal !=oldVal){
                        if(newVal==''){
                            this.schoolCityList=[];
                        }else{
                    this.$axios.get("/v1/region/get/allCityInfoByProvinceId?provinceId="+newVal).then(res => {
                        this.schoolCityList=res.data.response;
                        });
                        }               
                    }
                },
                getSchoolCountyList(newVal,oldVal){ //根据市iD获取区/县信息
                    if(newVal !=oldVal){
                        if(newVal==''){
                            this.schoolCountyList=[];
                        }else{
                        this.$axios.get("/v1/region/get/allCountyInfoByCityId?cityId="+newVal).then(res => {
                            this.schoolCountyList=res.data.response;
                        });
                        }               
                    }
                }
                ,getSchoolList (newVal,oldVal){                    
                        if(this.schoolCountyId==''){
                            this.schoolList=[];
                        }else{
                        this.$axios.get("/v1/school/getSchoolSingleForManage?countyId="+this.schoolCountyId+"&schoolType="+this.schoolTypeId).then(res => {
                        this.schoolList=res.data.response;
                        });
                        }               

                }
                ,getCorporeityTestByChildrenId(childrenId){ //获取测试列表信息        
                    this.$axios.get("/v1/children/getCorporeityTestByChildrenId?childrenId="+childrenId).then(res => {
                        this.testList=res.data.response;
                        });
                }
                ,getExercisePlanByChildrenId(childrenId){ //获取训练列表信息        
                    this.$axios.get("/v1/children/getExercisePlanByChildrenId?childrenId="+childrenId).then(res => {
                        this.exerciseList=res.data.response;
                        });
                }
               ,getStudentData(childrenId){//编辑时获取计划信息

               this.pageTitle="学生信息编辑";
               this.$axios.get("/v1/children/getChildrenDetail?childrenId="+childrenId).then(res => {
                        if(res.data.code==10000){
                            let data=res.data.response;
                            this.schoolTypeId=data.schoolType;
                            this.provinceId=data.provinceId;
                            this.cityId=data.cityId;
                            this.schoolProvinceId=data.schoolProvinceId;
                            this.schoolCityId=data.schoolCityId;                    
                            this.schoolCountyId=data.schoolCountyId; 
                            this.schoolId=data.schoolId;
                            this.childrenHeight=data.childrenHeight/10;
                            this.childrenWeight=data.childrenWeight/10;
                            this.bmi= data.bmi;
                            this.studentData=data;
                            if(this.studentData.testCount>0){
                              this.getCorporeityTestByChildrenId(childrenId);
                            }
                            if(this.studentData.exerciseCount>0){
                              this.getExercisePlanByChildrenId(childrenId);
                            }
                        }else{
                            this.$Message.info(res.data.msg);
                        }                          
                   });
            }
            ,getChildrenBmi(newVal,oldVal){//计算BMI                    
                     if(this.childrenHeight!='' && this.childrenWeight!=''){
                         this.bmi= (Number(this.childrenWeight)/(Number(this.childrenHeight)*Number(this.childrenHeight)/10000)).toFixed(2);
                    }else{
                        this.bmi='';
                    }
            }
            ,getBirthdayAndSex(){//通过身份证计算生日，性别
                  if(this.studentData.idCard==''){
                         this.studentData.gender='';
                         this.studentData.birthday='';
                         this.studentData.childrenAge='';
                  }else{                          
                    let testIdCard=/^[1-8][0-7]{2}\d{3}([12]\d{3})(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}([0-9X])$/;
                    if(!testIdCard.test(this.studentData.idCard)){
                        this.$Message.info('请输入正确的身份证号！');
                        return;
                    }                 
                    this.studentData.gender=Number(this.studentData.idCard.substring(16,17))%2==0?'2':'1';
                    this.studentData.birthday=this.studentData.idCard.substring(6,10)+"-"+this.studentData.idCard.substring(10,12)+"-"+this.studentData.idCard.substring(12,14);
                    this.studentData.childrenAge=Number(new Date().getFullYear())-Number(this.studentData.idCard.substring(6,10));
                  }

            }
            ,haveIdCardChange(){
                if(this.studentData.haveIdCard=='0'){
                     this.studentData.idCard="";
                }else{
                    if(this.studentData.idCard==''){
                        this.studentData.childrenAge="";
                        this.studentData.birthday="";
                        this.studentData.gender="";
                    }
                }
            }
            ,getStudentAge(newVal,oldVal){
                if(newVal!=""){
                this.studentData.childrenAge=Number(new Date().getFullYear())-Number(newVal.substring(0,4)); 
                }
            }
            ,showDataModel(index){//展示记录
                   if(index==1){//测试
                     this.showTestInfo();
                   }else if(index==2){//计划
                     this.showExerciseInfo();
                   }else if(index==3){
                       
                   }
            }
       /*************** 测试记录-start********************/
        ,showTestInfo(){
                this.showTestModel=true;
                this.testDateStart="";
                this.testDateEnd="";                
                this.testData=[];
                this.pageNumTest=1;
                this.pageSizeTest=10;
                this.totalTest=0;
                this.testQuery(1);
            }
        ,pageNumTestChange(value){  //筛选页码改变方法处理
            if(this.pageNumTest !=value){
               this.pageNumTest =value
               this.testQuery(0);
            }         
        }
        ,pageSizeTestChange(value){  //筛选页面大小改变方法处理
            if(this.pageSizeTest!=value){
             this.pageSizeTest=value
             this.testQuery(1);
            }
        }
        ,testQuery(QueryMethod){//筛选查询
               if(QueryMethod == 1){ //查询按钮查询页码设置为1
                   this.pageNumTest = 1;  
               }
               let queryData={
                            "childrenId":this.studentData.childrenId,
                            "itemId":this.testId,
                            "dateStart": this.testDateStart,
                            "dateEnd": this.testDateEnd,
                            "pageNo":this.pageNumTest,
                            "pageSize":this.pageSizeTest,
                            }       
            this.$axios.post("/v1/children/getTestResultList",queryData).then(res => {
                if(res.data.code==10000){  
                    let data= res.data.response.result;              
                    this.testData=data;
                    this.pageNumTest=res.data.response.pageNum;
                    this.pageSizeTest=res.data.response.pageSize;
                    this.totalTest=res.data.response.total;
                }else{
                    this.$Message.info(res.data.msg);
                }
            }); 
        }
       /*************** 测试记录-end********************/
      /*************** 训练记录-start********************/
        ,showExerciseInfo(){
                this.showExerciseModel=true;
                this.exerciseDateStart="";
                this.exerciseDateEnd="";                
                this.exerciseData=[];
                this.pageNumExercise=1;
                this.pageSizeExercise=10;
                this.totalExercise=0;
                this.exerciseQuery(1);
            }
        ,pageNumExerciseChange(value){  //筛选页码改变方法处理
            if(this.pageNumExercise !=value){
               this.pageNumExercise =value
               this.exerciseQuery(0);
            }         
        }
        ,pageSizeExerciseChange(value){  //筛选页面大小改变方法处理
            if(this.pageSizeExercise!=value){
             this.pageSizeExercise=value
             this.exerciseQuery(1);
            }
        }
        ,exerciseQuery(QueryMethod){//筛选查询
               if(QueryMethod == 1){ //查询按钮查询页码设置为1
                   this.pageNumExercise = 1;  
               }
               let queryData={
                            "childrenId":this.studentData.childrenId,
                            "itemId":this.exerciseId,
                            "dateStart": this.exerciseDateStart,
                            "dateEnd": this.exerciseDateEnd,
                            "pageNo":this.pageNumExercise,
                            "pageSize":this.pageSizeExercise,
                            }       
            this.$axios.post("/v1/children/getExerciseResultList",queryData).then(res => {
                if(res.data.code==10000){  
                    let data= res.data.response.result;              
                    this.exerciseData=data;
                    this.pageNumTExercise=res.data.response.pageNum;
                    this.pageSizeExercise=res.data.response.pageSize;
                    this.totalExercise=res.data.response.total;
                }else{
                    this.$Message.info(res.data.msg);
                }
            }); 
        }
       /*************** 训练记录-end********************/
       /*************** 绑定家长-start********************/
        ,delPatriarch(index){//删除绑定账号
         if(this.studentData.patriarchList.length>1){
           this.studentData.patriarchList.splice(index,1);
         }else{
           this.$Message.success('孩子应至少绑定一位家长！');
         }
        }
        ,addPatriarch(){//添加绑定账号
                this.modelPatriarchButOk=true;
                this.modelPatriarchLoading=true;
                this.showPatriarchModel=true;
                this.patriarchData=[];
                this.pageNumPatriarch=1;
                this.pageSizePatriarch=10;
                this.totalPatriarch=0;
                this.patriarchQuery(1);
        }
        ,patriarchQuery(QueryMethod){//查询方法  QueryMethod 查询方式 1:查询按钮；0 翻页                
                 if(QueryMethod == 1){ //查询按钮查询页码设置为1
                   this.pageNumPatriarch = 1  
                 }
               let queryData={
                            "phoneNum": this.phoneNum,
                            "pageNo":this.pageNumPatriarch,
                            "pageSize":this.pageSizePatriarch
                             }      
               this.$axios.post("/v1/children/getPatriarchSimpleList",queryData).then(res => {
                    if(res.data.code==10000){
                        let data=res.data.response.result;
                      for(let tt of data){
                          tt.checked=false;
                    }                    
                    this.patriarchData=data;
                    this.pageNumPatriarch=res.data.response.pageNum;
                    this.pageSizePatriarch=res.data.response.pageSize
                    this.totalPatriarch=res.data.response.total
                    }else{
                    this.$Message.info(res.data.msg);
                    }
                });
         },
        pageNumPatriarchChange(value){  //页码改变方法处理
            if(this.pageNumPatriarch !=value){
               this.pageNumPatriarch =value
               this.patriarchQuery(0);
            }         
        },
        pageSizePatriarchChange(value){  //页面大小改变方法处理
            if(this.pageSizePatriarch!=value){
             this.pageSizePatriarch=value
             this.patriarchQuery(1);
            }
        }
        ,showPatriarchModelOnOk(){//选择页面确定按钮
             if(!this.modelPatriarchButOk){
                  return;
            }
            this.modelPatriarchButOk=false;
            setTimeout(() => {
                    this.modelPatriarchLoading = false;
                    this.$nextTick(() => {
                        this.modelPatriarchLoading = true;
                    });
                }, 500);           
            for(var data of this.patriarchData){
                
              if(data.checked){                     
                 for(let pat of this.studentData.patriarchList){
                    if(data.patriarchId==pat.patriarchId){
                            this.$Message.success('该家长已绑定该孩子，请重新选择一项！');
                            this.modelPatriarchButOk=true;
                            return;
                    }
                 }
                this.studentData.patriarchList.push({
                  "patriarchId":data.patriarchId,
                  "relationCode":data.relationCode,
                  "relation":data.relation,
                  "phoneNum":data.phoneNum,
                  "nickName":data.nickName,
                });
                this.showPatriarchModel=false;
                return;
              }
            }
            this.$Message.success('请选择一项！');
            this.modelPatriarchButOk=true;
            return;

        }
       /*************** 绑定家长-end********************/       
            ,pageToStudentList(){ //返回
                sessionStorage.setItem('isStudentDetailBack',"true");
                this.$router.go(-1);  
            } 
            ,saveOrUpdateStudentData(){//保存处理 
            
                  this.saveLoading=true;               
                  var paramData={};
                  paramData=this.studentData;
                if(paramData.realName==""){
                      this.$Message.info('请输入学生姓名！');
                      this.saveLoading=false;
                      return;
                 } 
                 if(paramData.haveIdCard==1){//
                    let testIdCard=/^[1-8][0-7]{2}\d{3}([12]\d{3})(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}([0-9X])$/;
                    if(!testIdCard.test(paramData.idCard)){
                        this.$Message.info('请输入正确的身份证号！');
                        this.saveLoading=false;
                        return;
                    }                 
                    paramData.gender=Number(paramData.idCard.substring(16,17))%2==0?'2':'1';
                    paramData.birthday=paramData.idCard.substring(6,10)+"-"+paramData.idCard.substring(10,12)+"-"+paramData.idCard.substring(12,14);
                    paramData.childrenAge=Number(new Date().getFullYear())-Number(paramData.idCard.substring(6,10));
                 }else{
                   if(paramData.birthday==""){
                      this.$Message.info('请选择出生日期！');
                      this.saveLoading=false;
                      return;
                   }
                   let  birthday=paramData.birthday;
                   let  year=birthday.getFullYear();
                   let  month=(birthday.getMonth()+1)<10?("0"+(birthday.getMonth()+1)):(birthday.getMonth()+1);
                   let  day= birthday.getDate()<10?("0"+birthday.getDate()):birthday.getDate();
                   paramData.birthday=year+"-"+month+"-"+day; 
                   paramData.childrenAge=Number(new Date().getFullYear())-Number(year);
                   if(paramData.gender==""){
                      this.$Message.info('请选择性别！');
                      this.saveLoading=false;
                      return;
                   }
                 }
                 if(this.provinceId==""){
                      this.$Message.info('请选择所在城市！');
                      this.saveLoading=false;
                      return;
                 }
                 paramData.provinceId=this.provinceId;
                 if(this.cityId==""){
                      this.$Message.info('请选择所在城市！');
                      this.saveLoading=false;
                      return;
                 }
                 paramData.cityId=this.cityId;
                 if(this.schoolTypeId==""){
                      this.$Message.info('请选择学校类型！');
                      this.saveLoading=false;
                      return;
                 } 
                 paramData.schoolType=this.schoolTypeId;
                 if(this.schoolId==""){
                      this.$Message.info('请选择所在学校！');
                      this.saveLoading=false;
                      return;
                 }
                 paramData.schoolId=this.schoolId;
                 if(paramData.grade==""){
                      this.$Message.info('请输入所在年级！');
                      this.saveLoading=false;
                      return;
                 }   
                 if(paramData.childrenClass==""){
                      this.$Message.info('请输入所在班级！');
                      this.saveLoading=false;
                      return;
                 }
                 let testChildren=/^[0-9]+(.[0-9]{1})?$/;
                 if(this.childrenHeight==""){
                      this.$Message.info('请输入身高！');
                      this.saveLoading=false;
                      return;
                 }
                if(!testChildren.test(this.childrenHeight)){
                      this.$Message.info('身高为可保留一位小数的数字！');
                      this.saveLoading=false;
                      return;
                 }
                 if(this.childrenWeight==""){
                      this.$Message.info('请输入体重！');
                      this.saveLoading=false;
                      return;
                 }
                  if(!testChildren.test(this.childrenWeight)){
                      this.$Message.info('体重为可保留一位小数的数字！');
                      this.saveLoading=false;
                      return;
                 }
                 if(paramData.patriarchList.length==0){
                      this.$Message.info('请至少绑定一位家长！');
                      this.saveLoading=false;
                      return;
                 }
                 paramData.childrenHeight = this.childrenHeight*10; 
                 paramData.childrenWeight = this.childrenWeight*10;
                 paramData.bmi=this.bmi*100;
                 console.log(JSON.stringify(paramData));
                 this.saveLoading=false; 
                //保存
               this.$axios.post("/v1/children/saveOrUpdateChildren",paramData).then(res => { 
                        if(res.data.code==10000){ 
                            this.$Message.info("提交成功！");
                            this.saveLoading=false;                  
                           sessionStorage.setItem('isStudentDetailBack',"true");//返回列表
                           this.$router.go(-1);    
                        }else{
                            this.saveLoading=false;
                            this.$Message.info(res.data.msg);
                        }
                });
         
            }
                     
    }    
    ,mounted(){
        var vm = this;
         vm.updateUrl=vm.$axios.defaults.baseURL+"/v1/file/upload?type=manage_img"; 
        if(sessionStorage.getItem('studentList-studentDetail-childrenId')!= null){
                vm.getStudentData(sessionStorage.getItem('studentList-studentDetail-childrenId'));//编辑时获取数据               
        }         

    }
    ,watch: {
                provinceId:'getCityList',
          schoolProvinceId:'getSchoolCityList',
              schoolCityId:'getSchoolCountyList',
            schoolCountyId:'getSchoolList',
              schoolTypeId:'getSchoolList',
             childrenHeight:'getChildrenBmi',
             childrenWeight:'getChildrenBmi',
    }
    ,created() {
        this.getProvinceList();
        this.getSchoolProvinceList();
        
    }


};
</script>