
<template>
    <div>
        <H1>编辑帮助内容</H1>
        <Card style="margin-top:20px">
            <Form :label-width="80" class="function">
                <FormItem label="帮助标题">
                    <Input v-model="helpTitle" placeholder="请输入帮助标题" style="width: 200px;margin-left:20px"></Input>
                </FormItem>
                <FormItem label="排序">
                    <Input v-model="detailSort" placeholder="排序" style="width: 60px;margin-left:20px"></Input>
                </FormItem>
            </Form>

        </Card>
        <Card shadow>
            <span>内容</span>
            <textarea class='tinymce-textarea' id="helpContent" placeholder="这里输入文字..........."></textarea>
        </Card>
        <div style="margin-top:20px;padding-right:20px">
            <Button type="success" @click="detailSubmit" style="float:right;">提交结果</Button>
            <Button type="success" @click="goback" style="float:right;margin-right:50rpx;">返回</Button>
        </div>
    </div>
</template>
<script>
import tinymce from 'tinymce';
export default {
    data() {
        return {
            helpTitle: '',
            detailSort: 1,
            // helpId:0,

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
        getHelpDetailInfo(helpDetailId) {
            var that = this;
            this.$axios.get('/v1/help/getDetailInfoByDetailId?helpDetailId=' + helpDetailId)
                .then(function(response) {
                    var helpInfo = response.data.response;
                    // console.log(helpInfo);
                    that.types = helpInfo.helpType;
                    that.helpTitle = helpInfo.detailTitle;
                    that.detailSort = helpInfo.detailSort;
                    tinymce.get('helpContent').setContent(helpInfo.detailContent);

                })
                .catch(function(response) {
                    // console.log(response);
                });
        },
        detailSubmit() {
            var that = this;
            let helpId = sessionStorage.getItem('helpInfoManage-helpDetailManage-helpId');
            let helpDetailId = sessionStorage.getItem('helpInfoManage-helpDetailManage-editorThis-helpDetilId');
            // let helpType = sessionStorage.getItem('helpInfoManage-helpDetailManage-helpType');
            that.$axios.post('/v1/help/upsetHelpDetailInfo', {
                "helpContent": tinymce.get('helpContent').getContent(),
                "helpDetailId": helpDetailId ?helpDetailId : null,
                "helpId": helpId,
                "helpSort": that.detailSort,
                "helpTitle": that.helpTitle
                // "helpType": helpType
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
        let height = (document.body.offsetHeight - 300) / 2;
        let helpDetailId = sessionStorage.getItem('helpInfoManage-helpDetailManage-editorThis-helpDetilId');
        let helpId = sessionStorage.getItem('helpInfoManage-helpDetailManage-helpId');
        // let helpType = sessionStorage.getItem('helpInfoManage-helpDetailManage-helpType');
        // console.log(helpDetailId);
        // console.log(helpId);
        if (helpDetailId != null && helpDetailId != '') {
            vm.getHelpDetailInfo(helpDetailId);
        }
        tinymce.init({
            mode: "textareas",
            plugins: [
                'advlist autolink lists link image charmap print preview hr anchor pagebreak imagetools',
                'searchreplace visualblocks visualchars code fullpage',
                'insertdatetime media nonbreaking save table contextmenu directionality',
                'emoticons paste textcolor colorpicker textpattern imagetools codesample'
            ],
            toolbar1: ' newnote print preview | undo redo | insert | styleselect | forecolor backcolor bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image emoticons media codesample',
            autosave_interval: '20s',
            image_advtab: true,
            height: height,
            table_default_styles: {
                width: '100%',
                borderCollapse: 'collapse'
            },
            setup: function(editor) {
                editor.on('init', function(e) {

                });
            },
                // 图片上传
                images_upload_handler: function (blobInfo, success, failure) {
                    var xhr, formData;
                    xhr = new XMLHttpRequest();
                    xhr.withCredentials = false;
                    xhr.open('POST', vm.$axios.defaults.baseURL+"/v1/file/upload?type=manage_img");
                    xhr.onload = function() {
                        var json;
                        if (xhr.status != 200) {
                        failure("上传失败！");
                        return;
                        }
                        json = JSON.parse(xhr.responseText);
                        if (!json || json.response.length==0) {
                        failure("上传失败！");
                        return;
                        }
                        setTimeout(function() {
                          success(json.response[0]);
                        }, 1000);   
                    };
                    formData = new FormData();
                    formData.append('muFiles', blobInfo.blob());
                    xhr.send(formData);
                }
            
        });

    },
    destroyed() {
        var vm = this;
        tinymce.get('helpContent').destroy();

        // tinymce.editors=[];
    }
}
</script>

