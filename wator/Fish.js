/* This agent exchange position if position is already occuped
 */
class Fish extends Animal {
  _perception() {
    return this._env.aroundFree( this._pos );
  }

  _createNew() {
    new Fish( this.lastPos.x, this.lastPos.y, this.style );
  }

  breedTime() {
    return Fish.breedTime;
  }
}

Fish.breedTime = config.fish.breedTime || 2;
