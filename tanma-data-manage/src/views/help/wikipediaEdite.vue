
<template>
    <div>
        <H1>编辑百科内容</H1>
        <Card style="margin-top:20px">
            <div>{{bikiName}}</div>
        </Card>
        <Card shadow>
            <textarea class='tinymce-textarea' id="bikeContent" placeholder="这里输入文字..........."></textarea>
        </Card>
        <div style="margin-top:20px;padding-right:20px">
            <Button type="success" @click="detailSubmit" style="float:right;">提交结果</Button>
            <Button type="success" @click="goback" style="float:right;margin-right:50rpx;">返回</Button>
        </div>
    </div>
</template>
<script>
import tinymce from 'tinymce';
import '../tinymce/js/tinymce/langs/zh_CN.js';
export default {
    data() {
        return {
            bikiName: '百科标题',
            bikeContent: '',
            code: '',
            groupCode: '',
            informationId: '',
            orderIndex: '',
        }
    },
    methods: {
        goback() {
            this.$router.go(-1);
        },
        closable() {
            this.$Message.info({
                content: 'Tips for manual closing',
                duration: 10,
                closable: true
            });
        },
        getCommonInfoByInformationId(informationId) {
            var that = this;
            this.$axios.get('/v1/commoninformation/getCommonInfoByInformationId?informationId=' + informationId)
                .then(function(response) {
                    var infors = response.data.response;
                    console.log(infors);
                    that.bikeContent = infors.comtent;
                    that.bikiName = infors.name;
                    that.groupCode = infors.groupCode;
                    that.code = infors.code;
                    that.orderIndex = infors.orderIndex;
                    tinymce.get('bikeContent').setContent(infors.comtent);

                })
                .catch(function(response) {
                    // console.log(response);
                });
        },
        detailSubmit() {
            var that = this;
            let informationId = sessionStorage.getItem('helpInfoManage-helpMainManage-informationId');
            that.$axios.post('/v1/commoninformation/updateWikipediaInfo', {
                "comtent": tinymce.get('bikeContent').getContent(),
                "informationId": informationId
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
         sessionStorage.setItem('helpInfoManage-helpMainManage-whichPane', 'wiki');
        let informationId = sessionStorage.getItem('helpInfoManage-helpMainManage-informationId');
        vm.getCommonInfoByInformationId(informationId);
        tinymce.init({
            // mode: "textareas",
             selector:'#bikeContent', 
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
        tinymce.get('bikeContent').destroy();

        // tinymce.editors=[];
    }
}
</script>

