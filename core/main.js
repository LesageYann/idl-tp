class Main{
  constructor(){
    this.isinit=true;
  }

  createTrace() {
    if ( config.trace ) {
      this.trace = new Trace( null, this.env );
      this.sma.addObserver( this.trace );
    }
  }

  createPanel() {
    if ( config.panel ) {
      this.panel = new PanelVue( document.getElementById( 'panel' ), this.env );
      this.sma.addObserver( this.panel );
    }
  }

  createAgents( particules ) {
    var agents = [];
    var keys = Object.keys( particules );
    var pos = {
      x: Math.floor( Math.random() * config.grid.size.x ),
      y: Math.floor( Math.random() * config.grid.size.y )
    };

    for ( var i = 0; i < keys.length; i++ ) {
      for ( var j = particules[ keys[ i ] ]; j > 0; j-- ) {
        while ( !this.env.isFree( pos ) ) {
          pos.x = Math.floor( Math.random() * config.grid.size.x );
          pos.y = Math.floor( Math.random() * config.grid.size.y );
        }
        agents.push( createAgent( keys[ i ], pos.x, pos.y, this.env ) );
        this.env.moveAgent( agents[ agents.length - 1 ], {
          x: pos.x,
          y: pos.y
        } );
      }
    }
    this.agents=agents
    return agents;
  }

  createSimu() {
    //make the Math.random predictible and reproducible
    Math.seedrandom( config.seed || Math.random() + '' );

    this.env = new Environment( config.grid.size.x, config.grid.size.y, config.grid.toric );
    this.vue = createVue( config.render || "TableVue", document.getElementById( 'view' ), this.env );

    this.sma = new SMA(
      this.createAgents( config.particules ), config.particules );
    this.env.setSMA( this.sma );
    this.sma.addObserver( this.vue );
    this.vue.update( this.agents );
    this.createTrace();
    this.createPanel();

    this.sma.run();

  }

  deleteSimu(){
      this.sma.killAllAgents();
  }

  newSimu(){
    this.deleteSimu();
    this.createSimu();
  }

  printAgents () {
    var res = "";
    for ( i = 0; i < agents.length; i++ ) {
      res = res + "x: " + agents[ i ].x() + " y: " + agents[ i ].y() + "\n";
    }
    return res;
  }

  nextTick () {
    this.sma.launchTurn();
  }

  getAgents () {
    return this.agents;
  }
}

var main = new Main();

window.onload = function(){main.createSimu()};
