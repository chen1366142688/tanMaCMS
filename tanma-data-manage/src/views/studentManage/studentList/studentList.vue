<template>
   <div>
        <div>
            <h1>学生信息管理</h1>
        </div> 
        <div style="margin-top:15px;">
            <div>
                <Row :gutter="16" type="flex" align="middle" class="advanced-router">
                    <Col span="2">
                        <Select v-model="sexId" placeholder="性别" clearable>
                        <Option v-for="item in sexList" :value="item.itemCode" :key="item.itemCode">{{ item.itemName }}</Option>
                        </Select>
                    </Col>                                                                                   
                   <Col span="3">                    
                        <Select v-model="ageStart" clearable style="width:45%" placeholder="年龄开始">
                        <Option v-for="item in ageList" :value="item" :key="item">{{ item }}</Option>
                        </Select>
                        至
                        <Select v-model="ageEnd" clearable style="width:45%" placeholder="年龄结束">
                        <Option v-for="item in ageList" :value="item" :key="item">{{ item }}</Option>
                        </Select>
                    </Col>
                   <Col span="11">
                        <Select v-model="provinceId" clearable style="width:18%" placeholder="省">
                        <Option v-for="item in provinceList" :value="item.provinceId" :key="item.provinceId">{{ item.provinceName }}</Option>
                        </Select>
                        <Select v-model="cityId" clearable style="width:20%" placeholder="市">
                        <Option v-for="item in cityList" :value="item.cityId" :key="item.cityId">{{ item.cityName }}</Option>
                        </Select>
                        <Select v-model="countyId" style="width:18%" placeholder="区">
                            <Option v-for="item in countyList" :value="item.countyId" :key="item.countyId">{{ item.countyName }}</Option>
                        </Select>                        
                        <Select v-model="schoolTypeId" clearable style="width:15%" placeholder="学校类型">
                        <Option v-for="item in schoolTypeList" :value="item.schoolTypeId" :key="item.schoolTypeId">{{ item.schoolTypeName }}</Option>
                        </Select> 
                        <Select v-model="schoolId" clearable style="width:25%" placeholder="学校名称">
                        <Option v-for="item in schoolList" :value="item.schoolId" :key="item.schoolId">{{ item.schoolName }}</Option>
                        </Select>                                                
                    </Col> 
                                      
                    <Col span="3"> 
                        <Input v-model="studentName" placeholder="输入学生姓名/身份证号" style="width: 100%"></Input>
                    </Col>
                    <Col span="2"> 
                        <Button v-on:click="classQuery(1)" type="success" style="background-color:#00c693" icon="ios-search">查询</Button>                        
                    </Col>
                    <Col span="2">
                    <div style="float: right;">
                      <Button class="add-button" v-on:click="addStudentToStudentDetail()" type="success" icon="plus" style="background-color:#00c693"  >添加学生信息 </Button>
                    </div>
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
        name: 'studentList'
        ,data(){
           return {

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
                  schoolList:[],
                    schoolId:'',
                  countyList:[],
                    countyId:'',  
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
                      ageList:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
                  studentName:'',
                     ageStart:'',
                       ageEnd:'',
                resultColumns:[
                            {
                            title: '学生姓名',
                            key: 'realName',
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
                            key: 'childrenAge',
                            align:'center',
                            width: 100,
                            },                             
                            {
                            title: '身份证',
                            key: 'idCard',
                            align:'center',
                            minWidth:250
                            },                                                        
                            {
                            title: '所在城市',
                            key: 'belongArea',
                            align:'center',
                            minWidth: 300,
                            maxWidth: 500
                            },
                            {
                            title: '学校类型',
                            key: 'schoolType',
                            align:'center',
                            width:100,
                            render: (h, params) => {
                                   let typeName="";
                                   switch(params.row.schoolType){
                                        case '1':typeName="幼儿园";break;
                                        case '2':typeName="小学";break;
                                        case '3':typeName="初中";break;
                                        case '4':typeName="高中";break;
                                   }
                                   return h('div',[h('span',typeName)]);
                                  }
                            },
                            {
                            title: '学校名称',
                            key: 'schoolName',
                            align:'center',
                            minWidth: 300,
                            maxWidth: 500
                            },                            
                            {
                            title: '绑定家长数',
                            key: 'patriarchNumber',
                            align:'center',
                            width: 100
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
                                                this.pageToStudentDetail(params.row.childrenId);
                                            }
                                        }
                                    }, '编辑'),
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
                getCountyList(newVal,oldVal){ //根据市iD获取区/县信息
                    if(newVal !=oldVal){
                        if(newVal==''){
                            this.countyList=[];
                        }else{
                        this.$axios.get("/v1/region/get/allCountyInfoByCityId?cityId="+newVal).then(res => {
                            this.countyList=res.data.response;
                        });
                        }               
                    }
                },               
                getSchoolList (newVal,oldVal){                    
                        if(this.countyId==''){
                            this.schoolList=[];
                        }else{
                        this.$axios.get("/v1/school/getSchoolSingleForManage?countyId="+this.countyId+"&schoolType="+this.schoolTypeId).then(res => {
                        this.schoolList=res.data.response;
                        });
                        }               

                },           
                classQuery(QueryMethod){//查询方法  QueryMethod 查询方式 1:查询按钮；0 翻页
                        if(QueryMethod == 1){ //查询按钮查询页码设置为1
                        this.pageNum = 1  
                        }
                     let queryData={
                                     "studentName": this.studentName,
                                     "schoolId":this.schoolId,
                                     "schoolTypeId": this.schoolTypeId,
                                     "countyId":this.countyId,
                                     "cityId" :this.cityId,
                                     "provinceId":this.provinceId,
                                     "ageStart":this.ageStart,
                                     "ageEnd":this.ageEnd,
                                     "sexId":this.sexId,
                                     "pageNo":this.pageNum,
                                     "pageSize":this.pageSize
                                    }     
                     this.$axios.post("/v1/children/getChildrenList",queryData).then(res => {
                             if(res.data.code==10000){
                                this.resultData=res.data.response.result;
                                this.pageNum=res.data.response.pageNum;
                                this.pageSize=res.data.response.pageSize;
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
                ,pageToStudentDetail(childrenId){   //编辑
                      let queryData={
                                     "studentName": this.studentName,
                                     "schoolId":this.schoolId,
                                     "schoolTypeId": this.schoolTypeId,
                                     "countyId":this.countyId,
                                     "cityId" :this.cityId,
                                     "provinceId":this.provinceId,
                                     "ageStart":this.ageStart,
                                     "ageEnd":this.ageEnd,
                                     "sexId":this.sexId,
                                     "pageNo":this.pageNum,
                                     "pageSize":this.pageSize
                            }
               //缓存查询条件                
                sessionStorage.setItem('studentList-queryData',JSON.stringify(queryData)); 
                sessionStorage.setItem('studentList-studentDetail-childrenId',childrenId);
                this.$router.push({name: 'studentDetail'});
                }
                ,addStudentToStudentDetail(){   //添加学生信息
                      let queryData={
                                     "studentName": this.studentName,
                                     "schoolId":this.schoolId,
                                     "schoolTypeId": this.schoolTypeId,
                                     "countyId":this.countyId,
                                     "cityId" :this.cityId,
                                     "provinceId":this.provinceId,
                                     "ageStart":this.ageStart,
                                     "ageEnd":this.ageEnd,
                                     "sexId":this.sexId,
                                     "pageNo":this.pageNum,
                                     "pageSize":this.pageSize
                            }
                   //缓存查询条件                
                    sessionStorage.setItem('studentList-queryData',JSON.stringify(queryData)); 
                    sessionStorage.removeItem('studentList-studentDetail-childrenId');
                    this.$router.push({name: 'studentDetail'});
                }

        }
        ,watch: {
          provinceId:'getCityList',
              cityId:'getCountyList',
            countyId:'getSchoolList',
        schoolTypeId:'getSchoolList',
        }
        ,created() {
              this.getProvinceList();
        }
        ,mounted() {
            if(sessionStorage.getItem('studentList-queryData')!=undefined
            && sessionStorage.getItem('isStudentDetailBack')!=undefined){  
               //页面返回时 根据缓存的查询条件查询             
                let queryData=JSON.parse(sessionStorage.getItem('studentList-queryData'));             
                  this.studentName=queryData.studentName;
                  this.schoolId=queryData.schoolId;
                  this.schoolTypeId=queryData.schoolTypeId;
                  this.countyId=queryData.countyId;
                  this.cityId=queryData.cityId;
                  this.provinceId=queryData.provinceId;
                  this.ageStart=queryData.ageStart;
                  this.ageEnd=queryData.ageEnd;           
                  this.pageNum=queryData.pageNo;
                  this.pageSize=queryData.pageSize;                
                  this.classQuery(0);
            }else{
                this.classQuery(1);
            }
             sessionStorage.removeItem('studentList-queryData');
             sessionStorage.removeItem('isStudentDetailBack');
        }
};
</script>