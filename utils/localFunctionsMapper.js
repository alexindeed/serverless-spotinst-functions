"use strict";

const config = require("../config");
const path = require("path");

class LocalFunctionsMapper {
	constructor(){}

	getLocalFunctions(){
		console.log("sp: " + this.serverless.config.servicePath);
		console.log("lpf: " + config.localPrivateFolder);
		console.log("fpf: " + config.functionPrivateFile);
		
		const localFilesPath = path.join(this.serverless.config.servicePath,
			config.localPrivateFolder,
			config.functionPrivateFile);
		
		console.log("localFilesPth: " + localFilesPath);
		console.log(process.cwd());
		
		console.log(this.serverless.utils.fileExistsSync("~/Users/alex/Documents/Programming/serverless-spotinst-functions/tests/fixtures/test_function/.serverless/serverless-functions-map.json"))

		if (true) {
			console.log(this.serverless.utils.readFileSync(localFilesPath));
			return this.serverless.utils.readFileSync(localFilesPath);

		} else {
			return {};
		}
	}

	updateLocalFunctions(funcs){
		const localFilesPath = path.join(this.serverless.config.servicePath,
			config.localPrivateFolder,
			config.functionPrivateFile);

		return this.serverless.utils.writeFileSync(localFilesPath, funcs);
	}
}

module.exports = LocalFunctionsMapper;