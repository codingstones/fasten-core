'use strict';
var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

class HttpClient {
  put(url, payload) {
  }
}

class DistributionService {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  setRates(iterationId, rates) {
    let result = rates.reduce((total, rate) => { return total + rate.rate}, 0);
    if (result != 100) throw new IllegalRateException();
    this.httpClient.put('/iteration/' + iterationId + '/rates', rates);
    return {
      id: iterationId,
      rates: rates
    }
  }
}

class IllegalRateException {

}


describe('Share Distribution rates between parcitipants', () => {
  const iteration = 14;

  var httpClient, distributionService;
  beforeEach(()=> {
    httpClient = new HttpClient();
    distributionService = new DistributionService(httpClient);
  })

  it('sets distribution rates for an iteration', () => {
    var spy = sinon.spy(httpClient, 'put');

    const rates = [createRate('nestor', 10), createRate('gualis', 90)];

    distributionService.setRates(iteration, rates);

    expect(spy).calledWith('/iteration/14/rates', rates)
  });

  it('Error when sum of distribution rates is not 100%', () => {
    const rates = [createRate('nestor', 10), createRate('gualis', 89)]

    expect(() => {distributionService.setRates(iteration, rates)}).to.throw(IllegalRateException)
  });

  function createRate(who, rate) {
    return {who: who, rate: rate};
  }

});
