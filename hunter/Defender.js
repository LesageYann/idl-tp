/* This agent exchange position if position is already occuped
 */

class Defender extends Agent {

  constructor(x, y, env, style, nbEat) {
    style = style || "url('../images/defender.png')";
    super(x, y, env, style);
    this.nbTurnMax = this._env.getDistanceMax();
    this.nbTurn = 0;
    this.nbEat = nbEat || 0;
  };

  decide() {
    if(this.isAlive){
      this.nbTurn++;
      if (this.nbTurn > this.nbTurnMax) {
        this.die(true);
      }
    }
  };

  die(expire) {
    super.die();
    var pos = this._env.getFreeRandomPos();
    if (!expire) {
      this.nbEat++;
    }
    var nbEat = this.nbEat;
    console.log(nbEat, expire)
    if (nbEat < 4) {
      var ag =new this.constructor(pos.x, pos.y, this._env, null, nbEat)
      console.log(ag== this, this == this,ag)
      this._env.addAgent(ag);
    }
    else {
      this._env.addAgent(new Win(pos.x, pos.y, this._env, null));
    }
  };

}
