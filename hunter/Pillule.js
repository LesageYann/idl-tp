/* This agent exchange position if position is already occuped
 */

class Pillule extends Agent {

  constructor(x, y, env, style) {
    style = "url('../images/pillule.png')";
    super(x, y, env, style);
  };

  decide() {
  };

  die(){
    super.die();
    var pos = this._env.getFreeRandomPos();
    this._env.addAgent( new this.constructor( pos.x, pos.y, this._env ) );

  }
}
