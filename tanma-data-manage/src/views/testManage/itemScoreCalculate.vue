<template>
    <Card>
        <Card>
            <p>【{{itemName}}】部分分支计算</p>
        </Card>
        <div style="margin-top:10px;height:auto" v-for="(item,aindex) in itemTestItemList" :key="aindex">
            <div style="height: 40px;color:black;background-color:#F0F0F0" @click="openOrClose(aindex)">
                <p style="float:left;height: 100%">【{{item.age}}岁】-【{{item.gender=='1'?'男':'女'}}】</p>
                <p style="float:right;height: 100%;margin-right:20px;">百分比:{{item.totalPercent}}%
                    <Icon v-if="!item.openStatus" type="ios-arrow-down" />
                    <Icon v-if="item.openStatus" type="ios-arrow-up" />
                </p>
            </div>

            <div v-if="item.openStatus" style="float:right;margin-top:10px;">
                <Button type="success" @click="addGroup(aindex)">添加分组</Button>
            </div>
            <div v-if="item.openStatus" style="margin-top:50px;color:black;background-color:white" v-for="(citem,bindex) in item.groupList" :key="bindex">
                <div style="width:100%;">
                    <div style="display: inline;float:left,width:100px;">第{{bindex+1}}组</div>
                    <input style="display: inline;margin-left:60px;" @input="percentChange(aindex,citem.groupPercent)" v-model="citem.groupPercent" size="small" placeholder="百分占比" />%
                    <Button type="error" v-if="bindex != 0" @click="deleteThisGroup(aindex,bindex)">删除该分组</Button>
                </div>
                <div style="width:100%;margin-top:20px">
                    <div style="display: inline;float:left,width:100px;">包含项目</div>
                    <div style="display: inline;margin-left:36px;" v-for="(testItem,cindex) in citem.testItemList" :key="cindex">
                        <div style="display: inline;">
                            <Select v-model="testItem.testItemId" style="width:200px">
                                <Option v-for="item in testItemList" :value="item.testItemId" :key="item.testItemId">{{ item.testItemName }}</Option>
                            </Select>
                        </div>
                        <Button type="error" v-if="cindex !=0" @click="deleteThisItem(aindex,bindex,cindex)">删除该项目</Button>
                    </div>
                    <div style="display: inline;margin-left:18px;">
                        <Button type="success" @click="addTestItem(aindex,bindex)">添加项目</Button>
                    </div>
                </div>
            </div>
        </div>
        <Card style="height:70px;margin-top:20px;">
            <div style="">
                <Button type="success" @click="baseSubmit" style="float:right;">提交结果</Button>
                <!-- <Button type="success" @click="ok" style="float:right;">ss</Button>   -->
            </div>
        </Card>

    </Card>
</template>
<script>
import Vue from "vue";
export default {
  name: "test",
  data() {
    return {
      itemId: "",
      itemName: "",
      aindex: "",
      bindex: "",
      sexSelect: "1",
      sexList: [
        {
          value: "1",
          label: "男"
        },
        {
          value: "2",
          label: "女"
        }
      ],
      age: "6",
      ageList: [
        {
          value: "6",
          label: "6岁"
        },
        {
          value: "7",
          label: "7岁"
        },
        {
          value: "8",
          label: "8岁"
        },
        {
          value: "9",
          label: "9岁"
        },
        {
          value: "10",
          label: "10岁"
        },
        {
          value: "11",
          label: "11岁"
        },
        {
          value: "12",
          label: "12岁"
        },
        {
          value: "13",
          label: "13岁"
        },
        {
          value: "14",
          label: "14岁"
        },
        {
          value: "15",
          label: "15岁"
        },
        {
          value: "16",
          label: "16岁"
        },
        {
          value: "17",
          label: "17岁"
        },
        {
          value: "18",
          label: "18岁"
        },
        {
          value: "19",
          label: "19岁"
        },
        {
          value: "20",
          label: "20岁"
        }
      ],
      itemTestItemList: [
        {
          age: 12,
          gender: "1",
          totalPercent: 100,
          openStatus: true,
          groupList: [
            {
              groupIndex: 1,
              percent: 10,
              testItemList: [
                {
                  testItemId: 1,
                  testItemName: "sss"
                }
              ]
            }
          ]
        }
      ],
      testItemList: [
        {
          testItemId: 1,
          testItemName: "sss"
        }
      ],
      groupList: [
        {
          value: 0,
          label: "不分组"
        },
        {
          value: 1,
          label: "第一组"
        },
        {
          value: 2,
          label: "第二组"
        },
        {
          value: 3,
          label: "第三组"
        },
        {
          value: 4,
          label: "第四组"
        },
        {
          value: 5,
          label: "第五组"
        },
        {
          value: 6,
          label: "第六组"
        }
      ]
    };
  },
  watch: {}, //以V-model绑定数据时使用的数据变化监测

  methods: {
    openOrClose(index) {
      var vm = this;
      vm.itemTestItemList[index].openStatus = vm.itemTestItemList[index]
        .openStatus
        ? false
        : true;
    },
    getTestItemInfo() {
      var that = this;
      // that.detail.splice(detailId, 1);
      this.$axios
        .get("/v1/corporeitytest/getTestItemInfo")
        .then(function(response) {
          console.log(response);
          that.testItemList = response.data.response;
          that.testItemList.push({
            testItemId: 0,
            testItemName: "请选择"
          });
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    getItemNameByItemId(itemId) {
      var that = this;
      // that.detail.splice(detailId, 1);
      this.$axios
        .get("/v1/corporeitytest/getItemNameByItemId?itemId=" + itemId)
        .then(function(response) {
          // console.log(response)
          that.itemName = response.data.response;
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    //删除分组
    deleteThisGroup(aindex,bindex){
      var vm=this;
      vm.itemTestItemList[aindex].groupList.splice(bindex, 1);
    },
    // 添加分组
    addGroup(aindex) {
      var vm = this;
      let data = {
        groupIndex: vm.itemTestItemList[aindex].groupList.length + 1,
        groupPercent: 100,
        testItemList: [
          {
            testItemId: 1,
            testItemName: "sss"
          }
        ]
      };
       console.log(aindex)
      console.log(vm.itemTestItemList[aindex])
      console.log(data)
      vm.itemTestItemList[aindex].groupList.push(data);
      let groupList = vm.itemTestItemList[aindex].groupList;
      vm.itemTestItemList[aindex].totalPercent = 0;
      for (let i = 0; i < groupList.length; i++) {
        vm.itemTestItemList[aindex].totalPercent += Number(
          vm.itemTestItemList[aindex].groupList[i].groupPercent
        );
      }
    },
    //删除项目
    deleteThisItem(aindex,bindex,cindex){
      var vm=this;
      vm.itemTestItemList[aindex].groupList[bindex].testItemList.splice(cindex, 1);
      // console.log(vm.itemTestItemList)
    },
    // 添加项目
    addTestItem(aindex, bindex) {
      var vm = this;
      let data = {
        testItemId: 1,
        testItemName: "sss"
      };
      console.log(aindex);
      console.log(bindex);
      vm.itemTestItemList[aindex].groupList[bindex].testItemList.push(data);
    },
    percentChange(aindex, groupPercent) {
      var vm = this;
      let groupList = vm.itemTestItemList[aindex].groupList;
      vm.itemTestItemList[aindex].totalPercent = 0;
      for (let i = 0; i < groupList.length; i++) {
        vm.itemTestItemList[aindex].totalPercent += Number(
          vm.itemTestItemList[aindex].groupList[i].groupPercent
        );
      }
    },

    getItemAllTestItemInfoListByItemId(itemId) {
      var that = this;
      // that.detail.splice(detailId, 1);
      this.$axios
        .get("/v1/corporeitytest/getItemTestItemListByItemId?itemId=" + itemId)
        .then(function(response) {
          console.log(response);
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
      console.log(that.itemTestItemList);
      let itemTestItemList = that.itemTestItemList;
      for (let i = 0; i < itemTestItemList.length; i++) {
        let itemTestItem = itemTestItemList[i];
        let groupList=itemTestItem.groupList;
        let totalPercent = 0;
        let checkNow = false;
        for (let j = 0; j < groupList.length; j++) {
          if (!checkNum.test(groupList[j].groupPercent)) {
            console.log(i)
            console.log(j)
            that.$Message.info("百分比只能是整数，请检查");
            return false;
          }
            // console.log(groupList[j].groupPercent == 0)
          if (groupList[j].groupPercent == 0) {
            //   let param= groupList.splice(j, 1);
            //   console.log(param)
            that.itemTestItemList[i].groupList.splice(j, 1);
            // console.log(that.itemTestItemList[i].groupList)
          }else{
            //   console.log("111111111111")
            for(let k=0;k<that.itemTestItemList[i].groupList[j].testItemList.length;k++){
                // console.log(that.testItemList)
                for(let h=0;h<that.testItemList.length;h++){
                    // console.log(that.testItemList)
                    if(that.testItemList[h].testItemId   == that.itemTestItemList[i].groupList[j].testItemList[k].testItemId){
                        that.itemTestItemList[i].groupList[j].testItemList[k].testItemName=that.testItemList[h].testItemName;
                    }
                }
            }
          }
        }
        // console.log(itemTestItemList[i].groupList)
        if (that.itemTestItemList[i].groupList.length > 0) {
          if (that.itemTestItemList[i].totalPercent != 100) {
            that.$Message.info("你当前有未满或超过百分之百的项目！");
            return false;
          }
        }
      }
console.log(that.itemName)
      let data = {
        itemId: that.itemId,
        itemName: that.itemName,
        list: itemTestItemList
      };
    //   console.log(that.itemTestItemList);
    //   return false;
      this.$axios
        .post("/v1/corporeitytest/upsertTestItemInfoNew", data)
        .then(function(response) {
          console.log(response);
          if (response.data.code == 10000) {
            that.$Message.info("保存成功");
            that.$router.go(-1);  
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
    let itemId = sessionStorage.getItem("testManage-scoreCalculate-itemId");
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