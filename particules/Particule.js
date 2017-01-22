/* This agent exchange position if position is already occuped
 */

class Particule extends Agent {

  constructor(x, y, env, style) {
    super(x, y, env);

  };

  decide() {
    this._move(null, this.offset);
  };

  _move(pos, offset) {
    try {
      if (!pos) {
        pos = {
          x: this._pos.x + this.offset.x,
          y: this._pos.y + this.offset.y
        };
      }
      var agent;
      agent = this._env.getCase(pos).agent;
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
      if (!offset) {
        this.offset = {
          x: Math.floor(Math.random() * 3 - 1),
          y: Math.floor(Math.random() * 3 - 1)
        };
        offset = this.offset;
      }
      pos[e.direction] = this._pos[e.direction] - offset[e.direction];
      offset[e.direction] = -offset[e.direction];
      this._move(pos, offset);
    }
  };
}
