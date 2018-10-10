<template>
    <div>
        <div>
            <h1>学校管理</h1>
        </div>
        <div style="margin-top:15px;">
            <div>
                <Row :gutter="16" type="flex" align="middle" class="advanced-router">
                    <Col span="2">
                    <Select v-model="schoolTypeId">
                        <Option v-for="item in schoolTypeList" :value="item.schoolTypeId" :key="item.schoolTypeId">{{ item.schoolTypeName }}</Option>
                    </Select>
                    </Col>
                    <!--   <Col span="5">                    
                        <Select v-model="provinceId" clearable style="width:45%">
                        <Option v-for="item in provinceList" :value="item.provinceId" :key="item.provinceId">{{ item.provinceName }}</Option>
                        </Select>
                        <Select v-model="cityId" clearable style="width:45%">
                        <Option v-for="item in cityList" :value="item.cityId" :key="item.cityId">{{ item.cityName }}</Option>
                        </Select>
                    </Col>-->
                    <Col span="4">
                    <Input v-model="schoolName" placeholder="输入学校名称/学校代码" style="width: 100%"></Input>
                    </Col>
                    <Col span="2" offset="1">
                    <Button v-on:click="classQuery(1)" type="success" style="background-color:#00c693" icon="ios-search">查询</Button>
                    </Col>
                    <Col span="2" offset="12">
                    <div style="float: right;">
                        <Button class="add-button" v-on:click="addSchoolToSchoolDetail()" type="success" icon="plus" style="background-color:#00c693">添加学校</Button>
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
  name: 'schoolList',
  data() {
    return {
      schoolTypeList: [
        {
          schoolTypeId: '0',
          schoolTypeName: '全部'
        },
        {
          schoolTypeId: '1',
          schoolTypeName: '幼儿园'
        },
        {
          schoolTypeId: '2',
          schoolTypeName: '小学'
        },
        {
          schoolTypeId: '3',
          schoolTypeName: '初中'
        },
        {
          schoolTypeId: '4',
          schoolTypeName: '高中'
        }
      ],
      schoolTypeId: '0',
      provinceList: [],
      provinceId: '',
      cityList: [],
      cityId: '',
      schoolName: '',
      resultColumns: [
        {
          title: '所属地区',
          key: 'belongArea',
          align: 'center',
          minWidth: 250
        },
        {
          title: '学校类型',
          key: 'schoolType',
          align: 'center',
          width: 150
        },
        {
          title: '学校代码',
          key: 'schoolCode',
          align: 'center',
          width: 150
        },
        {
          title: '学校名称',
          key: 'schoolName',
          align: 'center',
          minWidth: 200,
          maxWidth: 500
        },
        {
          title: '体测样本学校',
          key: 'experimentType',
          align: 'center',
          width: 150
        },
        {
          title: '学生数量',
          key: 'studentNumber',
          align: 'center',
          width: 150
        },
        {
          title: '教师账号数量',
          key: 'teacherNumber',
          align: 'center',
          width: 150
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          width: 400,
          render: (h, params) => {
            return h('div', [
                h(
                'Button',
                {
                  props: {
                    type: 'success'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                       this.exportSchoolTestData(params.row.schoolId);
                    }
                  }
                },
                '导出体测数据'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'success'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      //  this.pageToSchoolDetail(params.row.schoolId);
                    }
                  }
                },
                '账号管理'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'success'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.pageToSchoolDetail(params.row.schoolId)
                    }
                  }
                },
                '编辑'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'success'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: '提示',
                        content: '确定要删除该学校的数据？',
                        onOk: function() {
                          this.deleteSchoolInfo(params.row.schoolId)
                        }
                      })
                    }
                  }
                },
                '删除'
              )
            ])
          }
        }
      ],
      resultData: [],
      pageNum: 1,
      pageSize: 10,
      total: 0
    }
  },
  methods: {
      exportSchoolTestData(schoolId){
        var vm=this;
        console.log(schoolId)
         sessionStorage.setItem('schoolList-exportGroupList-schoolId', schoolId);
         this.$router.push({ name: 'exportGroupList' })
      },

    // getProvinceList(){ //获取省信息
    //     this.$axios.get("/v1/region/get/allProvinceInfo").then(res => {
    //         this.provinceList=res.data.response
    //         });
    // },
    // getCityList(newVal,oldVal){ //根据省iD获取市信息
    //     if(newVal !=oldVal){
    //         if(newVal==''){
    //             this.cityList=[];
    //         }else{
    //     this.$axios.get("/v1/region/get/allCityInfoByProvinceId?provinceId="+newVal).then(res => {
    //         this.cityList=res.data.response
    //         });
    //         }
    //     }
    // },
    classQuery(QueryMethod) {
      //查询方法  QueryMethod 查询方式 1:查询按钮；0 翻页

      if (QueryMethod == 1) {
        //查询按钮查询页码设置为1
        this.pageNum = 1
      }
      let queryData = {
        schoolName: this.schoolName,
        //  "provinceId":this.provinceId,
        //  "cityId": this.cityId,
        schoolType: this.schoolTypeId == '0' ? '' : this.schoolTypeId,
        pageNo: this.pageNum,
        pageSize: this.pageSize
      }
      this.$axios.post('/v1/school/getSchoolInfoList', queryData).then(res => {
        if (res.data.code == 10000) {
          this.resultData = res.data.response.result
          this.pageNum = res.data.response.pageNum
          this.pageSize = res.data.response.pageSize
          this.total = res.data.response.total
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    pageNumChange(value) {
      //页码改变方法处理
      if (this.pageNum != value) {
        this.pageNum = value
        this.classQuery(0)
      }
    },
    pageSizechange(value) {
      //页面大小改变方法处理
      if (this.pageSize != value) {
        this.pageSize = value
        this.classQuery(1)
      }
    },
    pageToSchoolDetail(schoolId) {
      //编辑
      let queryData = {
        schoolName: this.schoolName,
        // "provinceId": this.provinceId,
        //     "cityId" : this.cityId,
        schoolTypeId: this.schoolTypeId,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      //缓存查询条件
      sessionStorage.setItem('schoolList-queryData', JSON.stringify(queryData))

      sessionStorage.setItem('schoolList-schoolDetail-schoolId', schoolId)
      this.$router.push({ name: 'schoolDetail' })
    },
    addSchoolToSchoolDetail() {
      //添加学校
      let queryData = {
        schoolName: this.schoolName,
        // "provinceId": this.provinceId,
        //     "cityId" : this.cityId,
        schoolTypeId: this.schoolTypeId,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      //缓存查询条件
      sessionStorage.setItem('schoolList-queryData', JSON.stringify(queryData))

      sessionStorage.removeItem('schoolList-schoolDetail-schoolId')
      this.$router.push({ name: 'schoolDetail' })
    },
    deleteSchoolInfo(schoolId) {
      console.log(schoolId)
      return
      this.$axios
        .get('/v1/school/updateSchoolStatus?schoolId=' + schoolId)
        .then(res => {
          if (res.data.code == 10000) {
            this.$Message.info('删除成功！')
            this.classQuery(0)
          } else {
            this.$Message.info(res.data.msg)
          }
        })
    }
  },
  watch: {
    //   provinceId:'getCityList',
  },
  created() {
    //  this.getProvinceList();
  },
  mounted() {
    if (
      sessionStorage.getItem('schoolList-queryData') != undefined &&
      sessionStorage.getItem('isSchoolDetailBack') != undefined
    ) {
      //页面返回时 根据缓存的查询条件查询
      let queryData = JSON.parse(sessionStorage.getItem('schoolList-queryData'))
      this.schoolName = queryData.schoolName
      //   this.provinceId=queryData.provinceId;
      //   this.cityId=queryData.cityId,
      this.schoolTypeId = queryData.schoolTypeId
      this.pageNum = queryData.pageNum
      this.pageSize = queryData.pageSize
      this.classQuery(0)
    } else {
      this.classQuery(1)
    }
    sessionStorage.removeItem('schoolList-queryData')
    sessionStorage.removeItem('isSchoolDetailBack')
  }
}
</script>