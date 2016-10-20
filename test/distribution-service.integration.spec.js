'use strict';
var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

var fasten = require('../index.js');

describe('integration test for money distribution', () => {

  const iteration = 14;

  var httpClient, distributionService;
  beforeEach(()=> {
    httpClient = new fasten.HttpClient();
    distributionService = new fasten.DistributionService(httpClient);
  });

  it('returns an iteration with its rates settings set', () => {
    const rates = [createRate('nestor', 10), createRate('gualis', 90)];

    return distributionService.setRates(iteration, rates).then((result) => {
      expect(result.id).to.be.equal(iteration);

      expect(result.rates[0].who).to.be.equal('nestor');
      expect(result.rates[0].rate).to.be.equal(10);

      expect(result.rates[1].who).to.be.equal('gualis');
      expect(result.rates[1].rate).to.be.equal(90);
    });
  });

});

function createRate(who, rate) {
  return {who: who, rate: rate};
}