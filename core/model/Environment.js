class Environment {
  constructor(x, y, toric) {
    this._x = x || 50;
    this._y = y || 50;
    this._toric = toric;
    this._plan = [];
    this._sma = {
      setChanged: function () {
      }
    }; //mock before set sma
    for (var i = 0; i < this._x; i++) {
      this._plan[i] = [];
    }
    this.smaSet = false;
  }

  isToric() {
    return this._toric;
  };

  xSize() {
    return this._x;
  };

  ySize() {
    return this._y;
  };

  setSMA(sma) {
    this._sma = sma;
    this.smaSet = true;
    //sma.addObserver(this);
  };

  addAgent( agent ) {
    this._plan[ agent.x() ][ agent.y() ] = agent;
    this._sma.addAgent( agent );
  //  console.log( this._plan[ agent.x() ][ agent.y() ] );
  }

  /* change position on plan
   * return agent if the newPos is already occuped
   */
  moveAgent(agent, newPos) {
    this._handleBound(newPos);
    this._plan[agent.x()][agent.y()] = null;
    var res = this._plan[newPos.x][newPos.y];
    this._plan[newPos.x][newPos.y] = agent;
    this._sma.setChanged();
    return res;
  };

  /* change position on plan
   * erase previous agent if the newPos is already occuped
   */
  setAgentAt(agent, newPos) {
    this._handleBound(newPos);
    this._plan[newPos.x][newPos.y] = agent;
    this._sma.setChanged();
  };

  _handleBound(newPos) {
    if (this._toric) {
      if (newPos.x >= this._x || newPos.x < 0) {
        newPos.x = ( newPos.x + this._x ) % this._x;
      }
      if (newPos.y >= this._y || newPos.y < 0) {
        newPos.y = ( newPos.y + this._y ) % this._y;
      }
    } else {
      if (newPos.x >= this._x || newPos.x < 0) {
        throw new ExceptionXBound(newPos.x);
      }
      if (newPos.y >= this._y || newPos.y < 0) {
        throw new ExceptionYBound(newPos.y);
      }
    }
  };

  aroundFree( pos ) {
    var res = [];
    for ( var i = -1; i < 2; i++ ) {
      this._addToFree( {
        x: pos.x + i,
        y: pos.y
      }, res );
      this._addToFree( {
        x: pos.x + i,
        y: pos.y + 1
      }, res );
      this._addToFree( {
        x: pos.x + i,
        y: pos.y - 1
      }, res );
    }
    return res;
  };

  _addToFree( pos, arr ) {
    try {
      this._handleBound( pos );
      if ( this.isFree( pos ) ) {
        arr.push( pos );
      }
    } catch ( e ) {
      //do nothing in this case
    }
  };

  getCase( pos ) {
    this._handleBound( pos );
    return this._plan[ pos.x ][ pos.y ];
  };

  isFree( pos ) {
    return this._plan[ pos.x ][ pos.y ] == null;
  };

  getNumberOfAgents() {
    if (this.smaSet) {
      return this._sma.getNumberOfAgents();
    }
    return {};
  }

  getTick(){
    if (this.smaSet) {
      return this._sma.getTick();
    }
    return 0;
  }

}
