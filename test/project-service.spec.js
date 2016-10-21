var chai = require('chai');
var expect = chai.expect;

var fasten = require('../src/index.js');

describe('Project service', () => {
  var projectService;

  beforeEach(()=> {
    projectService = fasten.ProjectService;
  })

  it('creates a new service', () => {
    const name = 'Conecta Foo';

    return projectService.create(name).then((project) => {
      expect(project.name).to.be.equal(name);
    });
  });

  it('retrieves all services', () => {
    return projectService.allProjects().then((projects) => {
      expect(projects).to.have.length.above(1);
    });
  });
});
