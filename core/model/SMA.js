class SMA {
  constructor( agents, counter ) {
    this._agents = agents;
    this._observers = [];
    this._hasChanged = false;
    this._tick = 0;
    this._counter = {};
    var keys = Object.keys( counter );
    for ( var i = 0; i < keys.length; i++ ) {
      this._counter[ keys[ i ] ] = counter[ keys[ i ] ];
    }
    this._toKill = [];
  }

  run() {
    self = this;
    self._tick = 1;
    self._inTurn = false;
    if ( config.delay != 0 ) {
      self._intervalID = window.setInterval( function () {
        self.launchTurn( self );
      }, config.delay );
    }
  };

  addAgent( agent ) {
    this._agents.push( agent );
    this._counter[ agent.constructor.name ] = this._counter[ agent.constructor.name ] + 1;
  }

  /*
   * record agents to kill at the end of turn
   */
  killAgent( agent ) {
    this._toKill.push( agent );
  }

  /*
   * kill agents at the end of turn
   */
  _killAgents() {
    var agent;
    for ( var i = 0; i < this._toKill.length; i++ ) {
      agent = this._toKill[ i ];
      this._counter[ agent.constructor.name ] = this._counter[ agent.constructor.name ] - 1;
      this._agents.splice( this._agents.indexOf( agent ), 1 );
    }
    this._toKill = [];
  }

  launchTurn() {
    self = this;
    if ( !self._inTurn ) {
      self._inTurn = true;
      self.turn();
      if ( self._tick == config.nbTicks ) {
        clearInterval( self._intervalID );
      }
      self._tick++;
      self._inTurn = false;
    }
  };

  turn() {
    this._executeTurn[ config.sheduling ]( this );
    this._killAgents();

    if ( this.hasChanged() ) {
      this.notifyObserver();
    }
  };

  hasChanged() {
    return this._hasChanged;
  };

  setChanged() {
    this._hasChanged = true;
  };

  addObserver( observer ) {
    this._observers.push( observer );
  };

  notifyObserver() {
    for ( var i = 0; i < this._observers.length; i++ ) {
      this._observers[ i ].update( this._agents );
    }
    this._hasChanged = false;
  };

  getNumberOfAgents() {
    return this._counter;
  }

  getTick() {
    return this._tick;
  }
}

( function () {
  function fair( sma ) {
    var j, x, i;
    for ( i = sma._agents.length; i; i-- ) {
      j = Math.floor( Math.random() * i );
      x = sma._agents[ i - 1 ];
      sma._agents[ i - 1 ] = sma._agents[ j ];
      sma._agents[ j ] = x;
    }
    sma._executeTurn.sequential( sma );
  }

  function random( sma ) {
    var i, l = sma._agents.length;
    for ( i = l; i; i-- ) {
      sma._agents[ Math.floor( Math.random() * l ) ].decide();
      sma.setChanged();
    }
  }

  function sequential( sma ) {
    //nothing todo, always the same order
    for ( var i = 0; i < sma._agents.length; i++ ) {
      sma._agents[ i ].decide();
      console.log(sma._agents[ i ].constructor.name);
      sma.setChanged();
    }
  }

  SMA.prototype._executeTurn = {
    fair: fair,
    random: random,
    sequential: sequential
  }
}() );
