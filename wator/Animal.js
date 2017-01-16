/* This agent can genere a new agent
 */
class Animal extends Agent {
  constructor( x, y, env ) {
    super( x, y, env );
    this.age = 0;
  }

  decide() {
    var possible = this._perception();
    if ( possible.length > 0 ) {
      this._move( this.chosePossibleMove( possible ) );
    }
    if ( this.lastPos != null && this._env.isFree( this.lastPos ) ) {
      this.breed();
    } else {
      console.log( "dont create", this.constructor.name )
    }
    //   console.log( "agent end", this._pos );
  };

  chosePossibleMove( possible ) {
    return possible[ Math.floor( Math.random() * possible.length ) ];
  }

  _perception() {
    throw new SubClassesResponsability( "_perception" );
  }

  setBabyStyle() {
    this._style = this.constructor.style.baby;
  }

  setAdultStyle() {
    this._style = this.constructor.style.adult;
  }

  _createNew() {
    return new this.constructor( this.x(), this.y(), this._env );
  }

  breed() {
    this.age++;
    // == to make only once time the set of style
    if ( this.age == this.constructor.breedTime ) {
      this.setAdultStyle();
    }

    if ( !( this.age % this.constructor.breedTime ) ) {
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
