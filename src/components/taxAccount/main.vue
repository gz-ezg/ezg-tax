<template>
    <div style="background-color:#eeeeee;">
        <panel id="panel-title" v-if="isResult">
            <Row>
                <Col span="12"><center><Button  round :type="{ danger: buttonType == 'specialty', default:buttonType == ''}" @click="buttonType= 'specialty'">专业版</Button></center></Col>
                <Col span="12"><center><Button  round :type="{ danger: buttonType == '', default:buttonType != ''}" @click="buttonType= ''">精简版</Button></center></Col>
            </Row>
            <field label="月收入" placeholder="请输入当前收入" input-align="right" v-model="monthIncome"></field>
            <field label="起征点" readonly error value="5000" input-align="right"></field>
            <field label="五险一金" placeholder="请输入您每月实缴五险一金" input-align="right" v-model="insurance" v-if="buttonType==''"></field>
            <field label="社保基数" placeholder="请输入社保基数" input-align="right" v-model="insuranceBase" v-if="buttonType=='specialty'"></field>
            <field label="公积金基数" placeholder="请输入公积金基数" input-align="right" v-model="reserveFundBase" v-if="buttonType=='specialty'"></field>
            <field label="公积金比例" placeholder="" input-align="right" v-model="showRatio" v-if="buttonType=='specialty'" @click.native="show=true" readonly></field>
        </panel>
        <Row v-if="isResult">
            <panel title="抵扣项" id="panel-content">
                <cell-group class="input-field">
                    <cell title="子女教育 1000/人/月" @click="open_child_detail(children)">
                        <div slot="icon">
                            <icon name="info-o" />
                        </div>
                    </cell>
                    <cell title="抵扣方式" class="small">
                        <!-- <radio-group v-model="childrenUseNum">
                            <row type="flex" justify="end">
                                <Col span="12">
                                    <radio name="1">共同使用</radio>
                                </Col>
                                <Col span="12">
                                    <radio name="2">单独使用</radio>
                                </Col>
                            </row>
                        </radio-group> -->
                        <row type="flex" justify="end">
                            <Col span="10"><Button round size="small" @click="childrenUseNum!=1?childrenUseNum=1:childrenUseNum=''" :type="{ primary: childrenUseNum == 1, default:childrenUseNum != 1}">共同使用</Button></Col>
                            <Col span="10"><Button round size="small" @click="childrenUseNum!=2?childrenUseNum=2:childrenUseNum=''" :type="{ primary: childrenUseNum == 2, default:childrenUseNum != 2}">单独使用</Button></Col>
                        </row>
                        
                    </cell>
                    <cell title="子女数" class="small">
                        <radio-group v-model="childrenNum">
                            <row type="flex" justify="end">
                                <Col span="8">
                                    <Button round size="small" @click="childrenNum!=1?childrenNum = 1:childrenNum=''" :type="{ primary: childrenNum == 1, default:childrenNum != 1}">1</Button>
                                    <!-- <radio name="1">1</radio> -->
                                </Col>
                                <Col span="8">
                                    <Button round size="small" @click="childrenNum!=2?childrenNum = 2:childrenNum=''" :type="{ primary: childrenNum == 2, default:childrenNum != 2}">2</Button>
                                    <!-- <radio name="2">2</radio> -->
                                </Col>
                                <Col span="8"  class="not-padding">
                                    <field placeholder="自定义" input-align="center" v-model="childrenNum"></field>
                                </Col>
                            </row>
                        </radio-group>
                    </cell>
                </cell-group>
                <cell-group class="input-field">
                    <cell title="继续教育" @click="open_child_detail(edu)">
                        <div slot="icon">
                            <icon name="info-o" />
                        </div>
                    </cell>
                    <cell title="抵扣方式" class="small">
                        <radio-group v-model="adultEducation">
                            <row type="flex" justify="end">
                                <Col span="10">
                                    <Button round size="small" @click="adultEducation!=4800?adultEducation=4800:adultEducation=''" :type="{ primary: adultEducation == 4800, default:adultEducation != 4800}">学历：4800</Button>
                                    <!-- <radio name="4800">学历：4800</radio> -->
                                </Col>
                                <Col span="10">
                                    <Button round size="small" @click="adultEducation!=3600?adultEducation=3600:adultEducation=''" :type="{ primary: adultEducation == 3600, default:adultEducation != 3600}">技术：3600</Button>
                                    <!-- <radio name="3600">技术：3600</radio> -->
                                </Col>
                            </row>
                        </radio-group>
                    </cell>
                </cell-group>
                <cell-group class="input-field">
                    <cell title="赡养老人 2000/月" @click="open_child_detail(elder)">
                        <div slot="icon">
                            <icon name="info-o" />
                        </div>
                    </cell>
                    <cell title="兄妹数" class="small">
                        <radio-group v-model="brotherNum">
                            <row type="flex" justify="end">
                                <Col span="8">
                                    <Button round size="small" @click="brotherNum!=0?brotherNum=0:brotherNum=null" :type="{ primary: brotherNum == 0, default:brotherNum != 0}">0</Button>
                                    <!-- <radio name="1">1</radio> -->
                                </Col>
                                <Col span="8">
                                    <Button round size="small" @click="brotherNum!=1?brotherNum=1:brotherNum=null" :type="{ primary: brotherNum == 1, default:brotherNum != 1}">1</Button>
                                    <!-- <radio name="2">2</radio> -->
                                </Col>
                                <Col span="8"  class="not-padding">
                                    <field placeholder="自定义" input-align="center" v-model="brotherNum"></field>
                                </Col>
                            </row>
                        </radio-group>
                    </cell>
                </cell-group>
                <cell-group class="input-field">
                    <cell title="住房支出" @click="open_child_detail(house)">
                        <div slot="icon">
                            <icon name="info-o" />
                        </div>
                    </cell>
                    <cell title="首套房贷利息" class="small">
                        <radio-group v-model="housing">
                            <row type="flex" justify="end">
                                <Col span="8">
                                    <Button round size="small" @click="housing!=1000?housing = 1000:housing=''" :type="{ primary: housing == 1000, default:housing != 1000}">1000/月</Button>
                                <!-- <radio name="1001">1000/月</radio> -->
                                </Col>
                            </row>
                        </radio-group>
                    </cell>
                    <cell title="租房扣除" class="small">
                        <radio-group v-model="housing">
                            <row type="flex" justify="end">
                                <Col span="8">
                                    <Button round size="small" @click="housing!=1500?housing = 1500:housing=''" :type="{ primary: housing == 1500, default:housing != 1500}">1500/月</Button>

                                    <!-- <radio name="1200">1200/月</radio> -->
                                </Col>
                                <Col span="8">
                                    <Button round size="small" @click="housing!=1100?housing = 1100:housing=''" :type="{ primary: housing == 1100, default:housing != 1100}">1100/月</Button>

                                    <!-- <radio name="1000">1000/月</radio> -->
                                </Col>
                                <Col span="8">
                                    <Button round size="small" @click="housing!=800?housing = 800:housing=''" :type="{ primary: housing == 800, default:housing != 800}">800/月</Button>

                                    <!-- <radio name="800">800/月</radio> -->
                                </Col>
                            </row>
                        </radio-group>
                    </cell>
                </cell-group>
                <cell-group class="input-field">
                    <cell title="大病医疗支出" @click="open_child_detail(illness)">
                        <div slot="icon">
                            <icon name="info-o" />
                        </div>
                    </cell>
                    <field class="medica" label="个人承担医疗费用" placeholder="请输入" input-align="right" v-model="medicalExpenses" ></field>
                </cell-group>
            </panel>
            <Row style="margin-top:20px;margin-left:20px">
                <Col><span style="color:#ccc;font-size:12px;">*说明：计算结果仅供参考；由 e账柜 提供；</span></Col>
            </Row>

            <Row style="width:100%;margin:auto;margin-top:20px;position:fixed;bottom:0;background-color:#eeeeee">
                <Col span="12">
                    <Button type="primary" @click="computer_tax" :disabled="disabled" style="width:100%" id="account">计算</Button>
                </Col>
                <Col span="12">
                    <Button style="width:100%" @click="reset" >重置</Button>
                </Col>
            </Row>
        </Row>
        <Row v-else>
            <result :result="result" @cancel="rebuild"></result>
        </Row>
        <Popup v-model="show" position="bottom">
            <picker :columns="columns" show-toolbar @confirm="confirm_ratio" @cancel="show=false"/>
        </Popup>
        
    </div>
</template>

<script>
import { Panel, Field, Cell, CellGroup, Icon, Dialog, RadioGroup, Radio, Col, Row, Button, Picker, Popup } from 'vant';
import result from './result'
import common from './common.js';

export default {
    // mixins: [common],
    components:{
        Panel,
        Field,
        Cell,
        CellGroup,
        Icon,
        Dialog,
        RadioGroup,
        Radio,
        Col,
        Row,
        Button,
        result,
        Picker,
        Popup
    },
    watch:{
        brotherNum(){
            if(this.brotherNum===''){
                this.brotherNum = null
            }
        },
        childrenNum(){
            if(this.childrenNum == ""){
                this.childrenUseNum = ""
            }else{
                if(this.childrenUseNum){
                    return 
                }else{
                    this.childrenUseNum = 1
                }
            }
        },
        childrenUseNum(){
            if(this.childrenUseNum == ""){
                this.childrenNum = ""
            }else{
                if(this.childrenNum){
                    return 
                }else{
                    this.childrenNum = 1
                }
            }
        }
    },
    computed:{
        disabled(){
            if((this.monthIncome && this.insurance && this.buttonType == "") || (this.monthIncome && this.insuranceBase && this.reserveFundBase && this.buttonType == "specialty")) {
                return false
            }else{
                return true
            }
        },
        showRatio(){
            return (this.reserveFundRatio * 100).toFixed(0) + "%"
        }
    },
    data(){
        return {
            show: false,
            columns: [
                "5%", "6%", "7%", "8%", "9%", "10%", "11%", "12%"
            ],
            reserveFundRatio: 0.05,
            insuranceBase: "",
            reserveFundBase: "",
            buttonType: "specialty",
            result: "",
            isResult: true,
            monthIncome: "",
            childrenNum: "",
            childrenUseNum: "",
            brotherNum: null,
            housing: "",
            medicalExpenses: "",
            insurance: "",
            adultEducation: "",
            children: {
                title: "",
                content: `<div style='text-indent:2em'>按照每个子女每年12000元（每月1000元）的标准定额扣除。这意味着，有两个孩纸的家庭见你跟该享受到每年24000元的定额扣除。</div>
            <div style='text-indent:2em;margin-top:10px'>每年12000元或24000元的扣除，既可以父母一年扣50%，也可以由乙方扣除100%，具体扣除方式在一个那谁年度内不得变更。</div>`,
            },
            edu: {
                title: "学历继续教育和技能人员职业资格继续教育",
                content:`
                    <div style='text-indent:2em'>在学历教育期间按照每年4800元（每月400元）定额扣除。</div>
                    <div style='text-indent:2em;margin-top:10px'>技能人员职业资格继续教育、专业技术人员职业资格继续教育支出，在取得相关证书的年度，按照每年3600元定额扣除。</div>
                `
            },
            elder: {
                title: "",
                content: `
                    <div style='text-indent:2em'>纳税人赡养60岁（含）以上父母以及其他法定赡养人的赡养支出，可以进行扣除；其中分为独生子女和非独生子女两种情况。</div>
                    <div style='text-indent:2em;margin-top:10px'>纳税人为独生子女的，按照每年24000元（每月2000元）的标准定额扣除；</div>
                    <div style='text-indent:2em;margin-top:10px'>纳税人为非独生子女的，可以分摊24000元（每月2000元）的扣除额度，如平均分摊、约定分摊等方式，分摊方式一个纳税年度年度内不得变更。此外，每一纳税人分摊的扣除额最高不得超过每年12000元（每月1000元）。</div>
                `
            },
            house: {
                title: "",
                content: `
                    <div>首套房贷利息扣除：</div>
                    <div style='text-indent:2em;margin-top:10px'>纳税人本人或配偶使用商业银行或住房公积金个人住房贷款为本人或其配偶购买住房，发生的首套住房贷款利息支出，在偿还贷款期间，可以按照每年12000元（每月1000元）标准定额扣除。非首套住房贷款利息支出，纳税人不得扣除。纳税人只能享受一套首套住房贷款利息扣除。</div>
                    <div style='text-indent:2em;margin-top:10px'>经夫妻双方约定，可以选择由其中一方扣除，具体扣除方式在一个纳税年度内不得变更。</div>
                    <div style='margin-top:10px'>租房扣除：</div>
                    <div style='text-indent:2em;margin-top:10px'>承租的住房位于直辖市、省会城市、计划单列市以及国务院确定的其他城市，扣除标准为每年14400元（每月1200元）。</div>
                    <div style='text-indent:2em;margin-top:10px'>承租的住房位于其他城市的，市辖区户籍人口超过100万的，扣除标准为每年12000元（每月1000元）。</div>
                    <div style='text-indent:2em;margin-top:10px'>承租的住房位于其他城市的，市辖区户籍人口不超过100万（含）的，扣除标准为每年9600元（每月800元）。</div>
                `
            },
            illness: {
                title: "",
                content: `
                    <div style='text-indent:2em;margin-top:10px'>一个纳税年度内，在社会医疗保险管理信息系统记录的（包括医保目录范围内的自付部分和医保目录范围外的自费部分）由个人负担超过15000元的医药费用支出部分，为大病医疗支出，可以按照每年60000元标准限额据实扣除。大病医疗专项附加扣除由纳税人办理汇算清缴时扣除。</div>
                `
            }
        }
    },
    methods:{
        confirm_ratio(e){
            console.log(e.replace("%","") /100)
            this.reserveFundRatio = (e.replace("%","") /100).toFixed(2)
            this.show = false
        },
        rebuild(){
            this.isResult=true
            this.reset()
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
        },
        open_child_detail(e){
            Dialog.alert({
                title: e.title,
                message: e.content,
                closeOnClickOverlay: true
            })
        },
        computer_tax(){
            let _self = this
            let url = `api/store/tools/tax/calculate`
            let temp = ""
            // if(_self.housing ==  "1001"){
            //     temp = "1000"
            // }else{
            //     temp = _self.housing
            // }
            let tempBrotherNum
            if(_self.brotherNum != null){
                tempBrotherNum = _self.brotherNum+1
            }
            let config = {
                params: {
                    monthIncome: _self.monthIncome,
                    childrenNum: _self.childrenNum,
                    childrenUseNum: _self.childrenUseNum,
                    brotherNum: tempBrotherNum,
                    housing: _self.housing,
                    medicalExpenses: _self.medicalExpenses,
                    insurance: _self.insurance,
                    adultEducation: _self.adultEducation,
                    type: _self.buttonType,
                    insuranceBase: _self.insuranceBase,
                    reserveFundBase: _self.reserveFundBase,
                    reserveFundRatio: _self.reserveFundRatio
                }
            }

            function success(res){
                console.log(res.data.data)
                _self.result = res.data.data
                _self.isResult = false
                document.body.scrollTop = 0
                document.documentElement.scrollTop = 0
            }

            this.$Get(url, config, success)
        },
        reset(){
            let _self = this
            _self.monthIncome = ""
            _self.childrenNum = ""
            _self.childrenUseNum = ""
            _self.brotherNum = null
            _self.housing = ""
            _self.medicalExpenses = ""
            _self.insurance = ""
            _self.adultEducation = ""
        },
        open_choose_ratio(){
            console.log("1234")
        }
    }
}
</script>

<style>
#panel-title{
    /* height: 330px; */
    top: 15px;
    margin:15px;
    margin-top: 0px;
    /* border: 2px solid #cccccc; */
    border-radius: 10px;
    padding-bottom: 10px;
}
#panel-title>.van-panel__header>.van-cell__title{
    text-align: center;
    font-size: 18px;
    font-weight: 700;
    color: #0057a6;
}
#panel-title .van-cell{
    background-color: rgba(0,0,0,0);
}
#panel-title .van-field{
    border: 1px solid #cccccc;
    border-radius: 5px;
    margin: 5%;
    width: 90%;
    box-shadow: 0 2px 5px #cccccc;
}
.van-hairline--top-bottom::after{
    content: none;
}
#panel-content{
    height: 630px;
    top: 15px;
    margin:15px;
    margin-bottom: 0px;
    /* border: 2px solid #cccccc; */
    border-radius: 10px;
}
#panel-content .van-cell{
    background-color: rgba(0,0,0,0);
}
#panel-content>.van-panel__header>.van-cell__title{
    font-size: 16px;
    font-weight: 700;
    color: #0057a6;
}
.van-icon-info-o::before {
    content: "\F02E";
    line-height: 24px;
    padding-right: 5px;
}
.van-dialog{
    border-radius: 10px;
}
.van-dialog__confirm, .van-dialog__confirm:active{
    color: #0057a6;
}
.van-dialog__header{
    font-size: 14px;
}
.van-cell:not(:last-child)::after {
    content: none;
}
.van-cell:last-child::after{
    content: ' ';
    position: absolute;
    pointer-events: none;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    left: 0px;
    right: 0;
    bottom: 0;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
    border-bottom: 1px solid #eee;
}
.input-field .van-field .van-cell__title{
    font-size: 12px;
}
.small .van-cell__title{
    font-size: 12px;
    flex: 1;
    padding: 14rpx 16rpx
}
.small .van-cell__value{
    font-size: 10px;
    flex: 2.5;
    text-align: left;
}
.van-radio__label{
    font-size: 10px;
    margin-left: 5px;
}
.not-padding .van-field{
    padding: 0;
}
.van-cell:last-child::after {
    content: none;
}
.van-button__text{
    padding-left: 3px;
    padding-right: 3px;
}
.van-field--error .van-field__control, .van-field--error .van-field__control::placeholder{
    color: #0057a6;
}
.van-button--danger{
    background-color: #0057a6;
    border: 1px solid #0057a6;
}
.van-button--disabled{
    background-color: #dddddd;
    color: #999999;
}
#account .van-button--primary{
    background-color: #0057a6;
    /* border: 1px solid 	rgba(238,64,0,0.6); */
    border: none;
  }
.medica{
    display: flex;
}
.medica .van-cell__title{
    /* flex: 2; */
    max-width: 100%;
}
.medica .van-cell__value{
    /* flex: 1; */
}
</style>

