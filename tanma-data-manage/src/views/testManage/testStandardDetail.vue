<template>
    <div style="margin-left:15px;">
        <Tabs type="card">
            <TabPane label="评分标准">
                <Card>
                    <Form :label-width="80" class="baseInfo">
                        <FormItem label="项目信息" class="baseInfoitem">
                            <p>
                                <span>{{testDetailInfo.gender == '1'?'男':'女'}} | {{testDetailInfo.ageScope}}岁 | {{testDetailInfo.testName}}</span>
                                <span style="float:right;color:green" v-if="testDetailInfo.effectiveStatus == '1'">
                                    启用中</span>
                                <span style="float:right;color:red" v-if="testDetailInfo.effectiveStatus == '0'">已关闭</span>
                            </p>

                        </FormItem>
                        <FormItem label="测试类型" class="baseInfoitem">
                            <p>
                                <span>{{testDetailInfo.testItemName}}(单位：{{testDetailInfo.valueUnit}})</span>
                                <span style="float:right;" v-if="testDetailInfo.containOneDecimals == '1'">保留小数位：1位</span>
                                <span style="float:right;" v-if="testDetailInfo.containOneDecimals == '0'">保留小数位：0位</span>
                            </p>
                        </FormItem>
                    </Form>
                </Card>
                <Card>
                    <H2 style="text-align:center">评分标准</H2>
                    <Row v-for="(scoreType,scoreTypeIndex) in scoreTypeList" :key="scoreTypeIndex" style="border-top:1px solid;margin-top:0px;">
                        <Col span="4" style="text-align:center;height: 120px; " v-if="scoreType.type=='0'">
                        <div style="margin-top:60px">{{scoreType.name}}</div>
                        </Col>
                        <Col span="20" style="border-left:1px solid;height: 120px;" v-if="scoreType.type=='0'">
                        <div style="border-bottom:1px solid grey;height: 33%">
                            <div style="height: 100%">
                                <p style="height: 100%;padding: 8px;margin-left:20px;">
                                    <span>{{value100}}分</span>
                                    <input v-model="start100" style="width:80px;margin-left:40px" placeholder="前值" />
                                    <span style="margin-left:40px">到</span>
                                    <input v-model="end100" style="width:80px;margin-left:40px" placeholder="后值" />
                                    <span>(含等于)</span>
                                </p>
                            </div>
                        </div>
                        <div style="border-bottom:1px solid grey;height: 33%">
                            <div style="height: 100%">
                                <p style="height: 100%;padding: 8px;margin-left:20px;">
                                    <span>{{value95}} 分</span>
                                    <input v-model="start95" style="width:80px;margin-left:40px" placeholder="前值" />
                                    <span style="margin-left:40px">到</span>
                                    <input v-model="end95" style="width:80px;margin-left:40px" placeholder="后值" />
                                    <span>(含等于)</span>
                                </p>
                            </div>
                        </div>
                        <div style="height: 33%">
                            <div style="height: 100%">
                                <p style="height: 100%;padding: 8px;margin-left:20px;">
                                    <span>{{value90}} 分</span>
                                    <input v-model="start90" style="width:80px;margin-left:40px" placeholder="前值" />
                                    <span style="margin-left:40px">到</span>
                                    <input v-model="end90" style="width:80px;margin-left:40px" placeholder="后值" />
                                    <span>(含等于)</span>
                                </p>
                            </div>
                        </div>
                        </Col>
                        <Col span="4" style="text-align:center;height: 80px; " v-if="scoreType.type=='1'">
                        <div style="margin-top:40px">{{scoreType.name}}</div>
                        </Col>
                        <Col span="20" style="border-left:1px solid;height: 80px;" v-if="scoreType.type=='1'">
                        <div style="border-bottom:1px solid grey;height: 50%">
                            <div style="height: 100%">
                                <p style="height: 100%;padding: 8px;margin-left:20px;">
                                    <span>{{value85}} 分</span>
                                    <input v-model="start85" style="width:80px;margin-left:40px" placeholder="前值" />
                                    <span style="margin-left:40px">到</span>
                                    <input v-model="end85" style="width:80px;margin-left:40px" placeholder="后值" />
                                    <span>(含等于)</span>
                                </p>
                            </div>
                        </div>
                        <div style="height: 50%">
                            <div style="height: 100%">
                                <p style="height: 100%;padding: 8px;margin-left:20px;">
                                    <span>{{value80}} 分</span>
                                    <input v-model="start80" style="width:80px;margin-left:40px" placeholder="前值" />
                                    <span style="margin-left:40px">到</span>
                                    <input v-model="end80" style="width:80px;margin-left:40px" placeholder="后值" />
                                    <span>(含等于)</span>
                                </p>
                            </div>
                        </div>
                        </Col>
                        <Col span="4" style="text-align:center;height: 400px; " v-if="scoreType.type=='2'">
                        <div style="margin-top:200px">{{scoreType.name}}</div>
                        </Col>
                        <Col span="20" style="border-left:1px solid;height: 400px;" v-if="scoreType.type=='2'">
                        <div style="border-bottom:1px solid grey;height: 10%">
                            <div style="height: 100%">
                                <p style="height: 100%;padding: 8px;margin-left:20px;">
                                    <span>{{value78}} 分</span>
                                    <input v-model="start78" style="width:80px;margin-left:40px" placeholder="前值" />
                                    <span style="margin-left:40px">到</span>
                                    <input v-model="end78" style="width:80px;margin-left:40px" placeholder="后值" />
                                    <span>(含等于)</span>
                                </p>
                            </div>
                        </div>
                        <div style="border-bottom:1px solid grey;height: 10%">
                            <div style="height: 100%">
                                <p style="height: 100%;padding: 8px;margin-left:20px;">
                                    <span>{{value76}} 分</span>
                                    <input v-model="start76" style="width:80px;margin-left:40px" placeholder="前值" />
                                    <span style="margin-left:40px">到</span>
                                    <input v-model="end76" style="width:80px;margin-left:40px" placeholder="后值" />
                                    <span>(含等于)</span>
                                </p>
                            </div>
                        </div>
                        <div style="border-bottom:1px solid grey;height: 10%">
                            <div style="height: 100%">
                                <p style="height: 100%;padding: 8px;margin-left:20px;">
                                    <span>{{value74}} 分</span>
                                    <input v-model="start74" style="width:80px;margin-left:40px" placeholder="前值" />
                                    <span style="margin-left:40px">到</span>
                                    <input v-model="end74" style="width:80px;margin-left:40px" placeholder="后值" />
                                    <span>(含等于)</span>
                                </p>
                            </div>
                        </div>
                        <div style="border-bottom:1px solid grey;height: 10%">
                            <div style="height: 100%">
                                <p style="height: 100%;padding: 8px;margin-left:20px;">
                                    <span>{{value72}} 分</span>
                                    <input v-model="start72" style="width:80px;margin-left:40px" placeholder="前值" />
                                    <span style="margin-left:40px">到</span>
                                    <input v-model="end72" style="width:80px;margin-left:40px" placeholder="后值" />
                                    <span>(含等于)</span>
                                </p>
                            </div>
                        </div>
                        <div style="border-bottom:1px solid grey;height: 10%">
                            <div style="height: 100%">
                                <p style="height: 100%;padding: 8px;margin-left:20px;">
                                    <span>{{value70}} 分</span>
                                    <input v-model="start70" style="width:80px;margin-left:40px" placeholder="前值" />
                                    <span style="margin-left:40px">到</span>
                                    <input v-model="end70" style="width:80px;margin-left:40px" placeholder="后值" />
                                    <span>(含等于)</span>
                                </p>
                            </div>
                        </div>
                        <div style="border-bottom:1px solid grey;height: 10%">
                            <div style="height: 100%">
                                <p style="height: 100%;padding: 8px;margin-left:20px;">
                                    <span>{{value68}} 分</span>
                                    <input v-model="start68" style="width:80px;margin-left:40px" placeholder="前值" />
                                    <span style="margin-left:40px">到</span>
                                    <input v-model="end68" style="width:80px;margin-left:40px" placeholder="后值" />
                                    <span>(含等于)</span>
                                </p>
                            </div>
                        </div>
                        <div style="border-bottom:1px solid grey;height: 10%">
                            <div style="height: 100%">
                                <p style="height: 100%;padding: 8px;margin-left:20px;">
                                    <span>{{value66}} 分</span>
                                    <input v-model="start66" style="width:80px;margin-left:40px" placeholder="前值" />
                                    <span style="margin-left:40px">到</span>
                                    <input v-model="end66" style="width:80px;margin-left:40px" placeholder="后值" />
                                    <span>(含等于)</span>
                                </p>
                            </div>
                        </div>
                        <div style="border-bottom:1px solid grey;height: 10%">
                            <div style="height: 100%">
                                <p style="height: 100%;padding: 8px;margin-left:20px;">
                                    <span>{{value64}} 分</span>
                                    <input v-model="start64" style="width:80px;margin-left:40px" placeholder="前值" />
                                    <span style="margin-left:40px">到</span>
                                    <input v-model="end64" style="width:80px;margin-left:40px" placeholder="后值" />
                                    <span>(含等于)</span>
                                </p>
                            </div>
                        </div>
                        <div style="border-bottom:1px solid grey;height: 10%">
                            <div style="height: 100%">
                                <p style="height: 100%;padding: 8px;margin-left:20px;">
                                    <span>{{value62}} 分</span>
                                    <input v-model="start62" style="width:80px;margin-left:40px" placeholder="前值" />
                                    <span style="margin-left:40px">到</span>
                                    <input v-model="end62" style="width:80px;margin-left:40px" placeholder="后值" />
                                    <span>(含等于)</span>
                                </p>
                            </div>
                        </div>
                        <div style="height: 10%">
                            <div style="height: 100%">
                                <p style="height: 100%;padding: 8px;margin-left:20px;">
                                    <span>{{value60}} 分</span>
                                    <input v-model="start60" style="width:80px;margin-left:40px" placeholder="前值" />
                                    <span style="margin-left:40px">到</span>
                                    <input v-model="end60" style="width:80px;margin-left:40px" placeholder="后值" />
                                    <span>(含等于)</span>
                                </p>
                            </div>
                        </div>
                        </Col>
                        <Col span="4" style="text-align:center;height: 200px; " v-if="scoreType.type=='3'">
                        <div style="margin-top:100px">{{scoreType.name}}</div>
                        </Col>
                        <Col span="20" style="border-left:1px solid;height: 200px;" v-if="scoreType.type=='3'">
                        <div style="border-bottom:1px solid grey;height: 20%">
                            <div style="height: 100%">
                                <p style="height: 100%;padding: 8px;margin-left:20px;">
                                    <span>{{value50}} 分</span>
                                    <input v-model="start50" style="width:80px;margin-left:40px" placeholder="前值" />
                                    <span style="margin-left:40px">到</span>
                                    <input v-model="end50" style="width:80px;margin-left:40px" placeholder="后值" />
                                    <span>(含等于)</span>
                                </p>
                            </div>
                        </div>
                        <div style="border-bottom:1px solid grey;height: 20%">
                            <div style="height: 100%">
                                <p style="height: 100%;padding: 8px;margin-left:20px;">
                                    <span>{{value40}} 分</span>
                                    <input v-model="start40" style="width:80px;margin-left:40px" placeholder="前值" />
                                    <span style="margin-left:40px">到</span>
                                    <input v-model="end40" style="width:80px;margin-left:40px" placeholder="后值" />
                                    <span>(含等于)</span>
                                </p>
                            </div>
                        </div>
                        <div style="border-bottom:1px solid grey;height: 20%">
                            <div style="height: 100%">
                                <p style="height: 100%;padding: 8px;margin-left:20px;">
                                    <span>{{value30}} 分</span>
                                    <input v-model="start30" style="width:80px;margin-left:40px" placeholder="前值" />
                                    <span style="margin-left:40px">到</span>
                                    <input v-model="end30" style="width:80px;margin-left:40px" placeholder="后值" />
                                    <span>(含等于)</span>
                                </p>
                            </div>
                        </div>
                        <div style="border-bottom:1px solid grey;height: 20%">
                            <div style="height: 100%">
                                <p style="height: 100%;padding: 8px;margin-left:20px;">
                                    <span>{{value20}} 分</span>
                                    <input v-model="start20" style="width:80px;margin-left:40px" placeholder="前值" />
                                    <span style="margin-left:40px">到</span>
                                    <input v-model="end20" style="width:80px;margin-left:40px" placeholder="后值" />
                                    <span>(含等于)</span>
                                </p>
                            </div>
                        </div>
                        <div style="height: 20%">
                            <div style="height: 100%">
                                <p style="height: 100%;padding: 8px;margin-left:20px;">
                                    <span>{{value10}} 分</span>
                                    <input v-model="start10" style="width:80px;margin-left:40px" placeholder="前值" />
                                    <span style="margin-left:40px">到</span>
                                    <input v-model="end10" style="width:80px;margin-left:40px" placeholder="后值" />
                                    <span>(含等于)</span>
                                </p>
                            </div>
                        </div>
                        </Col>
                    </Row>

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
            testId: '',
            testDetailInfo: '',
            scoreTypeList: [
                {
                    type: "0",
                    name: "优秀"
                },
                {
                    type: "1",
                    name: "良好"
                },
                {
                    type: "2",
                    name: "及格"
                },
                {
                    type: "3",
                    name: "不及格"
                }
            ],
            value100: 100,
            start100: '',
            end100: '',
            testStandardId100: '',
            value95: 95,
            start95: '',
            end95: '',
            testStandardId95: '',
            value90: 90,
            start90: '',
            end90: '',
            testStandardId90: '',
            value85: 85,
            start85: '',
            end85: '',
            testStandardId85: '',
            value80: 80,
            start80: '',
            end80: '',
            testStandardId80: '',
            value78: 78,
            start78: '',
            end78: '',
            testStandardId78: '',
            value76: 76,
            start76: '',
            end76: '',
            testStandardId76: '',
            value74: 74,
            start74: '',
            end74: '',
            testStandardId74: '',
            value72: 72,
            start72: '',
            end72: '',
            testStandardId72: '',
            value70: 70,
            start70: '',
            end70: '',
            testStandardId70: '',
            value68: 68,
            start68: '',
            end68: '',
            testStandardId68: '',
            value66: 66,
            start66: '',
            end66: '',
            testStandardId66: '',
            value64: 64,
            start64: '',
            end64: '',
            testStandardId64: '',
            value62: 62,
            start62: '',
            end62: '',
            testStandardId62: '',
            value60: 60,
            start60: '',
            end60: '',
            testStandardId60: '',
            value50: 50,
            start50: '',
            end50: '',
            testStandardId50: '',
            value40: 40,
            start40: '',
            end40: '',
            testStandardId40: '',
            value30: 30,
            start30: '',
            end30: '',
            testStandardId30: '',
            value20: 20,
            start20: '',
            end20: '',
            testStandardId20: '',
            value10: 10,
            start10: '',
            end10: '',
            testStandardId10: '',



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
        getTestDetailInfoByTestId(testId) {
            var that = this;
            // that.detail.splice(detailId, 1);
            this.$axios.get('/v1/corporeitytest/getTestDetailInfoByTestId?testId=' + testId)
                .then(function(response) {
                    // console.log(response)
                    that.testDetailInfo = response.data.response
                })
                .catch(function(response) {
                    console.log(response);
                });
        },
        getScoreStandardListByTestId(testId) {
            var that = this;
            // that.detail.splice(detailId, 1);
            this.$axios.get('/v1/corporeitytest/getScoreStandardListByTestId?testId=' + testId)
                .then(function(response) {
                    console.log(response)
                    let list = response.data.response;
                    if (list.length > 0) {
                        let vo = null;
                        for (let i = 0; i < list.length; i++) {
                            vo = list[i];
                            if (vo.score == 100) {
                                console.log(vo)
                                that.start100 = (vo.scoringCriteriaStart ? vo.scoringCriteriaStart : 0) / 10;
                                that.end100 = (vo.scoringCriteriaEnd ? vo.scoringCriteriaEnd : 0) / 10;
                                that.testStandardId100 = vo.testStandardId;
                            };
                            if (vo.score == 95) {
                                that.start95 = (vo.scoringCriteriaStart ? vo.scoringCriteriaStart : 0) / 10;
                                that.end95 = (vo.scoringCriteriaEnd ? vo.scoringCriteriaEnd : 0) / 10;
                                that.testStandardId95 = vo.testStandardId;
                            };
                            if (vo.score == 90) {
                                that.start90 = (vo.scoringCriteriaStart ? vo.scoringCriteriaStart : 0) / 10;
                                that.end90 = (vo.scoringCriteriaEnd ? vo.scoringCriteriaEnd : 0) / 10;
                                that.testStandardId90 = vo.testStandardId;
                            };
                            if (vo.score == 85) {
                                that.start85 = (vo.scoringCriteriaStart ? vo.scoringCriteriaStart : 0) / 10;
                                that.end85 = (vo.scoringCriteriaEnd ? vo.scoringCriteriaEnd : 0) / 10;
                                that.testStandardId85 = vo.testStandardId;
                            };
                            if (vo.score == 80) {
                                that.start80 = (vo.scoringCriteriaStart ? vo.scoringCriteriaStart : 0) / 10;
                                that.end80 = (vo.scoringCriteriaEnd ? vo.scoringCriteriaEnd : 0) / 10;
                                that.testStandardId80 = vo.testStandardId;
                            };
                            if (vo.score == 78) {
                                that.start78 = (vo.scoringCriteriaStart ? vo.scoringCriteriaStart : 0) / 10;
                                that.end78 = (vo.scoringCriteriaEnd ? vo.scoringCriteriaEnd : 0) / 10;
                                that.testStandardId78 = vo.testStandardId;
                            };
                            if (vo.score == 76) {
                                that.start76 = (vo.scoringCriteriaStart ? vo.scoringCriteriaStart : 0) / 10;
                                that.end76 = (vo.scoringCriteriaEnd ? vo.scoringCriteriaEnd : 0) / 10;
                                that.testStandardId76 = vo.testStandardId;
                            };
                            if (vo.score == 74) {
                                that.start74 = (vo.scoringCriteriaStart ? vo.scoringCriteriaStart : 0) / 10;
                                that.end74 = (vo.scoringCriteriaEnd ? vo.scoringCriteriaEnd : 0) / 10;
                                that.testStandardId74 = vo.testStandardId;
                            };
                            if (vo.score == 72) {
                                that.start72 = (vo.scoringCriteriaStart ? vo.scoringCriteriaStart : 0) / 10;
                                that.end72 = (vo.scoringCriteriaEnd ? vo.scoringCriteriaEnd : 0) / 10;
                                that.testStandardId72 = vo.testStandardId;
                            };
                            if (vo.score == 70) {
                                that.start70 = (vo.scoringCriteriaStart ? vo.scoringCriteriaStart : 0) / 10;
                                that.end70 = (vo.scoringCriteriaEnd ? vo.scoringCriteriaEnd : 0) / 10;
                                that.testStandardId70 = vo.testStandardId;
                            };
                            if (vo.score == 68) {
                                that.start68 = (vo.scoringCriteriaStart ? vo.scoringCriteriaStart : 0) / 10;
                                that.end68 = (vo.scoringCriteriaEnd ? vo.scoringCriteriaEnd : 0) / 10;
                                that.testStandardId68 = vo.testStandardId;
                            };
                            if (vo.score == 66) {
                                that.start66 = (vo.scoringCriteriaStart ? vo.scoringCriteriaStart : 0) / 10;
                                that.end66 = (vo.scoringCriteriaEnd ? vo.scoringCriteriaEnd : 0) / 10;
                                that.testStandardId64 = vo.testStandardId;
                            };
                            if (vo.score == 64) {
                                that.start64 = (vo.scoringCriteriaStart ? vo.scoringCriteriaStart : 0) / 10;
                                that.end64 = (vo.scoringCriteriaEnd ? vo.scoringCriteriaEnd : 0) / 10;
                                that.testStandardId64 = vo.testStandardId;
                            };
                            if (vo.score == 62) {
                                that.start62 = (vo.scoringCriteriaStart ? vo.scoringCriteriaStart : 0) / 10;
                                that.end62 = (vo.scoringCriteriaEnd ? vo.scoringCriteriaEnd : 0) / 10;
                                that.testStandardId62 = vo.testStandardId;
                            };
                            if (vo.score == 60) {
                                that.start60 = (vo.scoringCriteriaStart ? vo.scoringCriteriaStart : 0) / 10;
                                that.end60 = (vo.scoringCriteriaEnd ? vo.scoringCriteriaEnd : 0) / 10;
                                that.testStandardId60 = vo.testStandardId;
                            };
                            if (vo.score == 50) {
                                that.start50 = (vo.scoringCriteriaStart ? vo.scoringCriteriaStart : 0) / 10;
                                that.end50 = (vo.scoringCriteriaEnd ? vo.scoringCriteriaEnd : 0) / 10;
                                that.testStandardId50 = vo.testStandardId;
                            };
                            if (vo.score == 40) {
                                that.start40 = (vo.scoringCriteriaStart ? vo.scoringCriteriaStart : 0) / 10;
                                that.end40 = (vo.scoringCriteriaEnd ? vo.scoringCriteriaEnd : 0) / 10;
                                that.testStandardId40 = vo.testStandardId;
                            };
                            if (vo.score == 30) {
                                that.start30 = (vo.scoringCriteriaStart ? vo.scoringCriteriaStart : 0) / 10;
                                that.end30 = (vo.scoringCriteriaEnd ? vo.scoringCriteriaEnd : 0) / 10;
                                that.testStandardId30 = vo.testStandardId;
                            };
                            if (vo.score == 20) {
                                that.start20 = (vo.scoringCriteriaStart ? vo.scoringCriteriaStart : 0) / 10;
                                that.end20 = (vo.scoringCriteriaEnd ? vo.scoringCriteriaEnd : 0) / 10;
                                that.testStandardId20 = vo.testStandardId;
                            };
                            if (vo.score == 10) {
                                that.start10 = (vo.scoringCriteriaStart ? vo.scoringCriteriaStart : 0) / 10;
                                that.end10 = (vo.scoringCriteriaEnd ? vo.scoringCriteriaEnd : 0) / 10;
                                that.testStandardId10 = vo.testStandardId;
                            };
                        }
                    }
                })
                .catch(function(response) {
                    console.log(response);
                });
        },
        baseSubmit() {
            var that = this;
            let list = [
                {
                    "score": 100,
                    "scoreType": "0",
                    "scoringCriteriaEnd": that.end100 * 10,
                    "scoringCriteriaStart": that.start100 * 10,
                    "testId": that.testId,
                    "testStandardId": that.testStandardId100
                },
                {
                    "score": 95,
                    "scoreType": "0",
                    "scoringCriteriaEnd": that.end95 * 10,
                    "scoringCriteriaStart": that.start95 * 10,
                    "testId": that.testId,
                    "testStandardId": that.testStandardId95
                },
                {
                    "score": 90,
                    "scoreType": "0",
                    "scoringCriteriaEnd": that.end90 * 10,
                    "scoringCriteriaStart": that.start90 * 10,
                    "testId": that.testId,
                    "testStandardId": that.testStandardId90
                },
                {
                    "score": 85,
                    "scoreType": "1",
                    "scoringCriteriaEnd": that.end85 * 10,
                    "scoringCriteriaStart": that.start85 * 10,
                    "testId": that.testId,
                    "testStandardId": that.testStandardId85
                },
                {
                    "score": 80,
                    "scoreType": "1",
                    "scoringCriteriaEnd": that.end80 * 10,
                    "scoringCriteriaStart": that.start80 * 10,
                    "testId": that.testId,
                    "testStandardId": that.testStandardId80
                },
                {
                    "score": 78,
                    "scoreType": "2",
                    "scoringCriteriaEnd": that.end78 * 10,
                    "scoringCriteriaStart": that.start78 * 10,
                    "testId": that.testId,
                    "testStandardId": that.testStandardId78
                },
                {
                    "score": 76,
                    "scoreType": "2",
                    "scoringCriteriaEnd": that.end76 * 10,
                    "scoringCriteriaStart": that.start76 * 10,
                    "testId": that.testId,
                    "testStandardId": that.testStandardId76
                },
                {
                    "score": 74,
                    "scoreType": "2",
                    "scoringCriteriaEnd": that.end74 * 10,
                    "scoringCriteriaStart": that.start74 * 10,
                    "testId": that.testId,
                    "testStandardId": that.testStandardId74
                },
                {
                    "score": 72,
                    "scoreType": "2",
                    "scoringCriteriaEnd": that.end72 * 10,
                    "scoringCriteriaStart": that.start72 * 10,
                    "testId": that.testId,
                    "testStandardId": that.testStandardId72
                },
                {
                    "score": 70,
                    "scoreType": "2",
                    "scoringCriteriaEnd": that.end70 * 10,
                    "scoringCriteriaStart": that.start70 * 10,
                    "testId": that.testId,
                    "testStandardId": that.testStandardId70
                },
                {
                    "score": 68,
                    "scoreType": "2",
                    "scoringCriteriaEnd": that.end68 * 10,
                    "scoringCriteriaStart": that.start68 * 10,
                    "testId": that.testId,
                    "testStandardId": that.testStandardId68
                },
                {
                    "score": 66,
                    "scoreType": "2",
                    "scoringCriteriaEnd": that.end66 * 10,
                    "scoringCriteriaStart": that.start66 * 10,
                    "testId": that.testId,
                    "testStandardId": that.testStandardId66
                },
                {
                    "score": 64,
                    "scoreType": "2",
                    "scoringCriteriaEnd": that.end64 * 10,
                    "scoringCriteriaStart": that.start64 * 10,
                    "testId": that.testId,
                    "testStandardId": that.testStandardId64
                },
                {
                    "score": 62,
                    "scoreType": "2",
                    "scoringCriteriaEnd": that.end62 * 10,
                    "scoringCriteriaStart": that.start62 * 10,
                    "testId": that.testId,
                    "testStandardId": that.testStandardId62
                },
                {
                    "score": 60,
                    "scoreType": "2",
                    "scoringCriteriaEnd": that.end60 * 10,
                    "scoringCriteriaStart": that.start60 * 10,
                    "testId": that.testId,
                    "testStandardId": that.testStandardId60
                },
                {
                    "score": 50,
                    "scoreType": "3",
                    "scoringCriteriaEnd": that.end50 * 10,
                    "scoringCriteriaStart": that.start50 * 10,
                    "testId": that.testId,
                    "testStandardId": that.testStandardId50
                },
                {
                    "score": 40,
                    "scoreType": "3",
                    "scoringCriteriaEnd": that.end40 * 10,
                    "scoringCriteriaStart": that.start40 * 10,
                    "testId": that.testId,
                    "testStandardId": that.testStandardId40
                },
                {
                    "score": 30,
                    "scoreType": "3",
                    "scoringCriteriaEnd": that.end30 * 10,
                    "scoringCriteriaStart": that.start30 * 10,
                    "testId": that.testId,
                    "testStandardId": that.testStandardId30
                },
                {
                    "score": 20,
                    "scoreType": "3",
                    "scoringCriteriaEnd": that.end20 * 10,
                    "scoringCriteriaStart": that.start20 * 10,
                    "testId": that.testId,
                    "testStandardId": that.testStandardId20
                },
                {
                    "score": 10,
                    "scoreType": "3",
                    "scoringCriteriaEnd": that.end10 * 10,
                    "scoringCriteriaStart": that.start10 * 10,
                    "testId": that.testId,
                    "testStandardId": that.testStandardId10
                }
            ];
            // var check= /^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$/;
            for (let i = 0; i < list.length; i++) {

                try {
                    if (list[i].scoringCriteriaEnd.length <1 || list[i].scoringCriteriaStart.length<1) {
                        that.$Message.info("你当前还有选项未填完，请仔细核对！");
                        return false;
                    }
                } catch (exception) {
                    this.$Message.error("你当前还有选项未填写正确，请仔细核对！!");
                    return false;
                }

            }
            let data = {
                "list": list,
                "testId": that.testId
            }
            this.$axios.post('/v1/corporeitytest/upsertScoreStandard', data)
                .then(function(response) {
                    console.log(response)
                    if (response.data.code == 10000) {
                        that.$Message.info("保存成功");
                        that.$router.go(-1);  
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
        this.updateUrl = this.$axios.defaults.baseURL + "/v1/file/upload?type=manage_img";
        let testId = sessionStorage.getItem('testManage-testStandard-testId');
        if (testId) {
            vm.testId = testId;
            vm.getTestDetailInfoByTestId(testId);
            vm.getScoreStandardListByTestId(testId);
        }



    },
    destroyed() {
        var vm = this;

    }

};
</script>