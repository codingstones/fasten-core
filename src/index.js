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

class Project {
  constructor(args) {
    this.id = args.id;
    this.name = args.name;
    this.iterations = [];
  }

  slug() {
    return this.name.toLowerCase()
      .replace(/ /g,'-')
      .replace(/[^\w-]+/g,'')
    ;
  }

  addIteration(amount) {
    let iteration = new Iteration(amount);
    this.iterations.push(iteration);
    return iteration;
  }
}

class Iteration {
  constructor(args) {
    this._total = args.total;
    this._forCommon = args.forCommon || 0.0;
  }

  total() {
    return this._total;
  }

  invoiced() {
    return this.total() * 0.8;
  }

  forCommon() {
    return this._forCommon;
  }

  forCommonAsPercentage() {
    return (this._forCommon / this.invoiced()) * 100;
  }

  toDistribute() {
    return this.invoiced() - this.forCommon();
  }
}

class ProjectService {

  constructor(httpClient) {
    this._httpClient = httpClient;
    this._url = "https://fasten-backend.herokuapp.com/projects"
  }

  create(name) {
    return new Promise((resolve, reject) => {
      this._httpClient.post(this._url, {name: name, type: 'project'}).then((response) => {
        resolve(this._deserialize(response));
      });
    });
  }

  update(project) {
    const url = this._url + '/' + project.id;

    return new Promise((resolve, reject) => {
      this._httpClient.put(url, this._serialize(project)).then((response) => {
        resolve(this._deserialize(response));
      });
    });
  }

  allProjects() {
    return new Promise((resolve, reject) => {
      this._httpClient.get(this._url).then((response) => {
        let projects = response.body.filter((project) => {
          return project.type == 'project'
        });

        resolve(projects.map((project) => {return new Project(project)}));
      });
    });
  }

  findById(id) {
    return new Promise((resolve, reject) => {
      this._httpClient.get(this._url + '/' + id).then((response) => {
        resolve(this._deserialize(response));
      });
    });
  }

  _serialize(project) {
    return {
      name: project.name,
      type: 'project',
      iterations: project.iterations.map((iteration) => {
        return {
          total: iteration.total(),
          forCommon: iteration.forCommon(),
        };
      }),
    };
  }

  _deserialize(response) {
    let body = response.body;

    let project = new Project(body);
    if (body.iterations) {
      body.iterations.forEach((iteration) => {
        project.addIteration({total: iteration.total, forCommon: iteration.forCommon});
      });
    }

    return project;
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

  // Classes
  Project: Project,

  // Instances
  ProjectService: projectService,
}
