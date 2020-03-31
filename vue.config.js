module.exports = {
	devServer:{
		host:"localhost",
		port:8080,
		//she zhi proxy
		proxy: {
			"/api":{
				target:"http://localhost:8081",
				ws: false,
				changOrigin: true,
				pathRewite: {
					'^/api': ''
				}
			}			
		}
	}
}
