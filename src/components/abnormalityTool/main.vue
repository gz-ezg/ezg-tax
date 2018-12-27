<template>
    <div style="padding-bottom:20px">
        <nav-bar title="企业异常检测" />
        <router-view></router-view>
    </div>
</template>

<script>
import {NavBar} from 'vant'
export default {
    components: {
        NavBar
    }
}
</script>

<style scoped>
.van-nav-bar{
    background-color: #CC3300;
    color: white;
}
</style>

