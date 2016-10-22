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
