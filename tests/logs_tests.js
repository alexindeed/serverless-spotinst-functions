'use strict';

const expect = require('chai').expect;
const assert = require('chai').assert;
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

const path = require('path');
const os = require('os');

const BbPromise = require('bluebird');
const chalk = require('chalk');
const moment = require('moment');

require('chai').use(chaiAsPromised);
chai.use(require('chai-datetime'));

const SpotinstLogs = require('../logs/index.js');
//const Credentials = require('../credentials');

describe('SpotinstLogs', () => {
  let sandbox;
  let spotinstLogs;
  let serverless;
  let options;
  
  const CLI = function () { this.log = function () {};};
  serverless = {setProvider: () => {}, config: () => {}, pluginManager: { getPlugins: () => []}, classes: {Error, CLI}, service: {getFunction: () => ({}), provider: {}, resources: {}, getAllFunctions: () => []}, getProvider: sinon.spy()};
  options = {
    "stage": "dev",
    "region": "test_region",
    "function": "unitTesting"
  };
  
  spotinstLogs = new SpotinstLogs(serverless, options);
  
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    spotinstLogs.provider = {loadLocalParamsFile: () => {}, client: {FunctionsService: {key:"val"}},defaultParams:{}};
  });
  
  afterEach(() => {
    sandbox.restore();
  });
  
  describe('#constructor()', () => {
    it('should have hooks', () => {
      console.log("spotinstLogs.serverless:\n\n");
      expect(spotinstLogs.hooks).to.be.not.empty;
    });
  });
  
  describe('#init()', () => {
    it('should be a promise', () => {
      expect(spotinstLogs.init()).to.be.a("promise");
    });
  });
  
  describe('#logs()', () => {
    beforeEach(() => {
      spotinstLogs.serverless.service.functions = {
        unitTesting: {
          namespace: 'sample',
          handler: true
        }
      };
  
      spotinstLogs.serverless.service.service = 'new-service';
      spotinstLogs.serverless.service.provider = 'spotinst';
      
      spotinstLogs.options = {
        function: 'unitTesting'
      };
    });
    
    it('should give a stub local func', () => {
      console.log(spotinstLogs.serverless.service);
    });
    
//    it('should show the logs object', () => {
//      console.log(spotinstLogs.log());
//    });
  });
  
  
  describe('#buildFunctionParams()', () => {
    let bfpSpy = sinon.spy(spotinstLogs,"buildFunctionParams");
    let params = { name: 'testFunc', functionId: 'fn-12345' };

    afterEach(() => {
      bfpSpy.restore();
    });
  
    it('should be called with correct params', function() {
      spotinstLogs.buildFunctionParams("testFunc", "fn-12345");
      bfpSpy.calledWithMatch("testFunc", "fn-12345");
    });
  
    it('should return correct params', function() {
      assert.deepEqual(spotinstLogs.buildFunctionParams("testFunc", "fn-12345"),params);
    });
    
  });
  describe('#getStartTime()', () => {
    let gstSpy = sinon.spy(spotinstLogs, 'getStartTime');
    
    beforeEach(() => {
//      this.clock = sinon.useFakeTimers();
      spotinstLogs.options.startTime = "d6000";
    });
    
    afterEach(()=>{
//      this.clock.restore();
      gstSpy.restore();
    });
  
    it('should give you the right start time', function() {
      console.log(spotinstLogs.options.startTime)
    });
  
    it('should throw NaN error', function() {
      assert.throws(()=> {spotinstLogs.getStartTime('dim sum')},Error,`Incorrect Time Syntax`);
    });
  
    it('should return new Date', function() {
      let d1 = spotinstLogs.getStartTime('6000d');
      let d2 = Date.now();
      
    });
  });
});