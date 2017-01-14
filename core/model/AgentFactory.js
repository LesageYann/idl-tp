var createAgent = function () {
  var create = {
    Particule: function (x, y, env, style) {
      return new Particule(x, y, env, style);
    },
    Shark: function (x, y, env, style) {
      return new Shark(x, y, env, style);
    },
    Fish: function (x, y, env, style) {
      return new Fish(x, y, env, style);
    }
  };

  return function (agentClass, x, y, env, style, opts) {
    return create[agentClass](x, y, env, style, opts);
  };
}();
