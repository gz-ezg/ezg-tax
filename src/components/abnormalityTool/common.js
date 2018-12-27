import { mapState } from 'vuex'
import { Toast } from 'vant'
export default {
    data() {
        return {
            addr: "暂无",
            localLoading: true,
            returnNumber : 0
        }
    },
    computed: {
        ...mapState({
            mobile: state => state.abnormality.mobile
        }),
    },
    methods: {
        //  微信授信初始化
        wx_init(){
            let _self = this
            let url = "api/system/wechat/service/js_api_ticket"
            
            let config = {
            params:{
                url: location.href.split('#')[0]
            }
        }
        
            return new Promise((resolve, reject)=>{
                function success(res){
                    wx.config({
                        beta: true,// 必须这么写，否则wx.invoke调用形式的jsapi会有问题
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: 'wx1daf95d4275b0be1', // 必填，企业微信的corpID
                        timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
                        nonceStr: res.data.data.noncestr, // 必填，生成签名的随机串
                        signature: res.data.data.sign,// 必填，签名，见附录1
                        jsApiList: ["updateAppMessageShareData","onMenuShareAppMessage","scanQRCode"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    })
                    wx.error(function(res){
                        console.log(res)
                        Toast.fail(res.errMsg)
                        _self.returnNumber++;
                        if(_self.returnNumber < 5){
                            _self.wx_init()
                        }else{
                            Toast.fail("js-sdk异常，已超过最大重试次数 ！")
                        }
                    });
                    resolve()
                }
                this.$Get(url,config, success)
            })
        },
        //  获取当前地址
        wx_share(){
            let _self = this
            wx.ready(function(){
                wx.onMenuShareAppMessage({
                    title: '企业异常，一查便知', // 分享标题
                    desc: '您是否还在为你的企业是否被工商税务部门列为异常而感到烦恼？你是否还不清楚怎么查询自己的企业是否异常？e账柜异常检测，为您解忧！(数据仅供参考，详询400-88-12580)', // 分享描述
                    link: 'http://tools.zgcfo.com/#/abnormality/login', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: 'http://tools.zgcfo.com/logo.png', // 分享图标
                    type: '', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function (res) {
                        console.log(_self.mobile)
                        if(_self.mobile){
                            _self.share_reback_do()
                        }
                    }
                });
            });
        },
        share_reback_do(){
            let _self = this
            let url = `api/customer/company/searchuser/shareRebackDo`

            let config = {
                mobile: _self.mobile
            }

            function success(res){
                if(_self.$route.name === "abnormalityError"){
                    _self.$router.go(-1)
                }
            }

            function fail(err){

            }

            this.$Post(url, config, success, fail)
        }
    },
    created() {
        this.wx_init().then(()=>{
            this.wx_share()
        })
    },
}
    