var chai = require('chai');
var expect = chai.expect;

var fasten = require('../src/index.js');

describe('Project', () => {
  const aName = 'irrelevant name';
  const amount = 10000;

  var project = null;

  beforeEach(() => {
    project = new fasten.Project({name: aName});
  });

  describe('when creating a new project', () => {
    it('adds iterations', () => {
      project = new fasten.Project({name: aName, iterations: [{total: 10000}, {total: 7200}]});

      expect(project.iterations[0].total()).to.be.equal(10000);
      expect(project.iterations[1].total()).to.be.equal(7200);
    });
  });

  describe('when creating a new iteration', () => {
    it('calculates total money from an iteration', () => {
      const iteration = project.addIteration(amount);

      expect(iteration.total()).to.be.equal(amount);
    });

    it('calculates money invoiced', () => {
      const iteration = project.addIteration(amount);

      expect(iteration.invoiced()).to.be.equal(8000);
    });

    it('adds iteration to project', () => {
      const iteration = project.addIteration(amount);

      expect(project.iterations[0]).to.be.equal(iteration);
    });
  });
});
