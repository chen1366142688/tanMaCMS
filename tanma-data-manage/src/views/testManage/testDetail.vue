<style>
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}

.demo-upload-list img {
  width: 100%;
  height: 100%;
}

.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}

.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}

.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
<template>
  <div style="margin-left:15px;">
    <Tabs type="card">
      <TabPane label="测试项目详情">
        <Card>
          <div style="margin-left:20px;" v-if="testId">
            <span>本测试项目已被使用 {{haveTestNum}}次</span>
            <Button type="success" @click="toTestHistory" style="float:right;">查看测试历史</Button>
          </div>
          <Form :label-width="80" class="baseInfo" style="margin-top:20px;">
            <FormItem label="是否启用" class="baseInfoitem">
              <RadioGroup v-model="accountStatus">
                <Radio label="1">开启</Radio>
                <Radio label="0">关闭</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="项目名称" class="baseInfoitem">
              <Input v-model="testName" placeholder="请输入项目名称" />
                        </FormItem>
              <FormItem label="排序序号" class="baseInfoitem">
                <Input v-model="sortIndex" placeholder="请输入排序序号" />
                        </FormItem>
                <FormItem label="适用范围" class="address">
                  <Select v-model="sexSelect" style="width:200px">
                    <Option v-for="item in sexList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                  <Select v-model="ageSelect" style="width:200px">
                    <Option v-for="item in ageList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="测试类型" class="baseInfoitem">
                  <Select :disabled="haveTestType" v-model="testType" style="width:200px" @on-change="typeChange" :label-in-value="true">
                    <Option v-for="item in testTypeList" :value="item.testItemId" :key="item.testItemId">{{ item.testItemName }}</Option>
                  </Select>
                  <span v-if="haveTestType" style="color:red">*该适用范围内暂无测试项目</span>
                </FormItem>

                <FormItem label="封面地址">
                  <template>
                    <div class="demo-upload-list" v-for="(item,tindex ) in coverPhotoUploadList" :key="tindex">
                      <template v-if="item.status === 'finished'">
                        <img :src="item.url">
                        <div class="demo-upload-list-cover">
                          <Icon type="ios-eye-outline" @click.native="coverhandleView(item.name)"></Icon>
                          <Icon type="ios-trash-outline" @click.native="coverhandleRemove(tindex)"></Icon>
                        </div>
                      </template>
                      <template v-else>
                        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                      </template>
                    </div>
                    <Upload ref="upload" :show-upload-list="false" :on-success="coverhandleSuccess" :format="['jpg','jpeg','png']" :max-size="51200" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="coverhandleBeforeUpload" multiple type="drag" :action="updateUrl" name="muFiles" style="display: inline-block;width:58px;">
                      <div style="width: 58px;height:58px;line-height: 58px;">
                        <Icon type="ios-camera" size="20"></Icon>
                      </div>
                    </Upload>
                    <div style="color:red">
                      *请严格按照要求上传。图片格式：.png；尺寸：702 px * 200 px。
                    </div>
                    <Modal title="View Image" v-model="visibless">
                      <img :src="coverPhoto" style="width: 100%">
                                </Modal>
                  </template>
                </FormItem>

                <FormItem label="测试目的">
                  <Input v-model="testGoal" type="textarea" :autosize="{minRows: 4,maxRows: 8}" style="width:750px;" />
                        </FormItem>
                  <FormItem label="测试步骤">
                    <Card>
                      <Button type="success" @click="addStep">新增</Button>
                      <Button type="warning" @click="clearStep">清空</Button>
                    </Card>
                    <Card v-if="stepList">
                      <p v-for="(step,orderIndex) in stepList" :key="orderIndex">
                        {{orderIndex+1
                        < 10 ? '0' +(orderIndex+1) :orderIndex+1}} <Input v-model="step.stepDetail" style="width:1300px;" placeholder="请输入步骤内容" />
                        <Button type="warning" style="display:inline;margin-left:40px;" @click="deleteStep(orderIndex)">删除</Button>
                      </p>
                    </Card>
                  </FormItem>
                  <FormItem label="原理简介" class="baseInfoitem">
                    <Card shadow>
                      <Input v-model="theoryIntroduction" type="textarea" :autosize="{minRows: 4,maxRows: 8}" style="width:750px;"></Input>
                    </Card>
                  </FormItem>
                  <FormItem label="测试原理" class="baseInfoitem">
                    <Card shadow>
                      <textarea class='tinymce-textarea' id="testTheory" placeholder="这里输入文字..........." style="width:750px;"></textarea>
                    </Card>
                  </FormItem>

                  <FormItem label="视屏地址" class="baseInfoitem">
                    <Select v-model="materialId" style="width:200px">
                      <Option v-for="item in videoList" :value="item.materialId" :key="item.materialId">{{ item.materialName }}</Option>
                    </Select>
                    <!-- <Input v-model="vedioAddress" style="width:850px;" />
                            <br/>
                               <Upload  ref="upload"
                                        :show-upload-list="false"
                                        :on-success="uploadFileSuccessVideo"
                                        :before-upload="handleUploadvideo"
                                        :format="['mp4','MP4']"
                                        :max-size="1000000000"
                                        :action="cdnUpdateUrl+'?type=test_video'"
                                        name="muFiles"
                                        type="drag"
                                        style="display: inline-block;width:100px;">
                                    <div  style="width: 100px;height:20px;line-height: 20px;">
                                        {{uploadVideoTitle}}
                                    </div>
                                </Upload>  -->
                  </FormItem>
                  <FormItem label="视屏预览" class="baseInfoitem">
                    <video :src="vedioAddress" style="width:300px;" controls="controls">
                    </video>
                  </FormItem>

                  <FormItem label="视屏图片">
                    <template>
                      <div class="demo-upload-list" v-for="(item,tindex ) in testUploadList" :key="tindex">
                        <template v-if="item.status === 'finished'">
                          <img :src="item.url">
                          <div class="demo-upload-list-cover">
                            <Icon type="ios-eye-outline" @click.native="videohandleView(item.name)"></Icon>
                            <Icon type="ios-trash-outline" @click.native="videohandleRemove(tindex)"></Icon>
                          </div>
                        </template>
                        <template v-else>
                          <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                        </template>
                      </div>
                      <Upload ref="upload" :show-upload-list="false" :on-success="videohandleSuccess" :format="['jpg','jpeg','png']" :max-size="51200" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="videohandleBeforeUpload" multiple type="drag" :action="updateUrl" name="muFiles" style="display: inline-block;width:58px;">
                        <div style="width: 58px;height:58px;line-height: 58px;">
                          <Icon type="ios-camera" size="20"></Icon>
                        </div>
                      </Upload>
                      <div style="color:red">
                        *请严格按照要求上传。图片格式：.png；尺寸：1000 px * 720 px。
                      </div>
                      <Modal title="View Image" v-model="visibles">
                        <img :src="teachingVideoPhoto" style="width: 100%">
                                </Modal>
                    </template>
                  </FormItem>
                  <FormItem label="页签数" class="baseInfoitem">
                    <Select v-model="tabNumSelect" style="width:200px">
                      <Option v-for="item in tabNumList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </FormItem>

                  <Card v-for="(tab,aindex) in tabList" :key="aindex">
                    <h5 style="text-align: center">页签{{tab.letterIndex}}({{tab.letterIndex}}为变量名)</h5>
                    <FormItem label="标签类型" class="baseInfoitem">
                      <Select v-model="tab.tabType" style="width:200px">
                        <Option v-for="item in tabTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                    </FormItem>
                    <FormItem label="标签名称" class="baseInfoitem">
                      <Input v-model="tab.tabName" />
                            </FormItem>
                      <FormItem label="标签说明">
                        <Input v-model="tab.tabDescribe" type="textarea" :autosize="{minRows: 4,maxRows: 8}" style="width:750px;" />
                            </FormItem>

                        <FormItem label="标签图片" v-if="tab.tabType == '1'">
                          <template>
                            <div class="demo-upload-list" v-for="(item,bindex ) in tab.uploadList" :key="bindex">
                              <template v-if="item.status === 'finished'">
                                <img :src="item.url">
                                <div class="demo-upload-list-cover">
                                  <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                                  <Icon type="ios-trash-outline" @click.native="handleRemove(aindex,bindex)"></Icon>
                                </div>
                              </template>
                              <template v-else>
                                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                              </template>
                            </div>
                            <Upload ref="upload" :show-upload-list="false" :on-success="handleSuccess" :format="['jpg','jpeg','png']" :max-size="51200" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" multiple type="drag" :action="updateUrl" name="muFiles" style="display: inline-block;width:58px;">
                              <div style="width: 58px;height:58px;line-height: 58px;" @click="changeIndex(aindex)">
                                <Icon type="ios-camera" size="20"></Icon>
                              </div>
                            </Upload>
                            <div style="color:red">
                              *请严格按照要求上传。图片格式：.png；尺寸：1000 px * 720 px。
                            </div>
                            <Modal title="View Image" v-model="visible">
                              <img :src="tab.pictureUrl" style="width: 100%">
                                    </Modal>
                          </template>
                        </FormItem>

                        <FormItem label="测试类型" class="baseInfoitem">
                          <Select v-model="tab.testType" style="width:200px">
                            <Option v-for="item in tabTestTypeList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                          </Select>
                        </FormItem>
                        <FormItem label="数据范围" v-if="tab.testType == '1'">
                          <Input v-model="tab.valueStart" placeholder="起始数" style="width:75px;" />
                          <i style="margin-left:10px;">---</i>
                          <Input v-model="tab.valueEnd" placeholder="结尾数" style="width:75px;margin-left:10px;" />
                          <Checkbox v-model="tab.containOneDecimals" style="margin-left:40px;">保留一位小数（如果未勾选，则默认保留到整数）</Checkbox>
                        </FormItem>
                        <FormItem label="按钮名称" v-if="tab.testType == '2'">
                          <i style="margin-left:10px;">“是”类：</i>
                          <Input v-model="tab.yesName" placeholder="填写名称" style="width:75px;" />
                          <i style="margin-left:40px;">“否”类：</i>
                          <Input v-model="tab.noName" placeholder="填写名称" style="width:75px;margin-left:10px;" />
                            </FormItem>

                          <FormItem label="数据单位" v-if="tab.tabType == '1' || tab.tabType == '3'">
                            <Select v-model="tab.valueUnit" style="width:200px">
                              <Option v-for="item in UnitList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                          </FormItem>

                          <FormItem label="最长时间" v-if="tab.tabType == '2'">
                            <Input v-model="tab.maxTime" placeholder="最长时间" style="width:75px;" />秒（超过此时间，计时自动终止。）
                            </FormItem>
                            <!-- <FormItem label="小数点" v-if="tab.tabType == '2'">
                                            <Checkbox v-model="tab.decimals" style="margin-left:0px;">保留一位小数（如果未勾选，则默认保留到整数）</Checkbox>
                                        </FormItem> -->

                            <FormItem label="倒计时长" v-if="tab.tabType == '3'">
                              <Input v-model="tab.maxTime" placeholder="倒计时长" style="width:75px;" />
                            </FormItem>

                              <FormItem label="播放音频" v-if="tab.tabType == '3'">
                                <!-- <Input v-model="tab.containMusicUrl" />
                                <br/>
                                <font v-on:click="handleUploadmusic(aindex)" >
                                    <Upload  ref="upload"
                                        :show-upload-list="false"
                                        :on-success="uploadFileSuccessMusic"
                                        :format="['mp3','MP3','WMA','MP3PRO','WAV']"
                                        :max-size="1000000000"
                                        :action="cdnUpdateUrl+'?type=test_music'"
                                        name="muFiles"
                                        type="drag"
                                        style="display: inline-block;width:100px;height:20px;">
                                        <div  style="width: 100px;height:20px;line-height: 20px;">
                                            上传音频
                                        </div>
                                    </Upload>  
                                    </font>
                                <br/> -->
                                <Select v-model="tab.musicId" style="width:200px">
                                  <Option v-for="item in musicList" :value="item.materialId" :key="item.materialId">{{ item.materialName }}</Option>
                                </Select>
                                <Checkbox v-model="tab.containMusic">是否播放音频</Checkbox>
                              </FormItem>

                  </Card>

                  <FormItem label="参数计算" class="baseInfoitem">
                    <Input v-model="computeRule" />
                    <div style="color:red">
                      *运算表达式的字母必须是大写，如：A*B，该格式必须严格执行，否则无法保存。
                    </div>
                    <Checkbox v-model="decimals">保留一位小数（如果未勾选，则默认保留到整数）</Checkbox>
                  </FormItem>
                  <FormItem label="值单位" class="baseInfoitem">
                    <Input v-model="valueUnit" />
                        </FormItem>
          </Form>
        </Card>
        <div style="margin-top:20px;padding-right:20px">
          <Button type="success" @click="baseSubmit" style="float:right;">提交结果</Button>
          <!-- <Button type="success" @click="ok" style="float:right;">ss</Button>   -->
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import Vue from 'vue'
import '../tinymce/js/tinymce/langs/zh_CN.js'
import tinymce from 'tinymce'
// Vue.prototype.$Message = Message ;
export default {
  name: 'test',
  data() {
    return {
      uploadVideoTitle: '上传视频',
      cdnUpdateUrl: '',
      musicIndex: '',
      accountStatus: '1',
      testName: '',
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
      ageSelect: '6',
      ageList: [
        // {
        //     value: '1',
        //     label: '1岁'
        // },
        // {
        //     value: '2',
        //     label: '2岁'
        // },
        // {
        //     value: '3',
        //     label: '3岁'
        // },
        // {
        //     value: '4',
        //     label: '4岁'
        // },
        // {
        //     value: '5',
        //     label: '5岁'
        // },
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
        }
        // {
        //     value: '18',
        //     label: '18岁'
        // },
        // {
        //     value: '19',
        //     label: '19岁'
        // },
        // {
        //     value: '20',
        //     label: '20岁'
        // },
      ],
      testType: '',
      testObj: { value: 0, label: '' },
      testTypeList: [],
      testGoal: '',
      stepList: [],
      vedioAddress: '',
      teachingVideoPhoto: '',
      tabNumSelect: 0,
      tabNumList: [
        {
          value: 0,
          label: '0个'
        },
        {
          value: 1,
          label: '1个'
        },
        {
          value: 2,
          label: '2个'
        },
        {
          value: 3,
          label: '3个'
        },
        {
          value: 4,
          label: '4个'
        },
        {
          value: 5,
          label: '5个'
        },
        {
          value: 6,
          label: '6个'
        },
        {
          value: 7,
          label: '7个'
        },
        {
          value: 8,
          label: '8个'
        },
        {
          value: 9,
          label: '9个'
        },
        {
          value: 10,
          label: '10个'
        },
        {
          value: 11,
          label: '11个'
        },
        {
          value: 12,
          label: '12个'
        },
        {
          value: 13,
          label: '13个'
        },
        {
          value: 14,
          label: '14个'
        },
        {
          value: 15,
          label: '15个'
        },
        {
          value: 16,
          label: '16个'
        },
        {
          value: 17,
          label: '17个'
        },
        {
          value: 18,
          label: '18个'
        },
        {
          value: 19,
          label: '19个'
        },
        {
          value: 20,
          label: '20个'
        },
        {
          value: 21,
          label: '21个'
        },
        {
          value: 22,
          label: '22个'
        },
        {
          value: 23,
          label: '23个'
        },
        {
          value: 24,
          label: '24个'
        },
        {
          value: 25,
          label: '25个'
        },
        {
          value: 26,
          label: '26个'
        }
      ],
      letterList: [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z'
      ],
      tabList: [],
      tabTypeList: [
        {
          value: '1',
          label: '直接输入'
        },
        {
          value: '2',
          label: '正计时'
        },
        {
          value: '3',
          label: '倒计时'
        }
      ],
      updateUrl: '',
      imgUrl: '',
      imgName: '',
      visible: false,
      visibles: false,
      visibless: false,
      uploadList: [],
      itemUploadIndex: '',
      UnitList: [
        {
          value: 'cm',
          label: 'cm'
        },
        {
          value: 'kg',
          label: 'kg'
        },
        {
          value: 'kg/m2',
          label: 'kg/m2'
        },
        {
          value: 'ml',
          label: 'ml'
        },
        {
          value: 's',
          label: 's'
        },
        {
          value: '次',
          label: '次'
        },
        {
          value: 's/次',
          label: 's/次'
        }
      ],
      computeRule: '',
      decimals: false,
      valueUnit: 'cm',
      theoryIntroduction: '',
      testUploadList: [],
      modal1: false,
      haveTestType: true,
      coverPhotoUploadList: [],
      coverPhoto: '',
      tabTestTypeList: [
        {
          value: '1',
          name: '输入数字'
        },
        {
          value: '2',
          name: '返回是与否'
        }
      ],
      testId: '',
      haveTestNum: 0,
      scoreStandardNum: 0,
      sortIndex: '',
      videoList: [],
      materialId: '',
      musicList: []
    }
  },
  watch: {
    tabNumSelect: function(val) {
      var vm = this
      vm.tabNumChange()
    },
    testTypeList: function() {
      // console.log(this.testTypeList)
      var vm = this
      if (vm.testTypeList.length < 1) {
        vm.haveTestType = true
      } else {
        vm.haveTestType = false
      }
    },
    ageSelect: function() {
      var vm = this
      vm.getTanmaTestItem(vm.ageSelect, vm.sexSelect)
    },
    sexSelect: function() {
      var vm = this
      vm.getTanmaTestItem(vm.ageSelect, vm.sexSelect)
    },
    accountStatus: function() {
      var vm = this
      let accountStatus = vm.accountStatus
      if (accountStatus == '0' && vm.scoreStandardNum > 0) {
        vm.$Message.error('该测试项目已用于得分计算，暂时不能关闭！')
        vm.accountStatus = '1'
      }
    },
    materialId: function() {
      var vm = this
      // vm.getVideoList()
      if (vm.materialId) {
        // console.log(vm.materialId)
        let videoList = vm.videoList
        for (var i = 0; i < videoList.length; i++) {
          if (videoList[i].materialId == vm.materialId) {
            vm.vedioAddress = videoList[i].materialUrl
          }
        }
      }
    }
  }, //以V-model绑定数据时使用的数据变化监测

  methods: {
    closable() {
      this.$Message.info({
        content: 'Tips for manual closing',
        duration: 10,
        closable: true
      })
    },
    typeChange(e) {
      // console.log(e)
      var that = this
      that.testObj = e
      // for(let i=0;i<that.testTypeList.length;i++){
      //     if(that.testTypeList[i].testItemId==e.value){
      //         that.sexSelect=that.testTypeList[i].gender;
      //         that.ageSelect=that.testTypeList[i].age+'';
      //     }
      // }
    },
    addStep() {
      var vm = this
      vm.stepList
      let step = {
        stepDetail: '',
        orderIndex: vm.stepList.length + 1
      }
      vm.stepList.push(step)
    },
    clearStep() {
      var vm = this
      vm.stepList = []
    },
    deleteStep(orderIndex) {
      var vm = this
      vm.stepList.splice(orderIndex, 1)
    },
    uploadFileSuccessVideo(response, file, fileList) {
      //上传图片
      this.vedioAddress = response.response[0]
      this.uploadVideoTitle = '上传视频'
    },
    handleUploadvideo(file) {
      this.uploadVideoTitle = '上传中。。。'
    },
    tabNumChange() {
      var vm = this
      // console.log(vm.tabNumSelect - vm.tabList.length)
      let size = vm.tabNumSelect - vm.tabList.length
      if (vm.tabList.length < vm.tabNumSelect) {
        for (let i = 0; i < size; i++) {
          // console.log(i)
          let tab = {
            containMusic: false,
            containMusicUrl: '',
            containOneDecimals: false,
            maxTime: '',
            orderIndex: vm.tabList.length + 1,
            letterIndex: vm.letterList[vm.tabList.length],
            pictureUrl: '',
            tabDescribe: '',
            tabName: '',
            tabType: '1',
            valueEnd: '',
            valueStart: '',
            valueUnit: '',
            testType: '1',
            yesName: '',
            noName: ''
          }
          vm.tabList.push(tab)
        }
      } else {
        // let a=vm.tabList.length - vm.tabNumSelect;
        let b = vm.tabList.length - vm.tabNumSelect
        // console.log(vm.tabNumSelect,b)
        vm.tabList.splice(vm.tabNumSelect, b)
      }
      // console.log(vm.tabNumSelect)
    },

    changeIndex(aindex) {
      this.itemUploadIndex = aindex
    },

    handleView(name) {
      this.imgName = name
      this.visible = true
    },
    coverhandleView(name) {
      this.imgName = name
      this.visibless = true
    },
    videohandleView(name) {
      this.imgName = name
      this.visibles = true
    },
    handleRemove(aindex, bindex) {
      let tabList = this.tabList
      console.log(tabList)
      let tab = tabList[aindex]
      tab.uploadList.splice(bindex, 1)
      tab.pictureUrl = ''
      // const fileList = this.$refs.upload.fileList;
      // this.uploadList.splice(this.uploadList.indexOf(file), 1);
    },
    coverhandleRemove(tindex) {
      this.coverPhotoUploadList.splice(tindex, 1)
      this.coverPhoto = ''
    },
    videohandleRemove(tindex) {
      this.testUploadList.splice(tindex, 1)
      this.teachingVideoPhoto = ''
    },
    handleSuccess(response, file) {
      console.log(file)
      // let file = {
      //     url: response.response[0],
      //     name: '7eb99afb9d5f317c912f08b5212fd69a'
      // };
      let tabList = this.tabList
      let tab = tabList[this.itemUploadIndex]
      file.url = response.response[0]
      tab.pictureUrl = response.response[0]
      if ((response.code = 10000)) {
        tab.uploadList.push(file)
      } else {
        this.$Message.info(response.msg)
      }
      console.log(this.uploadList)
    },
    coverhandleSuccess(response, file) {
      console.log(file)
      file.url = response.response[0]
      this.coverPhoto = response.response[0]
      if ((response.code = 10000)) {
        this.coverPhotoUploadList.push(file)
      } else {
        this.$Message.info(response.msg)
      }
      // console.log(this.uploadList)
    },
    videohandleSuccess(response, file) {
      console.log(file)
      file.url = response.response[0]
      this.teachingVideoPhoto = response.response[0]
      if ((response.code = 10000)) {
        this.testUploadList.push(file)
      } else {
        this.$Message.info(response.msg)
      }
      console.log(this.uploadList)
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: 'The file format is incorrect',
        desc:
          'File format of ' +
          file.name +
          ' is incorrect, please select jpg or png.'
      })
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: 'Exceeding file size limit',
        desc: 'File  ' + file.name + ' is too large, no more than 2M.'
      })
    },
    handleBeforeUpload(file) {
      console.log(file)
      this.tabList[this.itemUploadIndex].uploadList = []
      this.tabList[this.itemUploadIndex].pictureUrl = ''
      return true
    },
    videohandleBeforeUpload(file) {
      this.testUploadList = []
      this.teachingVideoPhoto = ''
      return true
    },
    coverhandleBeforeUpload(file) {
      this.coverPhotoUploadList = []
      this.coverPhoto = ''
      return true
    },
    uploadFileSuccessMusic(response, file, fileList) {
      //上传图片
      this.tabList[this.musicIndex].containMusicUrl = response.response[0]
    },
    handleUploadmusic(index) {
      this.musicIndex = index
    },
    baseSubmit() {
      var that = this

      if (!that.ageSelect) {
        this.$Message.error('请选择年龄！')
        return false
      }
      if (!that.coverPhoto) {
        this.$Message.error('请上传封面图片！')
        return false
      }

      if (!that.computeRule) {
        this.$Message.error('请设置计算规则！')
        return false
      }
      if (!that.accountStatus) {
        this.$Message.error('请选择开启状态')
        return false
      }
      if (!that.sexSelect) {
        this.$Message.error('请选择性别！')
        return false
      }
      if (!that.stepList) {
        this.$Message.error('请填写步骤！')
        return false
      }
      if (!that.materialId) {
        this.$Message.error('请选择视屏！')
        return false
      }
      if (!that.testGoal) {
        this.$Message.error('请填写测试目的!')
        return false
      }
      if (!that.testObj) {
        this.$Message.error('请选择测试类型')
        return false
      }
      if (!that.testName) {
        this.$Message.error('请填写测试名称')
        return false
      }
      var activeEditor = tinymce.activeEditor
      var editBody = activeEditor.getBody()
      activeEditor.selection.select(editBody)
      var text = activeEditor.selection.getContent({ format: 'text' })
      // console.log(text)
      if (!text) {
        this.$Message.error('请填写原理详情')
        return false
      }
      if (!that.theoryIntroduction) {
        this.$Message.error('请填写原理简介')
        return false
      }
      if (!that.valueUnit) {
        this.$Message.error('请填写值单位')
        return false
      }
      let tabList = that.tabList
      // console.log(tabList) musicId
      for (let i = 0; i < that.tabList.length; i++) {
        that.tabList[i].containMusic = that.tabList[i].containMusic ? '1' : '0'
        that.tabList[i].containMusicUrl = that.tabList[i].musicId 
        if (that.tabList[i].tabType == '2') {
          that.tabList[i].containOneDecimals = '1'
        } else {
          that.tabList[i].containOneDecimals = that.tabList[i]
            .containOneDecimals
            ? '1'
            : '0'
        }
        // if (that.tabList[i].tabType == '3' || that.tabList[i].tabType == '2') {
        //     that.tabList[i].maxTime = that.tabList[i].maxTime * 1000;
        // }
      }
      // console.log(tabList)
      // return false;
      let rule = that.computeRule
      rule = rule.replace(/A/g, 1)
      rule = rule.replace(/B/g, 1)
      rule = rule.replace(/C/g, 1)
      rule = rule.replace(/D/g, 1)
      rule = rule.replace(/E/g, 1)
      rule = rule.replace(/F/g, 1)
      rule = rule.replace(/G/g, 1)
      rule = rule.replace(/H/g, 1)
      rule = rule.replace(/I/g, 1)
      rule = rule.replace(/J/g, 1)
      rule = rule.replace(/K/g, 1)
      rule = rule.replace(/L/g, 1)
      rule = rule.replace(/M/g, 1)
      rule = rule.replace(/N/g, 1)
      rule = rule.replace(/O/g, 1)
      rule = rule.replace(/P/g, 1)
      rule = rule.replace(/Q/g, 1)
      rule = rule.replace(/R/g, 1)
      rule = rule.replace(/S/g, 1)
      rule = rule.replace(/T/g, 1)
      rule = rule.replace(/U/g, 1)
      rule = rule.replace(/V/g, 1)
      rule = rule.replace(/W/g, 1)
      rule = rule.replace(/X/g, 1)
      rule = rule.replace(/Y/g, 1)
      rule = rule.replace(/Z/g, 1)

      // console.log(rule)
      try {
        let asd = eval(rule)
        // console.log(asd)
        if (!that.isRealNum(asd)) {
          this.$Message.error('计算规则有误!')
          return false
        }
      } catch (exception) {
        this.$Message.error('计算规则有误!')
        return false
      }
      let testItemName = ''
      for (let i = 0; i < that.testTypeList.length; i++) {
        if (that.testTypeList[i].testItemId == that.testType) {
          testItemName = that.testTypeList[i].testItemName
        }
      }

      let data = {
        coverPhotoAddr: that.coverPhoto,
        ageScope: that.ageSelect,
        computationRule: that.computeRule,
        containOneDecimals: that.decimals ? '1' : '0',
        effectiveStatus: that.accountStatus,
        gender: that.sexSelect,
        stepList: that.stepList,
        tabCount: that.tabNumSelect,
        tabList: that.tabList,
        teachingVideo: that.materialId,
        teachingVideoPhoto: that.teachingVideoPhoto,
        testGoal: that.testGoal,
        testId: that.testId ? that.testId : '',
        testItemId: that.testType,
        testItemName: testItemName,
        testName: that.testName,
        theoryDetail: tinymce.get('testTheory').getContent(),
        theoryIntroduction: that.theoryIntroduction,
        valueUnit: that.valueUnit,
        sortIndex: that.sortIndex
      }
      this.$axios
        .post('/v1/corporeitytest/upsertTestInfo', data)
        .then(function(response) {
          console.log(response)
          if (response.data.code == 10000) {
            let numCode = response.data.response
            if (numCode == '1') {
              that.$Message.info('保存成功！')
              that.$router.go(-1)
            }
            if (numCode == '2') {
              that.$Message.error('测试名称重复，请检查')
            }
            if (numCode == '3') {
              that.$Message.error('暂时无法关闭该测试')
            }
          } else {
            that.$Message.info('保存失败！')
          }
        })
        .catch(function(response) {
          console.log(response)
        })
    },
    ok() {
      var that = this
      let rule = 'a+1'
      rule = rule.replace(/A|a/g, 1)
      console.log(rule)
      try {
        let asd = eval(rule)
        console.log(asd)
        if (!that.isRealNum(asd)) {
          this.$Message.error('计算规则有误!')
          return false
        }
      } catch (exception) {
        this.$Message.error('计算规则有误!')
        return false
      }
      console.log(eval('a+1'))
      console.log(isNaN('1'))
      console.log(that.isRealNum('1'))
    },
    isRealNum(val) {
      console.log(val)
      // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除
      if (val === '' || val == null) {
        return false
      }
      if (!isNaN(val)) {
        return true
      } else {
        return false
      }
    },
    paramsCheck() {
      var that = this
    },
    toTestHistory() {
      this.$router.push({ name: 'testHistory' })
    },

    getTanmaTestItem(age, gender) {
      var that = this
      // that.detail.splice(detailId, 1);
      this.$axios
        .get(
          '/v1/corporeitytest/getTanmaTestItem?age=' + age + '&gender=' + gender
        )
        .then(function(response) {
          that.testTypeList = response.data.response
        })
        .catch(function(response) {
          console.log(response)
        })
    },
    getTestAllInfoByTestId(testId) {
      var that = this
      // that.detail.splice(detailId, 1);
      this.$axios
        .get('/v1/corporeitytest/getTestAllInfoByTestId?testId=' + testId)
        .then(function(response) {
          // console.log(response);
          let data = response.data.response
          that.ageSelect = data.ageScope
          that.computeRule = data.computationRule
          that.decimals = data.containOneDecimals == '1' ? true : false
          that.accountStatus = data.effectiveStatus
          that.sexSelect = data.gender
          that.stepList = data.stepList
          that.tabNumSelect = data.tabCount
          that.tabList = data.tabList
          that.materialId = Number(data.teachingVideo)
          that.sortIndex = data.sortIndex

          that.coverPhoto = data.coverPhotoAddr

          that.getTanmaTestItem(data.ageScope, data.gender)

          let videoFile = {
            url: data.teachingVideoPhoto ? data.teachingVideoPhoto : '',
            status: 'finished'
          }
          that.testUploadList.push(videoFile)

          let coverFile = {
            url: data.coverPhotoAddr ? data.coverPhotoAddr : '',
            status: 'finished'
          }
          that.coverPhotoUploadList.push(coverFile)

          // console.log(data);
          that.teachingVideoPhoto = data.teachingVideoPhoto
          that.testGoal = data.testGoal
          that.testId = data.testId
          that.testType = data.testItemId
          that.testObj.value = data.testItemId
          that.testObj.label = data.testItemName
          that.testName = data.testName
          // console.log(data.theoryDetail)
          tinymce.get('testTheory').setContent(data.theoryDetail)
          that.theoryIntroduction = data.theoryIntroduction
          that.valueUnit = data.valueUnit

          let tabList = that.tabList
          for (let i = 0; i < that.tabList.length; i++) {
            that.tabList[i].letterIndex = that.letterList[i];
            
            that.tabList[i].musicId=Number(that.tabList[i].musicId);
            console.log(that.tabList[i].musicId)
            console.log(that.musicList)
            that.tabList[i].containMusic =
              that.tabList[i].containMusic == '1' ? true : false
            that.tabList[i].containOneDecimals =
              that.tabList[i].containOneDecimals == '1' ? true : false
            let file = { url: that.tabList[i].pictureUrl, status: 'finished' }
            that.tabList[i].uploadList = []
            that.tabList[i].uploadList.push(file)

            if (that.tabList[i].testType == '1') {
              that.tabList[i].valueStart = that.tabList[i].valueStart / 10000
              that.tabList[i].valueEnd = that.tabList[i].valueEnd / 10000
            }
            if (
              that.tabList[i].tabType == '3' ||
              that.tabList[i].tabType == '2'
            ) {
              that.tabList[i].maxTime = that.tabList[i].maxTime / 1000
            }
          }
          //   that.getTanmaTestItem();
          // that.testTypeList=response.data.response;
        })
        .catch(function(response) {
          console.log(response)
        })
    },
    countScoreStandardNumByTestId(testId) {
      var vm = this
      this.$axios
        .get(
          '/v1/corporeitytest/countScoreStandardNumByTestId?testId=' + testId
        )
        .then(function(response) {
          if (response.data.code == 10000) {
            vm.scoreStandardNum = response.data.response
          }
        })
        .catch(function(response) {
          console.log(response)
        })
    },
    countTestResultNumByTestId(testId) {
      var vm = this
      this.$axios
        .get('/v1/corporeitytest/countTestResultNumByTestId?testId=' + testId)
        .then(function(response) {
          if (response.data.code == '10000') {
            vm.haveTestNum = response.data.response
            // console.log(vm.haveTestNum);
          }
        })
        .catch(function(response) {
          console.log(response)
        })
    },
    getVideoList() {
      var that = this
      // that.detail.splice(detailId, 1);
      this.$axios
        .get('/v1/material/getMaterialListByType?addType=02&materialType=02')
        .then(function(response) {
          that.videoList = response.data.response
        })
        .catch(function(response) {
          console.log(response)
        })
    },
    getMusicList() {
      var that = this
      // that.detail.splice(detailId, 1);
      this.$axios
        .get('/v1/material/getMaterialListByType?addType=02&materialType=01')
        .then(function(response) {
          that.musicList = response.data.response
        })
        .catch(function(response) {
          console.log(response)
        })
    }
  },
  mounted() {
    var vm = this
    vm.getVideoList()
    vm.getMusicList()
    // vm.getTanmaTestItem();
    let height = (document.body.offsetHeight - 300) / 2
    this.updateUrl =
      this.$axios.defaults.baseURL + '/v1/file/upload?type=manage_img'
    let testId = sessionStorage.getItem('testManage-testItem-testId')
    if (testId) {
      vm.testId = testId
      vm.getTestAllInfoByTestId(testId)
      vm.countScoreStandardNumByTestId(testId)
      vm.countTestResultNumByTestId(testId)
    }

    vm.uploadVideoTitle = '上传视频'
    vm.cdnUpdateUrl = vm.$axios.defaults.baseURL + '/v1/file/upload/cdn'
    tinymce.init({
      // mode: "exact",
      // elements: "testTheory",
      selector: '#testTheory',
      plugins: [
        'advlist autolink lists link image charmap print preview hr anchor pagebreak imagetools',
        'searchreplace visualblocks visualchars code fullpage',
        'insertdatetime media nonbreaking save table contextmenu directionality',
        'emoticons paste textcolor colorpicker textpattern imagetools codesample'
      ],
      toolbar1:
        ' newnote print preview | undo redo | insert | styleselect | forecolor backcolor bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image emoticons media codesample',
      autosave_interval: '20s',
      image_advtab: true,
      height: height,
      table_default_styles: {
        width: '100%',
        borderCollapse: 'collapse'
      },
      setup: function(editor) {
        editor.on('init', function(e) {})
      },
      // 图片上传
      images_upload_handler: function(blobInfo, success, failure) {
        var xhr, formData
        xhr = new XMLHttpRequest()
        xhr.withCredentials = false
        xhr.open(
          'POST',
          vm.$axios.defaults.baseURL + '/v1/file/upload?type=manage_img'
        )
        xhr.onload = function() {
          var json
          if (xhr.status != 200) {
            failure('上传失败！')
            return
          }
          json = JSON.parse(xhr.responseText)
          if (!json || json.response.length == 0) {
            failure('上传失败！')
            return
          }
          setTimeout(function() {
            success(json.response[0])
          }, 1000)
        }
        formData = new FormData()
        formData.append('muFiles', blobInfo.blob())
        xhr.send(formData)
      }
    })
  },
  destroyed() {
    var vm = this
    tinymce.get('testTheory').destroy()
  }
}
</script>