<template>
    <Card>
        <Card>
            <p>【{{itemName}}】部分分支计算</p>
            <!-- <Select v-model="age" style="width:200px">
                            <Option v-for="item in ageList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <Select v-model="sexSelect" style="width:200px">
                            <Option v-for="item in sexList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <Button type="success" @click="addAgeGender">新增</Button> -->
        </Card>
        <div style="margin-top:10px;height:auto" v-for="(item,aindex) in itemTestItemList" :key="aindex">
            <div style="height: 40px;color:black;background-color:#F0F0F0" @click="openOrClose(aindex)">
                <p style="float:left;height: 100%">【{{item.age}}岁】-【{{item.gender=='1'?'男':'女'}}】</p>
                <p style="float:right;height: 100%;margin-right:20px;">百分比:{{item.totalPercent}}%
                    <Icon v-if="!item.openStatus" type="ios-arrow-down" />
                    <Icon v-if="item.openStatus" type="ios-arrow-up" />
                </p>
            </div>
            <div v-if="item.openStatus" style="margin-top:10px;color:black;background-color:white" v-for="(citem,bindex) in item.list" :key="bindex">
                        <div style="height: 100%">
                            <div>
                                <Checkbox style="width:20px;" v-model="citem.checkStatus" @on-change="changeIndex(aindex,bindex)"></Checkbox>
                                <div style="margin-left:10px;width:200px;display: inline;">
                                    <span style="margin-left:20px;width:200px;">{{citem.testItemName}}</span>
                                </div>
                                <input style="display：inline;margin-left:40px;" @focus="changeab(aindex,bindex)" @input="percentChange(aindex,bindex,citem.percent)" v-model="citem.percent" size="small" placeholder="百分占比" />
                                <span>%</span>
                                <Select v-model="citem.groupId" style="width:200px;display：inline;margin-left:40px">
                                    <Option v-for="item in groupList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
        <Card style="height:70px">
            <div style="">
                <Button type="success" @click="baseSubmit" style="float:right;">提交结果</Button>
                <!-- <Button type="success" @click="ok" style="float:right;">ss</Button>   -->
            </div>
        </Card>

    </Card>
</template>
<script>
import Vue from 'vue';
export default {
    name: 'test',
    data() {
        return {
            itemId: '',
            itemName: '',
            aindex: '',
            bindex: '',
            sexSelect: '1',
            sexList: [
                {
                    value: '1',
                    label: '男'
                },
                {
                    value: '2',
                    label: '女'
                }
            ],
            age: '6',
            ageList: [
                {
                    value: '6',
                    label: '6岁'
                },
                {
                    value: '7',
                    label: '7岁'
                },
                {
                    value: '8',
                    label: '8岁'
                },
                {
                    value: '9',
                    label: '9岁'
                },
                {
                    value: '10',
                    label: '10岁'
                },
                {
                    value: '11',
                    label: '11岁'
                },
                {
                    value: '12',
                    label: '12岁'
                },
                {
                    value: '13',
                    label: '13岁'
                },
                {
                    value: '14',
                    label: '14岁'
                },
                {
                    value: '15',
                    label: '15岁'
                },
                {
                    value: '16',
                    label: '16岁'
                },
                {
                    value: '17',
                    label: '17岁'
                },
                {
                    value: '18',
                    label: '18岁'
                },
                {
                    value: '19',
                    label: '19岁'
                },
                {
                    value: '20',
                    label: '20岁'
                },

            ],
            itemTestItemList: [
                {
                    age: 12,
                    gender: "1",
                    totalPercent: 100,
                    openStatus: true,
                    list: [

                    ]
                }
            ],
            testItemList: [],
            groupList: [
                {
                    value: 0,
                    label: '不分组'
                },
                {
                    value: 1,
                    label: '第一组'
                },
                {
                    value: 2,
                    label: '第二组'
                },
                {
                    value: 3,
                    label: '第三组'
                },
                {
                    value: 4,
                    label: '第四组'
                },
                {
                    value: 5,
                    label: '第五组'
                },
                {
                    value: 6,
                    label: '第六组'
                }
            ]

        };
    },
    watch: {

    },//以V-model绑定数据时使用的数据变化监测  

    methods: {
        closable() {
            this.$Message.info({
                content: 'Tips for manual closing',
                duration: 10,
                closable: true
            });
        },
        addAgeGender() {
            var vm = this;
            let itemTestItemList = vm.itemTestItemList;
            let gender = vm.sexSelect;
            let age = vm.age;
            for (let i = 0; i < itemTestItemList.length; i++) {
                let obj = itemTestItemList[i];
                if (obj.age == age && obj.gender == gender) {
                    vm.$Message.error("该年龄和性别已存在！");
                    return false;
                }
            }
            let itemObj = {
                age: age,
                gender: gender,
                totalPercent: 0,
                openStatus: true,
                list: [
                ]
            };
            vm.itemTestItemList.push(itemObj);
        },
        openOrClose(index) {
            var vm = this;
            vm.itemTestItemList[index].openStatus = vm.itemTestItemList[index].openStatus ? false : true;
        },
        changeab(aindex, bindex) {
            var vm = this;
            vm.aindex = aindex;
            vm.bindex = bindex;
            console.log(aindex)
        },
        changeIndex(aindex, bindex) {
            var vm = this;
            vm.aindex = aindex;
            vm.bindex = bindex;

            let itemTestItemList = vm.itemTestItemList;
            let age = itemTestItemList[aindex].age;
            let gender = itemTestItemList[aindex].gender;
            let itemId = vm.itemId;
            let itemName = vm.itemName;
            let percent = 0;

            let obj = itemTestItemList[aindex].list[bindex];

            if (obj.checkStatus == true) {
                obj.age = age;
                obj.gender = gender;
                obj.itemId = itemId;
                obj.itemName = itemName;
                if (obj.groupId == 0) {
                    obj.groupId = null;
                }
            }

            console.log(obj)
            console.log(itemTestItemList[aindex].list);
            let listSize = itemTestItemList[aindex].list.length;

            for (let i = 0; i < listSize; i++) {
                // console.log(obj.checkStatus)
                if (itemTestItemList[aindex].list[i].checkStatus) {

                    if (itemTestItemList[aindex].list[i].percent) {
                        percent += Number(itemTestItemList[aindex].list[i].percent);
                    }
                    // percent+=Number(obj.percent);
                    console.log(percent)

                }
                itemTestItemList[aindex].totalPercent = percent;
            }
            // console.log(aindex);
            // console.log(bindex);
        },
        percentChange(aindex, bindex, value) {
            var vm = this;
            //  let aindex=vm.aindex;
            // let bindex=vm.bindex;
            // vm.aindex = aindex;
            // vm.bindex = bindex;

            let itemTestItemList = vm.itemTestItemList;
            let age = itemTestItemList[aindex].age;
            let gender = itemTestItemList[aindex].gender;
            let itemId = vm.itemId;
            let itemName = vm.itemName;
            let percent = 0;

            let obj = itemTestItemList[aindex].list[bindex];

            if (obj.checkStatus == true) {
                obj.age = age;
                obj.gender = gender;
                obj.itemId = itemId;
                obj.itemName = itemName;
                if (obj.groupId == 0) {
                    obj.groupId = null;
                }
            }

            console.log(obj)
            console.log(itemTestItemList[aindex].list);
            let listSize = itemTestItemList[aindex].list.length;

            for (let i = 0; i < listSize; i++) {
                // console.log(obj.checkStatus)
                if (itemTestItemList[aindex].list[i].checkStatus) {

                    if (itemTestItemList[aindex].list[i].percent) {
                        percent += Number(itemTestItemList[aindex].list[i].percent);
                    }
                    // percent+=Number(obj.percent);
                    console.log(percent)

                }
                itemTestItemList[aindex].totalPercent = percent;
            }
        },
        getTestItemInfo() {
            var that = this;
            // that.detail.splice(detailId, 1);
            this.$axios.get('/v1/corporeitytest/getTestItemInfo')
                .then(function(response) {
                    // console.log(response)
                    that.testItemList = response.data.response
                })
                .catch(function(response) {
                    console.log(response);
                });
        },
        getItemNameByItemId(itemId) {
            var that = this;
            // that.detail.splice(detailId, 1);
            this.$axios.get('/v1/corporeitytest/getItemNameByItemId?itemId=' + itemId)
                .then(function(response) {
                    // console.log(response)
                    that.itemName = response.data.response
                })
                .catch(function(response) {
                    console.log(response);
                });
        },
        getItemAllTestItemInfoListByItemId(itemId) {
            var that = this;
            // that.detail.splice(detailId, 1);
            this.$axios.get('/v1/corporeitytest/getItemAllTestItemInfoListByItemId?itemId=' + itemId)
                .then(function(response) {
                    console.log(response)
                    that.itemTestItemList = response.data.response;
                    for (let i = 0; i < that.itemTestItemList.length; i++) {
                        let list = that.itemTestItemList[i];
                    }
                })
                .catch(function(response) {
                    console.log(response);
                });
        },
        baseSubmit() {
            var that = this;
            var checkNum = /^\d+$/;
            console.log(that.itemTestItemList)
            let itemTestItemList = that.itemTestItemList;
            for (let i = 0; i < itemTestItemList.length; i++) {
                let objList = itemTestItemList[i].list;
                let totalPercent = 0;
                let checkNow = false;
                for (let j = 0; j < objList.length; j++) {
                    if (objList[j].checkStatus) {
                        console.log(objList[j])
                        if (!checkNum.test(objList[j].percent)) {
                            that.$Message.info("百分比只能是整数，请检查");
                            return false;
                        }
                        totalPercent += Number(objList[j].percent);
                        checkNow = true;
                        if (objList[j].groupId == 0) {
                            objList[j].groupId = null;
                        }
                    }
                }
                if (checkNow) {
                    if (totalPercent != 100) {
                        that.$Message.info("你当前有未满或超过百分之百的项目！");
                        return false;
                    }
                }
            }
            let data = {
                "itemId": that.itemId,
                "list": itemTestItemList
            }
            // return false;
            this.$axios.post('/v1/corporeitytest/upsertTestItemInfo', data)
                .then(function(response) {
                    console.log(response)
                    if (response.data.code == 10000) {
                        that.$Message.info("保存成功");
                    } else {
                        that.$Message.info("保存失败");
                    }

                    // that.testDetailInfo = response.data.response
                })
                .catch(function(response) {
                    console.log(response);
                });
        }
    },
    mounted() {
        var vm = this;
        let height = (document.body.offsetHeight - 300) / 2;
        vm.getTestItemInfo();
        let itemId = sessionStorage.getItem('testManage-scoreCalculate-itemId');
        if (itemId) {
            vm.itemId = itemId;
            vm.getItemAllTestItemInfoListByItemId(itemId);
            vm.getItemNameByItemId(itemId);
        }


    },
    destroyed() {
        var vm = this;

    }

};
</script>