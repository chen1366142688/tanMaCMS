<style lang="less">
.baseInfoitem {
    .ivu-input-wrapper {
        width: 10%;
    }
}
.functionItem {
    .ivu-input-wrapper {
        width: 200px;
    }
    .ivu-form-item-label {
        text-align: left !important;
    }
}
.address {
    .ivu-col-span-8 {
        width: 15%
    }
}
.add-button{

}
</style>
<template>
    <div style="margin-left:15px;">
    <Tabs>
            <TabPane name="operator" label="编辑管理人员">
        <Card>
            <Form label-position="right" :label-width="100"  >
                <FormItem label="账号状态" class="functionItem">
                    <RadioGroup v-model="operator.validStatus">
                        <Radio label="1">账号启用</Radio>
                        <Radio label="0">账号暂停</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="登录账号" class="functionItem">
                    <Input v-if="operator.operationId=='' || operator.operationId=='0' "    v-model="operator.operationCode" />
                    <Input v-else disabled   v-model="operator.operationCode" />
                </FormItem>
                <FormItem label="电话号码" class="functionItem">
                    <Input v-model="operator.phoneNo" :maxlength="maxlength" />
                </FormItem>
                <FormItem label="真实姓名" class="functionItem">
                    <Input v-model="operator.name" />
                </FormItem>
                <FormItem label="编辑头像" class="functionItem">
                    <Avatar icon="person" :src="operator.avatarUrl" size="large" style="float:left" />
                    <div style="float:left;padding-top:10px;padding-left:15px;" >
                        <Upload
                            ref="upload"
                            :show-upload-list="false"
                            :on-success="uploadFileSuccess"
                            :format="['jpg','jpeg','png']"
                            :max-size="2048"
                            name="muFiles"
                            multiple
                            type="drag"
                            :action="updateUrl"
                            style="display: inline-block;width:100px;">
                            <div style="width: 100px;height:20px;line-height: 20px;">
                                <Icon type="ios-cloud-upload-outline" size="20"></Icon>上传头像
                            </div>
                        </Upload>
                    </div>
                </FormItem>
                <FormItem label="账号权限" class="functionItem">
                    <Select v-model="operator.groupId" style="width:200px">
                        <Option v-for="item in groupList" :value="item.groupId" :key="item.groupName">{{ item.groupName }}</Option>
                    </Select>
                </FormItem>
                <FormItem v-if="operator.operationId !='' && operator.operationId !='0' " label="是否重置密码" class="functionItem">
                    <Checkbox v-model="rsetPassword">重置</Checkbox>
                </FormItem>
                <FormItem v-if="rsetPassword || operator.operationId=='' || operator.operationId=='0' " label="登录密码" class="functionItem">
                    <Input v-model="operator.passWord" />
                </FormItem>
                <FormItem v-if="rsetPassword || operator.operationId=='' || operator.operationId=='0' " label="管理密码" class="functionItem">
                    <Input v-model="operator.passWordMange" />
                </FormItem>                
            </Form>
        </Card>
        <div style="margin-top:20px;padding-left:40%">
            <Button @click="goback" style="float:left; margin-right:50px;width:100px" type="success">返回</Button>
            <div style="width:20px;" ></div>
            <Button  style="float:left;width:100px" @click="saveOperatorInfo" type="success">提交结果</Button>
        </div>
        </TabPane>
        </Tabs>
    </div>
</template>

<script>
import tinymce from 'tinymce';
import Vue from 'vue';
import iviewArea from 'iview-area';
Vue.use(iviewArea);

export default {
    data() {

        return {
            operator:{
                avatarUrl:"",
                groupId:"",
                name:"",
                operationId:"",
                phoneNo:"",
                operationCode:"",
                passWord:"",
                passWordMange:"",
                validStatus:""
            },
            rsetPassword:false,
            groupList:[],
            maxlength:11,
            updateUrl:""
            
        }
    },
    created: function() {

    },
    methods: {
        goback(){
            this.$router.go(-1);
        },
        queryOperationInfo(operationId){
            let this_=this;
            this.$axios.get("/v1/operation/query/queryOperationById?operationId="+operationId).then(res => {
                if(res.data.code==10000){
                   var info = res.data.response;
                   this_.operator.avatarUrl=info.avatarUrl;
                   this_.operator.groupId=info.groupId;
                   this_.operator.name=info.name;
                   this_.operator.operationId=info.operationId;
                   this_.operator.phoneNo=info.phoneNo;
                   this_.operator.operationCode=info.operationCode;
                   this_.operator.passWord=info.passWord;
                   this_.operator.passWordMange=info.passWordMange;
                   this_.operator.validStatus=info.validStatus;
                }
            });
            
        },
        queryGroupList(){
            this.$axios.get("/v1/operation/query/queryGroupList").then(res => {
                this.groupList=[];
                if(res.data.code==10000){
                    var info = res.data.response;
                    for(let i=0;i<info.length;i++){
                        this.groupList.push(info[i]);
                    }
                }
            });
        },
        saveOperatorInfo(){
            let this_ = this;
            if(this.operator.validStatus == ''){
                this_.$Message.info('请选择账号生效状态！');
                return false;
            }
            if(this.operator.operationCode == ''){
                this_.$Message.info('登录账号不能为空！');
                return false;
            }
            if(this.operator.name == ''){
                this_.$Message.info('姓名不能为空！');
                return false;
            }
            if(this.operator.groupId == ''){
                this_.$Message.info('请选择权限组！');
                return false;
            }
            if(!this.rsetPassword){
                this.operator.passWord="";
                this.operator.passWordMange="";
            }else{
                if(this.operator.passWord == ''){
                    this_.$Message.info('请输入登录密码！');
                    return false;
                }
                if(this.operator.passWordMange == ''){
                    this_.$Message.info('请输入管理密码！');
                    return false;
                }
            }
            let data_={
                avatarUrl:this.operator.avatarUrl,
                groupId:this.operator.groupId,
                name:this.operator.name,
                operationId:this.operator.operationId,
                phoneNo:this.operator.phoneNo,
                operationCode:this.operator.operationCode,
                passWord:this.operator.passWord,
                passWordMange:this.operator.passWordMange,
                validStatus:this.operator.validStatus
            }
            this.$axios.post('/v1/operation/addOrUpdateOperationDO',data_)
            .then(function(res){
                if(res.data.code==10000){
                    this_.$Message.success('操作成功！');
                   this_.$router.go(-1);
                }else{
                    this_.$Message.info(res.data.msg);
                }
            })
            .catch(function(error){
                console.log(error);
            });
        },
        uploadFileSuccess(response, file, fileList){
            this.operator.avatarUrl  = response.response[0];
        }


    },
    mounted() {
        this.updateUrl=this.$axios.defaults.baseURL+"/v1/file/upload?type=manage_img"
        this.rsetPassword=true;
        let operationId = sessionStorage.getItem('operatorManage-operatorDetail-operationId');
        if(operationId != null  && operationId != ''){
            this.rsetPassword=false;
            this.queryOperationInfo(operationId);
        }
        this.queryGroupList();
        console.log(this.operator);
    },
    destroyed() {
    }
}

</script>
