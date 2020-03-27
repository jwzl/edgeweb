<template>
	<div  id="app"  class="home" >
		<el-header class="header">
			<div :class="logo">
				<img src="@/assets/logo.png" alt="logo"/>
				<span style="font-size: 30px;position: relative;top: -15px;"> EdgeOn Device Managment</span>
			</div>
		</el-header>

		<el-container>
			<el-aside width="200px">
				<el-menu
				default-active="$route.path"
				background-color="#445c64"
				class="el-menu-vertical-demo"
				:collapse="isCollapse"
				@open="handleOpen"
				@close="handleClose"
				>
						<el-menu-item index="/twin" @click="goTo('/twin')">
							<i class="el-icon-menu"></i>
							<span slot="title">设备管理</span>
						</el-menu-item>
						<el-menu-item index="/device" @click="goTo('/device')">
							<i class="el-icon-setting"></i>
							<span slot="title">设备控制</span>
						</el-menu-item>
						<el-menu-item index="/device" @click="goTo('/device')">
							<i class="el-icon-setting"></i>
							<span slot="title">集群管理</span>
						</el-menu-item>
						<el-menu-item index="/device" @click="goTo('/device')">
							<i class="el-icon-setting"></i>
							<span slot="title">其他</span>
						</el-menu-item>
					</el-menu>	
			</el-aside>
			<el-main>
				<div class="contentMain" >
				<router-view></router-view>
				</div>
			</el-main>
		</el-container>	
	</div>
</template>

<script>

export default {
	name: 'App',
	data() {
		return {
			logoSVG: require('./assets/logo.svg')
		}
	},
	methods: {
		handleOpen(key, keyPath) {
			console.log(key, keyPath);
		},
		handleClose(key, keyPath) {
			console.log(key, keyPath);
		},
		goTo(path) {
			this.$router.replace(path);
		}
	}
};
</script>

<style scoped>

.home {
    height:100%;
    width:100%;
    padding:0;
    margin:0;
}

.el-aside {
	display: block;
	position: relative;
	overflow-y: scroll;
	background-color: #515c60 !important;
}	

.el-header {
    width:100%;
    height:100px;
    padding:0;
    margin:0;
    background-color: #061f3e;
    color: #fff;
    text-align:left;
}

.logo{
  width:200px;
  transition:width 0.5s linear;
  img{
    height:50px;
    vertical-align: middle;
  }
  span{
    vertical-align: middle;
  }
}
.min-logo{
  width:60px;
  transition:width 0.3s;
}



/deep/.el-container{
    height:100%;
    width:100%;
}
.el-main{
    overflow:hidden;
}

/deep/ .el-menu{
    height:100%;
    color:#fff;
}

/deep/ .el-menu-item{
  color:#fff;	
  padding:0;
}
/deep/ .el-menu-item.is-active{
  color:#409EFF
}
/deep/ .el-menu--collapse{
  width:54px;
}

/deep/ .contentMain {
	height:100%;
	padding:10px;
	margin-top:5px;
}
</style>
