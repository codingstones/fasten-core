var chai = require('chai');
var expect = chai.expect;

var fasten = require('../src/index.js');

describe('Project', () => {
  const aName = 'irrelevant name';
  const total = 10000;
  const forCommon = 200;

  var project, iteration = null;

  beforeEach(() => {
    project = new fasten.Project({name: aName});
    iteration = project.addIteration({total: total, forCommon: forCommon});
  });

  describe('when creating a new iteration', () => {
    it('calculates total money from an iteration', () => {
      expect(iteration.total()).to.be.equal(total);
    });

    it('calculates money apported to common', () => {
      expect(iteration.forCommon()).to.be.equal(forCommon);
    });

    it('calculates money invoiced', () => {
      expect(iteration.invoiced()).to.be.equal(8000);
    });

    it('calculates money to be distributed', () => {
      expect(iteration.toDistribute()).to.be.equal(7800);
    });

    it('adds iteration to project', () => {
      expect(project.iterations[0]).to.be.equal(iteration);
    });
  });
});
