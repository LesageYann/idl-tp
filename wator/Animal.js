/* This agent can genere a new agent
 */
class Animal extends Agent {
  constructor( x, y, env, babyStyle, adultStyle) {
    super( x, y, env, babyStyle );
    this.age = 0;
    this._adultStyle = adultStyle;
  }

  decide() {
    var possible = this._perception();
    if ( possible.length > 0 ) {
      this._move( possible[ Math.floor( Math.random() * possible.length ) ] );
    }
    this.breed();
 //   console.log( "agent end", this._pos );
  };

  _perception() {
    throw new SubClassesResponsability( "_perception" );
  }
  _createNew() {
    throw new SubClassesResponsability( "_createNew" );
  }

  breed() {
    this.age++;
    if(this.age > this.breedTime()) {
      this._style = this._adultStyle;
    }

    if(!(this.age % this.breedTime() )) {
      this._env.addAgent( this._createNew() );
    }
  }

  _move( pos, offset ) {
    var agent;
    this._env.moveAgent( this, pos );
    this.lastPos = this._pos;
    this._pos = pos;
  };
}
