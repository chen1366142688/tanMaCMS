
<template>
    <div>
        <H1>编辑帮助大类</H1>
        <Card style="margin-top:20px">
            <Form :label-width="160" class="function">
                <FormItem label="帮助种类" class="functionItem">
                    <Select v-model="types" style="width:200px;margin-left:20px">
                        <Option v-for="item in typeList" :value="item.helpType" :key="item.helpType">{{ item.typeName }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="大类名称" class="functionItem">
                    <Input v-model="helpMainName" placeholder="请输入大类名称" style="width: 200px;margin-left:20px"></Input>
                </FormItem>
                <FormItem label="排序" class="functionItem">
                    <Input v-model="helpSort" placeholder="排序" style="width: 60px;margin-left:20px"></Input>
                </FormItem>
            </Form>
        </Card>
        <div style="margin-top:20px;padding-right:50px">
            <Button type="success" @click="submit" style="float:right;margin-left:50rpx;margin-right:50rpx;">提交结果</Button> 
            <Button type="success" @click="goback" style="float:right;margin-right:50rpx;">返回</Button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            types: '1',
            helpMainName: '',
            helpSort: 1,
            helpId: '',
            typeList: [
                {
                    helpType: '1',
                    typeName: '家长端'
                },
                {
                    helpType: '2',
                    typeName: '教师端'
                }
            ]
        }
    },
    methods: {
        goback(){
            this.$router.go(-1);
        },
        closable() {
            this.$Message.info({
                content: 'Tips for manual closing',
                duration: 10,
                closable: true
            });
        },
        getHelpInfo(helpId) {
            var that = this;
            this.$axios.get('/v1/help/getHelpDOByHelpId?helpId=' + helpId)
                .then(function(response) {
                    var helpInfo = response.data.response;
                    // console.log(helpInfo);
                    that.types = helpInfo.helpType;
                    that.helpMainName = helpInfo.helpName;
                    that.helpSort = helpInfo.helpSort;

                })
                .catch(function(response) {
                    // console.log(response);
                });
        },
        submit() {
            var that = this;
            that.$axios.post('/v1/help/upsertHelpMainInfo', {
                "helpId": that.helpId,
                "helpName":that.helpMainName,
                "helpSort": that.helpSort,
                "helpType": that.types
            })
                .then(function(response) {
                    that.$Message.info({
                        content: '提交成功！',
                        duration: 10,
                        closable: true
                    });
                    that.$router.go(-1);
                    // console.log(response);
                })
                .catch(function(response) {
                    that.$Message.info({
                        content: '提交失败',
                        duration: 10,
                        closable: true
                    });
                    // console.log(response);
                });
        }
    },
    mounted() {
        var vm = this;
        vm.helpId = sessionStorage.getItem('helpInfoManage-helpMainManage-helpId');
        // console.log(vm.helpId)
        if ( null != vm.helpId && '' != vm.helpId ) {
            vm.getHelpInfo(Number(vm.helpId));
        }
    },
}
</script>

