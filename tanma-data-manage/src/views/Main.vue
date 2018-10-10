<style lang="less">
    @import "./main.less";
</style>
<template>
    <div class="main" :class="{'main-hide-text': shrink}">
        <div class="sidebar-menu-con" :style="{width: shrink?'90px':'250px', overflow: shrink ? 'visible' : 'auto'}">
            <shrinkable-menu 
                :shrink="shrink"
                :menu-list="menuList">
                <div slot="top" class="logo-con" style="background-color: white;">
                    <img v-show="!shrink"  src="../images/index_timo.png" key="max-logo" />
                    <img v-show="shrink" src="../images/index_timo_im.png" key="min-logo" />
                </div>
            </shrinkable-menu>
        </div>
        <div class="main-header-con" :style="{paddingLeft: shrink?'90px':'250px'}">
            <div class="main-header">
                <div class="navicon-con">
                    您好！当前的时间为：{{nowTime}}<font v-if="isTest" style="color:red;font-size:30px;margin-left:150px;">测试环境</font>
                </div>
                <div class="header-avator-con">
                    <div class="user-dropdown-menu-con">
                        <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                            <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                                <a href="javascript:void(0)">
                                    <span class="main-user-name">{{ userName }}</span>
                                    <Icon type="arrow-down-b"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem name="loginout"  divided>退出登录</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            <Avatar :src="avatarUrl" icon="person" style="background: #619fe7;margin-left:10px;border: 1px #9ea7b4 solid;"></Avatar>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
        <div class="single-page-con" :style="{left: shrink?'90px':'250px'}">
            <div class="single-page">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
import shrinkableMenu from './main-components/shrinkable-menu/shrinkable-menu.vue';
import axios from 'axios';

export default {
    components: {
        shrinkableMenu
    },
    data () {
        return {
            shrink: false,
            userName: '',
            phoneNo:'',
            operationCode:'',
            avatarUrl:'',
            nowTime:"",
            isTest:false,
        };
    },
    computed: {
        menuList () {
            return this.$store.state.app.menuList;
        }
    },
    methods: {
        init () {
            this.userName = sessionStorage.getItem('name');
            if(this.userName == ''){
                this.handleClickUserDropdown(this.userName);
            }
        },
        toggleClick () {
            this.shrink = !this.shrink;
        },
        handleClickUserDropdown (name) {
            sessionStorage.setItem('token', "");
            sessionStorage.setItem('phoneNo', "");
            sessionStorage.setItem('operationCode', "");
            sessionStorage.setItem('name', "");
            sessionStorage.setItem('avatarUrl', "");
            sessionStorage.setItem('menuList', "");
            this.$router.push({name: 'login'});
        },
        showTime(){
            var myDate = new Date();
            this.nowTime = myDate.getFullYear() + "-" 
            +((myDate.getMonth()+1)<10 ?'0'+(myDate.getMonth()+1):(myDate.getMonth()+1))
            + "-" 
            +(myDate.getDate()<10 ?'0'+myDate.getDate():myDate.getDate())
            + " " 
            +(myDate.getHours()<10 ?'0'+myDate.getHours():myDate.getHours())
            + ":" 
            +(myDate.getMinutes()<10 ?'0'+myDate.getMinutes():myDate.getMinutes())
            +":"
            +(myDate.getSeconds()<10 ?'0'+myDate.getSeconds():myDate.getSeconds());
            setTimeout(() => {
                this.showTime()
            }, 1000)
        },
        loginByToken(){
            let this_ = this;
            let token = sessionStorage.getItem('token');
            if(token != null && token != ""){
                this.$axios.get('/v1/operation/login/token?token='+token)
                .then(function(res){
                    if(res.data.code != 10000){
                        this_.$router.push({name: 'login'});
                    }else{
                        let response = res.data.response;
                        this_.$axios.defaults.headers.common['token'] = response.token;
                        sessionStorage.setItem('token', response.token);
                        sessionStorage.setItem('phoneNo', response.phoneNo);
                        sessionStorage.setItem('operationCode', response.operationCode);
                        sessionStorage.setItem('name', response.name);
                        sessionStorage.setItem('avatarUrl', response.avatarUrl);
                        sessionStorage.setItem('menuList', response.menuList);
                        this_.userName= response.name;
                        this_.phoneNo = response.phoneNo;
                        this_.operationCode = response.operationCode;
                        this_.avatarUrl = response.avatarUrl;
                    }
                })
                .catch(function(error){
                    this_.$router.push({name: 'login'});
                });
            }else{
                this_.$router.push({name: 'login'});
            }
        }
    },
    created (){
          
    },
    mounted () {
        this.showTime();
        this.loginByToken();
        if(axios.defaults.baseURL == 'https://patriarch-tm.tanmasports.com/manage'){
            this.isTest=true;
        }

    }
};
</script>
