<template>
	<div class="device">
		<el-form :inline="true" :model="formInline" class="check-form-inline">
			<el-form-item label="EdgeID">
				<el-input v-model="formInline.edgeid" 
						placeholder="EdgeID" 
						prefix-icon="el-icon-search" 
						auto-complete="off" />
			</el-form-item>
			<el-form-item label="TwinID">
				<el-input v-model="formInline.twinid" 
						placeholder="TwinID" 
						prefix-icon="el-icon-search" 
						auto-complete="off" />
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">获取</el-button>
			</el-form-item>
		</el-form>
		<div class="device-twin">
			<el-divider></el-divider>
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>Device</span>
				</div>
				<div class="twininfo">
					<el-form ref="devicetwin" :model="devicetwin" label-width="80px">
						<el-form-item label="ID">
							<el-input v-model="devicetwin.id"
								readonly 
								auto-complete="off" />
						</el-form-item>
						<el-form-item label="Name">
							<el-input v-model="devicetwin.name"
								readonly 
								auto-complete="off" />
						</el-form-item>
						<el-form-item label="Description">
							<el-input v-model="devicetwin.description"
								readonly 
								auto-complete="off" />
						</el-form-item>
						<el-form-item label="State">
							<el-input v-model="devicetwin.state"
								readonly 
								auto-complete="off" />
						</el-form-item>
					</el-form>
				</div>
				<div v-for="o in 4" :key="o" class="text item">
					{{'列表内容 ' + o }}
				</div>
			</el-card>
		</div>
	</div>	
</template>

<script>
export default {
  name: 'Device',
  data() {
    return {
		devicetwin: {
			id: '',	
			name: '',
			description: '',
			state: '', 	
		},
		formInline: {
          edgeid: '',
          twinid: '',	
        },
    };
  },
  methods: {
		onSubmit() {
			var request_url = this.server_URL+"edge/"+this.formInline.edge_id+"/twin/"+this.formInline.twin_id
			this.result_text = request_url
			
			this.$http.get(request_url)
			.then((response) => {
				this.result_text = response.text()+" Success:" + response.statusText
			},
			(response) => {
				this.result_text = response.text()+" failed:"+ response.statusText
				console.log(response)	
			})	
		},

		goTo(path) {
			this.$router.replace(path);
		},
  },
};
</script>

<style scoped>
.device {
  margin-top: 5px;
}
</style>
