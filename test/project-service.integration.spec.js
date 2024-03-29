var chai = require('chai');
var expect = chai.expect;

var fasten = require('../src/index.js');

describe('Project service', () => {
  var projectService;

  beforeEach(()=> {
    projectService = fasten.ProjectService;
  })

  xit('creates a new project', () => {
    const name = 'Conecta Foo';

    return projectService.create(name).then((project) => {
      expect(project.name).to.be.equal(name);
    });
  });

  it('retrieves all projects', () => {
    return projectService.allProjects().then((projects) => {
      expect(projects).to.have.length.above(1);
    });
  });

  it('updates a project', () => {
    let newName = "Conecta - Stones";
    let project = new fasten.Project({id: 12, name: newName});

    return projectService.update(project).then((project) => {
      expect(project.name).to.be.equal(newName);
    });
  });

  it('finds a project using its id', () => {
    let id = 12;
    let name = "Conecta - Stones";

    return projectService.findById(id).then((project) => {
      expect(project.name).to.be.equal(name);

      expect(project.iterations).to.have.length(0);
    });
  });
});
