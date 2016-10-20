'use strict';

class HttpClient {
  put(url, payload) {
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

      this._httpClient.put('/iteration/' + iterationId + '/rates', rates);
      resolve({
        id: iterationId,
        rates: rates
      });
    });
  }
}

module.exports = {
  HttpClient: HttpClient,
  DistributionService: DistributionService,
}
