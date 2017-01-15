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
    var res;
    res = this._env.aroundFree( this._pos );
    return res;
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
Shark.breedTime = config.shark.breedTime || 10;
