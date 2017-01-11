var createAgent = function () {
  var create={
    Particule: function(x,y,env,style){return new Particule(x,y,env,style);}
  };
  
  return function (agentClass, x, y,env,style, opts) {
    return create[agentClass](x,y,env,style,opts);
  };
}();
