<template>
	<div class="twin">
		<el-form :inline="true" :model="formInline" class="bind-form-inline">
			<el-form-item label="EdgeID">
				<el-input v-model="formInline.bind_edge_id" 
						placeholder="EdgeID" 
						prefix-icon="el-icon-search" 
						auto-complete="off" />{{formInline.bind_edge_id}}
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="bind_edge">Edge Bind</el-button>
			</el-form-item>

			<el-input type="textarea" 
				:rows="2" 
				placeholder="RETURN:" 
				v-model="bind_result">
			</el-input>
		</el-form>
		<el-form :inline="true" :model="formInline" class="create-form-inline">
			<el-form-item label="EdgeID">
				<el-input v-model="formInline.create_edge_id" 
						placeholder="EdgeID" 
						prefix-icon="el-icon-search" 
						auto-complete="off" />{{formInline.create_edge_id}}
			</el-form-item>
			<el-form-item label="TwinID">
				<el-input v-model="formInline.create_twin_id" 
						placeholder="TwinID" 
						prefix-icon="el-icon-search" 
						auto-complete="off" />{{formInline.create_twin_id}}
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="bind_edge">Edge Bind</el-button>
			</el-form-item>

			<el-input type="textarea" 
				:rows="2" 
				placeholder="RETURN:" 
				v-model="bind_result">
			</el-input>
		</el-form>
	
	

		<li>
			EdgeID: 
			<input type="text" v-model="create_edge_id"    />{{create_edge_id}}
			<br />
			TwinID:
			<input type="text" v-model="create_twin_id"    />{{create_twin_id}}
			<button type="button" v-on:click="bind_twin">设备绑定</button>
			<br />
			<textarea rows="3" cols="54" readonly="readonly" v-model="create_result">
				RETURN:
			</textarea>
		</li>
		<li>
			EdgeID:
			<input type="text" v-model="get_edge_id"  />{{get_edge_id}}
			<br />
			TwinID:
			<input type="text" v-model="get_twin_id" />{{get_twin_id}}
			<button type="button" v-on:click="get_twin">获取设备状态</button>
			<br />
			<textarea rows="3" cols="57" readonly="readonly" v-model="get_result">
				RETURN:
			</textarea>
		</li>
		<li>
			EdgeID: 
			<input type="text" v-model="del_edge_id"  />{{del_edge_id}}
			<br />
			TwinID:
			<input type="text" v-model="del_twin_id" />{{del_twin_id}}
			<button type="button" v-on:click="del_twin">删除设备</button>
			<br />
			<textarea rows="3" cols="53" readonly="readonly" v-model="del_result">
				RETURN:
			</textarea>
		</li>
	</div>
</template>

<script>
export default {
	name: 'Twin',
	data() {
		return {
			server_URL: "http://127.0.0.1/",
			
			
			get_twin_id: '',
			get_edge_id: '',
			del_edge_id: '',
			del_twin_id: '',
			bind_result: '',
			create_result: '',
			get_result:'',
			del_result:'',
			formInline: {
				bind_edge_id:'',
				create_edge_id: '',
				create_twin_id: '',
			},
		};
	},
	mounted() {
  
	},
	methods: {
		bind_edge: function() {
			var request_url = this.server_URL+"edge/"+this.bind_edge_id+"/bind"
			this.bind_result = request_url

			this.$http.post(request_url)
			.then((response) => {
				this.bind_result = response.text()+" Success:" + response.statusText
			},
			(response) => {
				this.bind_result = response.text()+" failed:"+ response.statusText
			})
			
		},
		bind_twin: function() {
			var request_url = this.server_URL+"edge/"+this.create_edge_id+"/twin/"+this.create_twin_id
			this.create_result = request_url

			this.$http.post(request_url)
			.then((response) => {
				this.create_result = response.text()+" Success:" + response.statusText
			},
			(response) => {
				this.create_result = response.text()+" failed:"+ response.statusText
			})
		},
		get_twin: function() {
			var request_url = this.server_URL+"edge/"+this.create_edge_id+"/twin/"+this.create_twin_id
			this.get_result = request_url
			//var request_url = "http://www.baidu.com"
			this.$http.get(request_url)
			.then((response) => {
				this.get_result = response.text()+" Success:" + response.statusText
			},
			(response) => {
				this.get_result = response.text()+" failed:"+ response.statusText
				console.log(response)	
			})	
		},
		del_twin: function() {
			var request_url = this.server_URL+"edge/"+this.create_edge_id+"/twin/"+this.create_twin_id
			this.del_result = request_url

			this.$http.delete(request_url)
			.then((response) => {
				this.del_result = response.text()+" Success:" + response.statusText
			},
			(response) => {
				this.del_result = response.text()+" failed:"+ response.statusText
			})
		},
	}	
};
</script>

<style scoped>

</style>
