const assert = require('chai').assert;
const should = require('chai').should();
const expect = require('chai').expect;
const sinon = require('sinon')

const LogsObject = require('../logs/index');
const Serverless = require('serverless');
const path = __dirname + "/fixtures/test_function";

const options = {
  "stage": "dev",
  "region": "test_region" };


describe('SpotinstLogs', () => {
  // create a sandbox
  let sandbox;
  
  // mock the framework/plugin?
  const CLI = function() {this.log = function() {};};
  const serverless = {
    pluginManager: { getPlugins: () => []},
    classes: {Error, CLI},
    service: {getFunction: () => {}, provider: {}, resources: {}, getAllFunctions: () => []},
    getProvider: sinon.spy()};
  const options = {
    stage: 'production',
    region: 'my-test_function-region',
  };
  
  // init logs object (or whtever you're testing)
  const spotinstLogs = new LogsObject(serverless,options);
  
  // do I need to init the any object vars or funcs?
  spotinstLogs.provider = {loadLocalParamsFile: () => {}, client: {FunctionsService: {key:"val"}}};
  
  // describe function-level tsts
  describe('#constructor()', () => {
    // serverless and options are set above
    it('should have hooks', function() {
      expect(spotinstLogs.hooks).to.be.not.empty;
    });
  
  });
  describe('#init()', () => {
    sandbox = sinon.sandbox.create();
    // loadLocalParams is external, so stub it
    spotinstLogs.provider.loadLocalParamsFile = sandbox.stub(spotinstLogs.provider,"loadLocalParamsFile");
    
    it('should return promise', function() {
      expect(spotinstLogs.init()).to.be.a("promise");
    });
  
    it('should have client', function() {
      expect(spotinstLogs._client).to.be.not.empty;
    });
  });

  
  //  describe('#logs()', => {});
  //  describe('#buildFunctionParams()', => {});
  //  describe('#getStartTime()', => {});
  
});


