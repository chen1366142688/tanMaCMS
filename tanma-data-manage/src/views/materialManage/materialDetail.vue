<template>
<div>
    <div style="margin-left:15px;">
        <Tabs>
             <TabPane name="materialInfo" label="引用素材详情">
              <Card style="height:650px">
                  <Form ref="materialData" :model="materialData" :label-width="120">
                        <FormItem label="是否启用">
                          <Row> 
                             <Col span="4"> 
                                <RadioGroup v-model="materialData.materialStatus">
                                    <Radio  label="1">是</Radio>
                                    <Radio  label="0">否</Radio>
                                </RadioGroup>
                             </Col>                            
                          </Row> 
                        </FormItem>
                        <FormItem label="素材名称">
                          <Row> 
                             <Col span="9"> 
                            <Input v-model="materialData.materialName" :maxlength="50" style="width: 400px" placeholder="请输入素材名称" /> 
                             </Col>
                          </Row> 
                        </FormItem>
                        <FormItem label="引用分类">
                          <Row> 
                             <Col span="4"> 
                                <Select :disabled="materialData.materialId!=''" v-model="addType" style="" placeholder="请选择引用分类">
                                <Option v-for="item in addTypeList" :value="item.itemId" :key="item.itemId">{{ item.itemName }}</Option>
                                </Select>
                             </Col>                            
                          </Row> 
                        </FormItem>                                          
                        <FormItem label="素材类别">
                          <Row> 
                            <Col span="4">                    
                                <Select :disabled="materialData.materialId!=''" v-model="materialType" style="" placeholder="请选择素材类别">
                                <Option v-for="item in materialTypeList" :value="item.itemId" :key="item.itemId">{{ item.itemName }}</Option>
                                </Select>
                            </Col>                           
                          </Row> 
                        </FormItem>  
                         <FormItem v-if="materialType=='01'" label="音频">
                          <Row> 
                             <Col span="9"> 
                             <Input v-model="materialData.materialUrl" readonly :maxlength="255" style="width: 500px" placeholder="音频地址" />
                             </Col>                       
                             <Col span="4"> 
                              <Upload   v-if="addType=='01'" ref="upload"
                                        :on-progress="showProgress"
                                        :show-upload-list="false"
                                        :on-success="uploadFileSuccess"
                                        :before-upload="handleUpload"
                                        :on-format-error="uploadFileFormat"
                                        :format="['mp3','MP3','MP4','mp4','WMA','MP3PRO','WAV']"
                                        :max-size="1000000000"
                                        :action="uploadUrl+'plan_music'"
                                        name="muFiles"
                                        >
                                <Button icon="ios-cloud-upload-outline" :loading="uploadLoading">上传</Button>
                              </Upload>
                               <Upload   v-else ref="upload"
                                        :on-progress="showProgress" 
                                        :show-upload-list="false"
                                        :on-success="uploadFileSuccess"
                                        :before-upload="handleUpload"
                                        :on-format-error="uploadFileFormat"
                                        :format="['mp3','MP3','MP4','mp4','WMA','MP3PRO','WAV']"
                                        :max-size="1000000000"
                                        :action="uploadUrl+'test_music'"
                                        name="muFiles"
                                        >
                                <Button icon="ios-cloud-upload-outline" :loading="uploadLoading">上传</Button>
                              </Upload>
                            </Col>
                          </Row>
                            <br>
                            <Row>
                             <Col span="24"> 
                              <Progress v-if="uploadLoading" :percent="uploadProgress" status="active" />
                              <audio :src="materialData.materialUrl" v-if="materialData.materialUrl!=''" style="width: 500px;" controls="controls"></audio>
                             </Col>
                          </Row>  
                        </FormItem>                                              
                        <FormItem v-if="materialType=='02'" label="视频">
                          <Row> 
                             <Col span="9"> 
                             <Input v-model="materialData.materialUrl" readonly :maxlength="255" style="width: 500px" placeholder="视频地址" />
                             </Col>                            
                             <Col span="4"> 
                              <Upload   v-if="addType=='01'" ref="upload"
                                        :on-progress="showProgress"
                                        :show-upload-list="false"
                                        :on-success="uploadFileSuccess"
                                        :before-upload="handleUpload"
                                        :on-format-error="uploadFileFormat"
                                        :format="['MP4','mp4']"
                                        :max-size="1000000000"
                                        :action="uploadUrl+'plan_video'"
                                        name="muFiles"
                                        >
                                <Button icon="ios-cloud-upload-outline" :loading="uploadLoading">上传</Button>
                              </Upload>
                              <Upload   v-else ref="upload"
                                        :on-progress="showProgress"
                                        :show-upload-list="false"
                                        :on-success="uploadFileSuccess"
                                        :before-upload="handleUpload"
                                        :on-format-error="uploadFileFormat"
                                        :format="['MP4','mp4']"
                                        :max-size="1000000000"
                                        :action="uploadUrl+'test_video'"
                                        name="muFiles"
                                        >
                                <Button icon="ios-cloud-upload-outline" :loading="uploadLoading">上传</Button>
                              </Upload>                              
                            </Col>
                          </Row>
                            <Row>
                             <Col span="24"> 
                              <Progress v-if="uploadLoading" :percent="uploadProgress" />
                              <video :src="materialData.materialUrl" v-if="materialData.materialUrl!=''" style="width: 500px;height:300px" controls="controls" />
                             </Col>
                          </Row>  
                        </FormItem>
                        <FormItem v-if="materialType=='03'" label="GIF动图">
                          <Row> 
                             <Col span="9"> 
                             <Input v-model="materialData.materialUrl" readonly :maxlength="255" style="width: 500px" placeholder="GIF动图地址" />
                             </Col>                            
                             <Col span="4"> 
                              <Upload   v-if="addType=='01'" ref="upload"
                                        :show-upload-list="false"
                                        :on-success="uploadFileSuccess"
                                        :before-upload="handleUpload"
                                        :on-format-error="uploadFileFormat"
                                        :format="['gif','GIF']"
                                        :max-size="1000000000"
                                        :action="uploadUrl+'plan_gif'"
                                        name="muFiles"
                                        >
                                <Button icon="ios-cloud-upload-outline">上传</Button>
                              </Upload>
                              <Upload   v-else ref="upload"
                                        :on-progress="showProgress"
                                        :show-upload-list="false"
                                        :on-success="uploadFileSuccess"
                                        :before-upload="handleUpload"
                                        :on-format-error="uploadFileFormat"
                                        :format="['gif','GIF']"
                                        :max-size="1000000000"
                                        :action="uploadUrl+'test_gif'"
                                        name="muFiles"
                                        >
                                <Button icon="ios-cloud-upload-outline">上传</Button>
                              </Upload>                              
                            </Col>
                          </Row>
                            <Row>
                             <Col span="24"> 
                              <Progress v-if="uploadLoading" :percent="uploadProgress" />
                              <img :src="materialData.materialUrl" v-if="materialData.materialUrl!=''" style="width: 400px;height:300px"/>
                             </Col>
                          </Row>  
                        </FormItem>

                </Form>
             </Card>
             <div style="margin-top:10px;padding-left:40%">
                <Button @click="pageToMaterialList" style="float:left; margin-right:50px;width:100px" type="success">返回</Button>
                <div style="width:20px;" ></div>
                <Button  style="float:left;width:100px" @click="saveMaterialData" :loading="saveLoading"  type="success">提交结果</Button>
             </div>
         </TabPane>
     </Tabs>
</div>
</div>
</template>

<script>
export default {
    name: 'materialDetail'
    ,data(){
        return {
                materialData:{
                  materialId:'',
                  materialName:'',
                     addType:'01',
                materialType:'01',
              materialStatus:'1',
                materialName:'',
                 materialUrl:'',
                            },
                    addType:'01',
               materialType:'01',

                addTypeList:[{itemId:'01',itemName:'训练'},{itemId:'02',itemName:'测试'}],//引用归属：01训练， 02测试
           materialTypeList:[{itemId:'01',itemName:'音频'},{itemId:'02',itemName:'视频'},{itemId:'03',itemName:'GIF动图'}],//素材类型: 01音频，02视频，03 GIF
         materialStatusList:[{itemId:'1',itemName:'开启'},{itemId:'0',itemName:'关闭'}],//启用状态: 1启用，0关闭                            
                  uploadUrl:'',//上传图片类型 plan_music:计划音乐  plan_video 计划视频  plan_gif 计划GIF  test_music:测试音乐  test_video 测试视频  test_gif 测试GIF
                        url:'',
              uploadLoading:false,
                saveLoading:false,
             uploadProgress:0,
                 uploadTime:0 
        }
    }
    ,methods:{
            getmaterialData(materialId){

               this.$axios.get("/v1/material/getMaterialDetail?materialId="+materialId).then(res => {
                        if(res.data.code==10000){
                            var data=res.data.response;
                            this.addType=data.addType;
                            this.materialType=data.materialType;
                            this.materialData=data;
                        }else{
                            this.$Message.info(res.data.msg);
                        }                          
                   });  

            }
            ,pageToMaterialList(){ //返回
               sessionStorage.setItem('isMaterialDetailBack',"true");
                this.$router.go(-1);  
            } 
            ,showProgress(event, file, fileList){//上传时
              var vm=this;
               console.log(event);
                console.log(JSON.stringify(file));
                console.log(JSON.stringify(fileList));
              if(event.percent==100){
                vm.funtionUploadProgress(vm);
              }
            }
            ,funtionUploadProgress(vm){               
               vm.uploadProgress=vm.uploadProgress+1;
              if(vm.uploadProgress<99){
                 setTimeout(()=>vm.funtionUploadProgress(vm),250);
              }              
             }
            ,uploadFileSuccess(response, file, fileList){//上传成功             
             this.uploadLoading=false;
                 this.uploadProgress=100;
             this.materialData.materialUrl  = response.response[0];
            }
            ,handleUpload(){
              this.$refs.upload.clearFiles();
              this.uploadLoading=true;
              this.uploadTime=0;
              this.materialData.materialUrl="";
              this.uploadProgress=0;
              // if(this.addType=='01'){//训练
              //   if(this.materialType=='01'){
              //     this.uploadUrl=this.url+"plan_music";
              //   }else if(this.materialType=='02'){
              //     this.uploadUrl=this.url+"plan_video";
              //   }else{
              //     this.uploadUrl=this.url+"plan_gif";
              //   }
              // }else{//测试
              //   if(this.materialType=='01'){
              //     this.uploadUrl=this.url+"test_music";
              //   }else if(this.materialType=='02'){
              //     this.uploadUrl=this.url+"test_video";
              //   }else{
              //     this.uploadUrl=this.url+"test_gif";
              //   }
              // }
              // console.log(this.uploadUrl);
            }
            ,uploadFileFormat(){
                this.uploadLoading=false;
                this.$Message.info("上传文件格式不正确！");
            }
            
            ,saveMaterialData(){//保存处理  
                     this.saveLoading=true;
                 if(this.materialData.materialName==''){
                      this.$Message.error("请输入素材名称！");   
                      this.saveLoading=false;
                      return false;
                  }                     
                 if(this.materialData.materialUrl==''){
                      this.$Message.error("素材地址不能为空，请上传相关素材！");   
                      this.saveLoading=false;
                      return false;
                  }
                   this.materialData.addType=this.addType;
                   this.materialData.materialType=this.materialType;
                //保存
               this.$axios.post("/v1/material/saveMaterialInfo",this.materialData).then(res => { 
                        if(res.data.code==10000){ 
                            this.$Message.info("提交成功！"); 
                            this.saveLoading=false;                  
                            sessionStorage.setItem('isMaterialDetailBack',"true");//返回列表
                            this.$router.go(-1);                                      
                        }else{
                               this.saveLoading=false; 
                              this.$Message.info(res.data.msg);
                        }
                });
         
            }
            ,materialTypeChange(oldType,newType){

                 if(oldType!=newType && this.materialData.materialId==''){
                   this.materialData.materialUrl="";
                   this.uploadLoading=false;
                 }
            }

                     
    }    
    ,mounted(){
       this.uploadUrl=this.$axios.defaults.baseURL+"/v1/file/upload/cdn?type=";
      if(sessionStorage.getItem('materialList-materialDetail-materialId')!= null){
                this.getmaterialData(sessionStorage.getItem('materialList-materialDetail-materialId'));               
        }          
    }
    ,watch: {
      materialType:"materialTypeChange",
           addType:"materialTypeChange"
    }   
};
</script>