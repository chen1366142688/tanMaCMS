<template>
    <div style="margin-left:15px;">
        <Tabs type="card">
            <TabPane label="单个项目诊断">
                <Card>
                    <span>
                        {{itemName}}
                    </span>
                </Card>
                <Card>
                    <Form :label-width="160" class="function">
                        <FormItem label="十二" class="functionItem">
                            <span style="margin-left:4px;">{{twelfthStart/10}}~{{twelfthEnd/10}}</span>
                            <Input v-model="twelfthInfo" style="width: 1500px;margin-left:20px;" placeholder="输入评估内容" />
                        </FormItem>
                        <FormItem label="十一" class="functionItem">
                            <span style="margin-left:4px;">{{eleventhStart/10}}~{{eleventhEnd/10}}</span>
                            <Input v-model="eleventhInfo" style="width: 1500px;margin-left:20px;" placeholder="输入评估内容" />
                        </FormItem>
                        <FormItem label="十" class="functionItem">
                            <span style="margin-left:4px;">{{tenthStart/10}}~{{tenthEnd/10}}</span>
                            <Input v-model="tenthInfo" style="width: 1500px;margin-left:20px;" placeholder="输入评估内容" />
                        </FormItem>
                        <FormItem label="九" class="functionItem">
                            <span style="margin-left:4px;">{{ninthStart/10}}~{{ninthEnd/10}}</span>
                            <Input v-model="ninthInfo" style="width: 1500px;margin-left:20px;" placeholder="输入评估内容" />
                        </FormItem>
                        <FormItem label="八" class="functionItem">
                            <span style="margin-left:4px;">{{eighthStart/10}}~{{eighthEnd/10}}</span>
                            <Input v-model="eighthInfo" style="width: 1500px;margin-left:20px;" placeholder="输入评估内容" />
                        </FormItem>
                        <FormItem label="七" class="functionItem">
                            <span style="margin-left:4px;">{{seventhStart/10}}~{{seventhEnd/10}}</span>
                            <Input v-model="seventhInfo" style="width: 1500px;margin-left:20px;" placeholder="输入评估内容" />
                        </FormItem>
                        <FormItem label="六" class="functionItem">
                            <span style="margin-left:4px;">{{sixthStart/10}}~{{sixthEnd/10}}</span>
                            <Input v-model="sixthInfo" style="width: 1500px;margin-left:20px;" placeholder="输入评估内容" />
                        </FormItem>
                        <FormItem label="五" class="functionItem">
                            <span style="margin-left:4px;">{{fifthStart/10}}~{{fifthEnd/10}}</span>
                            <Input v-model="fifthInfo" style="width: 1500px;margin-left:20px;" placeholder="输入评估内容" />
                        </FormItem>
                        <FormItem label="四" class="functionItem">
                            <span style="margin-left:4px;">{{fourthStart/10}}~{{fourthEnd/10}}</span>
                            <Input v-model="fourthInfo" style="width: 1500px;margin-left:20px;" placeholder="输入评估内容" />
                        </FormItem>
                        <FormItem label="三" class="functionItem">
                            <span style="margin-left:4px;">{{thirdStart/10}}~{{thirdEnd/10}}</span>
                            <Input v-model="thirdInfo" style="width: 1500px;margin-left:20px;" placeholder="输入评估内容" />
                        </FormItem>
                        <FormItem label="二" class="functionItem">

                            <span style="margin-left:4px;">{{secondStart/10}}~{{secondEnd/10}}</span>
                            <Input v-model="secondInfo" style="width: 1500px;margin-left:20px;" placeholder="输入评估内容" />
                        </FormItem>
                        <FormItem label="一" class="functionItem">
                            <span style="margin-left:4px;">{{firstStart/10}}~{{firstEnd/10}}</span>
                            <Input v-model="firstInfo" style="width: 1500px;margin-left:20px;" placeholder="输入评估内容" />
                        </FormItem>
                    </Form>
                </Card>
                <div style="margin-top:20px;padding-right:20px">
                    <Button type="success" @click="baseSubmit" style="float:right;">提交结果</Button>
                </div>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
import Vue from 'vue'

export default {
  data() {
    return {
      itemId: '',
      itemInfo: '',
      itemName:'',
      firstStart: 1,
      firstEnd: 19,
      secondStart: 20,
      secondEnd: 29,
      thirdStart: 30,
      thirdEnd: 39,
      fourthStart: 40,
      fourthEnd: 49,
      fifthStart: 50,
      fifthEnd: 59,
      sixthStart: 60,
      sixthEnd: 69,
      seventhStart: 70,
      seventhEnd: 79,
      eighthStart: 80,
      eighthEnd: 84,
      ninthStart: 85,
      ninthEnd: 89,
      tenthStart: 90,
      tenthEnd: 94,
      eleventhStart: 95,
      eleventhEnd: 99,
      twelfthStart: 100,
      twelfthEnd: 10000,
      firstInfo: '',
      secondInfo: '',
      thirdInfo: '',
      fourthInfo: '',
      fifthInfo: '',
      sixthInfo: '',
      seventhInfo: '',
      eighthInfo: '',
      ninthInfo: '',
      tenthInfo: '',
      eleventhInfo: '',
      twelfthInfo: ''
    }
  },
  watch: {}, //以V-model绑定数据时使用的数据变化监测

  created: function() {},
  methods: {
    getItemInfoByItemId(itemId) {
      var that = this
      if(itemId == 999){
        that.itemName="体质总分";
        return false;
      }
      this.$axios
        .get('/v1/diagnosis/getItemInfoByItemId?itemId=' + itemId)
        .then(function(response) {
          console.log(response)
          that.itemInfo = response.data.response
          that.itemName=response.data.response.itemName
        })
        .catch(function(response) {
          console.log(response)
        })
    },
    getListByItemId(itemId) {
      var that = this
      this.$axios
        .get('/v1/diagnosis/getListByItemId?itemId=' + itemId)
        .then(function(response) {
          console.log(response)
          let data = response.data.response
          that.firstInfo = data.firstInfo
          that.secondInfo = data.secondInfo
          that.thirdInfo = data.thirdInfo
          that.fourthInfo = data.fourthInfo
          that.fifthInfo = data.fifthInfo
          that.sixthInfo = data.sixthInfo
          that.seventhInfo = data.seventhInfo
          that.eighthInfo = data.eighthInfo
          that.ninthInfo = data.ninthInfo
          that.tenthInfo = data.tenthInfo
          that.eleventhInfo = data.eleventhInfo
          that.twelfthInfo = data.twelfthInfo
        })
        .catch(function(response) {
          console.log(response)
        })
    },
    baseSubmit() {
      var that = this
      if (!that.firstInfo) {
        this.$Message.error('请填写0.1-1.9的诊断！')
        return false
      }
      if (!that.secondInfo) {
        this.$Message.error('请填写2.0-2.9的诊断！')
        return false
      }
      if (!that.thirdInfo) {
        this.$Message.error('请填写3.0-3.9的诊断！')
        return false
      }
      if (!that.fourthInfo) {
        this.$Message.error('请填写4.0-4.9的诊断！')
        return false
      }
      if (!that.fifthInfo) {
        this.$Message.error('请填写5.0-5.9的诊断！')
        return false
      }
      if (!that.sixthInfo) {
        this.$Message.error('请填写6.0-6.9的诊断！')
        return false
      }
      if (!that.seventhInfo) {
        this.$Message.error('请填写7.0-7.9的诊断！')
        return false
      }
      if (!that.eighthInfo) {
        this.$Message.error('请填写8.0-8.4的诊断！')
        return false
      }
      if (!that.ninthInfo) {
        this.$Message.error('请填写8.5-8.9的诊断！')
        return false
      }

      if (!that.tenthInfo) {
        this.$Message.error('请填写9.0-9.4的诊断！')
        return false
      }
      if (!that.eleventhInfo) {
        this.$Message.error('请填写9.5-9.9的诊断！')
        return false
      }
      if (!that.twelfthInfo) {
        this.$Message.error('请填写大于10的诊断！')
        return false
      }
      let data = {
        eighthInfo: that.eighthInfo,
        eleventhInfo: that.eleventhInfo,
        fifthInfo: that.fifthInfo,
        firstInfo: that.firstInfo,
        fourthInfo: that.fourthInfo,
        itemId: that.itemId,
        ninthInfo: that.ninthInfo,
        secondInfo: that.secondInfo,
        seventhInfo: that.seventhInfo,
        sixthInfo: that.sixthInfo,
        tenthInfo: that.tenthInfo,
        thirdInfo: that.thirdInfo,
        twelfthInfo: that.twelfthInfo
      }
      this.$axios
        .post('/v1/diagnosis/upsertItemDiagnosis', data)
        .then(function(response) {
          console.log(response)
          if(response.data.code==10000){
            that.$Message.info('提交成功')
          }
        })
        .catch(function(response) {
          console.log(response)
          that.$Message.error('保存失败')
        })
    }
  },
  mounted() {
    var vm = this
    let height = (document.body.offsetHeight - 300) / 2
    let itemId = sessionStorage.getItem('testManage-itemDiagnosis-itemId')
    vm.itemId = itemId
    if (itemId) {
      vm.getListByItemId(itemId)
      vm.getItemInfoByItemId(itemId)
    }
  },
  destroyed() {
    // tinymce.get('articleEditor').destroy();
  }
}
</script>
