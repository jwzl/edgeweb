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
		<el-dialog title="设备信息" :visible.sync="twinInfoDlgFormVisible"
			:append-to-body="true">
			<scroll-view scroll-y style="height: 400rpx;">   
				<json-viewer :value="twin_info_json_data"></json-viewer>
			</scroll-view>
		</el-dialog>
	</el-table>
</template>

<script>
export default {
  name: 'Device',
  data() {
    return {
		server_URL: "http://127.0.0.1:8080/rest/v1/",
		formLabelWidth: '120px',
		dialogFormVisible: false,
		twin_info_json_data: {},	
		twinInfoDlgFormVisible: false,
		tableData: [],
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
  mounted(){
	//1. send edge list
	var request_url = this.server_URL+"edge/list"
			
	this.$http.get(request_url)
	.then((response) => {
		console.log(response.data)
		var edgeds = response.data
		var key
			
		for ( key in edgeds ){
			var edgeID = edgeds[key].ID
			var req_url = this.server_URL+"dev/list?edgeid="+edgeID

			this.$http.get(req_url)
			.then((response) => {
				console.log(response.data)
				var twins = response.data
				var idx
				
				for ( idx in twins ){
					var twin = twins[idx]
					var state
					
					if(twin.state.trim() == 'online'){
						state = 1
					}else{
						state = 0 	
					}
					
					this.tableData.push({
						edgeid: edgeID,
						deviceid: twin.id,
						name: twin.name,
						description: twin.description,
						status:	state,
					})
				}	
				console.log(this.tableData);
			},
			(response) => {
				// loading failed..
				console.log(response)	
				return 	
			})
		}		
		return  
	},
	(response) => {
		// loading failed..
		console.log(response)	
		return 	
	})			
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
						//this.dialogFormVisible = false
						//return 
					}

					//2. bind the device.
					this.$options.methods.bind_twin(this, this.form.edgeid, 
						this.form.twinid, (data) =>{
							res = data
							if(res != true){
								console.log("bind failed");
								//this.dialogFormVisible = false
								//return 
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
			var edgeID = row.edgeid
			var twinID = row.deviceid
			//get the detailed twin info.
			this.$options.methods.get_twin(this, edgeID, twinID, (data) =>{
				this.twin_info_json_data = data
			})	
			this.twinInfoDlgFormVisible = true
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
