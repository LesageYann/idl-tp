/* This agent exchange position if position is already occuped
 */
class Fish extends Animal {

  constructor( x, y, env ) {
    super( x, y, env );
    this.setName( "Fish" );
    this.setAdultStyle();
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
    this._style = {
      "background-image": "url('../images/fish-green.png')",
      "background-repeat": "no-repeat",
      "background-size": config.box.size + config.box.unit,
    }

    setAdultStyle() {
      this._style[ "background-image" ] = [ "url('../images/fish-blue.png')" ];
    }
  }
}

Fish.breedTime = config.fish.breedTime || 2;
