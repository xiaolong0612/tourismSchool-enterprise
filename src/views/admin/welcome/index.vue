<template>
	<div class="welcome" style="min-height:calc(100vh - 84px)">
		<el-row>
			<el-col :span="24">
				<chart-line id="lineChart" :setChartOption="line" height="50vh" class="chart"></chart-line>
			</el-col>
		</el-row>
		<el-row :gutter="30" class="mt30">			
			<el-col :span="8">
				<chart-pie id="pie1" :setChartOption="pie_1" height="50vh" class="chart"></chart-pie>
			</el-col>
		  <el-col :span="8">
		  	<chart-pie id="pie2" :setChartOption="pie_1" height="50vh" class="chart"></chart-pie>
		  </el-col>
		  <el-col :span="8">
		  	<chart-pie id="pie3" :setChartOption="pie_1" height="50vh" class="chart"></chart-pie>
		  </el-col>
		</el-row>
	</div>
</template>

<script>
	import ChartLine from '@/components/Charts/line';
	import ChartPie from '@/components/Charts/pie';
	import { welcomeTop, welcomeCount } from '@/api/admin/index';
	export default {
    name: 'welcome',
    components: {
      ChartLine,
      ChartPie
    },
    data() {
    	return{
    		top_form: {
    			beginTime:'2017-10-01',
    			endTime: '2017-12-03'
    		},
    		line: {},
    		bar:{},
    		pie_1:{},
    		pie_2:{}
    	}
    },
    mounted(){
      this.welcomeTop();
      this.welcomeCount();
    },
    methods: {
    	welcomeTop(){
    		welcomeTop(this.top_form).then(res => {
    			this.setLineOption(res);
    		})
    	},
    	welcomeCount(){
    		welcomeCount().then(res => {
    			this.setPie1Option(res)
    		})
    	},
    	setLineOption(res){
	    	let legend = [];
	    	let series = [];
	    	for(var i in res.data){
	    		legend.push(i);
	    		series.push({
	    			name: i,
	    			type: 'line',
	    			data: res.data[i]
	    		})
	    	}
	    	this.line = {
	    		title: {
	        	text: '最近招聘展示',
	        	left: 'center'
					},
					tooltip: {
					  trigger: 'axis'
					},
					legend: {
						right: '30px',
						top: '6px',
					  data: legend
					},
					grid: {
					  left: '3%',
					  right: '4%',
					  bottom: '3%',
					  containLabel: true
					},
					toolbox: {
					  feature: {
					      saveAsImage: {}
					  }
					},
					xAxis: {
					  type: 'category',
					  boundaryGap: false,
					  data: res.date
					},
					yAxis: {
					  type: 'value'
					},
					series: series
	    	}
	    },
	    setPie1Option(res){

	    	let server = res.data;
	    	this.pie_1 = {
					title : {
					  text: '岗位热度',
					  x:'center'
					},
					tooltip : {
					  trigger: 'item',
					  formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend: {
					  x : 'center',
					  y : 'bottom',
					  data:res.title
					},
					toolbox: {
					  feature : {
					      saveAsImage : {show: true}
					  }
					},
					calculable : true,
					series : [
					  {
				      name:'',
				      type:'pie',
				      radius : [30, 110],
				      roseType : 'area',
				      data: server
					  }
					]
				};
				console.log(this.pie_1)
	    }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
	.welcome{
		padding: 30px;
    background-color: #f0f2f5;
		.el-col{
			.chart{
				background-color: #fff;
				padding: 15px 15px 15px 0;
			}
		}
	}
	
</style>