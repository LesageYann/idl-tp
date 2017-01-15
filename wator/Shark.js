/* This agent exchange position if position is already occuped
 */
class Shark extends Animal {
  constructor( x, y, env ) {
    super( x, y, env, "background:url('../images/shark-red.png');background-size: " + config.box.size + "px " + config.box.size + "px" );
  }

  _perception() {
    return this._env.aroundFree( this._pos );
  }

  _createNew() {
    return new Shark( this.lastPos.x, this.lastPos.y, this._env, this.style() );
  }

  breedTime() {
    return Fish.breedTime;
  }
}

Fish.breedTime = config.fish.breedTime || 2;
