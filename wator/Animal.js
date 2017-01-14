/* This agent can genere a new agent
 */
class Animal extends Agent {
  constructor( x, y, env, style ) {
    super( x, y, env, style );
    this.age = 0;
  }

  decide() {
    var possible = this._perception();
    if ( possible.length > 0 ) {
      this._move( possible[ Math.floor( Math.random() * possible.length ) ] );
    }
    this.breed();
  };

  _perception() {
    throw new SubClassesResponsability( "_perception" );
  }
  _createNew() {
    throw new SubClassesResponsability( "_createNew" );
  }

  breed() {
    this.age++;
    if ( this.breedTime() == this.age ) {
      this._env.addAgent( this._createNew() );
    }
  }

  _move( pos, offset ) {
    var agent;
    try {
      this._env.moveAgent( this, pos );
    } catch ( e ) {
      if ( offset == null ) {
        throw e;
      }
      pos[ e.direction() ] = this[ "_" + e.direction() ] - offset[ e.direction() ];
      agent = this._env.moveAgent( this, pos );
    }
    if ( offset != null ) {
      this._changeDir = !( this.offset == offset );
      this.offset = offset;
    }
    this.lastPos = this._pos;
    this._pos = pos;
  };
}
