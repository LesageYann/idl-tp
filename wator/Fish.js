/* This agent exchange position if position is already occuped
 */
class Fish extends Animal {

  constructor( x, y, env ) {
    super( x, y, env );
    this.setBabyStyle();
  };

  _perception() {
    return this._env.aroundFree( this._pos );
  }
}

Fish.style = {
  adult: "url('../images/fish-blue.png')",
  baby: "url('../images/fish-green.png')"
}
Fish.color = {
  adult: "rgb(61,148,255)",
  baby: "rgb(39,201,90)"
}
Fish.breedTime = config.fish.breedTime || 2;
