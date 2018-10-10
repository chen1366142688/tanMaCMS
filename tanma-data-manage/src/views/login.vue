<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login_box" @keydown.enter="handleSubmit">
        <div class="login-con">
                <p class="login-title" >
                    欢迎登录探马数据管理后台
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName" class="login-item" >
                            <Input v-model="form.userName" class="login-item"  placeholder="请输入用户名">
                                <span slot="prepend" class="login-icon" >
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password" class="login-item" >
                            <Input type="password" class="login-item"  v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend"  class="login-icon">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem v-if="1==2">
                            <Button class="login-button" type="primary" long>验证机制</Button>
                        </FormItem>
                        <FormItem class="login-check" >
                            <Button class="login-button"  @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                </div>
                <div v-if="1==2" class="qrcode" id="qrcode">扫描获取认证口令</div>
        </div>
    </div>
</template>

<script>
import QRCode from 'qrcodejs2';

export default {
    data () {
        return {
            form: {
                userName: '',
                password: ''
            },
            rules: {
                userName: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            },
        };
    },
    methods: {
        handleSubmit () {
            let this_ = this;
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    let data_ = {
                        userName:this.form.userName,
                        passWord:this.form.password
                    }

                    sessionStorage.setItem('token', "");
                    sessionStorage.setItem('phoneNo', "");
                    sessionStorage.setItem('operationCode', "");
                    sessionStorage.setItem('name', "");
                    sessionStorage.setItem('avatarUrl', "");
                    sessionStorage.setItem('menuList', "");

                    this.$axios.post('/v1/operation/login/password',data_)
                    .then(function(res){
                        if(res.data.code==10000){
                           let response = res.data.response;
                           this_.$axios.defaults.headers.common['token'] = response.token;

                           sessionStorage.setItem('token', response.token);
                           sessionStorage.setItem('phoneNo', response.phoneNo);
                           sessionStorage.setItem('operationCode', response.operationCode);
                           sessionStorage.setItem('name', response.name);
                           sessionStorage.setItem('avatarUrl', response.avatarUrl);
                           sessionStorage.setItem('menuList', response.menuList);
                           this_.$router.push({name: 'home_index'});
                           this_.$Message.success('登录成功！');
                           this_.$router.push({name: 'home_index'});
                        }else{
                            this_.$Message.info('账户或者密码错误！');
                        }
                    })
                    .catch(function(error){
                        console.log(error);
                    });
                }
            });
        },

        qrcode () {
        // let qrcode = new QRCode('qrcode', {
        //     width: 100,
        //     height: 100, // 高度
        //     text: '56663159' // 二维码内容
        //     // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
        //     // background: '#f0f'
        //     // foreground: '#ff0'
        // })
        // console.log(qrcode)
        }

    },
    mounted () {
        // this.qrcode()
    }
};
</script>

<style>

</style>
