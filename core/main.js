var main;

function createAgents(particules, env, agents) {
  var keys = Object.keys(particules);

  for (var i = 0; i < keys.length; i++) {
    for (j = particules[keys[i]]; j > 0; j--) {
      var pos = env.getFreeRandomPos();
      agents.push(createAgent(keys[i], pos.x, pos.y, env));
      env.moveAgent(agents[agents.length - 1], {
        x: pos.x,
        y: pos.y
      });
    }
  }
  sma = new SMA(agents, config.particules);
  var vue = createVue(config.render || "TableVue", document.getElementById('view'), env);
  env.setSMA(sma);
  sma.addObserver(vue);
  vue.update(agents);
  return sma;
}

function createTrace(env) {
  if (config.trace) {
    trace = new Trace(null, env);
    sma.addObserver(trace);
  }
}

function createPanel(env) {
  if (config.panel) {
    panel = new PanelVue(document.getElementById('panel'), env);
    sma.addObserver(panel);
  }
}

function play() {
  var env = new Environment(config.grid.size.x, config.grid.size.y, config.grid.toric);

  var sma, vue, trace;
  var agents = [];

  //make the Math.random predictible and reproducible
  Math.seedrandom(config.seed || Math.random() + '');
  sma = createAgents(config.particules, env, agents);
  createTrace(env);
  createPanel(env);

  sma.run();

  return env;
}

window.onload = function () {
  //var env = new Environment(config.grid.size.x, config.grid.size.y, config.grid.toric);
  var env = play();
  env.replay = play;
};
