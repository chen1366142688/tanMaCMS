<template>
    <Tabs type="card">
        <TabPane label="测试历史" name="help">
            <Card>
                <span>起始日期：</span>
                <DatePicker :value="startTime" @on-change="startTimeChange" format="yyyy-MM-dd" type="date" placeholder="起始日期" style="width: 200px;margin-left:20px"></DatePicker>
                <span>截止日期：</span>
                <DatePicker :value="endTime" @on-change="endTimeChange" format="yyyy-MM-dd" type="date" placeholder="结束日期" style="width: 200px;margin-left:20px"></DatePicker>
                <span style="color:red">* 截止日期并不包含在查询时间内</span>
                <Select v-model="provinceId" style="width:100px;margin-left:40px;">
                    <Option v-for="item in provinceList" :value="item.provinceId" :key="item.provinceId">{{ item.provinceName }}</Option>
                </Select>
                <Select v-model="cityId" style="width:100px;margin-left:40px;">
                    <Option v-for="item in cityList" :value="item.cityId" :key="item.cityId">{{ item.cityName }}</Option>
                </Select>
                <Button type="success" style="margin-left:40px;" @click="search">筛选</Button>
                <!-- <Button type="success" style="margin-left:40px;" @click="toold">恢复默认</Button> -->
            </Card>
            <Card style="margin-top:20px">
                <Table border :columns="columns1" :data="testList"></Table>
                <div style="margin: 10px;overflow: hidden">
                    <div style="float: right;">
                        <Page :total="total" :current="pageNo" :page-size="pageSize" @on-change='pageNumChange' @on-page-size-change='pageSizechange' show-total show-sizer></Page>
                    </div>
                </div>
            </Card>
            <Modal
        v-model="deleteTf"
        title="提示"
        @on-ok="ok"
        @on-cancel="cancel">
        <p>确定删除该测试结果吗？</p>
        
    </Modal>
        </TabPane>
    </Tabs>
</template>

<script>
import Vue from 'vue';
export default {
    name: 'test',
    data() {
        return {
            startTime: '',
            endTime: '',
            provinceId: '0',
            provinceList: [],
            cityId: '0',
            cityList: [],
            testList: [],
            columns1: [
                {
                    title: '测试时间',
                    key: 'testTime',
                },
                {
                    title: '姓名',
                    key: 'realName'
                },
                {
                    title: '性别',
                    key: 'gender',
                    render: (h, params) => {
                        const row = params.row;
                        const gender = row.gender == "1" ? '男' : '女';
                        return h('Tag', {

                        }, gender);
                    }
                },
                {
                    title: '年龄',
                    key: 'age',
                },
                {
                    title: '城市',
                    key: 'cityName',
                },
                {
                    title: '学校',
                    key: 'schoolName'
                },
                {
                    title: '年级',
                    key: 'grade'
                },
                {
                    title: '测试成绩',
                    key: 'resultValue',
                },
                {
                    title: '分数',
                    key: 'score',
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        // console.log(params)
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        var vm = this;
                                        vm.deleteTf=true;
                                        vm.testResultId=params.row.testResultId;
                                        // vm.deleteThis(params.row.testResultId)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            pageNo: 1,
            pageSize: 10,
            total: 0,
            deleteTf:false,
            testResultId:''


        };
    },
    watch: {
        provinceId: function(provinceId) {
            var that = this;
            console.log(provinceId)
            if (provinceId) {
                that.getCityListByProvinceId(provinceId);
            }
        }
    },//以V-model绑定数据时使用的数据变化监测  

    methods: {
        startTimeChange(time, tyep) {
            var vm = this;
            console.log(time)
            vm.startTime = time;
        },
        endTimeChange(time, tyep) {
            var vm = this;
            console.log(time)
            vm.endTime = time;
        },
        pageNumChange(value) {  //页码改变方法处理
            if (this.pageNo != value) {
                this.pageNo = value
                this.getTestList();
            }
        },
        pageSizechange(value) {  //页面大小改变方法处理
            if (this.pageSize != value) {
                this.pageSize = value
                this.getTestList();
            }
        },
        search() {
            this.getTestResultHistoryByTestId();
            this.countTestResultHistoryByTestId();
        },
        toold() {
            var vm = this;
            vm.startTime = '';
            vm.endTime = '';
            vm.provinceId = '';
            vm.cityId = '';
        },

        getTestResultHistoryByTestId() {
            var that = this;
            let data = {
                "cityId": that.cityId == '0' ?'' :that.cityId,
                "endTime": that.endTime,
                "pageNo": that.pageNo,
                "pageSize": that.pageSize,
                "provinceId": that.provinceId == '0' ? '':that.provinceId,
                "startTime": that.startTime,
                "testId": that.testId
            }
            this.$axios.post('/v1/corporeitytest/getTestResultHistoryByTestId', data)
                .then(function(response) {
                    console.log(response)
                    that.testList = response.data.response;
                    console.log(that.testList)
                })
                .catch(function(response) {
                    console.log(response);
                });
        },
        countTestResultHistoryByTestId() {
            var that = this;
            let data = {
                "cityId": that.cityId,
                "endTime": that.endTime,
                "provinceId": that.provinceId,
                "startTime": that.startTime,
                "testId": that.testId
            }
            this.$axios.post('/v1/corporeitytest/countTestResultHistoryByTestId', data)
                .then(function(response) {
                    console.log(response)
                    that.total = (response.data.response);
                })
                .catch(function(response) {
                    console.log(response);
                });
        },
        getProvinceList() {
            var that = this;
            this.$axios.get('/v1/region/get/allProvinceInfo')
                .then(function(response) {
                    console.log(response)
                    that.provinceList = [{ provinceId: '0', provinceName: '请选择' }];
                    that.provinceList = that.provinceList.concat(response.data.response);
                })
                .catch(function(response) {
                    console.log(response);
                });
        },
        getCityListByProvinceId(provinceId) {
            var that = this;
            this.$axios.get('/v1/region/get/allCityInfoByProvinceId?provinceId=' + provinceId)
                .then(function(response) {
                    console.log(response)
                    that.cityList = [{ cityId: '0', cityName: '请选择' }];
                    that.cityList = that.cityList.concat(response.data.response);
                })
                .catch(function(response) {
                    console.log(response);
                });
        },
        deleteThis() {
            var that = this;
            var testResultId=that.testResultId;
            this.$axios.get('/v1/corporeitytest/deleteTestResultInfo?testResultId=' + testResultId)
                .then(function(response) {
                    console.log(response)
                    for(let i=0;i<that.testList.length;i++){
                        if(that.testList[i].testResultId==testResultId){
                            that.testList.splice(i, 1);
                        }
                    }
                     that.$Message.info("删除成功");
                })
                .catch(function(response) {
                    console.log(response);
                });
        },
         ok () {
             var vm=this;
              vm.deleteThis() 
            },
            cancel () {
                // this.$Message.info('Clicked cancel');
            },

        updateStatus(testId, effectiveStatus) {
            var that = this;
            let data = {
                "testId": testId,
                "effectiveStatus": effectiveStatus
            }
            this.$axios.get('/v1/corporeitytest/updateTestEffectiveStatusByTestId?testId=' + testId + '&effectiveStatus=' + effectiveStatus)
                .then(function(response) {
                    console.log(response)
                    for (let i = 0; i < that.testList.length; i++) {
                        if (that.testList[i].testId == testId) {
                            that.testList[i].effectiveStatus = effectiveStatus;
                            break;
                        }
                    }

                })
                .catch(function(response) {
                    console.log(response);
                });

        },

    },
    mounted() {
        var vm = this;
        let height = (document.body.offsetHeight - 300) / 2;
        let testId = sessionStorage.getItem('testManage-testItem-testId');
        vm.testId = testId;
        if (testId) {
            vm.getTestResultHistoryByTestId();
            vm.countTestResultHistoryByTestId()

        }
        vm.getProvinceList();


    },
    destroyed() {
        var vm = this;
    }

};
</script>