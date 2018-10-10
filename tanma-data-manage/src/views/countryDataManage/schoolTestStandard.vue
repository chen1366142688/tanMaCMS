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
                    title: '项目/年级',
                    key: 'schoolItemName',
                    render: (h, params) => {
                        // console.log(params)
                        return h('div', 
                            [
                            h('Button', {
                                props: {
                                    type: 'success',
                                    size: 'small',
                                    value: params.row.schoolItemName
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        var vm = this;
                                        vm.toDetail(params.row.schoolItemId)
                                    }
                                }
                            }, params.row.schoolItemName),
                        ]
                        );
                    }
                },
                {
                    title: '小一男',
                    key: 'b1',
                    render: (h, params) => {
                        // console.log(params)
                        var vm = this;
                        return h('div', [
                            h('Input', {
                                props: {
                                    type: 'text',
                                    size: 'small',
                                    placeholder: "请输入百分比",
                                    disabled: params.row.schoolItemId == 6 || params.row.schoolItemId == 7 || params.row.schoolItemId == 8 
                                    || params.row.schoolItemId == 9|| params.row.schoolItemId == 10 || params.row.schoolItemId == 11? true : false,
                                    value: params.row.schoolItemId == 6 || params.row.schoolItemId == 7 || params.row.schoolItemId == 8 
                                    || params.row.schoolItemId == 9|| params.row.schoolItemId == 10 || params.row.schoolItemId == 11 ? 0 : params.row.b1
                                },
                                style: {
                                    // marginRight: '5px'
                                    // width:'100%'
                                },
                                on: {
                                    'input'(value) {
                                        vm.testList[params.index] = params.row;
                                        params.row.b1 = value;
                                    }
                                }
                            }),
                        ]);
                    }
                },
                {
                    title: '小一女',
                    key: 'g1',
                    render: (h, params) => {
                        var vm = this;
                        return h('div', [
                            h('Input', {
                                props: {
                                    type: 'text',
                                    size: 'small',
                                    placeholder: "请输入百分比",
                                    disabled: params.row.schoolItemId == 6 || params.row.schoolItemId == 7 || params.row.schoolItemId == 8 
                                    || params.row.schoolItemId == 9|| params.row.schoolItemId == 10 || params.row.schoolItemId == 11 ? true : false,
                                    value: params.row.schoolItemId == 6 || params.row.schoolItemId == 7 || params.row.schoolItemId == 8 
                                    || params.row.schoolItemId == 9|| params.row.schoolItemId == 10 || params.row.schoolItemId == 11 ? 0 : params.row.g1
                                },
                                style: {
                                    // marginRight: '5px'
                                },
                                on: {
                                    'input'(value) {
                                        vm.testList[params.index] = params.row;
                                        params.row.g1 = value;
                                    }
                                }
                            }),
                        ]);
                    }
                },
                {
                    title: '小二男',
                    key: 'b2',
                    render: (h, params) => {
                        var vm = this;
                        return h('div', [
                            h('Input', {
                                props: {
                                    type: 'text',
                                    size: 'small',
                                    placeholder: "请输入百分比",
                                    disabled: params.row.schoolItemId == 6 || params.row.schoolItemId == 7 || params.row.schoolItemId == 8 
                                    || params.row.schoolItemId == 9|| params.row.schoolItemId == 10 || params.row.schoolItemId == 11 ? true : false,
                                    value: params.row.schoolItemId == 6 || params.row.schoolItemId == 7 || params.row.schoolItemId == 8 
                                    || params.row.schoolItemId == 9|| params.row.schoolItemId == 10 || params.row.schoolItemId == 11 ? 0 : params.row.b2
                                },
                                style: {
                                    // marginRight: '5px'
                                },
                                on: {
                                    'input'(value) {
                                        vm.testList[params.index] = params.row;
                                        params.row.b2 = value;
                                    }
                                }
                            }),
                        ]);
                    }
                },
                {
                    title: '小二女',
                    key: 'g2',
                    render: (h, params) => {
                        var vm = this;
                        return h('div', [
                            h('Input', {
                                props: {
                                    type: 'text',
                                    size: 'small',
                                    placeholder: "请输入百分比",
                                    disabled: params.row.schoolItemId == 6 || params.row.schoolItemId == 7 || params.row.schoolItemId == 8 
                                    || params.row.schoolItemId == 9|| params.row.schoolItemId == 10 || params.row.schoolItemId == 11? true : false,
                                    value: params.row.schoolItemId == 6 || params.row.schoolItemId == 7 || params.row.schoolItemId == 8 
                                    || params.row.schoolItemId == 9|| params.row.schoolItemId == 10 || params.row.schoolItemId == 11 ? 0 : params.row.g2
                                },
                                style: {
                                    // marginRight: '5px'
                                },
                                on: {
                                    'input'(value) {
                                        vm.testList[params.index] = params.row;
                                        params.row.g2 = value;
                                    }
                                }
                            }),
                        ]);
                    }
                },
                {
                    title: '小三男',
                    key: 'b3',
                    render: (h, params) => {
                        var vm = this;
                        return h('div', [
                            h('Input', {
                                props: {
                                    type: 'text',
                                    size: 'small',
                                    placeholder: "请输入百分比",
                                    disabled: params.row.schoolItemId == 7 || params.row.schoolItemId == 8 
                                    || params.row.schoolItemId == 9|| params.row.schoolItemId == 10 || params.row.schoolItemId == 11? true : false,
                                    value:  params.row.schoolItemId == 7 || params.row.schoolItemId == 8 
                                    || params.row.schoolItemId == 9|| params.row.schoolItemId == 10 || params.row.schoolItemId == 11? 0 : params.row.b3
                                },
                                style: {
                                    // marginRight: '5px'
                                },
                                on: {
                                    'input'(value) {
                                        vm.testList[params.index] = params.row;
                                        params.row.b3 = value;
                                    }
                                }
                            }),
                        ]);
                    }
                },
                {
                    title: '小三女',
                    key: 'g3',
                    render: (h, params) => {
                        var vm = this;
                        return h('div', [
                            h('Input', {
                                props: {
                                    type: 'text',
                                    size: 'small',
                                    placeholder: "请输入百分比",
                                    disabled:  params.row.schoolItemId == 7 || params.row.schoolItemId == 8 
                                    || params.row.schoolItemId == 9|| params.row.schoolItemId == 10 || params.row.schoolItemId == 11 ? true : false,
                                    value:  params.row.schoolItemId == 7 || params.row.schoolItemId == 8 
                                    || params.row.schoolItemId == 9|| params.row.schoolItemId == 10 || params.row.schoolItemId == 11 ? 0 : params.row.g3
                                },
                                style: {
                                    // marginRight: '5px'
                                },
                                on: {
                                    'input'(value) {
                                        vm.testList[params.index] = params.row;
                                        params.row.g3 = value;
                                    }
                                }
                            }),
                        ]);
                    }
                },
                {
                    title: '小四男',
                    key: 'b4',
                    render: (h, params) => {
                        var vm = this;
                        return h('div', [
                            h('Input', {
                                props: {
                                    type: 'text',
                                    size: 'small',
                                    placeholder: "请输入百分比",
                                    disabled:  params.row.schoolItemId == 7 || params.row.schoolItemId == 8 
                                    || params.row.schoolItemId == 9|| params.row.schoolItemId == 10 || params.row.schoolItemId == 11 ? true : false,
                                    value:  params.row.schoolItemId == 7 || params.row.schoolItemId == 8 
                                    || params.row.schoolItemId == 9|| params.row.schoolItemId == 10 || params.row.schoolItemId == 11 ? 0 : params.row.b4
                                },
                                style: {
                                    // marginRight: '5px'
                                },
                                on: {
                                    'input'(value) {
                                        vm.testList[params.index] = params.row;
                                        params.row.b4 = value;
                                    }
                                }
                            }),
                        ]);
                    }
                },
                {
                    title: '小四女',
                    key: 'g4',
                    render: (h, params) => {
                        var vm = this;
                        return h('div', [
                            h('Input', {
                                props: {
                                    type: 'text',
                                    size: 'small',
                                    placeholder: "请输入百分比",
                                    disabled:  params.row.schoolItemId == 7 || params.row.schoolItemId == 8 
                                    || params.row.schoolItemId == 9|| params.row.schoolItemId == 10 || params.row.schoolItemId == 11 ? true : false,
                                    value:  params.row.schoolItemId == 7 || params.row.schoolItemId == 8 
                                    || params.row.schoolItemId == 9|| params.row.schoolItemId == 10 || params.row.schoolItemId == 11 ? 0 : params.row.g4
                                },
                                style: {
                                    // marginRight: '5px'
                                },
                                on: {
                                    'input'(value) {
                                        vm.testList[params.index] = params.row;
                                        params.row.g4 = value;
                                    }
                                }
                            }),
                        ]);
                    }
                },
                {
                    title: '小五男',
                    key: 'b5',
                    render: (h, params) => {
                        var vm = this;
                        return h('div', [
                            h('Input', {
                                props: {
                                    type: 'text',
                                    size: 'small',
                                    placeholder: "请输入百分比",
                                    disabled: params.row.schoolItemId == 8|| params.row.schoolItemId == 9
                                    || params.row.schoolItemId == 10 || params.row.schoolItemId == 11 ? true : false,
                                    value: params.row.schoolItemId == 8|| params.row.schoolItemId == 9
                                    || params.row.schoolItemId == 10 || params.row.schoolItemId == 11 ? 0 : params.row.b5
                                },
                                style: {
                                    // marginRight: '5px'
                                },
                                on: {
                                    'input'(value) {
                                        vm.testList[params.index] = params.row;
                                        params.row.b5 = value;
                                    }
                                }
                            }),
                        ]);
                    }
                },
                {
                    title: '小五女',
                    key: 'g5',
                    render: (h, params) => {
                        var vm = this;
                        return h('div', [
                            h('Input', {
                                props: {
                                    type: 'text',
                                    size: 'small',
                                    placeholder: "请输入百分比",
                                    disabled: params.row.schoolItemId == 8|| params.row.schoolItemId == 9
                                    || params.row.schoolItemId == 10 || params.row.schoolItemId == 11 ? true : false,
                                    value: params.row.schoolItemId == 8|| params.row.schoolItemId == 9
                                    || params.row.schoolItemId == 10 || params.row.schoolItemId == 11 ? 0 : params.row.g5
                                },
                                style: {
                                    // marginRight: '5px'
                                },
                                on: {
                                    'input'(value) {
                                        vm.testList[params.index] = params.row;
                                        params.row.g5 = value;
                                    }
                                }
                            }),
                        ]);
                    }
                },
                {
                    title: '小六男',
                    key: 'b6',
                    render: (h, params) => {
                        var vm = this;
                        return h('div', [
                            h('Input', {
                                props: {
                                    type: 'text',
                                    size: 'small',
                                    placeholder: "请输入百分比",
                                    disabled:params.row.schoolItemId == 8|| params.row.schoolItemId == 9
                                    || params.row.schoolItemId == 10 || params.row.schoolItemId == 11 ? true : false,
                                    value: params.row.schoolItemId == 8|| params.row.schoolItemId == 9
                                    || params.row.schoolItemId == 10 || params.row.schoolItemId == 11 ? 0 : params.row.b6
                                },
                                style: {
                                    // marginRight: '5px'
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
                    title: '小六女',
                    key: 'g6',
                    render: (h, params) => {
                        var vm = this;
                        return h('div', [
                            h('Input', {
                                props: {
                                    type: 'text',
                                    size: 'small',
                                    placeholder: "请输入百分比",
                                    disabled:params.row.schoolItemId == 8|| params.row.schoolItemId == 9
                                    || params.row.schoolItemId == 10 || params.row.schoolItemId == 11 ? true : false,
                                    value: params.row.schoolItemId == 8|| params.row.schoolItemId == 9
                                    || params.row.schoolItemId == 10 || params.row.schoolItemId == 11 ? 0 : params.row.g6
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
                    title: '初一男',
                    key: 'b7',
                    render: (h, params) => {
                        var vm = this;
                        return h('div', [
                            h('Input', {
                                props: {
                                    type: 'text',
                                    size: 'small',
                                    placeholder: "请输入百分比",
                                    disabled:params.row.schoolItemId == 5|| params.row.schoolItemId == 6
                                    ||params.row.schoolItemId == 7
                                    ||params.row.schoolItemId == 11 ? true : false,
                                    value:params.row.schoolItemId == 5|| params.row.schoolItemId == 6
                                    ||params.row.schoolItemId == 7
                                    ||params.row.schoolItemId == 11 ? 0 : params.row.b7
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
                    title: '初一女',
                    key: 'g7',
                    render: (h, params) => {
                        var vm = this;
                        return h('div', [
                            h('Input', {
                                props: {
                                    type: 'text',
                                    size: 'small',
                                    placeholder: "请输入百分比",
                                    disabled:params.row.schoolItemId == 5
                                    ||params.row.schoolItemId == 7
                                    ||params.row.schoolItemId == 9|| params.row.schoolItemId == 10
                                   ? true : false,
                                    value:params.row.schoolItemId == 5
                                    ||params.row.schoolItemId == 7
                                    ||params.row.schoolItemId == 9|| params.row.schoolItemId == 10 ? 0 : params.row.g7
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
                    title: '初二男',
                    key: 'b8',
                    render: (h, params) => {
                        var vm = this;
                        return h('div', [
                            h('Input', {
                                props: {
                                    type: 'text',
                                    size: 'small',
                                    placeholder: "请输入百分比",
                                    disabled: params.row.schoolItemId == 5|| params.row.schoolItemId == 6
                                    ||params.row.schoolItemId == 7
                                    ||params.row.schoolItemId == 11  ? true : false,
                                    value: params.row.schoolItemId == 5|| params.row.schoolItemId == 6
                                    ||params.row.schoolItemId == 7
                                    ||params.row.schoolItemId == 11 ? 0 : params.row.b8
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
                    title: '初二女',
                    key: 'g8',
                    render: (h, params) => {
                        var vm = this;
                        return h('div', [
                            h('Input', {
                                props: {
                                    type: 'text',
                                    size: 'small',
                                    placeholder: "请输入百分比",
                                    disabled: params.row.schoolItemId == 5
                                    ||params.row.schoolItemId == 7
                                    ||params.row.schoolItemId == 9|| params.row.schoolItemId == 10 ? true : false,
                                    value:params.row.schoolItemId == 5
                                    ||params.row.schoolItemId == 7
                                    ||params.row.schoolItemId == 9|| params.row.schoolItemId == 10 ? 0 : params.row.g8
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
                    title: '初三男',
                    key: 'b9',
                    render: (h, params) => {
                        var vm = this;
                        return h('div', [
                            h('Input', {
                                props: {
                                    type: 'text',
                                    size: 'small',
                                    placeholder: "请输入百分比",
                                    disabled: params.row.schoolItemId == 5|| params.row.schoolItemId == 6
                                    ||params.row.schoolItemId == 7
                                    ||params.row.schoolItemId == 11  ? true : false,
                                    value:params.row.schoolItemId == 5|| params.row.schoolItemId == 6
                                    ||params.row.schoolItemId == 7
                                    ||params.row.schoolItemId == 11  ? 0 : params.row.b9
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
                    title: '初三女',
                    key: 'g9',
                    render: (h, params) => {
                        var vm = this;
                        return h('div', [
                            h('Input', {
                                props: {
                                    type: 'text',
                                    size: 'small',
                                    placeholder: "请输入百分比",
                                    disabled: params.row.schoolItemId == 5
                                    ||params.row.schoolItemId == 7
                                    ||params.row.schoolItemId == 9|| params.row.schoolItemId == 10 ? true : false,
                                    value:params.row.schoolItemId == 5
                                    ||params.row.schoolItemId == 7
                                    ||params.row.schoolItemId == 9|| params.row.schoolItemId == 10 ? 0 : params.row.g9
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
                    title: '高一男',
                    key: 'b10',
                    render: (h, params) => {
                        var vm = this;
                        return h('div', [
                            h('Input', {
                                props: {
                                    type: 'text',
                                    size: 'small',
                                    placeholder: "请输入百分比",
                                    disabled: params.row.schoolItemId == 5|| params.row.schoolItemId == 6
                                    ||params.row.schoolItemId == 7
                                    ||params.row.schoolItemId == 11 ? true : false,
                                    value: params.row.schoolItemId == 5|| params.row.schoolItemId == 6
                                    ||params.row.schoolItemId == 7
                                    ||params.row.schoolItemId == 11 ? 0 : params.row.b10
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
                    title: '高一女',
                    key: 'g10',
                    render: (h, params) => {
                        var vm = this;
                        return h('div', [
                            h('Input', {
                                props: {
                                    type: 'text',
                                    size: 'small',
                                    placeholder: "请输入百分比",
                                    disabled: params.row.schoolItemId == 5
                                    ||params.row.schoolItemId == 7
                                    ||params.row.schoolItemId == 9|| params.row.schoolItemId == 10 ? true : false,
                                    value: params.row.schoolItemId == 5
                                    ||params.row.schoolItemId == 7
                                    ||params.row.schoolItemId == 9|| params.row.schoolItemId == 10 ? 0 : params.row.g10
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
                    title: '高二男',
                    key: 'b11',
                    render: (h, params) => {
                        var vm = this;
                        return h('div', [
                            h('Input', {
                                props: {
                                    type: 'text',
                                    size: 'small',
                                    placeholder: "请输入百分比",
                                    disabled:params.row.schoolItemId == 5|| params.row.schoolItemId == 6
                                    ||params.row.schoolItemId == 7
                                    ||params.row.schoolItemId == 11  ? true : false,
                                    value: params.row.schoolItemId == 5|| params.row.schoolItemId == 6
                                    ||params.row.schoolItemId == 7
                                    ||params.row.schoolItemId == 11 ? 0 : params.row.b11
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
                    title: '高二女',
                    key: 'g11',
                    render: (h, params) => {
                        var vm = this;
                        return h('div', [
                            h('Input', {
                                props: {
                                    type: 'text',
                                    size: 'small',
                                    placeholder: "请输入百分比",
                                    disabled: params.row.schoolItemId == 5
                                    ||params.row.schoolItemId == 7
                                    ||params.row.schoolItemId == 9|| params.row.schoolItemId == 10 ? true : false,
                                    value:params.row.schoolItemId == 5
                                    ||params.row.schoolItemId == 7
                                    ||params.row.schoolItemId == 9|| params.row.schoolItemId == 10 ? 0 : params.row.g11
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
                    title: '高三男',
                    key: 'b12',
                    render: (h, params) => {
                        var vm = this;
                        return h('div', [
                            h('Input', {
                                props: {
                                    type: 'text',
                                    size: 'small',
                                    placeholder: "请输入百分比",
                                    disabled: params.row.schoolItemId == 5|| params.row.schoolItemId == 6
                                    ||params.row.schoolItemId == 7
                                    ||params.row.schoolItemId == 11  ? true : false,
                                    value: params.row.schoolItemId == 5|| params.row.schoolItemId == 6
                                    ||params.row.schoolItemId == 7
                                    ||params.row.schoolItemId == 11  ? 0 : params.row.b12
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
                    title: '高三女',
                    key: 'g12',
                    render: (h, params) => {
                        var vm = this;
                        return h('div', [
                            h('Input', {
                                props: {
                                    type: 'text',
                                    size: 'small',
                                    placeholder: "请输入百分比",
                                    disabled: params.row.schoolItemId == 5
                                    ||params.row.schoolItemId == 7
                                    ||params.row.schoolItemId == 9|| params.row.schoolItemId == 10 ? true : false,
                                    value: params.row.schoolItemId == 5
                                    ||params.row.schoolItemId == 7
                                    ||params.row.schoolItemId == 9|| params.row.schoolItemId == 10 ? 0 : params.row.g12
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
            ],
            testList: []



        };
    },
    watch: {

    },//以V-model绑定数据时使用的数据变化监测  

    methods: {
       
        toDetail(itemId) {
            // console.log(itemId)  
            sessionStorage.setItem('schoolTestStandard-schoolTestStandardDetail-itemId', itemId);
            this.$router.push({ name: 'schoolTestStandardDetail' });
        },
        getAllItemTotalScoreInfo() {
            var that = this;
            // that.detail.splice(detailId, 1);
            this.$axios.get('/v1/schooltest/getSchoolItemScoreInfo')
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
            let b1 = 0;
            let g1 = 0;
            let b2 = 0;
            let g2 = 0;
            let b3 = 0;
            let g3 = 0;
            let b4 = 0;
            let g4 = 0;
            let b5 = 0;
            let g5 = 0;
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

            for (let i = 0; i < list.length; i++) {

                if (!checkNum.test(list[i].b1?list[i].b1:0)) {
                    that.$Message.info("男六岁百分比只能是整数，请检查");
                    return false;
                } else {
                    b1 += list[i].b1 ? Number(list[i].b1) : 0;
                }

                if (!checkNum.test(list[i].g1?list[i].g1:0)) {
                    that.$Message.info("女六岁百分比只能是整数，请检查");
                    return false;
                } else {
                    g1 += list[i].g1 ? Number(list[i].g1) : 0;
                }


                if (!checkNum.test(list[i].b2?list[i].b2:0)) {
                    that.$Message.info("男七岁百分比只能是整数，请检查");
                    return false;
                } else {
                    b2 += list[i].b2 ? Number(list[i].b2) : 0;
                }
                if (!checkNum.test(list[i].g2?list[i].g2:0)) {
                    that.$Message.info("女七岁百分比只能是整数，请检查");
                    return false;
                } else {
                    g2 += list[i].g2 ? Number(list[i].g2) : 0;
                }
                if (!checkNum.test(list[i].b3?list[i].b3:0)) {
                    that.$Message.info("男八岁百分比只能是整数，请检查");
                    return false;
                } else {
                    b3 += list[i].b3 ? Number(list[i].b3) : 0;
                }
                if (!checkNum.test(list[i].g3?list[i].g3:0)) {
                    that.$Message.info("女八岁百分比只能是整数，请检查");
                    return false;
                } else {
                    g3 += list[i].g3 ? Number(list[i].g3) : 0;
                }
                if (!checkNum.test(list[i].b4?list[i].b4:0)) {
                    that.$Message.info("男九岁百分比只能是整数，请检查");
                    return false;
                } else {
                    b4 += list[i].b4 ? Number(list[i].b4) : 0;
                }
                if (!checkNum.test(list[i].g4?list[i].g4:0)) {
                    that.$Message.info("女九岁百分比只能是整数，请检查");
                    return false;
                } else {
                    g4 += list[i].g4 ? Number(list[i].g4) : 0;
                }
                if (!checkNum.test(list[i].b5?list[i].b5:0)) {
                    that.$Message.info("男十岁百分比只能是整数，请检查");
                    return false;
                } else {
                    b5 += list[i].b5 ? Number(list[i].b5) : 0;
                }
                if (!checkNum.test(list[i].g5?list[i].g5:0)) {
                    that.$Message.info("女十岁百分比只能是整数，请检查");
                    return false;
                } else {
                    g5 += list[i].g5 ? Number(list[i].g5) : 0;
                }
                if (!checkNum.test(list[i].b6?list[i].b6:0)) {
                    that.$Message.info("男十一岁百分比只能是整数，请检查");
                    return false;
                } else {
                    b6 += list[i].b6 ? Number(list[i].b6) : 0;
                }
                if (!checkNum.test(list[i].g6?list[i].g6:0)) {
                    that.$Message.info("女十一岁百分比只能是整数，请检查");
                    return false;
                } else {
                    g6 += list[i].g6 ? Number(list[i].g6) : 0;
                }
                if (!checkNum.test(list[i].b7?list[i].b7:0)) {
                    // console.log(list[i].b12)
                    that.$Message.info("男十二岁百分比只能是整数，请检查");
                    return false;
                } else {
                    b7 += list[i].b7 ? Number(list[i].b7) : 0;
                }
                if (!checkNum.test(list[i].g7?list[i].g7:0)) {
                    that.$Message.info("女十二岁百分比只能是整数，请检查");
                    return false;
                } else {
                    g7 += list[i].g7 ? Number(list[i].g7) : 0;
                }
                if (!checkNum.test(list[i].b8?list[i].b8:0)) {
                    that.$Message.info("男十三岁百分比只能是整数，请检查");
                    return false;
                } else {
                    b8 += list[i].b8 ? Number(list[i].b8) : 0;
                }
                if (!checkNum.test(list[i].g8?list[i].g8:0)) {
                    that.$Message.info("女十三岁百分比只能是整数，请检查");
                    return false;
                } else {
                    g8 += list[i].g8 ? Number(list[i].g8) : 0;
                }
                if (!checkNum.test(list[i].b9?list[i].b9:0)) {
                    that.$Message.info("男十四岁百分比只能是整数，请检查");
                    return false;
                } else {
                    b9+= list[i].b9 ? Number(list[i].b9) : 0;
                }
                if (!checkNum.test(list[i].g9?list[i].g9:0)) {
                    that.$Message.info("女十四岁百分比只能是整数，请检查");
                    return false;
                } else {
                    g9 += list[i].g9 ? Number(list[i].g9) : 0;
                }
                if (!checkNum.test(list[i].b10?list[i].b10:0)) {
                    that.$Message.info("男十五岁百分比只能是整数，请检查");
                    return false;
                } else {
                    b10 += list[i].b10 ? Number(list[i].b10) : 0;
                }
                if (!checkNum.test(list[i].g10?list[i].g10:0)) {
                    that.$Message.info("女十五岁百分比只能是整数，请检查");
                    return false;
                } else {
                    g10 += list[i].g10 ? Number(list[i].g10) : 0;
                }
                if (!checkNum.test(list[i].b11?list[i].b11:0)) {
                    that.$Message.info("男十六岁百分比只能是整数，请检查");
                    return false;
                } else {
                    b11 += list[i].b11 ? Number(list[i].b11) : 0;
                }
                if (!checkNum.test(list[i].g11?list[i].g11:0)) {
                    that.$Message.info("女十六岁百分比只能是整数，请检查");
                    return false;
                } else {
                    g11 += list[i].g11 ? Number(list[i].g11) : 0;
                }
                if (!checkNum.test(list[i].b12?list[i].b12:0)) {
                    that.$Message.info("男十七岁百分比只能是整数，请检查");
                    return false;
                } else {
                    b12+= list[i].b12 ? Number(list[i].b12) : 0;
                }
                if (!checkNum.test(list[i].g12?list[i].g12:0)) {
                    that.$Message.info("女十七岁百分比只能是整数，请检查");
                    return false;
                } else {
                    g12+= list[i].g12 ? Number(list[i].g12) : 0;
                }

               
            }

            if (b1 != 100) {
                that.$Message.info("男孩6岁总比例未达到或已超出百分百");
                return false;
            }
            if (g1 != 100) {
                that.$Message.info("女孩6岁总比例未达到或已超出百分百");
                return false;
            }
            if (b2 != 100) {
                that.$Message.info("男孩7岁总比例未达到或已超出百分百");
                return false;
            }
            if (g2 != 100) {
                that.$Message.info("女孩7岁总比例未达到或已超出百分百");
                return false;
            }
            if (b3 != 100) {
                that.$Message.info("男孩8岁总比例未达到或已超出百分百");
                return false;
            }
            if (g3 != 100) {
                that.$Message.info("女孩8岁总比例未达到或已超出百分百");
                return false;
            }
            if (b4 != 100) {
                that.$Message.info("男孩9岁总比例未达到或已超出百分百");
                return false;
            }
            if (g4 != 100) {
                that.$Message.info("女孩9岁总比例未达到或已超出百分百");
                return false;
            }
            if (b5 != 100) {
                that.$Message.info("男孩10岁总比例未达到或已超出百分百");
                return false;
            }
            if (g5 != 100) {
                that.$Message.info("女孩10岁总比例未达到或已超出百分百");
                return false;
            }
            if (b6 != 100) {
                that.$Message.info("男孩11岁总比例未达到或已超出百分百");
                return false;
            }
            if (g6 != 100) {
                that.$Message.info("女孩11岁总比例未达到或已超出百分百");
                return false;
            }
            if (b7 != 100) {
                that.$Message.info("男孩12岁总比例未达到或已超出百分百");
                return false;
            }
            if (g7 != 100) {
                that.$Message.info("女孩12岁总比例未达到或已超出百分百");
                return false;
            }
            if (b8 != 100) {
                that.$Message.info("男孩13岁总比例未达到或已超出百分百");
                return false;
            }
            if (g8 != 100) {
                that.$Message.info("女孩13岁总比例未达到或已超出百分百");
                return false;
            }
            if (b9 != 100) {
                that.$Message.info("男孩14岁总比例未达到或已超出百分百");
                return false;
            }
            if (g9 != 100) {
                that.$Message.info("女孩14岁总比例未达到或已超出百分百");
                return false;
            }
            if (b10 != 100) {
                that.$Message.info("男孩15岁总比例未达到或已超出百分百");
                return false;
            }
            if (g10 != 100) {
                that.$Message.info("女孩15岁总比例未达到或已超出百分百");
                return false;
            }
            if (b11 != 100) {
                that.$Message.info("男孩16岁总比例未达到或已超出百分百");
                return false;
            }
            if (g11 != 100) {
                that.$Message.info("女孩16岁总比例未达到或已超出百分百");
                return false;
            }
            if (b12 != 100) {
                that.$Message.info("男孩17岁总比例未达到或已超出百分百");
                return false;
            }
            if (g12 != 100) {
                that.$Message.info("女孩17岁总比例未达到或已超出百分百");
                return false;
            }

            this.$axios.post('/v1/schooltest/upsertSchoolItemScore', list)
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