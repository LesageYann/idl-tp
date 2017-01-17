/* This agent exchange position if position is already occuped
 */
class Agent {

  constructor( x, y, env, style ) {
    this._pos = {
      x: x,
      y: y
    };
    this._style = style || ( "rgb(" + Math.floor( Math.random() * 200 ) +
      "," + Math.floor( Math.random() * 200 ) + "," +
      Math.floor( Math.random() * 200 ) + ")" );
    this._env = env;
    this._changeDir = false;
    this.offset = Agent.direction[ Math.floor( Math.random() * 8 ) ];

    this.isAlive = true;
  }

  die() {
    this.isAlive = false;
  }

  x() {
    return this._pos.x;
  };

  y() {
    return this._pos.y;
  };

  pos() {
    return this._pos;
  };

  style() {
    return this._style;
  };

  color() {
    return this._style;
  };

  decide() {
    throw new SubClassesResponsability( "decide" );
  };

  setPos( pos ) {
    this._env.setAgentAt( this, pos );
    this._pos = pos;
  };

  changeDir() {
    return this._changeDir;
  };
}

Agent.init = {};

Agent.direction = [
  {
    x: 1,
    y: 1
  },
  {
    x: 1,
    y: 0
  },
  {
    x: 1,
    y: -1
  },
  {
    x: -1,
    y: 1
  },
  {
    x: 0,
    y: 1
  },
  {
    x: 0,
    y: -1
  },
  {
    x: -1,
    y: 0
  },
  {
    x: -1,
    y: -1
  }
];
