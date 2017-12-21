<template>
	<div class="welcome" style="min-height:calc(100vh - 84px)">
		<el-row>
			<el-col :span="24">
				<chart id="lineChart" :setChartOption="line" height="50vh" class="chart"></chart>
			</el-col>
		</el-row>
		<el-row :gutter="30" class="mt30">			
			<el-col :span="8">
				<chart id="pie1" :setChartOption="pie_1" height="50vh" class="chart"></chart>
			</el-col>
		  <el-col :span="8">
		  	<chart id="bar" :setChartOption="bar" height="50vh" class="chart"></chart>
		  </el-col>
		  <el-col :span="8">
		  	<chart id="pie2" :setChartOption="pie_2" height="50vh" class="chart"></chart>
		  </el-col>
		</el-row>
	</div>
</template>

<script>
	import Chart from '@/components/Charts/index';
  import { parseTime } from '@/utils/index';
	import { welcomeTop, welcomeCount,welcomeSchool,welcomeJob } from '@/api/admin/index';
	export default {
    name: 'welcome',
    components: {
      Chart
    },
    data() {
    	return{
    		top_form: {
    			beginTime:'2017-10-01',
    			endTime: parseTime(new Date(),'{y}-{m}-{d}')
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
      this.welcomeSchool();
      this.welcomeJob();
    },
    methods: {
    	welcomeTop(){
    		let d = new Date();
    		d.setMonth(d.getMonth() - 3);
				this.top_form.beginTime = parseTime(d, '{y}-{m}-{d}');
    		welcomeTop(this.top_form).then(res => {
    			this.line = this.setLineOption(res);
    		})
    	},
    	welcomeCount(){
    		welcomeCount().then(res => {
    			this.pie_1 = this.setPie1Option(res,'应聘处理情况');
    			console.log(this.pie_1, '岗位热度')
    		})
    	},
    	welcomeSchool(){
    		welcomeSchool().then(res => {
    			console.log(this.pie_2, '热门学校')
    			this.pie_2 = this.setPie1Option(res,'热门学校');
    		})
    	},
    	welcomeJob(){
    		welcomeJob().then(res => {
    			this.bar = this.setBarOption(res, '热门岗位');
    			// this.pie_2 = this.setPie1Option(res, '');
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
	    	let line = {
	    		title: {
	        	text: '用户应聘数据统计',
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
					  bottom: '80px',
					  containLabel: true
					},
					toolbox: {
					  feature: {
					      saveAsImage: {}
					  }
					},
					dataZoom: [
		        {
		            show: true,
		            realtime: true,
		            start: 90,
		            end: 100
		        },
		        {
		            type: 'inside',
		            realtime: true,
		            start: 90,
		            end: 100
		        }
			    ],
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
	    	return line
	    },
	    setPie1Option(res, title){

	    	let server = res.data;
	    	let pie = {
					title : {
					  text: title,
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
					calculable : true,
					series : [
					  {
				      name:'半径模式',
	            type:'pie',
				      radius : [30, 110],
	            roseType : 'radius',
				      data: server
					  }
					]
				};
				return pie;
	    },
	    setBarOption(res, title){
	    	console.log(res.count)
	    	let bar = {
	    		title : {
					  text: title,
					  x:'center'
					},
					tooltip : {
					  trigger: 'axis',
					  axisPointer : {            // 坐标轴指示器，坐标轴触发有效
					    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
					  }
					},
					grid: {
					  left: '3%',
					  right: '4%',
					  bottom: '3%',
					  containLabel: true
					},
					xAxis : [
					  {
				      type : 'category',
				      data : res.job,
				      axisTick: {
				          alignWithLabel: true
				      }
					  }
					],
					yAxis : [
					  {
					      type : 'value'
					  }
					],
					series : [
					  {
				      name:'',
				      type:'bar',
				      barMaxWidth: '80px',
				      data:res.count
					  }
					]
	    	};
	    	return bar;
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