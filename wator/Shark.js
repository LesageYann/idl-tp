/* This agent exchange position if position is already occuped
 */
class Shark extends Animal {
  constructor( x, y, env ) {
    super( x, y, env );
    this.lastEat = 0;
    this.setBabyStyle();
  };

  _perception() {
    var res, prey = [],
      free = [];
    this._buildPreyAndFree( prey, free );
    if ( prey.length ) {
      console.log( "eat" );
      res = prey;
      this.eat( prey[ 0 ] );
    } else {
      this.lastEat = this.lastEat + 1;
      if ( this.lastEat == this.constructor.starveTime ) {
        console.log( "starve" );
        this._env.killAgent( this );
        res = []; //no move and kill
      } else if ( free.length ) {
        res = [ free[ 0 ] ];
      } else {
        res = []; //no move
      }
    }
    return res;
  }

  _buildPreyAndFree( prey, free ) {
    var pos, agent;
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
  }

  eat( preyPos ) {
    this.lastEat = 0;
    this._env.killAgent( this._env.getCase( preyPos ) );
  }

  chosePossibleMove( possible ) {
    return possible[ 0 ];
  }

}

Shark.style = {
  adult: "url('../images/shark-red.png')",
  baby: "url('../images/shark-pink.png')"
}
Shark.breedTime = config.shark.breedTime || 10;
Shark.starveTime = config.shark.starveTime || 3;
