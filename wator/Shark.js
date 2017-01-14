/* This agent exchange position if position is already occuped
 */

class Shark extends Agent {
  constructor(x, y, env, style) {
    var styleAdult = "background-image: url(../images/shark-red.png);  background-size: " + config.box.size + "px " + config.box.size + "px;";
    var styleBaby = "background-image: url(../images/shark-pink.png);  background-size: " + config.box.size + "px " + config.box.size + "px;";

    super(x, y, env, (styleAdult));
    this.setName('Shark');
  };

  decide() {
    var pos = {
      x: this._pos.x + this.offset.x,
      y: this._pos.y + this.offset.y
    };
    this._move(pos, this.offset);
  };

  _move(pos, offset) {
    var agent;
    try {
      agent = this._env.case(pos);
      if (agent != null) {
        this.offset = agent.offset;
        agent.offset = offset;
        this._changeDir = true;
      } else {
        this._changeDir = false;
        this._env.moveAgent(this, pos);
        this.setPos(pos);
      }
    } catch (e) {
      console.log(e);
      if (offset == null) {
        throw e;
      }
      pos[e.direction()] = this["_" + e.direction()] - offset[e.direction()];
      agent = this._env.moveAgent(this, pos);
    }
  };
}
