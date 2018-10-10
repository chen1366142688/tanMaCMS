<template>
  <div>
    <div>
      <h1>学校数据导出管理</h1>
    </div>
    <div style="margin-top:15px;">
      <div>
        <span>{{schoolName}}</span>
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
      schoolId: '',
      schoolData:'',
      schoolName:'',
      resultColumns: [
        {
          title: '活动名称',
          key: 'activityName',
          align: 'center'
          //   minWidth: 250
        },
        {
          title: '距离现在时间(分)',
          key: 'dataTime',
          align: 'center'
          //   width: 150
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          //   width: 400,
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
                      this.addStudentData(
                        params.row.schoolId,
                        params.row.activityId
                      )
                    }
                  }
                },
                '生成数据'
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
                      this.exportSchoolTestData(
                        params.row.schoolId,
                        params.row.activityId,
                        1
                      )
                    }
                  }
                },
                '导出该组数据(全)'
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
                      this.exportSchoolTestData(
                        params.row.schoolId,
                        params.row.activityId,
                        2
                      )
                    }
                  }
                },
                '导出该组数据（值）'
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
    getExportList(schoolId) {
      var vm = this
      let data = {
        pageNo: vm.pageNum,
        pageSize: vm.pageSize,
        schoolId: schoolId
      }
      this.$axios.post('/v1/export/getExportList', data).then(res => {
        if (res.data.code == 10000) {
          this.resultData = res.data.response
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    countNum(schoolId) {
      var vm = this
      
      this.$axios.get('/v1/export/countNum?schoolId='+schoolId).then(res => {
        if (res.data.code == 10000) {
          this.total = res.data.response
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    getSchoolData(schoolId) {
      //编辑时获取场馆数据
      // this.pageTitle = '学校编辑'
      this.$axios
        .get('/v1/school/getSchoolDetail?schoolId=' + schoolId)
        .then(res => {
          if (res.data.code == 10000) {
            console.log(res)
            let data = res.data.response
            this.schoolData = data
            this.schoolName=data.name;
          } else {
            this.$Message.info(res.data.msg)
          }
        })
    },
    pageNumChange(value) {
      //页码改变方法处理
      if (this.pageNum != value) {
        this.pageNum = value
        this.getExportList(this.schoolId)
      }
    },
    pageSizechange(value) {
      //页面大小改变方法处理
      if (this.pageSize != value) {
        this.pageSize = value
        this.getExportList(this.schoolId)
      }
    },

    addStudentData(schoolId, activityId) {
      this.$Message.info('数据生成中...')
      this.$axios
        .get(
          '/v1/export/addStudentData?schoolId=' +
            schoolId +
            '&activityId=' +
            activityId
        )
        .then(res => {
          if (res.data.code == 10000) {
            this.$Message.info('数据生成中，请稍后再导出')
            // this.getExportList(this.schoolId)
          } else {
            this.$Message.info(res.data.msg)
          }
        })
    },

    exportSchoolTestData(schoolId, activityId, type) {
      //   console.log(schoolId)
      let url =
        this.$axios.defaults.baseURL +
        '/v1/export/exportSchoolTestData?schoolId=' +
        schoolId +
        '&activityId=' +
        activityId +
        '&type=' +
        type +
        '&token=' +
        sessionStorage.getItem('token')
      window.open(url)
    }
  },
  watch: {
    //   provinceId:'getCityList',
  },
  created() {
    //  this.getProvinceList();
  },
  mounted() {
    var vm = this
    let schoolId = sessionStorage.getItem('schoolList-exportGroupList-schoolId')
    vm.schoolId = schoolId
    if (schoolId) {
      // schoolId=1;
      vm.getExportList(schoolId);
      vm.getSchoolData(schoolId);
      vm.countNum(schoolId);
    }
  }
}
</script>