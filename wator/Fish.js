/* This agent exchange position if position is already occuped
 */
class Fish extends Animal {

  constructor( x, y, env ) {
    super( x, y, env );
    this.setName( "Fish" );
    this.setBabyStyle();
  };

  _perception() {
    return this._env.aroundFree( this._pos );
  }

  _createNew() {
    return new Fish( this.lastPos.x, this.lastPos.y, this._env, Fish.babyStyle );
  }

  breedTime() {
    return Fish.breedTime;
  }

  setBabyStyle() {
    this._style = Fish.style.baby;
  }

  setAdultStyle() {
    this._style = Fish.style.adult;
  }
}

Fish.style = {
  adult: "url('../images/fish-blue.png')",
  baby: "url('../images/fish-green.png')"
}
Fish.breedTime = config.fish.breedTime || 2;
