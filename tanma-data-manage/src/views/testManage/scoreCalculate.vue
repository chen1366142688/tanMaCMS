<<style>
.ivu-table-row .ivu-table-cell{
    padding-left: 2px;
    padding-right: 2px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    word-break: break-all;
    box-sizing: border-box;
}
</style>

<template>
    <div style="margin-left:15px;">
        <Tabs type="card">
            <TabPane label="探马体质总分计算">
                <Card style="margin-top:20px">
                    <Table border :columns="columns1" :data="testList"></Table>
                </Card>
                <div style="margin-top:20px;padding-right:20px">
                    <Button type="success" @click="baseSubmit" style="float:right;">提交结果</Button>
                    <!-- <Button type="success" @click="ok" style="float:right;">ss</Button>   -->
                </div>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
import Vue from 'vue';
export default {
    name: 'test',
    data() {
        return {
            columns1: [
                {
                    title: '项目/年龄',
                    key: 'itemName',
                    render: (h, params) => {
                        // console.log(params)
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'success',
                                    size: 'small',
                                    value: params.row.itemName
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        var vm = this;
                                        vm.toDetail(params.row.itemId)
                                    }
                                }
                            }, params.row.itemName),
                        ]);
                    }
                },
                {
                    title: '6岁男',
                    key: 'b6',
                    render: (h, params) => {
                        // console.log(params)
                        var vm = this;
                        return h('div', [
                            h('Input', {
                                props: {
                                    type: 'text',
                                    size: 'small',
                                    placeholder: "请输入百分比",
                                    disabled: params.row.itemId == 8 || params.row.itemId == 7 || params.row.itemId == 5 ? true : false,
                                    value: params.row.itemId == 8 || params.row.itemId == 7 || params.row.itemId == 5 ? 0 : params.row.b6
                                },
                                style: {
                                    // marginRight: '5px'
                                    // width:'100%'
                                },
                                on: {
                                    'input'(value) {
                                        vm.testList[params.index] = params.row;
                                        params.row.b6 = value;
                                    }
                                }
                            }),
                        ]);
                    }
                },
                {
                    title: '6岁女',
                    key: 'g6',
                    render: (h, params) => {
                        var vm = this;
                        return h('div', [
                            h('Input', {
                                props: {
                                    type: 'text',
                                    size: 'small',
                                    placeholder: "请输入百分比",
                                    disabled: params.row.itemId == 8 || params.row.itemId == 7 || params.row.itemId == 5 ? true : false,
                                    value: params.row.itemId == 8 || params.row.itemId == 7 || params.row.itemId == 5 ? 0 : params.row.g6
                                },
                                style: {
                                    // marginRight: '5px'
                                },
                                on: {
                                    'input'(value) {
                                        vm.testList[params.index] = params.row;
                                        params.row.g6 = value;
                                    }
                                }
                            }),
                        ]);
                    }
                },
                {
                    title: '7岁男',
                    key: 'b7',
                    render: (h, params) => {
                        var vm = this;
                        return h('div', [
                            h('Input', {
                                props: {
                                    type: 'text',
                                    size: 'small',
                                    placeholder: "请输入百分比",
                                    disabled: params.row.itemId == 8 || params.row.itemId == 7 || params.row.itemId == 5 ? true : false,
                                    value: params.row.itemId == 8 || params.row.itemId == 7 || params.row.itemId == 5 ? 0 : params.row.b7
                                },
                                style: {
                                    // marginRight: '5px'
                                },
                                on: {
                                    'input'(value) {
                                        vm.testList[params.index] = params.row;
                                        params.row.b7 = value;
                                    }
                                }
                            }),
                        ]);
                    }
                },
                {
                    title: '7岁女',
                    key: 'g7',
                    render: (h, params) => {
                        var vm = this;
                        return h('div', [
                            h('Input', {
                                props: {
                                    type: 'text',
                                    size: 'small',
                                    placeholder: "请输入百分比",
                                    disabled: params.row.itemId == 8 || params.row.itemId == 7 || params.row.itemId == 5 ? true : false,
                                    value: params.row.itemId == 8 || params.row.itemId == 7 || params.row.itemId == 5 ? 0 : params.row.g7
                                },
                                style: {
                                    // marginRight: '5px'
                                },
                                on: {
                                    'input'(value) {
                                        vm.testList[params.index] = params.row;
                                        params.row.g7 = value;
                                    }
                                }
                            }),
                        ]);
                    }
                },
                {
                    title: '8岁男',
                    key: 'b8',
                    render: (h, params) => {
                        var vm = this;
                        return h('div', [
                            h('Input', {
                                props: {
                                    type: 'text',
                                    size: 'small',
                                    placeholder: "请输入百分比",
                                    disabled: params.row.itemId == 8 || params.row.itemId == 5 ? true : false,
                                    value: params.row.itemId == 8 || params.row.itemId == 5 ? 0 : params.row.b8
                                },
                                style: {
                                    // marginRight: '5px'
                                },
                                on: {
                                    'input'(value) {
                                        vm.testList[params.index] = params.row;
                                        params.row.b8 = value;
                                    }
                                }
                            }),
                        ]);
                    }
                },
                {
                    title: '8岁女',
                    key: 'g8',
                    render: (h, params) => {
                        var vm = this;
                        return h('div', [
                            h('Input', {
                                props: {
                                    type: 'text',
                                    size: 'small',
                                    placeholder: "请输入百分比",
                                    disabled: params.row.itemId == 8 || params.row.itemId == 5 ? true : false,
                                    value: params.row.itemId == 8 || params.row.itemId == 5 ? 0 : params.row.g8
                                },
                                style: {
                                    // marginRight: '5px'
                                },
                                on: {
                                    'input'(value) {
                                        vm.testList[params.index] = params.row;
                                        params.row.g8 = value;
                                    }
                                }
                            }),
                        ]);
                    }
                },
                {
                    title: '9岁男',
                    key: 'b9',
                    render: (h, params) => {
                        var vm = this;
                        return h('div', [
                            h('Input', {
                                props: {
                                    type: 'text',
                                    size: 'small',
                                    placeholder: "请输入百分比",
                                    disabled: params.row.itemId == 8 || params.row.itemId == 5 ? true : false,
                                    value: params.row.itemId == 8 || params.row.itemId == 5 ? 0 : params.row.b9
                                },
                                style: {
                                    // marginRight: '5px'
                                },
                                on: {
                                    'input'(value) {
                                        vm.testList[params.index] = params.row;
                                        params.row.b9 = value;
                                    }
                                }
                            }),
                        ]);
                    }
                },
                {
                    title: '9岁女',
                    key: 'g6',
                    render: (h, params) => {
                        var vm = this;
                        return h('div', [
                            h('Input', {
                                props: {
                                    type: 'text',
                                    size: 'small',
                                    placeholder: "请输入百分比",
                                    disabled: params.row.itemId == 8 || params.row.itemId == 5 ? true : false,
                                    value: params.row.itemId == 8 || params.row.itemId == 5 ? 0 : params.row.g9
                                },
                                style: {
                                    // marginRight: '5px'
                                },
                                on: {
                                    'input'(value) {
                                        vm.testList[params.index] = params.row;
                                        params.row.g9 = value;
                                    }
                                }
                            }),
                        ]);
                    }
                },
                {
                    title: '10岁男',
                    key: 'b10',
                    render: (h, params) => {
                        var vm = this;
                        return h('div', [
                            h('Input', {
                                props: {
                                    type: 'text',
                                    size: 'small',
                                    placeholder: "请输入百分比",
                                    disabled: params.row.itemId == 5 ? true : false,
                                    value: params.row.itemId == 5 ? 0 : params.row.b10
                                },
                                style: {
                                    // marginRight: '5px'
                                },
                                on: {
                                    'input'(value) {
                                        vm.testList[params.index] = params.row;
                                        params.row.b10 = value;
                                    }
                                }
                            }),
                        ]);
                    }
                },
                {
                    title: '10岁女',
                    key: 'g10',
                    render: (h, params) => {
                        var vm = this;
                        return h('div', [
                            h('Input', {
                                props: {
                                    type: 'text',
                                    size: 'small',
                                    placeholder: "请输入百分比",
                                    disabled: params.row.itemId == 5 ? true : false,
                                    value: params.row.itemId == 5 ? 0 : params.row.g10
                                },
                                style: {
                                    // marginRight: '5px'
                                },
                                on: {
                                    'input'(value) {
                                        vm.testList[params.index] = params.row;
                                        params.row.g10 = value;
                                    }
                                }
                            }),
                        ]);
                    }
                },
                {
                    title: '11岁男',
                    key: 'b11',
                    render: (h, params) => {
                        var vm = this;
                        return h('div', [
                            h('Input', {
                                props: {
                                    type: 'text',
                                    size: 'small',
                                    placeholder: "请输入百分比",
                                    disabled: params.row.itemId == 5 ? true : false,
                                    value: params.row.itemId == 5 ? 0 : params.row.b11
                                },
                                style: {
                                    // marginRight: '5px'
                                },
                                on: {
                                    'input'(value) {
                                        vm.testList[params.index] = params.row;
                                        params.row.b11 = value;
                                    }
                                }
                            }),
                        ]);
                    }
                },
                {
                    title: '11岁女',
                    key: 'g11',
                    render: (h, params) => {
                        var vm = this;
                        return h('div', [
                            h('Input', {
                                props: {
                                    type: 'text',
                                    size: 'small',
                                    placeholder: "请输入百分比",
                                    disabled: params.row.itemId == 5 ? true : false,
                                    value: params.row.itemId == 5 ? 0 : params.row.g11
                                },
                                style: {
                                    // marginRight: '5px'
                                },
                                on: {
                                    'input'(value) {
                                        vm.testList[params.index] = params.row;
                                        params.row.g11 = value;
                                    }
                                }
                            }),
                        ]);
                    }
                },
                {
                    title: '12岁男',
                    key: 'b12',
                    render: (h, params) => {
                        var vm = this;
                        return h('div', [
                            h('Input', {
                                props: {
                                    type: 'text',
                                    size: 'small',
                                    placeholder: "请输入百分比",
                                    disabled: params.row.itemId == 4 ? true : false,
                                    value: params.row.itemId == 4 ? 0 : params.row.b12
                                },
                                style: {
                                    // marginRight: '5px'
                                },
                                on: {
                                    'input'(value) {
                                        vm.testList[params.index] = params.row;
                                        params.row.b12 = value;
                                    }
                                }
                            }),
                        ]);
                    }
                },
                {
                    title: '12岁女',
                    key: 'g12',
                    render: (h, params) => {
                        var vm = this;
                        return h('div', [
                            h('Input', {
                                props: {
                                    type: 'text',
                                    size: 'small',
                                    placeholder: "请输入百分比",
                                    disabled: params.row.itemId == 4 ? true : false,
                                    value: params.row.itemId == 4 ? 0 : params.row.g12
                                },
                                style: {
                                    // marginRight: '5px'
                                },
                                on: {
                                    'input'(value) {
                                        vm.testList[params.index] = params.row;
                                        params.row.g12 = value;
                                    }
                                }
                            }),
                        ]);
                    }
                },
                {
                    title: '13岁男',
                    key: 'b13',
                    render: (h, params) => {
                        var vm = this;
                        return h('div', [
                            h('Input', {
                                props: {
                                    type: 'text',
                                    size: 'small',
                                    placeholder: "请输入百分比",
                                    disabled: params.row.itemId == 4 ? true : false,
                                    value: params.row.itemId == 4 ? 0 : params.row.b13
                                },
                                style: {
                                    // marginRight: '5px'
                                },
                                on: {
                                    'input'(value) {
                                        vm.testList[params.index] = params.row;
                                        params.row.b13 = value;
                                    }
                                }
                            }),
                        ]);
                    }
                },
                {
                    title: '13岁女',
                    key: 'g13',
                    render: (h, params) => {
                        var vm = this;
                        return h('div', [
                            h('Input', {
                                props: {
                                    type: 'text',
                                    size: 'small',
                                    placeholder: "请输入百分比",
                                    disabled: params.row.itemId == 4 ? true : false,
                                    value: params.row.itemId == 4 ? 0 : params.row.g13
                                },
                                style: {
                                    // marginRight: '5px'
                                },
                                on: {
                                    'input'(value) {
                                        vm.testList[params.index] = params.row;
                                        params.row.g13 = value;
                                    }
                                }
                            }),
                        ]);
                    }
                },
                {
                    title: '14岁男',
                    key: 'b14',
                    render: (h, params) => {
                        var vm = this;
                        return h('div', [
                            h('Input', {
                                props: {
                                    type: 'text',
                                    size: 'small',
                                    placeholder: "请输入百分比",
                                    disabled: params.row.itemId == 4 ? true : false,
                                    value: params.row.itemId == 4 ? 0 : params.row.b14
                                },
                                style: {
                                    // marginRight: '5px'
                                },
                                on: {
                                    'input'(value) {
                                        vm.testList[params.index] = params.row;
                                        params.row.b14 = value;
                                    }
                                }
                            }),
                        ]);
                    }
                },
                {
                    title: '14岁女',
                    key: 'g14',
                    render: (h, params) => {
                        var vm = this;
                        return h('div', [
                            h('Input', {
                                props: {
                                    type: 'text',
                                    size: 'small',
                                    placeholder: "请输入百分比",
                                    disabled: params.row.itemId == 4 ? true : false,
                                    value: params.row.itemId == 4 ? 0 : params.row.g14
                                },
                                style: {
                                    // marginRight: '5px'
                                },
                                on: {
                                    'input'(value) {
                                        vm.testList[params.index] = params.row;
                                        params.row.g14 = value;
                                    }
                                }
                            }),
                        ]);
                    }
                },
                {
                    title: '15岁男',
                    key: 'b15',
                    render: (h, params) => {
                        var vm = this;
                        return h('div', [
                            h('Input', {
                                props: {
                                    type: 'text',
                                    size: 'small',
                                    placeholder: "请输入百分比",
                                    disabled: params.row.itemId == 4 ? true : false,
                                    value: params.row.itemId == 4 ? 0 : params.row.b15
                                },
                                style: {
                                    // marginRight: '5px'
                                },
                                on: {
                                    'input'(value) {
                                        vm.testList[params.index] = params.row;
                                        params.row.b15 = value;
                                    }
                                }
                            }),
                        ]);
                    }
                },
                {
                    title: '15岁女',
                    key: 'g15',
                    render: (h, params) => {
                        var vm = this;
                        return h('div', [
                            h('Input', {
                                props: {
                                    type: 'text',
                                    size: 'small',
                                    placeholder: "请输入百分比",
                                    disabled: params.row.itemId == 4 ? true : false,
                                    value: params.row.itemId == 4 ? 0 : params.row.g15
                                },
                                style: {
                                    // marginRight: '5px'
                                },
                                on: {
                                    'input'(value) {
                                        vm.testList[params.index] = params.row;
                                        params.row.g15 = value;
                                    }
                                }
                            }),
                        ]);
                    }
                },
                {
                    title: '16岁男',
                    key: 'b16',
                    render: (h, params) => {
                        var vm = this;
                        return h('div', [
                            h('Input', {
                                props: {
                                    type: 'text',
                                    size: 'small',
                                    placeholder: "请输入百分比",
                                    disabled: params.row.itemId == 4 ? true : false,
                                    value: params.row.itemId == 4 ? 0 : params.row.b16
                                },
                                style: {
                                    // marginRight: '5px'
                                },
                                on: {
                                    'input'(value) {
                                        vm.testList[params.index] = params.row;
                                        params.row.b16 = value;
                                    }
                                }
                            }),
                        ]);
                    }
                },
                {
                    title: '16岁女',
                    key: 'g16',
                    render: (h, params) => {
                        var vm = this;
                        return h('div', [
                            h('Input', {
                                props: {
                                    type: 'text',
                                    size: 'small',
                                    placeholder: "请输入百分比",
                                    disabled: params.row.itemId == 4 ? true : false,
                                    value: params.row.itemId == 4 ? 0 : params.row.g16
                                },
                                style: {
                                    // marginRight: '5px'
                                },
                                on: {
                                    'input'(value) {
                                        vm.testList[params.index] = params.row;
                                        params.row.g16 = value;
                                    }
                                }
                            }),
                        ]);
                    }
                },
                {
                    title: '17岁男',
                    key: 'b17',
                    render: (h, params) => {
                        var vm = this;
                        return h('div', [
                            h('Input', {
                                props: {
                                    type: 'text',
                                    size: 'small',
                                    placeholder: "请输入百分比",
                                    disabled: params.row.itemId == 4 ? true : false,
                                    value: params.row.itemId == 4 ? 0 : params.row.b17
                                },
                                style: {
                                    // marginRight: '5px'
                                },
                                on: {
                                    'input'(value) {
                                        vm.testList[params.index] = params.row;
                                        params.row.b17 = value;
                                    }
                                }
                            }),
                        ]);
                    }
                },
                {
                    title: '17岁女',
                    key: 'g17',
                    render: (h, params) => {
                        var vm = this;
                        return h('div', [
                            h('Input', {
                                props: {
                                    type: 'text',
                                    size: 'small',
                                    placeholder: "请输入百分比",
                                    disabled: params.row.itemId == 4 ? true : false,
                                    value: params.row.itemId == 4 ? 0 : params.row.g17
                                },
                                style: {
                                    // marginRight: '5px'
                                },
                                on: {
                                    'input'(value) {
                                        vm.testList[params.index] = params.row;
                                        params.row.g17 = value;
                                    }
                                }
                            }),
                        ]);
                    }
                },
            ],
            testList: []



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
        toDetail(itemId) {
            sessionStorage.setItem('testManage-scoreCalculate-itemId', itemId);
            this.$router.push({ name: 'itemScoreCalculate' });
        },
        getAllItemTotalScoreInfo() {
            var that = this;
            // that.detail.splice(detailId, 1);
            this.$axios.get('/v1/corporeitytest/getAllItemTotalScoreInfo')
                .then(function(response) {
                    console.log(response)
                    that.testList = response.data.response
                })
                .catch(function(response) {
                    console.log(response);
                });
        },
        baseSubmit() {
            var that = this;
            var checkNum = /^\d+$/;
            console.log(that.testList)
            let list = that.testList;
            let b6 = 0;
            let g6 = 0;
            let b7 = 0;
            let g7 = 0;
            let b8 = 0;
            let g8 = 0;
            let b9 = 0;
            let g9 = 0;
            let b10 = 0;
            let g10 = 0;
            let b11 = 0;
            let g11 = 0;
            let b12 = 0;
            let g12 = 0;
            let b13 = 0;
            let g13 = 0;
            let b14 = 0;
            let g14 = 0;
            let b15 = 0;
            let g15 = 0;
            let b16 = 0;
            let g16 = 0;
            let b17 = 0;
            let g17 = 0;

            for (let i = 0; i < list.length; i++) {

                if (!checkNum.test(list[i].b6?list[i].b6:0)) {
                    that.$Message.info("男六岁百分比只能是整数，请检查");
                    return false;
                } else {
                    b6 += list[i].b6 ? Number(list[i].b6) : 0;
                }

                if (!checkNum.test(list[i].g6?list[i].g6:0)) {
                    that.$Message.info("女六岁百分比只能是整数，请检查");
                    return false;
                } else {
                    g6 += list[i].g6 ? Number(list[i].g6) : 0;
                }


                if (!checkNum.test(list[i].b7?list[i].b7:0)) {
                    that.$Message.info("男七岁百分比只能是整数，请检查");
                    return false;
                } else {
                    b7 += list[i].b7 ? Number(list[i].b7) : 0;
                }
                if (!checkNum.test(list[i].g7?list[i].g7:0)) {
                    that.$Message.info("女七岁百分比只能是整数，请检查");
                    return false;
                } else {
                    g7 += list[i].g7 ? Number(list[i].g7) : 0;
                }
                if (!checkNum.test(list[i].b8?list[i].b8:0)) {
                    that.$Message.info("男八岁百分比只能是整数，请检查");
                    return false;
                } else {
                    b8 += list[i].b8 ? Number(list[i].b8) : 0;
                }
                if (!checkNum.test(list[i].g8?list[i].g8:0)) {
                    that.$Message.info("女八岁百分比只能是整数，请检查");
                    return false;
                } else {
                    g8 += list[i].g8 ? Number(list[i].g8) : 0;
                }
                if (!checkNum.test(list[i].b9?list[i].b9:0)) {
                    that.$Message.info("男九岁百分比只能是整数，请检查");
                    return false;
                } else {
                    b9 += list[i].b9 ? Number(list[i].b9) : 0;
                }
                if (!checkNum.test(list[i].g9?list[i].g9:0)) {
                    that.$Message.info("女九岁百分比只能是整数，请检查");
                    return false;
                } else {
                    g9 += list[i].g9 ? Number(list[i].g9) : 0;
                }
                if (!checkNum.test(list[i].b10?list[i].b10:0)) {
                    that.$Message.info("男十岁百分比只能是整数，请检查");
                    return false;
                } else {
                    b10 += list[i].b10 ? Number(list[i].b10) : 0;
                }
                if (!checkNum.test(list[i].g10?list[i].g10:0)) {
                    that.$Message.info("女十岁百分比只能是整数，请检查");
                    return false;
                } else {
                    g10 += list[i].g10 ? Number(list[i].g10) : 0;
                }
                if (!checkNum.test(list[i].b11?list[i].b11:0)) {
                    that.$Message.info("男十一岁百分比只能是整数，请检查");
                    return false;
                } else {
                    b11 += list[i].b11 ? Number(list[i].b11) : 0;
                }
                if (!checkNum.test(list[i].g11?list[i].g11:0)) {
                    that.$Message.info("女十一岁百分比只能是整数，请检查");
                    return false;
                } else {
                    g11 += list[i].g11 ? Number(list[i].g11) : 0;
                }
                if (!checkNum.test(list[i].b12?list[i].b12:0)) {
                    console.log(list[i].b12)
                    that.$Message.info("男十二岁百分比只能是整数，请检查");
                    return false;
                } else {
                    b12 += list[i].b12 ? Number(list[i].b12) : 0;
                }
                if (!checkNum.test(list[i].g12?list[i].g12:0)) {
                    that.$Message.info("女十二岁百分比只能是整数，请检查");
                    return false;
                } else {
                    g12 += list[i].g12 ? Number(list[i].g12) : 0;
                }
                if (!checkNum.test(list[i].b13?list[i].b13:0)) {
                    that.$Message.info("男十三岁百分比只能是整数，请检查");
                    return false;
                } else {
                    b13 += list[i].b13 ? Number(list[i].b13) : 0;
                }
                if (!checkNum.test(list[i].g13?list[i].g13:0)) {
                    that.$Message.info("女十三岁百分比只能是整数，请检查");
                    return false;
                } else {
                    g13 += list[i].g13 ? Number(list[i].g13) : 0;
                }
                if (!checkNum.test(list[i].b14?list[i].b14:0)) {
                    that.$Message.info("男十四岁百分比只能是整数，请检查");
                    return false;
                } else {
                    b14+= list[i].b14 ? Number(list[i].b14) : 0;
                }
                if (!checkNum.test(list[i].g14?list[i].g14:0)) {
                    that.$Message.info("女十四岁百分比只能是整数，请检查");
                    return false;
                } else {
                    g14 += list[i].g14 ? Number(list[i].g14) : 0;
                }
                if (!checkNum.test(list[i].b15?list[i].b15:0)) {
                    that.$Message.info("男十五岁百分比只能是整数，请检查");
                    return false;
                } else {
                    b15 += list[i].b15 ? Number(list[i].b15) : 0;
                }
                if (!checkNum.test(list[i].g15?list[i].g15:0)) {
                    that.$Message.info("女十五岁百分比只能是整数，请检查");
                    return false;
                } else {
                    g15 += list[i].g15 ? Number(list[i].g15) : 0;
                }
                if (!checkNum.test(list[i].b16?list[i].b16:0)) {
                    that.$Message.info("男十六岁百分比只能是整数，请检查");
                    return false;
                } else {
                    b16 += list[i].b16 ? Number(list[i].b16) : 0;
                }
                if (!checkNum.test(list[i].g16?list[i].g16:0)) {
                    that.$Message.info("女十六岁百分比只能是整数，请检查");
                    return false;
                } else {
                    g16 += list[i].g16 ? Number(list[i].g16) : 0;
                }
                if (!checkNum.test(list[i].b17?list[i].b17:0)) {
                    that.$Message.info("男十七岁百分比只能是整数，请检查");
                    return false;
                } else {
                    b17 += list[i].b17 ? Number(list[i].b17) : 0;
                }
                if (!checkNum.test(list[i].g17?list[i].g17:0)) {
                    that.$Message.info("女十七岁百分比只能是整数，请检查");
                    return false;
                } else {
                    g17 += list[i].g17 ? Number(list[i].g17) : 0;
                }

                // b7 += list[i].b7 ? Number(list[i].b7) : 0;
                // g7 += list[i].g7 ? Number(list[i].g7) : 0;
                // b8 += list[i].b8 ? Number(list[i].b8) : 0;
                // g8 += list[i].g8 ? Number(list[i].g8) : 0;
                // b9 += list[i].b9 ? Number(list[i].b9) : 0;
                // g9 += list[i].g9 ? Number(list[i].g9) : 0;
                // b10 += list[i].b10 ? Number(list[i].b10) : 0;
                // g10 += list[i].g10 ? Number(list[i].g10) : 0;
                // b11 += list[i].b11 ? Number(list[i].b11) : 0;
                // g11 += list[i].g11 ? Number(list[i].g11) : 0;
                // b12 += list[i].b12 ? Number(list[i].b12) : 0;
                // g12 += list[i].g12 ? Number(list[i].g12) : 0;
                // b13 += list[i].b13 ? Number(list[i].b13) : 0;
                // g13 += list[i].g13 ? Number(list[i].g13) : 0;
                // b14 += list[i].b14 ? Number(list[i].b14) : 0;
                // g14 += list[i].g14 ? Number(list[i].g14) : 0;
                // b15 += list[i].b15 ? Number(list[i].b15) : 0;
                // g15 += list[i].g15 ? Number(list[i].g15) : 0;
                // b16 += list[i].b16 ? Number(list[i].b16) : 0;
                // g16 += list[i].g16 ? Number(list[i].g16) : 0;
                // b17 += list[i].b17 ? Number(list[i].b17) : 0;
                // g17 += list[i].g17 ? Number(list[i].g17) : 0;
            }

            if (b6 != 100) {
                that.$Message.info("男孩6岁总比例未达到或已超出百分百");
                return false;
            }
            if (g6 != 100) {
                that.$Message.info("女孩6岁总比例未达到或已超出百分百");
                return false;
            }
            if (b7 != 100) {
                that.$Message.info("男孩7岁总比例未达到或已超出百分百");
                return false;
            }
            if (g7 != 100) {
                that.$Message.info("女孩7岁总比例未达到或已超出百分百");
                return false;
            }
            if (b8 != 100) {
                that.$Message.info("男孩8岁总比例未达到或已超出百分百");
                return false;
            }
            if (g8 != 100) {
                that.$Message.info("女孩8岁总比例未达到或已超出百分百");
                return false;
            }
            if (b9 != 100) {
                that.$Message.info("男孩9岁总比例未达到或已超出百分百");
                return false;
            }
            if (g9 != 100) {
                that.$Message.info("女孩9岁总比例未达到或已超出百分百");
                return false;
            }
            if (b10 != 100) {
                that.$Message.info("男孩10岁总比例未达到或已超出百分百");
                return false;
            }
            if (g10 != 100) {
                that.$Message.info("女孩10岁总比例未达到或已超出百分百");
                return false;
            }
            if (b11 != 100) {
                that.$Message.info("男孩11岁总比例未达到或已超出百分百");
                return false;
            }
            if (g11 != 100) {
                that.$Message.info("女孩11岁总比例未达到或已超出百分百");
                return false;
            }
            if (b12 != 100) {
                that.$Message.info("男孩12岁总比例未达到或已超出百分百");
                return false;
            }
            if (g12 != 100) {
                that.$Message.info("女孩12岁总比例未达到或已超出百分百");
                return false;
            }
            if (b13 != 100) {
                that.$Message.info("男孩13岁总比例未达到或已超出百分百");
                return false;
            }
            if (g13 != 100) {
                that.$Message.info("女孩13岁总比例未达到或已超出百分百");
                return false;
            }
            if (b14 != 100) {
                that.$Message.info("男孩14岁总比例未达到或已超出百分百");
                return false;
            }
            if (g14 != 100) {
                that.$Message.info("女孩14岁总比例未达到或已超出百分百");
                return false;
            }
            if (b15 != 100) {
                that.$Message.info("男孩15岁总比例未达到或已超出百分百");
                return false;
            }
            if (g15 != 100) {
                that.$Message.info("女孩15岁总比例未达到或已超出百分百");
                return false;
            }
            if (b16 != 100) {
                that.$Message.info("男孩16岁总比例未达到或已超出百分百");
                return false;
            }
            if (g16 != 100) {
                that.$Message.info("女孩16岁总比例未达到或已超出百分百");
                return false;
            }
            if (b17 != 100) {
                that.$Message.info("男孩17岁总比例未达到或已超出百分百");
                return false;
            }
            if (g17 != 100) {
                that.$Message.info("女孩17岁总比例未达到或已超出百分百");
                return false;
            }

            this.$axios.post('/v1/corporeitytest/upsertTotalScorePercent', list)
                .then(function(response) {
                    console.log(response)
                    if (response.data.code == 10000) {
                        that.$Message.info("保存成功");
                    } else {
                        that.$Message.info("保存失败");
                    }

                    // that.testDetailInfo = response.data.response
                })
                .catch(function(response) {
                    console.log(response);
                });
        }
    },
    mounted() {
        var vm = this;
        let height = (document.body.offsetHeight - 300) / 2;
        vm.getAllItemTotalScoreInfo();



    },
    destroyed() {
        var vm = this;

    }

};
</script>