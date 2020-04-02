<template>
	<div class="twin">
		<el-form :inline="true" :model="formInline" class="form-inline">
			<el-form-item label="EdgeID">
				<el-input v-model="formInline.edge_id" 
						placeholder="EdgeID" 
						prefix-icon="el-icon-search" 
						auto-complete="off" />{{formInline.edge_id}}
			</el-form-item>
			<el-form-item label="TwinID">
				<el-input v-model="formInline.twin_id" 
						placeholder="TwinID" 
						prefix-icon="el-icon-search" 
						auto-complete="off" />{{formInline.twin_id}}
			</el-form-item>
		</el-form>
		<el-form :inline="true" :model="formInline" class="button-form-inline">
			<el-form-item>
				<el-button type="primary" @click="bind_edge">Edge Bind</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="bind_twin">设备绑定</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="get_twin">获取设备状态</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="del_twin">删除设备</el-button>
			</el-form-item>
		</el-form>
		<div class="result">
			<el-divider></el-divider>
			<el-input type="textarea" 
				:rows="5" 
				readonly
				placeholder="RETURN:" 
				v-model="result_text">
			</el-input>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Twin',
	data() {
		return {
			server_URL: "http://172.21.73.90:8080/rest/v1/",
			result_text:'',
			formInline: {
				edge_id: '',
				twin_id: '',
			},
		};
	},
	methods: {
		bind_edge: function() {
			var request_url = this.server_URL+"edge/bind?edgeid="+this.formInline.edge_id
			this.result_text = request_url

			this.$http.post(request_url, {username:"gaogaogao",password:"123456"}, {emulateJSON: true})
			.then((response) => {
				this.result_text = response.text()+" Success:" + response.statusText
			},
			(response) => {
				console.dir(response)
				this.result_text = response.text()+" failed:"+ response.statusText
			})
			
		},
		bind_twin: function() {
			var request_url = this.server_URL+"dev/twin?edgeid="+this.formInline.edge_id+"&twinid="+this.formInline.twin_id
			this.result_text = request_url

			this.$http.post(request_url)
			.then((response) => {
				this.result_text = response.text()+" Success:" + response.statusText
			},
			(response) => {
				this.result_text = response.text()+" failed:"+ response.statusText
			})
		},
		get_twin: function() {
			var request_url = this.server_URL+"edge/"+this.formInline.edge_id+"/twin/"+this.formInline.twin_id
			this.result_text = request_url
			//var request_url = "http://www.baidu.com"
			this.$http.get(request_url)
			.then((response) => {
				this.result_text = response.text()+" Success:" + response.statusText
			},
			(response) => {
				this.result_text = response.text()+" failed:"+ response.statusText
				console.log(response)	
			})	
		},
		del_twin: function() {
			var request_url = this.server_URL+"edge/"+this.formInline.edge_id+"/twin/"+this.formInline.twin_id
			this.result_text = request_url

			this.$http.delete(request_url)
			.then((response) => {
				this.result_text = response.text()+" Success:" + response.statusText
			},
			(response) => {
				this.result_text = response.text()+" failed:"+ response.statusText
			})
		},
	},	
};
</script>

<style scoped>
</style>
