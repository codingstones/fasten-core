var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var sinonStubPromise = require('sinon-stub-promise');
sinonStubPromise(sinon);
chai.use(sinonChai);

var fasten = require('../index.js');

describe('distribute iteration money among participants', () => {
  const iteration = 14;

  const rates = [createRate('nestor', 10), createRate('gualis', 90)];

  var httpClient, distributionService, stub;
  beforeEach(()=> {
    httpClient = new fasten.HttpClient();
    distributionService = new fasten.DistributionService(httpClient);

    stub = sinon.stub(httpClient, 'put').returns({
      then: function(resp){
        return resp({body: JSON.stringify(rates)});
      }
    });
  })

  it('sets distribution rates for an iteration', () => {
    distributionService.setRates(iteration, rates);

    expect(stub).calledWith('/iteration/14/rates', rates)
  });

  it('returns an iteration with its rates settings set', () => {
    return distributionService.setRates(iteration, rates).then((result) => {
      expect(result.id).to.be.equal(iteration);

      expect(result.rates[0].who).to.be.equal('nestor');
      expect(result.rates[0].rate).to.be.equal(10);

      expect(result.rates[1].who).to.be.equal('gualis');
      expect(result.rates[1].rate).to.be.equal(90);
    });
  });

  context('when sum of distribution rates is not equal to 100%', () => {
    it('returns an error', () => {
      const rates = [createRate('nestor', 10), createRate('gualis', 89)]

      return distributionService.setRates(iteration, rates).catch((err) => {
        expect(err).to.be.equal('Rates does not sum 100%');
      });
    });
  });

  function createRate(who, rate) {
    return {who: who, rate: rate};
  }

});
