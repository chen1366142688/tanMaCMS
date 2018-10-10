<template>
    <div id="main" class="app-main">
        <router-view></router-view>
    </div>
</template>

<script>
import axios from 'axios';
    export default {
        mounted () {
                
        },
        beforeDestroy () {

        },
        methods: {

        },
        created(){
            //  axios.defaults.baseURL = 'https://www.timosports.cn/manage';// 正式环境
            // axios.defaults.baseURL = 'https://timosports.cn/manage';  //探马运动测试环境
	    //  axios.defaults.baseURL = 'https://patriarch-tm.tanmasports.com/manage' //探马数据测试环境
            axios.defaults.baseURL = 'http://localhost:8182';  //测试环境
            axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8'
        }
    };
</script>

<style>
.app-main{
    width: 100%;
    height: 100%;
}
</style>
