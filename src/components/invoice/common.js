import { Toast } from 'vant'

export default {
    name: "wx_local",
    data() {
        return {
            addr: "暂无",
            localLoading: true,
            returnNumber : 0
        }
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
                        jsApiList: ["updateAppMessageShareData","onMenuShareAppMessage","updateTimelineShareData","scanQRCode"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
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
            wx.ready(function(){
                //  新版，调试暂时无法启用，暂未开启
                // wx.updateAppMessageShareData({
                //     title: '快来体验下', // 分享标题
                //     desc: '一查便知', // 分享描述
                //     link: 'http://tools.zgcfo.com/#/abnormality/login', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                //     imgUrl: '', // 分享图标
                //     success: function () {
                //         console.log("123")
                //     }
                // });
                //  旧版，准备废弃
                wx.onMenuShareAppMessage({
                    title: '发票校验', // 分享标题
                    desc: '发票真伪，一扫便知！', // 分享描述
                    link: 'http://tools.zgcfo.com/#/invoice', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: 'http://tools.zgcfo.com/logo.png', // 分享图标
                    type: '', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function (res) {
                        // 用户点击了分享后执行的回调函数
                        // console.log(res)
                    }
                });
                wx.updateTimelineShareData({ 
                    title: '发票校验', // 分享标题
                    link: 'http://tools.zgcfo.com/#/invoice', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: 'http://tools.zgcfo.com/images/logo.png', // 分享图标
                    success: function () {
                        // 设置成功
                }})
            });
        }
    },
    created() {
        this.wx_init().then(()=>{
            this.wx_share()
        })
    },
}
    