import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: resolve => { require(['@/views/login.vue'], resolve); }
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: resolve => { require(['@/views/error-page/404.vue'], resolve); }
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: resolve => { require(['@//views/error-page/403.vue'], resolve); }
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: resolve => { require(['@/views/error-page/500.vue'], resolve); }
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    component: Main,
    children: [
        { path: 'home', title: { i18n: 'home' }, name: 'home_index', component: resolve => { require(['@/views/home/home.vue'], resolve); } }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/page',
        icon: 'ios-paper',
        title: '首页',
        name: 'indexManage',
        component: Main,
        children: [
            { path: 'index', title: 'Page', name: 'page_index', component: resolve => { require(['@/views/index/index.vue'], resolve); } }
        ]
    },
    {
        path: '/group',
        icon: 'ios-folder',
        name: 'baseConfig',
        title: '系统管理',
        component: Main,
        children: [
            {
                path: 'operatorManage',
                icon: 'ios-list-outline',
                name: 'operatorManage',
                title: '后台人员管理',
                component: resolve => { require(['@/views/operatorManage/operatorManage.vue'], resolve); }
            },
            {
                path: 'operatorDetail',
                icon: 'ios-list-outline',
                name: 'operatorDetail',
                title: '账号详情',
                component: resolve => { require(['@/views/operatorManage/operatorDetail.vue'], resolve); }
            },
            {
                path: 'groupDetail',
                icon: 'ios-list-outline',
                name: 'groupDetail',
                title: '权限组详情',
                component: resolve => { require(['@/views/operatorManage/groupDetail.vue'], resolve); }
            },
            {
                path: 'helpInfoManage',
                icon: 'ios-list-outline',
                name: 'helpInfoManage',
                title: '帮助信息管理',
                component: resolve => { require(['@/views/help/helpInfoManage.vue'], resolve); }
            },
            {
                path: 'helpMainManage',
                icon: 'ios-list-outline',
                name: 'helpMainManage',
                title: '帮助大类',
                component: resolve => { require(['@/views/help/helpMain.vue'], resolve); }
            },
            {
                path: 'helpDetailManage',
                icon: 'ios-list-outline',
                name: 'helpDetailManage',
                title: '帮助子类',
                component: resolve => { require(['@/views/help/helpDetail.vue'], resolve); }
            },
            {
                path: 'adviseManage',
                icon: 'ios-paper-outline',
                name: 'adviseManage',
                title: '用户反馈管理',
                component: resolve => { require(['@/views/adviseManage/adviseList.vue'], resolve); },
            },
            {
                path: 'adviseDetail',
                icon: 'ios-paper-outline',
                name: 'adviseDetail',
                title: '用户反馈详情',
                component: resolve => { require(['@/views/adviseManage/adviseDetail.vue'], resolve); }
            },
            {
                path: 'wikipediaEdite',
                icon: 'ios-paper-outline',
                name: 'wikipediaEdite',
                title: '编辑百科内容',
                component: resolve => { require(['@/views/help/wikipediaEdite.vue'], resolve); }
            },
            {
                path: 'advertisement',
                icon: 'ios-paper-outline',
                name: 'advertisement',
                title: '广告管理',
                 component: resolve => { require(['@/views/advertisement/advertisement.vue'], resolve); }
             },
             {
                path: 'materialManage',
                icon: 'ios-paper-outline',
                name: 'materialManage',
                title: '引用素材管理',
                 component: resolve => { require(['@/views/materialManage/materialList.vue'], resolve); }
             }, 
             {
                path: 'materialDetail',
                icon: 'ios-paper-outline',
                name: 'materialDetail',
                title: '引用素材详情',
                 component: resolve => { require(['@/views/materialManage/materialDetail.vue'], resolve); }
             },                              
        ]
    },
    {
        path: '/schoolManage',
        icon: 'ios-home',
        name: 'schoolManage',
        title: '学校管理',
        component: Main,
        children: [
            {
                path: 'schoolList',
                icon: 'ios-paper-outline',
                name: 'schoolList',
                title: '学校管理',
                component: resolve => { require(['@/views/schoolManage/schoolList/schoolList.vue'], resolve); },
            },
            {
                path: 'schoolDetail',
                icon: 'ios-paper-outline',
                name: 'schoolDetail',
                title: '学校详情',
                component: resolve => { require(['@/views/schoolManage/schoolList/schoolDetail.vue'], resolve); }
            },
            {
                path: 'exportGroupList',
                icon: 'ios-paper-outline',
                name: 'exportGroupList',
                title: '体测数据导出管理',
                component: resolve => { require(['@/views/schoolManage/schoolList/exportGroupList.vue'], resolve); }
            }
        ]
    },
    {
        path: '/testManage',
        icon: 'ios-home',
        name: 'testManage',
        title: '测试项目管理',
        component: Main,
        children: [
            {
                path: 'testItem',
                icon: 'ios-paper-outline',
                name: 'testItem',
                title: '测试项目',
                component: resolve => { require(['@/views/testManage/testItem.vue'], resolve); },
            },
            {
                path: 'testDetail',
                icon: 'ios-paper-outline',
                name: 'testDetail',
                title: '测试项目详情',
                component: resolve => { require(['@/views/testManage/testDetail.vue'], resolve); },
            },
            {
                path: 'testStandard',
                icon: 'ios-paper-outline',
                name: 'testStandard',
                title: '测试标准',
                component: resolve => { require(['@/views/testManage/testStandard.vue'], resolve); }
            },
            {
                path: 'scoreStandard',
                icon: 'ios-paper-outline',
                name: 'scoreStandard',
                title: '评分标准',
                component: resolve => { require(['@/views/testManage/testStandardDetail.vue'], resolve); }
            },
            {
                path: 'testHistory',
                icon: 'ios-paper-outline',
                name: 'testHistory',
                title: '测试历史',
                component: resolve => { require(['@/views/testManage/testHistory.vue'], resolve); }
            },
            {
                path: 'scoreCalculate',
                icon: 'ios-paper-outline',
                name: 'scoreCalculate',
                title: '分数计算',
                component: resolve => { require(['@/views/testManage/scoreCalculate.vue'], resolve); }
            },
            {
                path: 'itemScoreCalculate',
                icon: 'ios-paper-outline',
                name: 'itemScoreCalculate',
                title: '部分分数计算',
                component: resolve => { require(['@/views/testManage/itemScoreCalculate.vue'], resolve); }
            },
            {
                path: 'xmDiagnosis',
                icon: 'ios-paper-outline',
                name: 'xmDiagnosis',
                title: '小马诊断',
                component: resolve => { require(['@/views/testManage/xmDiagnosis.vue'], resolve); }
            },
            {
                path: 'xmDiagnosisDetail',
                icon: 'ios-paper-outline',
                name: 'xmDiagnosisDetail',
                title: '条件设置',
                component: resolve => { require(['@/views/testManage/xmDiagnosisDetail.vue'], resolve); }
            }
            ,
            {
                path: 'itemDiagnosis',
                icon: 'ios-paper-outline',
                name: 'itemDiagnosis',
                title: '项目诊断',
                component: resolve => { require(['@/views/testManage/itemDiagnosis.vue'], resolve); }
            }
        ]
    },
    {
        path: '/exercisePlanManage',
        icon: 'ios-speedometer',
        name: 'exercisePlanManage',
        title: '训练计划管理',
        component: Main,
        children: [
            {
                path: 'exercisePlanList',
                icon: 'ios-paper-outline',
                name: 'exercisePlanList',
                title: '训练计划',
                component: resolve => { require(['@/views/exercisePlanManage/exercisePlanList/exercisePlanList.vue'], resolve); },
            },
            {
                path: 'exercisePlanDetail',
                icon: 'ios-paper-outline',
                name: 'exercisePlanDetail',
                title: '计划详情',
                component: resolve => { require(['@/views/exercisePlanManage/exercisePlanList/exercisePlanDetail.vue'], resolve); }
            },
            {
                path: 'exerciseCommentList',
                icon: 'ios-paper-outline',
                name: 'exerciseCommentList',
                title: '评论管理',
                component: resolve => { require(['@/views/exercisePlanManage/exerciseCommentList/exerciseCommentList.vue'], resolve); },
            },
            {
                path: 'exerciseCommentDetail',
                icon: 'ios-paper-outline',
                name: 'exerciseCommentDetail',
                title: '训练评论明细',
                component: resolve => { require(['@/views/exercisePlanManage/exerciseCommentList/exerciseCommentDetail.vue'], resolve); }
            }
        ]
    },
    {
        path: '/studentMange',
        icon: 'ios-body-outline',
        name: 'studentMange',
        title: '学生数据管理',
        component: Main,
        children: [
            {
                path: 'studentList',
                icon: 'ios-paper-outline',
                name: 'studentList',
                title: '学生信息管理',
                component: resolve => { require(['@/views/studentManage/studentList/studentList.vue'], resolve); },
            },
             {
                path: 'studentDetail',
                icon: 'ios-paper-outline',
                name: 'studentDetail',
                title: '学生信息详情',
                 component: resolve => { require(['@/views/studentManage/studentList/studentDetail.vue'], resolve); }
             },             
        ]
    },
    {
        path: '/countryDataManage',
        icon: 'ios-home',
        name: 'countryDataManage',
        title: '国家体测数据管理',
        component: Main,
        children: [
            {
                path: 'countryTest',
                icon: 'ios-paper-outline',
                name: 'countryTest',
                title: '国家测试项目',
                component: resolve => { require(['@/views/countryDataManage/countryTest.vue'], resolve); },
            },
            {
                path: 'countryTestDetail',
                icon: 'ios-paper-outline',
                name: 'countryTestDetail',
                title: '测试详情',
                component: resolve => { require(['@/views/countryDataManage/countryTestDetail.vue'], resolve); },
            },
            {
                path: 'schoolTestStandard',
                icon: 'ios-paper-outline',
                name: 'schoolTestStandard',
                title: '体测总分计算',
                component: resolve => { require(['@/views/countryDataManage/schoolTestStandard.vue'], resolve); },
            },
            {
                path: 'schoolTestStandardDetail',
                icon: 'ios-paper-outline',
                name: 'schoolTestStandardDetail',
                title: '体测数据标准',
                component: resolve => { require(['@/views/countryDataManage/schoolTestStandardDetail.vue'], resolve); },
            },
            {
                path: 'countryStudentTest',
                icon: 'ios-paper-outline',
                name: 'countryStudentTest',
                title: '体测学生数据',
                component: resolve => { require(['@/views/countryDataManage/countryStudentTest.vue'], resolve); },
            },
            {
                path: 'countryStudentTestDetail',
                icon: 'ios-paper-outline',
                name: 'countryStudentTestDetail',
                title: '学生体测详情数据',
                component: resolve => { require(['@/views/countryDataManage/countryStudentTestDetail.vue'], resolve); },
            }
            
        ]
    },
];


// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    ...appRouter,
    page500,
    page403,
    page404
];
