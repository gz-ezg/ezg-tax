/* eslint-disable */
<template>
    <div style="background-color:#f64a42;height:110vh;overflow-y:hidden">
        <img src="./static/header.png" style="width:100%;height:27vh;">
        <div class="main" style="margin-top:-10px">
            <center>
                <div class="content-border">
                    <div style="width:90%;height:12vh">
                        <div v-if="loading">  
                            <h3 style="font-size:14px;color:white;padding-top:15px">{{result.company_name | html2text}}</h3>
                            <div v-html="result.pass_rate" style="font-size:14px;margin-top:5px;color:white"></div>
                        </div>
                        <div style="height:12vh" v-else>
                            <loading type="spinner" color="white" style="padding-top:3vh"></loading>
                        </div>
                    </div>
                </div>
            </center>
            <div style="margin-top:10px!important;width:80%;margin:auto">
                <img src="./static/inputcpname.png" style="width:50%;margin-top:10px!important;margin-left:25%">
                <field label="城市：" style="margin-bottom:5px;border-radius:6px;margin-top:5px;padding-left:10px;" v-model="city"></field>
                <field label="行业：" style="margin-bottom:5px;border-radius:6px;padding-left:10px;" v-model="company_line"></field>
                <field label="意向名称：" style="margin-bottom:5px;border-radius:6px;padding-left:10px;" v-model="company_name"></field>
                <field
                        v-model="mobile"
                        label="手机号："
                        style="margin-bottom:10px;border-radius:6px;padding-left:10px;"
                    />
                    <field
                        v-model="yzm"
                        type="number"
                        label="验证码："
                        label-align="left"
                        style="margin-bottom:10px;border-radius:6px;padding-left:10px;padding-right:10px"
                        >
                        <Button slot="button" size="small" type="primary" @click="require_code" v-if="!yzmDisable" >获取验证码</Button>
                        <Button slot="button" size="small" type="default" @click="require_code" v-if="yzmDisable" disabled >{{time}}秒后重新获取</Button>
                    </field>
                <Button type="danger" size="large" @click="submit" :disabled="disabled" :loading="!loading"> 立刻提交</Button>

                <!-- <img src="./static/resultList.png" style="width:25%;margin-top:10px"> -->
            </div>
        </div>
    </div>
</template>

<script>
import { Button, Field, Loading, Toast } from 'vant';

export default {
    components:{
        Button,
        Field,
        Loading
    },
    data(){
        return{
            loading: true,
            city: "",
            company_name: "",
            company_line: "",
            result: {
                company_name: "",
                pass_rate: "",
            },
            success: true,
            yzmDisable: false,
            time: 0,
            mobile: "",
            yzm: "",
            companynameShow: ""
        }
    },
    computed:{
        disabled(){
            if(this.mobile && this.yzm && this.city && this.company_line && this.company_name){
                return false
            }else{
                return true
            }
        }
    },
    methods:{
        is_mobile_number(){
            let _self = this
            let reg = /^[1][0-9]{10}$/
            if(!reg.test(_self.mobile)){
                Toast.fail("请输入正确的手机号！")
                return false
            }else{
                return true
            }
        },
        require_code(){
            let _self = this
            if(this.is_mobile_number()){
                console.log("手机号正确！")
                let url = `api/store/tools/company/name/test/mag/send`
                let config = {
                    mobile: _self.mobile
                }

                function success(res){
                    Toast.success(res.data.msg)
                    _self.yzmDisable = true
                    _self.time = 60
                    _self.change_time()
                }

                function fail(err){
                    Toast.fail(err.data.msg)
                }

                this.$Post(url, config, success, fail)
            }else{
                Toast.success("请输入正确的手机号！")
            }
        },
        change_time(){
            let _self = this
            let time1 = setInterval(function(){
                _self.time--;
                console.log(_self.time)
                if(_self.time <= 0){
                    clearInterval(time1)
                    _self.yzmDisable = false
                }
                _self.$once('hook:beforeDestroy', () => {
                    clearInterval(time1);
                })
            },1000)
        },
        submit(){
            let _self = this
            _self.loading = false
            let url = `api/store/tools/company/name/verification`
            let config = {
                params: {
                    city: _self.city,
                    company_name: _self.company_name,
                    company_line: _self.company_line,
                    mobile: _self.mobile,
                    code: _self.yzm
                }
            }

            function success(res){
                _self.result = res.data.data
                _self.companynameShow = true
                setInterval(()=>{
                    _self.loading = true
                },1000)
            }

            function fail(err){
                // <h1 style="font-size:12px;color:white">T T</h1>
                _self.result.company_name = "T T"
                _self.result.pass_rate = `
                    
                    <span>结果不小心跑丢了！</span>
                `
                _self.companynameShow = false
                _self.result.company_name = ""
                // Toast.fail("获取失败，请重试！")
                setInterval(()=>{
                    _self.loading = true
                },1000)
                
            }

            this.$Get(url, config, success, fail)

        }
    },
    //  过滤器
    filters: {
        html2text: function (value) {
            if (!value) return ''
            return value.replace(/&nbsp;/g,"")
        }
    }
}
</script>

<style scoped>
*{
    font-size:14px
}
.main{
    padding-top:4vh;
    background-image: url('static/main2.png');
    background-size: 100%;
    height: 85vh;
    border:3vw solid #f64a42;
    border-top:none;
    border-bottom:2vh solid #f64a42
}
.content-border{
    margin-top:10px;
    width: 80%;
    background-image: url('static/26.png');
    background-size: 100%;
    background-position:bottom;
    background-repeat:no-repeat;
}
.van-cell{
    background: #b6a37f;
    padding: 5px 2px;
    line-height: 28px;
}
.van-cell:not(:last-child)::after{
    content: none;
}
.van-button{
    border-radius: 5px;
}
.van-button--large{
    line-height: 22px;
    height: 36px;
}
</style>

