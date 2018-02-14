const chai = require('chai');
const LogsObject = require('../logs/index.js');
const SpotinstObj = require('./utils/SpotinstServerlessObject');
const Serverless = require('serverless');

const assert = chai.assert;
const expect = chai.expect;
const assume = chai.should;

let serverless = new Serverless();
let logsObject = new LogsObject(serverless, {});

// describe a test group
describe("logs/index.js tests", () => {
  // describe a specific test
  it('logs()', (done) => {
    console.log(logsObject.logs());
    assert.isNotNull(logsObject.logs(), 'logs is not null');
    
    done();
  });
});
