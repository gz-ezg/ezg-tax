<template>
    <div >
        <notice-bar
            text="本页面可以查询广东省内税务异常信息（深圳市除外）及注册地为广州的企业经营异常信息。"
            left-icon="//img.yzcdn.cn/vant/volume.png"
        />
        <div class="main2">
            <div style="padding-top:52vh">
                <div style="width:80%;margin:auto">
                    <field :value="companyname" @input="update_companyname" placeholder="输入公司名称查询异常信息" />
                    <field :value="name" @input="update_name" placeholder="请输入联系人名称" />
                    <Button type="danger" size="large" @click="showInput=true" style="margin-top:5px" :disabled="!companyname || !name">查询</Button>
                </div>
                <!-- <div style="margin:auto;width:90%;margin-top:10px">
                    <p>* <span style="font-size:14px">本页面可以查询广东省内税务异常信息（深圳市除外）及注册地为广州的企业经营异常信息。</span></p>
                </div> -->
            </div>
            <van-dialog
                v-model="showInput"
                :show-confirm-button="false"
                :close-on-click-overlay="true"
            >
                <div>
                    
                    <field :value="mobile" @input="update_mobile" label="手机号码" placeholder="请输入手机号码"/>
                    <field
                        v-model="yzm"
                        type="number"
                        label="短信验证码"
                        placeholder="请输入验证码"
                    >
                        <Button slot="button" size="small" type="primary" @click="require_code" v-if="!yzmDisable" >获取验证码</Button>
                        <Button slot="button" size="small" type="default" @click="require_code" v-if="yzmDisable" disabled >{{time}}秒后重新获取</Button>
                    </field>
                    <Button size="large" @click="submit" :disabled="disabled" :loading="loading" style="margin-top:5px">立刻查询</Button>
                </div>
            </van-dialog>
        </div>
    </div>
</template>

<script>
import { Button, Field, Toast, NavBar, NoticeBar } from 'vant';
import { mapState } from 'vuex'
import abnormalCommon from '../common.js'

export default {
    mixins: [ abnormalCommon ],
    components: {
        Button,
        Field,
        Toast,
        NoticeBar 
    },
    computed: {
        disabled(){
            if(this.companyname && this.mobile && this.yzm && this.name){
                return false
            }else{
                return true
            }
        },
        ...mapState({
            companyname: state => state.abnormality.companyname,
            mobile: state => state.abnormality.mobile,
            name: state => state.abnormality.name
        }),
    },
    data(){
        return {
            code: "",
            yzmDisable: false,
            yzm: "",
            loading: false,
            time: 60,
            showInput: false
        }
    },
    methods: {
        is_mobile_number(){
            let _self = this
            let reg = /^[1][0-9]{10}$/
            console.log(_self.mobile)
            if(!reg.test(_self.mobile)){
                Toast.fail("请输入正确的手机号！")
                return false
            }else{
                return true
            }
        },
        submit(){
            //  提交的部分，改为在vuex中处理
            let _self = this
            _self.loading = true
            Toast.loading({
                duration: 0,
                forbidClick: true,
                mask: true,
                message: '努力查询中...'
            });
            _self.showInput = false
            let url = `api/customer/company/searchuser/searchResult`
            let config = {
                mobile: _self.mobile,
                code: _self.yzm,
                enterprise: _self.companyname,
                name: _self.name
            }

            function success(res){
                // console.log(res.data.data)
                _self.loading = false
                _self.$store.dispatch('abnormality/update_detail', res.data.data)
                _self.$router.push({
                    name: "abnormalityDetail"
                })
            }

            function fail(err){
                console.error(err)
                _self.$toast.fail(err.data.msg)
                if(err.data.msg == "没有查询次数"){
                    _self.$router.push({
                        name: "abnormalityError",
                        params: {
                            status: 1
                        }
                    })
                }else{
                    Toast.fail("系统不小心走丢了...")
                }
            }

            this.$Post(url, config, success, fail)
        },
        require_code(){
            let _self = this
            if(this.is_mobile_number()){
                // console.log("手机号正确！")
                let url = `api/customer/company/searchuser/sendMsg`
                let config = {
                    mobile: _self.mobile
                }
                _self.yzmDisable = true                
                function success(res){
                    Toast.success(res.data.msg)
                    _self.isLogin = false
                    _self.yzmDisable = true
                    _self.time = 60
                    _self.change_time()
                }

                function fail(err){
                    Toast.fail(err.data.msg)
                }

                this.$Post(url, config, success, fail)
            }else{
                console.log("手机号错误！")
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
        change_button(){
            if(this.time <= 0){
                this.yzmDisable = false
            }else{
                this.yzmDisable = true
            }
        },
        update_companyname(e){
            this.$store.dispatch('abnormality/update_companyname', e)
        },
        update_mobile(e){
            this.$store.dispatch('abnormality/update_mobile', e)
        },
        update_name(e){
            this.$store.dispatch('abnormality/update_name', e)
        }
    },
    created(){
        // console.log(this.$store)
    },
    mounted(){
        this.$store.dispatch('abnormality/update_companyname', "")
        // this.$store.dispatch('abnormality/update_mobile', "")
        this.$store.dispatch('abnormality/update_name', "")
        this.$store.dispatch('abnormality/update_detail', "")
    }
}
</script>

<style>
.main2{
    background: url("./error2.png") no-repeat;
    width:100%; height: 90%;
    background-size:100%;
    overflow-y: scroll;
    position: absolute;
    top:85px;
    bottom: 0px;
    left: 0px;
}
</style>

