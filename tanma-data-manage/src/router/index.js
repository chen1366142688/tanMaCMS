import Vue from 'vue';
import iView from 'iview';
import Util from '../libs/util';
import VueRouter from 'vue-router';
import {routers} from './router';
import axios from 'axios';
import md5 from 'js-md5';

Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
    // mode: 'history',
    routes: routers
};

export const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    // if(to.name == 'otherRouter' || to.name == 'error-500' || to.name == 'error-403' || to.name == 'error-404' || to.name == 'login' || to.name == 'home_index' || to.name == 'page_index'){
        
    // }else{
    //     axios.get('/v1/operation/login/auth?meunName='+to.name)
    //     .then(function(res){
    //         if(res.data.code != 10000){
    //             iView.Message.info('警告！你访问了没有授权的菜单。如需开通权限，请与管理员联系！')
    //             next({
    //                 path: '/login'
    //             })
    //         }
    //     })
    //     .catch(function(error){
    //         iView.Message.info('警告！你访问了没有授权的菜单。如需开通权限，请与管理员联系！')
    //         next({
    //             path: '/login'
    //         })
    //     });
    // }
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

router.afterEach((to) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

axios.interceptors.response.use(
    response => {
        if(response.data.code==30003){
            iView.Message.warning({
                content:'警告！你访问了没有授权的菜单。如需开通权限，请与管理员联系！',
                duration: 10
            })
            router.push({name: 'login'});
        }
        return response;
    },
    error => {
        return response;
    });

axios.interceptors.request.use(config=> {
    let param = (config.url.split('?').length>1)?config.url.split('?')[1]:"";
    let paramStr = "";
    let paramMap= new Map();
    let keyList=[];
    let obg={}
    let haveParam=false;
    if(param != '' && param != null && param != 'undefined'){
        let params =  param.split("&");
        if(params != null && params != 'undefined' && params.length>0){
            for(let i=0;i<params.length;i++){
               if(params[i] != null && params[i] != 'undefined' && params[i].length>0){
                    paramMap.set(params[i].split("=")[0],params[i].split("=")[1])
                    keyList.push(params[i].split("=")[0]);
                    haveParam=true;
               }
            }
        }
    }
    if(haveParam){
        var sdic = keyList.sort();
        for(let i=0;i<sdic.length;i++){
            if(paramMap.get(sdic[i]) != null && paramMap.get(sdic[i]) !='undefined' && paramMap.get(sdic[i]) !='' ){
                if(paramStr==''){
                    paramStr=sdic[i]+paramMap.get(sdic[i]);
                }else{
                    paramStr=paramStr+sdic[i]+paramMap.get(sdic[i]);
                }
            }
            
        }
    }
    paramStr=paramStr+'3aa41f6ef59f4955'+'FC609FD53E33BCB6084BD0976A628C56DC442A88';
    let jsonData = JSON.stringify(config.data);
    if(config.data != null && config.data != 'undefined'){
        paramStr=paramStr+jsonData;
    }
    paramStr = md5(paramStr).toUpperCase();
    config.headers['sign']=paramStr;
    config.headers['appKey']="3aa41f6ef59f4955";
  return config;
}, err=> {
    
  return Promise.resolve(err);
})

