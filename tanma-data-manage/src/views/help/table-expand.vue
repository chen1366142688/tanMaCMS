<style scoped>
.expand-row {
    margin-bottom: 16px;
}

namesort {
    display: block;
    max-width: 10em;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.childOne {
    display: block;
    max-width: 20em;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
<template>
    <div>
        <Row class="expand-row" v-for="(item,index) in rowList.detailManageVOList" :value="item.detailId" :key="index">
            <Col span="10" class="childOne">
            <span class="expand-key">名称: </span>
            <span class="expand-value namesort" v-bind:title="item.detailTitle">{{item.detailTitle}}</span>
            </Col>
            <Col span="5">
            <span class="expand-key">排序: </span>
            <span class="expand-value namesort">{{item.detailSort}}</span>
            </Col>
            <Col span="3" align="center">
            <Button size="small" type="warning" @click="editorThis(item.detailId,rowList.helpId,rowList.helpType)">编辑</Button>
            </Col>
            <Col span="3" align="center">
            <Button size="small" type="error" @click="deleteThis(item.detailId,index)">删除</Button>
            </Col>
        </Row>
    </div>
</template>
<script>
export default {
    props: {
        rowList: Object,
        // detail:[]
    },
    data() {
        return {

        };
    },
    created() {
        // this.getList();
    },
    methods: {
        getList() {
            var that = this;
            that.detail = rowList.detailManageVOList
        },
        editorThis(helpDetilId,helpId,helpType) {
            sessionStorage.setItem('helpInfoManage-helpDetailManage-editorThis-helpDetilId', helpDetilId);
            sessionStorage.setItem('helpInfoManage-helpDetailManage-helpId', helpId);
            // sessionStorage.setItem('helpInfoManage-helpDetailManage-helpType', helpType);
            this.$router.push({ name: 'helpDetailManage' });
        },
        deleteThis(detailId, index) {
            // console.log(detailId)
            // console.log(index)
            var that = this;
            console.log(that.rowList.detailManageVOList)
            // console.log(detail)
            // that.detail.splice(detailId, 1);
            this.$axios.get('/v1/help/deleteHelpDetailInfoByHelpDetailId?helpDetailId=' + detailId)
                .then(function(response) {
                    that.rowList.detailManageVOList.splice(index, 1);
                })
                .catch(function(response) {
                    console.log(response);
                });
        },

    }


};

</script>