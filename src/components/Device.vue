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
		</div>
	</div>	
</template>

<script>
export default {
  name: 'Device',
  data() {
    return {
		formInline: {
          edgeid: '',
          twinid: ''
        }
    };
  },
  methods: {
		onSubmit() {

		},
  }
};
</script>

<style scoped>
.device {
  margin-top: 5px;
}

.device-twin {
	border-style: solid;
	border-color:#00;
	border-width:thin;
}
</style>
