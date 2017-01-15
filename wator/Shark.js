/* This agent exchange position if position is already occuped
 */
class Shark extends Animal {
  constructor( x, y, env ) {
    super( x, y, env );
    this.setName( "Shark" );
    this.lastEat = 0;
    this.setBabyStyle();
  };

  _perception() {
    var pos, agent, res, prey = [],
      free = [];
    for ( var i = -1; i < 2; i++ ) {
      for ( var j = -1; j < 2; j++ ) {
        pos = {
          x: this.x() + i,
          y: this.y() + j
        };
        agent = this._env.getCase( pos );
        if ( agent == null ) {
          free.push( pos );
        } else if ( agent instanceof Fish ) {
          prey.push( pos );
        }
      }
    }
    if ( prey.length ) {
      res = prey;
      this.eat( prey );
    } else if ( free.length ) {
      res = [ free[ 0 ] ];
    } else {
      res = []; //no move
    }
    return res;
  }

  eat( prey ) {
    this._env.killAgent( prey );
  }

  chosePossibleMove( possible ) {
    return possible[ 0 ];
  }

  _createNew() {
    return new Shark( this.lastPos.x, this.lastPos.y, this._env, this.style() );
  }

  breedTime() {
    return Fish.breedTime;
  }

  setBabyStyle() {
    this._style = Shark.style.baby;
  }

  setAdultStyle() {
    this._style = Shark.style.adult;
  }
}

Shark.style = {
  adult: "url('../images/shark-red.png')",
  baby: "url('../images/shark-pink.png')"
}
Shark.breedTime = config.shark.breedTime || 10;;
