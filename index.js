'use strict';

class HttpClient {
  put(url, payload) {
  }
}

class IllegalRateException { }

class DistributionService {
  constructor(httpClient) {
    this._httpClient = httpClient;
  }

  setRates(iterationId, rates) {
    let result = rates.reduce((total, rate) => { return total + rate.rate}, 0);
    if (result != 100) throw new IllegalRateException();
    this._httpClient.put('/iteration/' + iterationId + '/rates', rates);
    return {
      id: iterationId,
      rates: rates
    }
  }
}

module.exports = {
  HttpClient: HttpClient,
  DistributionService: DistributionService,
  IllegalRateException: IllegalRateException
}
