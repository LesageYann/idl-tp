/* This agent exchange position if position is already occuped
 */

class Particule extends Agent {

  constructor( x, y, env, style ) {
    super( x, y, env );
  };

  decide() {
    var pos = {
      x: this._pos.x + this.offset.x,
      y: this._pos.y + this.offset.y
    };
    this._move( pos, this.offset );
  };

  _move( pos, offset ) {
    var agent;
    try {
      agent = this._env.getCase( pos );
      if ( agent != null ) {
        this.offset = agent.offset;
        agent.offset = offset;
        this._changeDir = true;
      } else {
        this._changeDir = false;
        this._env.moveAgent( this, pos );
        this.setPos( pos );
      }
    } catch ( e ) {
      if ( offset == null ) {
        throw e;
      }
      pos[ e.direction ] = this._pos[ e.direction ] - offset[ e.direction ];
      offset[ e.direction ] = -offset[ e.direction ];
      this._move( pos, offset );
    }
  };
}
