<template>
   <div>
        <div>
            <h1>引用素材管理</h1>
        </div> 
        <div style="margin-top:15px;">
            <div>
                <Row :gutter="16" type="flex" align="middle" class="advanced-router">
                    <Col span="2">
                        <Select v-model="addType" clearable style="" placeholder="请选择引用分类">
                        <Option v-for="item in addTypeList" :value="item.itemId" :key="item.itemId">{{ item.itemName }}</Option>
                        </Select>
                    </Col>
                    <Col span="2">                    
                        <Select v-model="materialType" clearable style="" placeholder="请选择素材类别">
                        <Option v-for="item in materialTypeList" :value="item.itemId" :key="item.itemId">{{ item.itemName }}</Option>
                        </Select>
                    </Col>
                    <Col span="2">                    
                        <Select v-model="materialStatus" clearable style="" placeholder="请选择启用状态">
                        <Option v-for="item in materialStatusList" :value="item.itemId" :key="item.itemId">{{ item.itemName }}</Option>
                        </Select>
                    </Col>                    
                    <Col span="4"> 
                        <Input v-model="materialName" placeholder="输入反馈标题关键字" style="width: 100%"></Input>
                    </Col>
                    <Col span="2"offset="1"> 
                        <Button v-on:click="adviseQuery(1)" type="success" style="background-color:#00c693" icon="ios-search">查询</Button>                        
                    </Col>
                    <Col span="2" offset="8">
                    <div style="float: right;">
                      <Button class="add-button" v-on:click="addMaterialToMaterialDetail()" type="success" icon="plus" style="background-color:#00c693"  >添加素材</Button>
                    </div>
                    </Col>                    
                </Row>
            </div>
            <br>
            <div>
                <Row>
                    <div style="">
                        <Table border :columns="resultColumns" :data="resultData"></Table>
                    </div>
                    <br>           
                    <div style="float: right;">
                        <Page :total="total" :current="pageNum" :page-size="pageSize" @on-change='pageNumChange' @on-page-size-change='pageSizechange' show-total show-sizer></Page>
                    </div>
                </Row>
            </div> 
        </div>        
    </div>       
</template>

<script>
export default {
        name: 'materialList'
        ,data(){
           return {
                    addType:'',
               materialType:'',
             materialStatus:'',
               materialName:'',
                addTypeList:[{itemId:'01',itemName:'训练'},{itemId:'02',itemName:'测试'}],//引用归属：01训练， 02测试
           materialTypeList:[{itemId:'01',itemName:'音频'},{itemId:'02',itemName:'视频'},{itemId:'03',itemName:'GIF动图'}],//素材类型: 01音频，02视频，03 GIF
         materialStatusList:[{itemId:'1',itemName:'开启'},{itemId:'0',itemName:'关闭'}],//启用状态: 1启用，0关闭
               resultColumns:[
                            {
                            title: '引用分类',
                              key: 'addType',
                            align:'center',
                            width: 150,
                           render: (h, params) => {
                                const data=params.row;
                                return h('div',[h('span',data.addType=='01'?'训练':'测试')]);
                                }
                            },
                            {
                            title: '素材类型',
                            key: 'materialType',
                            align:'center',
                            width: 150,
                            render: (h, params) => {
                                const data=params.row;
                                return h('div',[h('span',data.materialType=='01'?'音频':data.materialType=='02'?'视频':'GIF动图')]);
                                }
                            },                             
                            {
                            title: '素材名称',
                            key: 'materialName',
                            align:'center',
                             width: 300
                            },
                            {
                            title: '素材地址',
                            key: 'materialUrl',
                            align:'center',
                            minWidth: 300
                            },
                            {
                            title: '更新时间',
                            key: 'lastModifyTime',
                            align:'center',
                             width: 200
                            },                                                         
                            {
                            title: '启用状态',
                            key: 'materialStatus',
                            align:'center',
                            width: 100,
                            render: (h, params) => {
                                const data=params.row;
                                return h('div',[h('span',data.materialStatus=='1'?'开启':'关闭')]);
                                }
                            },                                                                                  
                            {
                            title: '操作',
                            key: 'action',
                            align:'center',
                            width: 200,
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
                                                this.pageToMaterialDetail(params.row.materialId);
                                            }
                                        }
                                    }, '查看')
                                ]);
                            }
                        },                                       
                    ],
               resultData:[],
                  pageNum:1,
                 pageSize:10,
                    total:0
            }              
        }
        ,methods:{
                adviseQuery(QueryMethod){//查询方法  QueryMethod 查询方式 1:查询按钮；0 翻页
                        
                        if(QueryMethod == 1){ //查询按钮查询页码设置为1
                        this.pageNum = 1  
                        }
                     let queryData={
                                     "addType":this.addType,
                                     "materialType":this.materialType,
                                     "materialStatus":this.materialStatus,
                                     "materialName":this.materialName,
                                     "pageNo":this.pageNum,
                                     "pageSize":this.pageSize
                                    }    
                     this.$axios.post("/v1/material/getMaterialList",queryData).then(res => {
                             if(res.data.code==10000){                   
                             this.resultData=res.data.response.result;
                             this.pageNum=res.data.response.pageNum;
                             this.pageSize=res.data.response.pageSize
                             this.total=res.data.response.total
                             }else{
                              this.$Message.info(res.data.msg);
                             }
                         });
                }
                ,pageNumChange(value){  //页码改变方法处理
                    if(this.pageNum !=value){
                    this.pageNum =value
                    this.adviseQuery(0);
                    }         
                }
                ,pageSizechange(value){  //页面大小改变方法处理
                    if(this.pageSize!=value){
                    this.pageSize=value
                    this.adviseQuery(1);
                    }
                }
                ,addMaterialToMaterialDetail(){   //添加素材
                      let queryData={
                            "addType":this.addType,
                            "materialType":this.materialType,
                            "materialStatus":this.materialStatus,
                            "materialName":this.materialName,
                            "pageNum":this.pageNum,
                            "pageSize":this.pageSize
                            }
                   //缓存查询条件                
                    sessionStorage.setItem('materialList-queryData',JSON.stringify(queryData)); 
                    sessionStorage.removeItem('materialList-materialDetail-materialId');        
                    this.$router.push({name: 'materialDetail'});
                }                
                ,pageToMaterialDetail(materialId){   //页面迁移

                      let queryData={
                            "addType":this.addType,
                            "materialType":this.materialType,
                            "materialStatus":this.materialStatus,
                            "materialName":this.materialName,
                            "pageNum":this.pageNum,
                            "pageSize":this.pageSize
                            }
               //缓存查询条件                
                sessionStorage.setItem('materialList-queryData',JSON.stringify(queryData)); 
                    sessionStorage.setItem('materialList-materialDetail-materialId',materialId);
                    this.$router.push({name: 'materialDetail'});
                }
        }
        ,watch: {

        }
        ,created() {
          
        }
        ,mounted() {
              if(sessionStorage.getItem('materialList-queryData')!=undefined
              && sessionStorage.getItem('isMaterialDetailBack')!=undefined){  
               //页面返回时 根据缓存的查询条件查询             
               let queryData=JSON.parse(sessionStorage.getItem('materialList-queryData'));             
                  this.addType=queryData.addType;                 
                  this.materialType=queryData.materialType; 
                  this.materialStatus=queryData.materialStatus,
                  this.materialName=queryData.materialName;                
                  this.pageNum=queryData.pageNum;
                  this.pageSize=queryData.pageSize;
                 
                 this.adviseQuery(0);
            }else{
                this.adviseQuery(1);
            }
             sessionStorage.removeItem('materialList-queryData');
             sessionStorage.removeItem('isMaterialDetailBack');
        }
};
</script>