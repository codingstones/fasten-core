'use strict';

var requests = require('superagent');

class HttpClient {
  post(url, payload) {
    return new Promise((resolve, reject) => {
      requests.post(url).send(payload).end((err, response) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(response);
        }
      });
    });
  }

  get(url) {
    return new Promise((resolve, reject) => {
      requests.get(url).end((err, response) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(response);
        }
      });
    });
  }

  put(url, payload) {
    return new Promise((resolve, reject) => {
      requests.put(url).send(payload).end((err, response) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(response);
        }
      });
    });
  }

}

module.exports = {
  HttpClient: HttpClient,
}
