/* This agent can genere a new agent
 */
class Animal extends Agent {
  constructor( x, y, env, babyStyle ) {
    super( x, y, env, babyStyle );
    this.age = 0;
  }

  decide() {
    var possible = this._perception();
    console.log( "p", this._name, possible )
    if ( possible.length > 0 ) {
      this._move( this.chosePossibleMove( possible ) );
    }
    this.breed();
    //   console.log( "agent end", this._pos );
  };

  chosePossibleMove( possible ) {
    return possible[ Math.floor( Math.random() * possible.length ) ];
  }

  _perception() {
    throw new SubClassesResponsability( "_perception" );
  }
  _createNew() {
    throw new SubClassesResponsability( "_createNew" );
  }

  breed() {
    this.age++;
    // == to make only once time the set of style
    if ( this.age == this.breedTime() ) {
      this._style = this.setAdultStyle();
    }

    if ( !( this.age % this.breedTime() ) ) {
      this._env.addAgent( this._createNew() );
    }
  }

  _move( pos, offset ) {
    var agent;
    this._env.moveAgent( this, pos );
    this.lastPos = this._pos;
    this._pos = pos;
    console.log( "lastPos", this.lastPos, this._name );
  };
}
