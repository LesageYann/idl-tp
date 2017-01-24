/* This agent exchange position if position is already occuped
 */

class Defender extends Agent {

  constructor(x, y, env, style, nbEat) {
    style = "url('../images/pillule.png')";
    super(x, y, env, style);
    console.log(nbEat);
    if (!nbEat) {
      nbEat = 0;
    }
    this.nbTurnMax = this._env.getDistanceMax();
    this.nbTurn = 0;
    this.nbEat = nbEat;
  };

  decide() {
    this.nbTurn++;
    if (this.nbTurn > this.nbTurnMax) {
      this.die(true);
    }
  };

  die(expire) {

    var pos = this._env.getFreeRandomPos();
    if (expire) {
      var nbEat = this.nbEat;
      console.log('expire');
      this._env.addAgent(new this.constructor(pos.x, pos.y, this._env, null, nbEat));
      this._env.killWithoutDie(this);
//      this._env._plan[this.x()][this.y()].agent = null;
 //     this._env._sma.killAgent(this);
    }
    else {
      super.die();
      this.nbEat++;
      var nbEat = this.nbEat;
      if (nbEat < 4) {
        this._env.addAgent(new this.constructor(pos.x, pos.y, this._env, null, nbEat));
      }
      else {
        this._env.addAgent(new Win(pos.x, pos.y, this._env, null));

      }
    }

//
  };
}