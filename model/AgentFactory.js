createAgent = function () {
  var create={
    Agent: function(x,y,env){return new Agent(x,y,env);}
  };
  
  return function (agentClass, x, y,env, opts) {
    return create[agentClass](x,y,env,opts);
  };
}();
