var main;

window.onload = function () {
  var sma, vue, env, trace;
  var agents = [];
  //make the Math.random predictible and reproducible
  Math.seedrandom( config.seed || Math.random() + '' );

  function createAgents( particules ) {
    var keys = Object.keys( particules );
    var pos = {
      x: Math.floor( Math.random() * config.grid.size.x ),
      y: Math.floor( Math.random() * config.grid.size.y )
    };

    for ( var i = 0; i < keys.length; i++ ) {
      for ( j = particules[ keys[ i ] ]; j > 0; j-- ) {
        while ( !env.isFree( pos ) ) {
          pos.x = Math.floor( Math.random() * config.grid.size.x );
          pos.y = Math.floor( Math.random() * config.grid.size.y );
        }
        agents.push( createAgent( keys[ i ], pos.x, pos.y, env ) );
        env.moveAgent( agents[ agents.length - 1 ], {
          x: x,
          y: y
        } );
      }
    }
    sma = new SMA( agents, config.refresh );
    env.setSMA( sma );
    sma.addObserver( vue );
    vue.update( agents );
  }

  function createTrace() {
    if ( config.trace ) {
      trace = new Trace();
      sma.addObserver( trace );
    }
  }

  env = new Environment( config.grid.size.x, config.grid.size.y, config.grid.toric );
  vue = createVue( config.render || "TableVue", document.getElementById( 'view' ), env );

  createAgents( config.particules );
  createTrace();

  sma.run();

  main = {
    nextTick: function () {
      sma.launchTurn();
    },
    agents: function () {
      return agents;
    },
    printAgents: function () {
      var res = "";
      for ( i = 0; i < agents.length; i++ ) {
        res = res + "x: " + agents[ i ].x() + " y: " + agents[ i ].y() + "\n";
      }
      return res;
    }
  };
};
();

main = {
  nextTick: function () {
    sma.launchTurn();
  },
  agents: function () {
    return agents;
  },
  printAgents: function () {
    var res = "";
    for ( i = 0; i < agents.length; i++ ) {
      res = res + "x: " + agents[ i ].x() + " y: " + agents[ i ].y() + "\n";
    }
    return res;
  }
};
};