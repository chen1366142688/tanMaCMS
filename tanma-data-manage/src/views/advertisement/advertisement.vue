<style>
    .class-photo-list1{
        display: inline-block;
        width: 320px;
        height: 480px;
        text-align: center;
        line-height: 115px;
        border: 1px solid transparent;      
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .class-photo-list1 img{
        width: 100%;
        height: 100%;      
    }
    .class-photo-list1-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .class-photo-list1:hover .class-photo-list1-cover{
        display: block;
    }
    .class-photo-list1-cover i{
        color: #fff;
        font-size: 25px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>

<template>
<div>
    <div style="margin-left:15px;">
        <Tabs>
             <TabPane name="schoolInfo" label="闪屏页广告" style="height:100%">
              <Card>
            <div>
                <Row :gutter="16" type="flex" align="middle" class="advanced-router">
                    <Col span="3" offset="15">
                        <div style="float: right;">
                        <Button class="add-button" v-on:click="addAdData()" type="success" icon="plus" style="background-color:#00c693"  >添加新闪屏页</Button>
                        </div>
                    </Col>
                </Row>
            </div>
            <br>

            <div >
                <Row>
                  <Table border :columns="adColumns" :data="adData" height="680"></Table>
                </Row>
            </div>
             </Card>   
         </TabPane>
     </Tabs>
  </div>
        <Modal title="预览图片" cancel-text="" v-model="previewStatus">
             <img :src="previewUrl" v-if="previewStatus" style="width: 100%"/>
        </Modal>  
        <Modal title="预览链接" cancel-text="" v-model="previewLinkStatus" width="500px">
            <div style="margin-top:5px;height:650px;" v-if="previewLinkStatus">
              <iframe frameborder="0" width="100%" height="600px" marginheight="0" scrolling="auto" marginwidth="0" :src="previewLinkUrl"></iframe>
            </div>
        </Modal>
        <Modal v-model="showAdModel" title="闪屏页" @on-ok="showAdModelOnOk"  :mask-closable="false" :loading="showAdModelLoading" width="800px">
            <div style="margin-top:5px;height:550px;">
             <Form ref="showAdModel" :label-width="120">
               <FormItem label="闪屏图片">  
                <Row>
                    <Col span="24">
                        <div class="class-photo-list1" v-if="adPhotoUrl!=''">
                                <img :src="adPhotoUrl" >
                        </div>
                        <Upload  ref="upload"
                                :show-upload-list="false"
                                :on-success="uploadFileSuccess"
                                :format="['jpg','jpeg','png']"
                                :max-size="2048"
                                :action="updateUrl"
                                name="muFiles"
                                type="drag"
                                style="display: inline-block;width:100px;">
                            <div  style="width: 100px;height:100px;line-height: 115px;">
                                <Icon type="ios-cloud-upload-outline" size="35"></Icon>上传图片
                            </div>
                        </Upload>                                                      
                    </Col>
                </Row> 
              </FormItem>
               <FormItem label="页面链接地址">               
                <Row>
                    <Col span="24"> 
                         <Input v-model="adLinkUrl" placeholder="请输入链接地址" style="width: 400px" :maxlength="500" /> 
                         （以http或https开头）                                                   
                    </Col>
                </Row>
                </FormItem>
               </Form> 

            </div>  
        </Modal>        
</div>
</template>

<script>
export default {
    name: 'advertisement'
    ,data(){
        return {     
                      adData:[
                             ],
                   adColumns:[
                          {
                            title: '图片',
                            key: 'type',
                            align:'center',
                            width: 250,
                            render: (h, params) => {
                                     return h('div',[
                                        h('img',{attrs: {src: params.row.adPhotoUrl},style: {width: '90px',height: '125px'}})
                                        ]);
                                }
                            },
                            {
                            title: '链接',
                            key: 'adLinkUrl',
                            align:'center',
                            width: 400,
                            },
                            {
                            title: '预览',
                            key: 'action',
                            align:'center',
                            width: 250,
                            render: (h, params) => {
                                if(params.row.adLinkUrl==''){
                                    return h('div', [                                                                        
                                        h('Button', {
                                            props: {
                                                type: 'success',
                                            },
                                            style: {
                                                marginRight: '5px'
                                            },
                                            on: {
                                                click: () => {
                                                    this.handleView(params.row.adPhotoUrl);
                                                }
                                            }
                                        }, '预览图片'),                                                                                                                                                
                                    ]);
                                }
                                return h('div', [                                                                        
                                    h('Button', {
                                        props: {
                                            type: 'success',
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                this.handleView(params.row.adPhotoUrl);
                                            }
                                        }
                                    }, '预览图片'),                                     
                                    h('Button', {
                                        props: {
                                            type: 'success',
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                this.handleLinkView(params.row.adLinkUrl);
                                            }
                                        }
                                    }, '预览链接'),                                                                                                            
                                ]);
                               }
                            },                            
                            {
                            title: '操作',
                            key: 'action',
                            align:'center',
                            width: 250,
                            render: (h, params) => {
                                return h('div', [                                                                        
                                    h('Button', {
                                        props: {
                                            type: 'success',
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                this.showAdDetail(params.row);
                                            }
                                        }
                                    }, '编辑'),
                                    h('Button', {
                                        props: {
                                            type: 'success',
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                this.delAdData(params.row.adId);
                                            }
                                        }
                                    }, '删除'),                                                                                                           
                                ]);
                               }
                            },                            
                   ],    
                  previewUrl:'',
               previewStatus:false,
              previewLinkUrl:'',
           previewLinkStatus:false,               
                   updateUrl:'',
                 showAdModel:false,
                 showAdButOk:true,
          showAdModelLoading:true,            
                  adPhotoUrl:"",
                   adLinkUrl:"", 
                        adId:""                
        }
    }
    ,methods:{
            getAdData(){//获取闪屏数据
                    this.$axios.get("/v1/advertisement/getAdvertisementList").then(res => {
                           this.adData=res.data.response; 
                    });
            }
            ,handleView (url) { //预览图片
                        this.previewUrl = url;
                        this.previewStatus = true;
            }
            ,handleLinkView (url) { //预览链接
                       if(url!=""){
                        this.previewLinkUrl = url;
                        this.previewLinkStatus = true;
                       }
            }            
            ,delAdData(adId){//删除项目
            var vm=this;
            vm.$Modal.confirm({title:"提示",content:"确定删除此闪屏广告？",onOk:function(){
                vm.$axios.get("/v1/advertisement/updateAdvertisementStatus?adId="+adId).then(res => { 
                            if(res.data.code==10000){ 
                                vm.getAdData();                                     
                                vm.$Message.info("操作成功！");
                            }else{
                                vm.$Message.info(res.data.msg);
                            }
                    });             
            }});
            }
            ,showAdDetail(ad){
                this.showAdModel=true;
                this.showAdModelLoading=true;
                this.adPhotoUrl=ad.adPhotoUrl;
                this.adLinkUrl=ad.adLinkUrl;                
                this.adId=ad.adId;  
            }

            ,addAdData(){//添加项目
                this.showAdModel=true;
                this.showAdModelLoading=true;
                this.adPhotoUrl="";
                this.adLinkUrl="";                
                this.adId="";
            }
          ,showAdModelOnOk(){//选择页面确定按钮
             if(!this.showAdButOk){
                  return;
            }
            this.showAdButOk=false;
            setTimeout(() => {
                    this.showAdModelLoading = false;
                    this.$nextTick(() => {
                        this.showAdModelLoading = true;
                    });
                }, 500); 
              if(this.adPhotoUrl==''){
                this.$Message.success('请上传图片！');
                this.showAdButOk=true;
                return;
              }
              if(this.adLinkUrl!=''){
              var reg=/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
              if(!reg.test(this.adLinkUrl)){
                 this.$Message.success('请输入有效的链接！');
                 this.showAdButOk=true;
                 return;       
                }
              }
              var paramData={
                "adPhotoUrl":this.adPhotoUrl,
                "adLinkUrl":this.adLinkUrl,
                "adId":this.adId,
              }  
             this.$axios.post("/v1/advertisement/saveAdvertisement",paramData).then(res => { 
                         this.showAdButOk=true;
                        if(res.data.code==10000){ 
                               this.$Message.info("保存成功！");
                               this.showAdModel=false;                                     
                               this.getAdData();
                        }else{
                              this.$Message.info(res.data.msg);
                        }
                });

        }            
            ,uploadFileSuccess(response, file, fileList){//上传图片
             this.adPhotoUrl= response.response[0];
            }
                     
    } 
    ,created() {
    }   
    ,mounted(){
         this.updateUrl=this.$axios.defaults.baseURL+"/v1/file/upload?type=manage_img";
         this.getAdData();
    }
    ,watch: {

    }   
};
</script>