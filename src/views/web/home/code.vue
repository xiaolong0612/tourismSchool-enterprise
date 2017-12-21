<template>
	<div>
		<el-tooltip class="item" effect="dark" placement="top">
			<div slot="content" class="t-center">扫码关注<br>微信公众号</div>
			<div class="code-wrap">
				<icon-svg icon-class="erweima"/>
				<img src="/static/code.jpg">
			</div>
		</el-tooltip>
	</div>
</template>

<style rel="stylesheet/scss" lang="scss">
	.code-wrap{
		position: fixed;
		right: 5%;
		bottom: 30%;
		width: 50px;
		height: 50px;
		line-height: 50px;
		background-color: #fff;
		border-radius: 5px;
		box-shadow: 0 0 3px 1px #d8d8d8;
		text-align: center;
		font-size: 24px;
		z-index: 10;
		img{
			position: absolute;
			right: 12px;
			top: 12px;
			height: 25px;
			margin-top: 0px;
			opacity: 0;
			transition: all .2s linear;
		}
		&:hover{
			img{
				right: 60px;
				top: 50%;
				height: 200px;
				margin-top: -100px;
				opacity: 1;
			}
		}
	}
</style>