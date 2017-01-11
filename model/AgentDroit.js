/* This agent exchange position if position is already occuped 
 */
direction=[
      {x:1,y:1},
      {x:1,y:0},
      {x:1,y:-1},
      {x:-1,y:1},
      {x:0,y:1},
      {x:0,y:-1},
      {x:-1,y:0},
      {x:-1,y:-1}
];

class AgentDroit extends Agent {
  constructor(x, y, env, color){
    super(x, y, env, color);
    this.offset= direction[Math.floor(Math.random() * 8)];
  }


    decide () {
      var pos = {x: this._pos.x + this.offset.x,
        y: this._pos.y + this.offset.y};
      this.move(pos, this.offset);
    };

    move (pos, offset) {
      var agent;
      try {
        agent = this._env.case(pos.x,pos.y);
        if (agent != null){
          this.offset= agent.offset;
          agent.offset=offset;
          this._changeDir=true;
        }else{
          this._changeDir= false;
          this._env.moveAgent(this, pos);
          this.setPos(pos);
        }
      } catch (e) {
        console.log(e)
        if (offset == null) {
          throw e;
        }
        pos[e.direction()] = this["_" + e.direction()] - offset[e.direction()];
        agent = this._env.moveAgent(this, pos);
      }
    };
}
