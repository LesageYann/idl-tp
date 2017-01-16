/* This agent can genere a new agent
 */
class Animal extends Agent {
  constructor( x, y, env ) {
    super( x, y, env );
    this.age = 0;
    this.isAlive = true;
  }

  die() {
    this.isAlive = false;
  }

  decide() {
    if ( this.isAlive ) {
      var possible = this._perception();
      if ( possible.length > 0 ) {
        this._move( this.chosePossibleMove( possible ) );
      }
      this.breed();
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
    if ( this._env.isFree( this.lastPos ) ) {
      this._env.addAgent( new this.constructor( this.lastPos.x, this.lastPos.y, this._env ) );
    }
  }

  breed() {
    this.age++;

    if ( !( this.age % this.constructor.breedTime ) ) {
      // == to make only once time the set of style
      if ( this.age == this.constructor.breedTime ) {
        this.setAdultStyle();
      }
      if ( this.lastPos != null ) {
        this._createNew();
      }
    }
  }

  _move( pos, offset ) {
    var agent;
    this._env.moveAgent( this, pos );
    this.lastPos = this._pos;
    this._pos = pos;
  };
}
