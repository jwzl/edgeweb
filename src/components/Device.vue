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
					@click="dialogFormVisible = true">New</el-button>
			</template>
			<template slot-scope="scope">
				<el-button
					size="mini"
					type="danger"
					@click="handleDelete(scope.$index, scope.row)">Delete</el-button>
			</template>
		</el-table-column>
		<el-dialog title="添加设备" :visible.sync="dialogFormVisible"
			:append-to-body="true">
			<el-form :model="form">
				<el-form-item label="EdgeID" :label-width="formLabelWidth">
					<el-input v-model="form.edgeid" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="TwinID" :label-width="formLabelWidth">
					<el-input v-model="form.twinid" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>

			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="handleNew()">确 定</el-button>
			</div>
		</el-dialog>
	</el-table>
</template>

<script>
export default {
  name: 'Device',
  data() {
    return {
		server_URL: "http://172.21.73.101:8080/rest/v1/",
		formLabelWidth: '120px',
		dialogFormVisible: false,
		tableData: [{
			edgeid: '2016-05-03',
			deviceid: 'Tom',
			name: 'Tom',
			description: 'Tom',
			status: 1,
		}],
		form: {
			edgeid: '',
			twinid: '',	
		},
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
		bind_edge(that, edgeid, callback) {
			var request_url = that.server_URL+"edge/bind?edgeid="+edgeid

			that.$http.post(request_url, {username:"gaogaogao",password:"123456"}, {emulateJSON: true})
			.then((response) => {
				console.log(response)
				callback(true)
			},
			(response) => {
				console.log(response)
				callback(false)
			})
			
		},
		bind_twin(that, edgeid, twinid, callback) {
			var request_url = that.server_URL+"dev/twin?edgeid="+edgeid+"&twinid="+twinid

			that.$http.put(request_url)
			.then((response) => {
				console.log(response)
				callback(true)
				return 
			},
			(response) => {
				console.log(response)
				callback(false)
				return false
			})
		},
		get_twin(that, edgeid, twinid, callback) {
			var request_url = that.server_URL+"dev/twin?edgeid="+edgeid+"&twinid="+twinid
			
			that.$http.get(request_url)
			.then((response) => {
				console.log(response.data)
				callback(response.data)
				return  
			},
			(response) => {
				console.log(response)
				callback('')	
				return 	
			})	
		},
		goTo(path) {
			this.$router.replace(path);
		},
		// New a device.
		handleNew() {
			var res 
			
			// bind the edge.
			this.$options.methods.bind_edge(this, this.form.edgeid, 
				(data) =>{
					console.log(data)
					res = data
					if(res != true){
						console.log("bind failed");
						this.dialogFormVisible = false
						return 
					}

					//2. bind the device.
					this.$options.methods.bind_twin(this, this.form.edgeid, 
						this.form.twinid, (data) =>{
							res = data
							if(res != true){
								console.log("bind failed");
								this.dialogFormVisible = false
								return 
							}

							//3. get the device.
							setTimeout(() =>{
								this.$options.methods.get_twin(this, this.form.edgeid, 
									this.form.twinid, (data) =>{
										console.log(data)
										//4. Insert the table.
										var state
										if(data.state.trim() == 'online'){
											state = 1
										}else{
											state = 0 	
										}						
										this.tableData.push({
											edgeid: this.form.edgeid,
											deviceid: this.form.twinid,
											name: data.name,
											description: data.description,
											status:	state,
										})
										console.log(this.tableData);
									})
							}, 2000)									
						})
					//console.log(index, row);
					this.dialogFormVisible = false
				})
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
