var expect = chai.expect;

describe("Agent", function () {
  describe("constructor", function () {
    it("should be not initialized state", function () {
      expect(Agent.initialized).to.not.equal(true);
    });

    it("should pass at initialized state", function () {
      var agent = new Agent();
      expect(Agent.initialized).to.equal(true);
    });
  });

  describe("#public fonctions", function () {
    describe("#decide end to end", function () {
      it("decide move agent", function () {
        var env= new Environment(10,10,true);
        var agent = new Agent(5,5,env);
        agent.decide();
        expect(agent.x()).to.be.oneOf([4,5,6]);
        expect(agent.y()).to.be.oneOf([4,5,6]);
        (true);
      });
    });
    
    describe("#move end to end", function () {
      it("move chose agent's pos", function () {
        var env= new Environment(10,10,true);
        var agent = new Agent(5,5,env);
        agent.move({x:6,y:6});
        expect(agent.x()).to.be.equal(6);
        expect(agent.y()).to.be.equal(6);
        (true);
      });
      
      it("move move agent in env", function () {
        var env= new Environment(10,10,true);
        var agent = new Agent(5,5,env);
        agent.move({x:6,y:6});
        expect(env.case(6,6)).to.be.equal(agent);
      });
      
      
      it("move remove agent in env from the last pos", function () {
        var env= new Environment(10,10,true);
        var agent = new Agent(5,5,env);
        agent.move({x:5,y:5});
        agent.move({x:6,y:6});
        expect(env.case(5,5)).to.be.null;
      });
      
      
      it("if collision inverse the two agent", function () {
        var env= new Environment(10,10,true);
        var agent = new Agent(5,5,env);
        var agent2 = new Agent(6,6,env);
        agent.move({x:5,y:5});
        agent2.move({x:6,y:6});
        agent.move({x:6,y:6});
        expect(env.case(5,5)).to.be.deep.equal(agent2);
        expect(env.case(6,6)).to.be.deep.equal(agent);
      });
    });
  });
});