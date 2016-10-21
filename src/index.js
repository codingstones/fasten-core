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
  }
}

class Project {
  constructor(args) {
    this.name = args.name;
  }
}

class ProjectService {
  constructor(httpClient) {
    this._httpClient = httpClient;
    this._url = "https://fasten-backend.herokuapp.com/iterations"
  }

  create(name) {
    return new Promise((resolve, reject) => {
      this._httpClient.post(this._url, {name: name, type: 'project'}).then((response) => {
        resolve(new Project(response.body));
      });
    });
  }

  allProjects() {
    return new Promise((resolve, reject) => {
      this._httpClient.get(this._url).then((response) => {
        let projects = response.body.filter((project) => {
          return project.type == 'project'
        });

        resolve(projects.map((project) => {new Project(project)}));
      });
    });
  }
}

const httpClient = new HttpClient();
const projectService = new ProjectService(httpClient);

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

      this._httpClient.put('/iteration/' + iterationId + '/rates', rates);//.then((response) => {
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

  ProjectService: projectService,
}
