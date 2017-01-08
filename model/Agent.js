/* This agent exchange position if position is already occuped 
 */
function Agent(x, y, env, color) {
  this._pos = {x: x, y: y};
  this._color = color || 'blue';
  this._env = env;
  this._previousOffset={x:0,y:0};
  this._changeDir=false;

  if (typeof Agent.initialized !== true) {

    Agent.prototype.x = function () {
      return this._pos.x;
    };

    Agent.prototype.y = function () {
      return this._pos.y;
    };

    Agent.prototype.pos = function () {
      return this._pos;
    };

    Agent.prototype.color = function () {
      return this._color;
    };

    Agent.prototype.decide = function () {
      var offset = {x: Math.floor(Math.random() * 3 - 1),
        y: Math.floor(Math.random() * 3 - 1)};
      pos = {x: this._pos.x + offset.x,
        y: this._pos.y + offset.y};
      this.move(pos, offset);
    };

    Agent.prototype.move = function (pos, offset) {
      var agent;
      try {
        agent = this._env.moveAgent(this, pos);
      } catch (e) {
        if (offset == null) {
          throw e;
        }
        pos[e.direction()] = this["_" + e.direction()] - offset[e.direction()];
        agent = this._env.moveAgent(this, pos);
      }
      if (agent != null){
        agent.setPos(this._pos);
      }
      if(offset != null){
        this._changeDir= !( this._previousOffset == offset);
        this._previousOffset= offset;
      }
      this._pos = pos;
    };
    
    Agent.prototype.setPos = function (pos) {
      this._env.setAgentAt(this, pos);
      this._pos = pos;
    };
    
    Agent.prototype.changeDir=function(){
      return this._changeDir;
    };

    Agent.initialized = true;
  }
}
