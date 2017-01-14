/* This agent exchange position if position is already occuped
 */
class Fish extends Animal {

  constructor(x, y, env, style) {
    super(x, y, env, Fish.babyStyle, Fish.adultStyle);
    this.setName("Fish");
  };

  _perception() {
    return this._env.aroundFree(this._pos);
  }

  _createNew() {
    return new Fish(this.lastPos.x, this.lastPos.y, this._env, Fish.babyStyle);
  }

  breedTime() {
    return Fish.breedTime;
  }
}

Fish.babyStyle = ("background-image: url('../images/fish-green.png'); background-size:10px 10px; background-repeat: no-repeat;");
Fish.adultStyle = ("background-image: url('../images/fish-blue.png'); background-size:10px 10px; background-repeat: no-repeat;");
Fish.breedTime = config.fish.breedTime || 2;
