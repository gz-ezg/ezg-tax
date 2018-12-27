<template>
    <div style="margin-top:10px">
        <Row><center><h4 style="font-weight:600">您的企业共<span style="color:red;padding:0px 6px">{{errorNum}}</span>个异常记录</h4></center></Row>
        <div>
            <div v-if="loading">
                <center>
                    <Loading type="spinner"/>
                    <p style="padding-top:5px;color:#666">税务异常获取中...</p>
                </center>
            </div>
            <div v-else>
                <center><h4>税务异常</h4></center>
                <div v-if="taxation">
                    <div style="margin:auto;width:90%">
                        <table class="table table-striped table-bordered" style="font-size:12px">
                        <thead>
                            <tr>
                                <td>税所</td>
                                <td>税种</td>
                                <td>所属期始</td>
                                <td>所属期止</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in tax.data.taxML.body.taxML.sbqkList.sbqk" :key="index">
                                <td>{{item.gdslx}}</td>
                                <td>{{item.zsxmmc}}</td>
                                <td>{{item.skssqq}}</td>
                                <td>{{item.skssqz}}</td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
                <div v-else>
                    <center>
                        <img src="./font.png" alt="" srcset="">
                    </center>
                </div>
            </div>
        </div>
        <div style="margin-top:20px">
            <div v-if="loading">  
                <center>
                    <Loading type="spinner"/>
                    <p style="padding-top:5px;color:#666">工商异常获取中...</p>
                </center>
            </div>
            <div v-else>
                <center><h4>工商异常</h4></center>
                {{business.abnormalList}}
                <div v-if="commerce">
                    <template v-for="(item, index ) in business.data.abnormalList">
                        <cell-group style="margin:auto;width:95%" :key="index" >
                            <cell class="labelem" title="列入经营异常名录原因" :label="item.abnormal_cause"></cell>
                            <cell class="labelem depart" title="决定机关" :value="item.office" ></cell>
                            <cell class="labelem" title="列入日期" :value="item.abnormal_date|formateDate"></cell>
                        </cell-group>
                    </template>
                </div>
                <div v-else>
                    <center>
                        <img src="./font.png" alt="" srcset="">
                    </center>
                </div>
            </div>
        </div>
        <div style="margin:auto;width:80%;margin-top:10px">
            <p>* <span style="color:red;font-size:14px">以上结果仅供参考</span>，最终结果以税务局及工商局公示为准！</p>
        </div>
        <Row style="margin-top:20px;padding-bottom:20px">
            <Col span="12">
                <Button type="default" style="margin-left:20px;width:80%" @click="$router.go(-1)">返回</Button>
            </Col>
            <Col span="12">
                <Button type="primary" style="margin-left:20px;width:80%" @click="open_check_more">获取更多查询次数</Button>
            </Col>
        </Row>
    </div>
</template>

<script>
import abnormalCommon from '../common.js'
import { mapState } from 'vuex'
import { Panel, Field, Cell, CellGroup, Icon, Col, Row, Button, Loading, Dialog, Toast } from 'vant'
import { setTimeout } from 'timers';
// import VConsole from 'vconsole/dist/vconsole.min.js'

export default {
    mixins: [abnormalCommon],
    components: {
        Col,
        Row,
        Button,
        Loading,
        CellGroup,
        Cell,
        Dialog,
        Toast
    },
    data(){
        return {
            taxation: true,
            commerce: true,
            errorNum: 0,
            loading: false
        }
    },
    computed: {
        ...mapState({
            detail: state => state.abnormality.detail,
            companyname: state => state.abnormality.companyname
        }),
        business(){
            // if(this.detail.business){
            //     return ;
            // }
            console.log(JSON.parse(this.detail.business))
            return JSON.parse(this.detail.business)
        },
        tax(){
            // if(this.detail.tax){
            //     return ;
            // }
            return JSON.parse(this.detail.tax)
        }
    },
    methods: {
        // share(){
        //     console.log("12345")
        //     WeixinJSBridge.on('menu:share:appmessage', function(argv){ alert("发送给好友"); });
        // },
        open_check_more(){
            Dialog.alert({
                title: '点击右上角分享可以获得查询机会哦！',
            }).then(() => {
                // on close
            });
        }
    },
    mounted(){
        let _self = this
        if(!this.companyname){
            Toast.fail("没有填写公司名称！正在返回首页！")
            setTimeout(()=>{
                _self.$router.push({
                    name: "abnormalityLogin"
                })
            },500)
        }
        this.taxation = this.tax.data.taxML.body.taxML.sbqkList.sbqk.length ? true : false
        this.commerce = this.business.data.abnormalList.length ? true : false
        this.errorNum = this.tax.data.taxML.body.taxML.sbqkList.sbqk.length + this.business.data.abnormalList.length
    },
    filters: {
        formateDate: function (e){
            let tempDate = new Date(e)
            return `${tempDate.getFullYear()} 年 ${tempDate.getMonth() + 1} 月 ${tempDate.getDate()} 日`
        }
    }
}
</script>

<style>
.labelem .van-cell__title{
    font-size:14px!important;
}

.labelem .van-cell__value{
    font-size: 12px
}

.depart .van-cell__title{
    flex:1
}

.depart .van-cell__value{
    flex:2
}
</style>


