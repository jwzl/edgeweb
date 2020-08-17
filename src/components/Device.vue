<template>
	<el-table
		:data="tableData.filter(data => !search || data.edgeid.toLowerCase().includes(search.toLowerCase()))"
		style="width: 100%">
		<el-table-column
			label="EdgeID"
			width="180">
				<template slot-scope="scope">
					<el-button 
						type="primary" icon="el-icon-mobile-phone"
						@click="handleView(scope.$index, scope.row)"
						circle></el-button>
					<span style="margin-left: 10px">{{ scope.row.edgeid }}</span>
				</template>	
		</el-table-column>
		<el-table-column
                        label="DeviceID"
                        prop="deviceid">
                </el-table-column>
		<el-table-column
                        label="Name"
                        prop="name">
                </el-table-column>
		<el-table-column
                        label="Status"
                        prop="status">
			<template slot-scope="scope">
				<i class="el-icon-success" :style="{'color': (scope.row.status==1? '#67c23A':'#606266')}" ></i>
			</template>
                </el-table-column>
		<el-table-column
			prop="description"
                        align="right">
			<template slot="header">
				<el-input v-model="search"
					size="mini"
					placeholder="Type to search"/>	
			</template>
                </el-table-column>
		<el-table-column  align="right">
			<template slot="header">
				<el-button size="mini" type="primary"
					@click="handleNew()">New</el-button>
			</template>
			<template slot-scope="scope">
				<el-button
					size="mini"
					type="danger"
					@click="handleDelete(scope.$index, scope.row)">Delete</el-button>
			</template>
		</el-table-column>	
	</el-table>
</template>

<script>
export default {
  name: 'Device',
  data() {
    return {
	tableData: [{
		edgeid: '2016-05-03',
		deviceid: 'Tom',
		name: 'Tom',
		description: 'Tom',
		status: 1,
	}],
		devicetwin: {
			id: '',	
			name: '',
			description: '',
			state: '', 	
			metadata: [
				{name: 'pattr', value: '123'},
				{name: 'ayro', value: '233'}
			],
			Properties: [

			],
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
		handleNew() {
                        //console.log(index, row);

                },
		handleView(index, row) {
			console.log(index, row);

		},
		handleDelete(index, row) {
			console.log(index, row);

		}

  },
};
</script>

<style scoped>
.device {
  margin-top: 5px;
}
</style>
