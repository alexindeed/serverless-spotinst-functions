const chai = require('chai');
const Serverless = require('serverless');
const testUtils = require('../index');

//let pathToLogs = __dirname + '/../logs/index.js';
const LogsObject = require('../logs/index');

const assert = chai.assert;
const expect = chai.expect;
const assume = chai.should;

//const options = {
//  "stage": "dev",
//  "region": "test_region" };

//describe("logs/index.js tests", () => {
//  it('logs() test_function', () => {
//
//    logsObject.logs();
////    assert.equal(1,2,"its equal");
//
//
////    let logs = "logs";
////    assert.exists(logsObject.logs(), 'logs is not null');
////    assert.isNotNull(logs, 'logs is not null');
//
//  });
//});

describe('SpotinstPlugin', () => {
  it('example test', () => {
    const SpotinstPlugin = testUtils.SpotinstPlugin;
    const path = __dirname + "/fixtures/test_function";
    console.log("path: " + path);
    const sPath = `"servicePath":"${path}"`;
    const serverless = new Serverless({"servicePath":"/Users/alex/Documents/Programming/serverless-spotinst-functions/tests/fixtures/test_function"});
    const options = {
      stage: 'production',
      region: 'my-test_function-region',
    };
    
  
    let logsObject = new LogsObject(serverless, options);
    assert.exists(logsObject.logs());
  });
});