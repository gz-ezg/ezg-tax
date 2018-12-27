<template>
    <div style="height:950px;">
        <panel title="计算结果" id="panel-title">
            <field label="应付工资" input-align="right" readonly :value="(result.taxbefore - result.insurance).toFixed(2)"></field>
            <field label="应缴个税" input-align="right" readonly :value="(result.taxTotal).toFixed(2)"></field>
            <field label="税后工资" input-align="right" readonly :value="(result.taxAfter - result.insurance).toFixed(2)"></field>
            <canvas id="mountNode" ></canvas>
            <Row style="width:90%;margin:auto;margin-top:20px">
                <Button size="large" type="primary" @click="re_start" >重新计算</Button>
            </Row>
        </panel>
        
        <panel id="panel-content">
            <cell title="工资个人所得税计算公式"></cell>
            <div style="padding:5px 20px;font-size:12px">应纳税所得额=（月收入-五险一金-起征点-依法确定的其他扣除-专项附加扣除）x 适用税率 - 速算扣除数</div>
            <cell title="个人所得税税率表"></cell>
            <div style="padding:5px 20px;">
                <table class="table table-striped table-bordered" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;font-size:8px">
                    <thead>
                    <tr>
                        <th>级数</th>
                        <th>应纳税所得额(含税)</th>
                        <th>税率(%)</th>
                        <th>速算扣除数</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>未超过3,000元的部分</td>
                        <td>3</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>超过3,000元至12,000元的部分</td>
                        <td>10</td>
                        <td>210</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>超过12,000元至25,000元的部分</td>
                        <td>20</td>
                        <td>1410</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>超过25,000元至35,000元的部分</td>
                        <td>25</td>
                        <td>2660</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>超过35,000元至55,000元的部分</td>
                        <td>30</td>
                        <td>4410</td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>超过55,000元至80,000元的部分</td>
                        <td>35</td>
                        <td>7160</td>
                    </tr>
                    <tr>
                        <td>7</td>
                        <td>超过80,000元的部分</td>
                        <td>45</td>
                        <td>15160</td>
                    </tr>
                    </tbody>
                </table>
                <Row style="margin-left:20px">
                    <Col span="24"><span style="color:#ccc;font-size:12px;">*说明：计算结果仅供参考；由 e账柜 提供；</span></Col>
                </Row>
                <Row>
                    <center style="margin-top:-10px">
                        <img src="./max_logo.png" width="50" id="img">
                    </center>
                </Row>
            </div>
        </panel>
        
    </div>  
</template>

<script>
import { Panel, Field, Cell, CellGroup, Icon, Dialog, RadioGroup, Radio, Col, Row, Button } from 'vant';


import F2 from '@antv/f2/lib/core'// 必须引入
import '@antv/f2/lib/geom/interval'// 引入 interval 几何标记
import '@antv/f2/lib/coord/polar' // 引入 极坐标
import '@antv/f2/lib/geom/adjust/stack' // 引入数据层叠调整类型
// import F2 from '@antv/f2'
import Tooltip from '@antv/f2/lib/plugin/tooltip'
import Legend from '@antv/f2/lib/plugin/legend'
F2.Chart.plugins.register(Legend);
F2.Chart.plugins.register(Tooltip);
F2.track(false)
export default {
    props: {
        result: {
            Type: [String, Array]
        }
    },
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
        Button
    },
    data(){
        return {
            map: {
                '税后工资：': '',
                '五险一金和个税：': '',
            },
            data: [
                {
                    name: '税后工资',
                    percent: (this.result.taxAfter / this.result.taxbefore),
                    a: "100000"
                }, 
                {
                    name: '五险一金和个税',
                    percent: (this.result.taxTotal / this.result.taxbefore),
                    a: "100000"
                },
            ]
        }
    },
    methods:{
        init(){
            let _self = this
            //  创建图标实例
            var chart = new F2.Chart({
                id: 'mountNode',
                pixelRatio: window.devicePixelRatio
            });
            // chart.plugins.register(Tooltip);
            // chart.plugins.register(Legend);
            //  挂载数据
            chart.source(_self.data);
            //  内容项标签
            chart.legend({
                position: 'right',
                // itemFormatter: function itemFormatter(val) {
                //     return val + '  ' + _self.map[val];
                // }
            });
            //  信息提示
            // chart.tooltip(false);
            //  绘制饼图
            chart.coord('polar', {
                transposed: true,
                radius: 1
            });
            chart.axis(false);
            chart.interval().position('a*percent').color('name', ['#0057a6', '#cccccc']).adjust('stack').style({
                lineWidth: 2,
                stroke: '#fff',
                lineJoin: 'round',
                lineCap: 'round'
            }).animate({
                appear: {
                    duration: 1200,
                    easing: 'bounceOut'
                }
            });
            chart.render();
        },
        re_start(){
            this.$emit("cancel",true)
        }
    },
    mounted(){
        this.init()
    }
}
</script>

<style scoped>
#panel-title{
    height: 430px;
    top: 15px;
    margin:15px;
    margin-top: 0px;
    /* border: 2px solid #cccccc; */
    border-radius: 10px;
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
    margin-bottom: 0;
    margin-top: 0;
    border-radius: 0;
    border-top: 0;
    border-left: 0;
    border-right:0;
    box-shadow: none;
}
#panel-content{
    height: 480px;
}
#img{
    width: 50px;
    height: 50px;
    border-radius: 50px;
}
</style>

