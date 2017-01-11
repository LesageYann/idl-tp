/* This agent exchange position if position is already occuped 
 */
class Agent {
  constructor(x, y, env, color){
    this._pos = {x: x, y: y};
    this._color = color || ("rgb("+Math.floor(Math.random() * 200)+
          ","+Math.floor(Math.random() * 200)+","
          +Math.floor(Math.random() * 200)+")");
    this._env = env;
    this.offset={x:0,y:0};
    this._changeDir=false;
  }
 
  x () {
      return this._pos.x;
   };

    y  () {
      return this._pos.y;
    };

    pos () {
      return this._pos;
    };

    color () {
      return this._color;
    };

    decide () {
      var offset = {x: Math.floor(Math.random() * 3 - 1),
        y: Math.floor(Math.random() * 3 - 1)};
      var pos = {x: this._pos.x + offset.x,
        y: this._pos.y + offset.y};
      this.move(pos, offset);
    };

    move (pos, offset) {
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
        this._changeDir= !( this.offset == offset);
        this.offset= offset;
      }
      this._pos = pos;
    };
    
    setPos (pos) {
      this._env.setAgentAt(this, pos);
      this._pos = pos;
    };
    
    changeDir(){
      return this._changeDir;
    };

}
