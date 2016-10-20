'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HttpClient = function () {
  function HttpClient() {
    _classCallCheck(this, HttpClient);
  }

  _createClass(HttpClient, [{
    key: 'put',
    value: function put(url, payload) {
      //fake implementation!!!
      var pify = require('pify');
      var request = pify(require('request'));
      return request.get('http://mosica.es/api/1/gigs/4155');
    }
  }]);

  return HttpClient;
}();

var DistributionService = function () {
  function DistributionService(httpClient) {
    _classCallCheck(this, DistributionService);

    this._httpClient = httpClient;
  }

  _createClass(DistributionService, [{
    key: 'setRates',
    value: function setRates(iterationId, rates) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var result = rates.reduce(function (total, rate) {
          return total + rate.rate;
        }, 0);
        if (result != 100) {
          reject('Rates does not sum 100%');
        }

        _this._httpClient.put('/iteration/' + iterationId + '/rates', rates).then(function (response) {
          resolve({
            id: iterationId,
            rates: rates
          });
        });
      });
    }
  }]);

  return DistributionService;
}();

module.exports = {
  HttpClient: HttpClient,
  DistributionService: DistributionService
};