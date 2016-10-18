'use strict';
var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

var fasten = require('../index.js');

describe('distribute iteration money among participants', () => {
  const iteration = 14;

  var httpClient, distributionService;
  beforeEach(()=> {
    httpClient = new fasten.HttpClient();
    distributionService = new fasten.DistributionService(httpClient);
  })

  it('sets distribution rates for an iteration', () => {
    var spy = sinon.spy(httpClient, 'put');

    const rates = [createRate('nestor', 10), createRate('gualis', 90)];

    distributionService.setRates(iteration, rates);

    expect(spy).calledWith('/iteration/14/rates', rates)
  });

  it('Error when sum of distribution rates is not 100%', () => {
    const rates = [createRate('nestor', 10), createRate('gualis', 89)]

    expect(() => {distributionService.setRates(iteration, rates)}).to.throw(fasten.IllegalRateException)
  });

  function createRate(who, rate) {
    return {who: who, rate: rate};
  }

});
