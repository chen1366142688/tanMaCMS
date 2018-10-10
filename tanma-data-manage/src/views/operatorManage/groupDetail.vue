<style lang="less">
.functionItem {
    .ivu-input-wrapper {
        width: 200px;
    }
    .ivu-form-item-label {
        text-align: left !important;
    }
}
.checkbox-div{
    border-top:1px #E0E0E0 solid; 
    .checkbox-style{
        margin-left:100px;
    }
    .lable-parent{
        font-size:14px;
    }
}

</style>
<template>
    <div style="margin-left:15px;">
    <Tabs>
            <TabPane name="operator" label="添加权限组">
        <Card>
            <Form label-position="right" :label-width="100"  >
                <FormItem label="权限组状态" class="functionItem">
                    <RadioGroup v-model="validStatus">
                        <Radio label="1">启用</Radio>
                        <Radio label="0">暂停</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="权限组名称" class="functionItem">
                    <Input v-model="groupName" />（{{menuCount}}个权限）
                </FormItem>
                <div v-for="parent in menuParentList" class="checkbox-div">
                    <br />
                    <div class="lable-parent">{{parent.parentName}}</div>
                        <Checkbox @on-change="selectMenu" v-for="child in parent.children" v-model="child.checkStatus" class="checkbox-style" >{{child.menuName}}</Checkbox>
                    <br />
                </div>
            </Form>
        </Card>
        <div style="margin-top:20px;padding-left:40%">
            <Button @click="goback" style="float:left; margin-right:50px;width:100px" type="success">返回</Button>
            <div style="width:20px;" ></div>
            <Button  style="float:left;width:100px" @click="saveGroupInfo" type="success">提交结果</Button>
        </div>
        </TabPane>
        </Tabs>
    </div>
</template>

<script>
import Vue from 'vue';
import iviewArea from 'iview-area';
Vue.use(iviewArea);

export default {
    data() {

        return {
            validStatus:"",
            groupId:"",
            groupName:"",
            menuParentList:[],
            menuCount:0,
            selectMenuList:[]
            
        }
    },
    created: function() {

    },
    methods: {
        goback(){
            this.$router.go(-1);
        },
        selectMenu(){
            let count=0;
            this.selectMenuList=[];
            let parentMap = new Map();
            for(let j=0;j<this.menuParentList.length;j++){
                for(let i=0;i<this.menuParentList[j].children.length;i++){
                    if(this.menuParentList[j].children[i].checkStatus){
                        count = count+1;
                        this.selectMenuList.push(this.menuParentList[j].children[i].menuId);
                        if(parentMap.get(this.menuParentList[j].parentId) == 1){

                        }else{
                            this.selectMenuList.push(this.menuParentList[j].parentId);
                            parentMap.set(this.menuParentList[j].parentId,1);
                        }
                    }
                }
            }
            this.menuCount = count;
        },
        queryGroupInfo(groupId){
            let  this_ = this;
            this.$axios.get("/v1/operation/query/queryMenuForGroup?grouId="+groupId).then(res => {
                if(res.data.code==10000){
                    this_.validStatus=res.data.response.validStatus;
                    this_.groupName=res.data.response.groupName;
                    for(let i=0;i<res.data.response.menuList.length;i++){
                        let menu = res.data.response.menuList[i];
                        if(menu.menuLevel == 1){
                            let menuParent = {
                                parentId:menu.menuId,
                                parentName:menu.menuName,
                                code:menu.menuCode,
                                children:[]
                            }
                            this_.menuParentList.push(menuParent)
                        }else{
                            for(let j=0;j<this_.menuParentList.length;j++){
                                if(menu.parentCode == this_.menuParentList[j].code){
                                    let child={
                                        menuName:menu.menuName,
                                        menuId:menu.menuId,
                                        checkStatus:menu.groupId==null?false:true
                                    }
                                    if(menu.groupId != null){
                                        this_.menuCount = this_.menuCount+1;
                                        this_.selectMenuList.push(menu.menuId);
                                    }
                                    this_.menuParentList[j].children.push(child);
                                }
                            }
                        }
                    }
                }
            });
        },
        saveGroupInfo(){
            this.selectMenu();
            let this_ = this;
            if(this.validStatus == ''){
                this_.$Message.info('请选择生效状态！');
                return false;
            }
            if(this.groupNamee == ''){
                this_.$Message.info('权限名称不能为空！');
                return false;
            }
            let data_={
                groupId:this.groupId,
                groupName:this.groupName,
                validStatus:this.validStatus,
                menuList:this.selectMenuList
            }
            this.$axios.post('/v1/operation/addOrUpdateGroupDO',data_)
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
        let groupId = sessionStorage.getItem('operatorManage-groupDetail-groupId');
        this.groupId = groupId;
        this.queryGroupInfo(groupId);
    }
}

</script>
