<template>
    <Tabs type="card" v-model="which" @click="changePane(which)">
        <TabPane label="帮助信息" name="help">
            <Card>
                <div>
                    <Button type="success" icon="plus-round" style="margin-left:85%" @click="addHelpMain">添加分类</Button>
                </div>
            </Card>
            <Card style="margin-top:20px">
                <Table border :columns="columns1" :data="helpMainList"></Table>
            </Card>
        </TabPane>
        <TabPane label="百科介绍" name="wiki">
            <div v-for="infos in informationList" style="margin:15px;border-style:solid;border-color:white white grey white;border-width: thin;">
                <p slot="title" style="margin:10px;">
                    <i>{{infos.name}}</i>
                    <a style="float:right;" href="javascript:void(0);" @click="bkEdite(infos.informationId)">编辑</a>
                </p>
            </div>
        </TabPane>
    </Tabs>
</template>

<script>
import Vue from 'vue';
import expandRow from './table-expand.vue';
export default {
    components: { expandRow },
    name: 'help',
    data() {
        return {
            helpMainList: [],
            columns1: [],
            informationList: [],
            which: 'help'
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
        changePane(which) {
            let vm = this;
            if (which == 'help') {
                vm.which = 'wiki';
            } else {
                vm.which = 'help';
            }
        },
        getHelpMainList() {
            var that = this;
            this.$axios.get('/v1/help/getHelpMainList')
                .then(function(response) {
                    var list = response.data.response;
                    // console.log(list)
                    // console.log(list.length);
                    that.helpMainList = [];
                    // console.log(that.provinceList);
                    for (var i = 0; i < list.length; i++) {
                        that.helpMainList.push(response.data.response[i]);
                        // that.detailList.push(response.data.response[i].detailManageVOList)
                        if (that.helpMainList[i].detailManageVOList) {
                            that.columns1 = [{
                                type: 'expand',
                                width: 50,
                                // style:no-data-text'',
                                render: (h, params) => {
                                    return h(expandRow,
                                        {
                                            props: {
                                                rowList: params.row
                                            }
                                        }
                                    )
                                }
                            },
                            {
                                title: '分类名称',
                                key: 'helpName',
                                ellipsis: true
                            },

                            {
                                title: '类型',
                                key: 'helpType'
                            },
                            {
                                title: '排序',
                                key: 'helpSort'
                            },
                            {
                                title: '项目个数',
                                key: 'detailCount'
                            },
                            {
                                title: '操作',
                                key: 'action',
                                width: 260,
                                align: 'center',
                                render: (h, params) => {
                                    return h('div', [
                                        h('Button', {
                                            props: {
                                                type: 'success',
                                                size: 'small',
                                                icon: "plus-round"
                                            },
                                            style: {
                                                marginRight: '5px'
                                            },
                                            on: {
                                                click: () => {
                                                    // this.show(params.index)
                                                    console.log(params)
                                                    that.addHelpDetail(params.row.helpId)
                                                }
                                            }
                                        }, '添加项目'),
                                        h('Button', {
                                            props: {
                                                type: 'warning',
                                                size: 'small'
                                            },
                                            style: {
                                                marginRight: '5px'
                                            },
                                            on: {
                                                click: () => {
                                                    // this.show(params.index);
                                                    that.editeHelpMain(params.row.helpId)
                                                    // console.log(params)
                                                }
                                            }
                                        }, '编辑'),
                                        h('Button', {
                                            props: {
                                                type: 'error',
                                                size: 'small'
                                            },
                                            on: {
                                                click: () => {
                                                    that.deleteThis(params.row.helpId, params.index)
                                                    // console.log(params)
                                                }
                                            }
                                        }, '删除')
                                    ]);
                                }
                            }]
                        }
                    }
                    // console.log(that.helpMainList)
                    // console.log(that.detailList)
                })
                .catch(function(response) {
                    console.log(response);
                });
        },
        addHelpMain() {
            sessionStorage.setItem('helpInfoManage-helpMainManage-helpId', '');
            this.$router.push({ name: 'helpMainManage' });
        },
        editeHelpMain(helpId) {
            sessionStorage.setItem('helpInfoManage-helpMainManage-helpId', helpId);
            this.$router.push({ name: 'helpMainManage' });
        },
        addHelpDetail(helpId) {
            sessionStorage.setItem('helpInfoManage-helpDetailManage-helpId', helpId);
            this.$router.push({ name: 'helpDetailManage' });
        },
        //   editeHelpDetail(helpId,helpDetilId){
        //        sessionStorage.setItem('helpInfoManage-helpDetailManage-helpId', helpId);
        //        sessionStorage.setItem('helpInfoManage-helpDetailManage-helpDetilId', helpDetilId);
        //        this.$router.push({name: 'helpDetailManage'});
        //   },
        deleteThis(helpId, index) {
            // console.log(detailId)
            // console.log(index)
            var that = this;
            // console.log(detail)
            // that.detail.splice(detailId, 1);
            this.$axios.get('/v1/help/deleteHelpMainInfoByHelpId?helpId=' + helpId)
                .then(function(response) {
                    that.helpMainList.splice(index, 1);
                })
                .catch(function(response) {
                    console.log(response);
                });
        },
        getwikipediaInfo() {
            var that = this;
            this.$axios.get('/v1/commoninformation/getwikipediaInfo')
                .then(function(response) {
                    console.log(response)
                    let list = response.data.response;
                    that.informationList=that.informationList.concat(list);
                })
                .catch(function(response) {
                    console.log(response);
                });
        },
        getCommonInformationListExceptWiki() {
            var that = this;
            this.$axios.get('/v1/commoninformation/getCommonInformationListExceptWiki')
                .then(function(response) {
                    console.log(response)
                    let list = response.data.response;
                    that.informationList=that.informationList.concat(list);
                })
                .catch(function(response) {
                    console.log(response);
                });
        },
        bkEdite(informationId) {
            console.log(informationId)
            sessionStorage.setItem('helpInfoManage-helpMainManage-informationId', informationId);
            this.$router.push({ name: 'wikipediaEdite' });
        }
    },
    mounted() {
        var vm = this;
        let height = (document.body.offsetHeight - 300) / 2;
        let wiki = sessionStorage.getItem('helpInfoManage-helpMainManage-whichPane');
        console.log(wiki)
        if(wiki){
            vm.which='wiki';
            sessionStorage.setItem('helpInfoManage-helpMainManage-whichPane', '');
        }
        vm.getHelpMainList();
        vm.getwikipediaInfo();
        vm.getCommonInformationListExceptWiki();
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
    }

};
</script>