'use strict';

const expect = require('chai').expect;
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

const path = require('path');
const os = require('os');

const BbPromise = require('bluebird');
const chalk = require('chalk');
const moment = require('moment');

require('chai').use(chaiAsPromised);

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
  
  //    spotinstLogs.serverless.cli = new serverless.classes.CLI();
  
  spotinstLogs = new SpotinstLogs(serverless, options);
  
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    spotinstLogs.provider = {loadLocalParamsFile: () => {}, client: {FunctionsService: {key:"val"}}};
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
    
    it('should give a stub local func', function() {
      console.log(spotinstLogs.serverless.service);
    });
  });
  
  
//  describe('#buildFunctionParams()', () => {});
//  describe('#getStartTime()', () => {});
  
  
});