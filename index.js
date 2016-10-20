'use strict';

class HttpClient {
  put(url, payload) {
    //fake implementation!!!
    var pify = require('pify');
    var request = pify(require('request'));
    return request.get('http://mosica.es/api/1/gigs/4155');
  }
}

class DistributionService {
  constructor(httpClient) {
    this._httpClient = httpClient;
  }

  setRates(iterationId, rates) {
    return new Promise((resolve, reject) => {
      let result = rates.reduce((total, rate) => { return total + rate.rate}, 0);
      if (result != 100) {
        reject('Rates does not sum 100%');
      }

      this._httpClient.put('/iteration/' + iterationId + '/rates', rates).then((response) => {
        resolve({
          id: iterationId,
          rates: rates
        });
      });
    });
  }
}

module.exports = {
  HttpClient: HttpClient,
  DistributionService: DistributionService,
}
