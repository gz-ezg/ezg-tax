<template>
  <!-- <div id="app" @touchstart="start" @touchend="end"> -->
  <div id="app" style="height:100%">
    <router-view style="padding-bottom:80px"></router-view>
    <!-- <van-tabbar v-model="currentTab" v-if="tabShow">
      <van-tabbar-item to="/invoice">
        发票较验
        <i class="iconfont icon-fapiao-" slot="icon" slot-scope="props"></i>
      </van-tabbar-item>
      <van-tabbar-item to="/namechecktool">
        <i class="iconfont icon-gongsiheming" slot="icon" slot-scope="props"></i>
        核名工具
        </van-tabbar-item>
      <van-tabbar-item to="/taxaccount">
        <i class="iconfont icon-geshuishenbao" slot="icon" slot-scope="props"></i>
        个税管家
      </van-tabbar-item>
      <van-tabbar-item to="/project/10255">
        <i class="iconfont icon-yichang" slot="icon" slot-scope="props"></i>
        方案工具
      </van-tabbar-item>
    </van-tabbar> -->
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant';
// import VConsole from 'vconsole/dist/vconsole.min.js'

export default {
  name: 'app',
  components: {
    vanTabbar: Tabbar,
    vanTabbarItem: TabbarItem,
  },
  data(){
    return {
      currentTab: 0,
      tabShow: true
    }
  },
  watch: {
    "$route"(to){
      if(to.meta.index === 9999){
        this.tabShow = false
      }else{
        this.tabShow = true
        this.currentTab = to.meta.index
      }
    }
  },
  methods: {
    start(){
      let _self = this
      // clearInterval(this.Loop)
      // this.Loop = setTimeout(function(){
      //   new VConsole()
      // },30000)

      //  弹出一个窗口，输入校验码！正确弹出控制台，错误关闭！
    },
    end(){
      // clearInterval(this.Loop)
    } 
  },
  created(){
    // let con = new VConsole()
  }
}
</script>

<style>
  @import "./css/iconfont.css";
  .van-tabbar-item--active{
    color: #eeeeee;
  }
  .van-button--primary{
    background-color: 	#0057a6;
    /* border: 1px solid 	rgba(238,64,0,0.6); */
    border: none;
  }
</style>
