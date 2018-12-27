<template>
    <div>
        <div style="height:100vh;overflow-y:hidden"  v-if="success">
            <img src="./static/header.png" style="width:100%;height:35vh;">
            <div style="margin-top:-1vh" class="main">
                <div style="width:80%;margin:auto">
                    <img src="./static/title.png" style="width:70%;margin-top:2vh;margin-left:15%">
                    <field label="城市：" label-align="left" style="margin-bottom:10px;border-radius:6px;margin-top:15px;padding-left:10px" v-model="city"></field>
                    <field label="行业：" label-align="left" style="margin-bottom:10px;border-radius:6px;padding-left:10px" v-model="company_line"></field>
                    <field label="意向名称：" label-align="left" style="margin-bottom:10px;border-radius:6px;padding-left:10px" v-model="company_name"></field>
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
                    <Button type="primary" size="large" @click="submit" :disabled="disabled">看看分析</Button>
                </div>
            </div>
        </div>
        <div v-else>
            <nav-bar title="分析结果" @click-left="success = true;yzmDisable = false" style="color:white!important">
                <div slot="left" style="color:white!important">
                    返回
                </div>
            </nav-bar>
            <loading type="spinner" color="#c9c9c9" v-if="loading" style="padding-top:150px;padding-left:45%"></loading>
            <div v-html="result" v-else></div>
        </div>
    </div>
</template>

<script>
import { Button, Field, Loading, Toast, NavBar  } from 'vant';

export default {
    components:{
        Button,
        Field,
        Loading,
        NavBar
    },
    data(){
        return{
            loading: true,
            success: true,
            yzmDisable: false,
            time: 0,
            mobile: "",
            yzm: "",
            city: "",
            company_name: "",
            company_line: "",
            result: ""
        }
    },
    computed:{
        disabled(){
            if(this.mobile && this.yzm && this.city && this.company_name && this.company_line){
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
                _self.$toast.fail("请输入正确的手机号！")
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
            let url = `api/store/tools/company/name/test`

            let config = {
                params:{
                    city: _self.city,
                    company_name: _self.company_name,
                    company_line: _self.company_line,
                    mobile: _self.mobile,
                    code: _self.yzm
                }
            }

            function success(res){
                _self.result = res.data.data
                _self.success = false
                setInterval(()=>{
                    _self.loading = false
                },1000)
                console.log(res.data.data)
            }

            function fail(err){
                console.log(err)
            }

            this.$Get(url, config, success, fail)
        }
    }
    
}
</script>

<style scoped>
.van-cell{
    background: #b6a37f;
    padding: 5px 2px;
    line-height: 28px;
}
.van-cell:not(:last-child)::after{
    content: none;
}
.main{
    height: 62vh;
    background-image: url('static/main2.png');
    background-size: 100%;
    border:3vw solid #131b2d;
    border-top:2vh solid #131b2d;
    border-bottom:2vh solid #131b2d
}
.van-nav-bar{
    background-color: #f64a42;
}
.van-button--large{
    line-height: 36px;
    height: 36px;
}
</style>
