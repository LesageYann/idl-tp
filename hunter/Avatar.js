/* This agent exchange position if position is already occuped
 */

class Avatar extends Agent {

  constructor(x, y, env, style) {
    style = "url('../images/avatar.gif')";

    super(x, y, env, style);
    var self = this;
    this.invulnerable = 0;
    this.nbPillule = 0;
    this.letterBox = {lastDirection: {x: 0, y: 0}, direction: {x: 0, y: 0}};
    this._dijkstra();

    window.onkeydown = function (e) {
      self.onKeyDown(e);
    };
  };

  onKeyDown(e) {
    var code = e.keyCode ? e.keyCode : e.which;
    if (this.constructor.CODE[code]) {
      this.letterBox.lastDirection = this.letterBox.direction;
      this.letterBox.direction = this.constructor.CODE[code];
    }
  };

  decide() {
    if (this.invulnerable) {
      this.invulnerable--;
    }

    if (!(this._env.getTick() % this.constructor.speedModulo )) {
      var pos = {
        x: this._pos.x + this.letterBox.direction.x,
        y: this._pos.y + this.letterBox.direction.y
      };

      if (this._perception(pos)) {
        this._move(pos);
        this._dijkstra();
      }
      else {
        var agent = this._env._plan[pos.x][pos.y].agent;
        if (agent) {
          var name = agent.constructor.name;
          if (name == "Defender") {
            this._eatPillule(pos);
            this._move(pos);
            this._dijkstra();
            this.invulnerable = Avatar.invulnerableTime;
          }
          else {
            if (name == "Win") {
              this.win();
            }
          }
        }
      }
    }
  };

  _eatPillule(pos) {
    this.eat(pos);
    this.nbPillule++;
  };

  _dijkstra() {
    this._env._resetAllDistance();
    this._env._plan[this._pos.x][this._pos.y].distance = 0;
    this._env.destination = this._pos;
    var distance = 1;
    var listPos = [this._pos];
    while (listPos.length) {
      listPos = this._dijkstraTurn(listPos, distance);
      distance++;
    }
  };

  _dijkstraTurn(listPos, distance) {
    var nextListPos = [];
    for (var index in listPos) {
      var pos = listPos[index];
      var around = this._env.getAround(pos);
      var free = around.free;
      var notFree = around.notFree;

      for (var index in free) {
        var position = free[index];
        if (this._env._plan[position.x][position.y].distance < 0) {
          this._env._plan[position.x][position.y].distance = distance;
          if (position != this._pos) {
            nextListPos.push(position);
          }
        }
      }
      for (var index in notFree) {
        var position = notFree[index];
        if (this._env._plan[position.x][position.y].distance < 0) {
          this._env._plan[position.x][position.y].agent.distance = distance;
          this._env._plan[position.x][position.y].distance = distance;
        }
      }
    }
    return nextListPos;
  };


  _move(pos) {
    this._env.moveAgent(this, pos);
    this.lastPos = this._pos;
    this._pos = pos;
  };

  _perception(pos) {
    try {
      return this._env.isFree(pos);
    }
    catch (e) {
      return false;
    }
  };
}

Avatar.CODE = {37: {x: -1, y: 0}, 38: {x: 0, y: 1}, 39: {x: 1, y: 0}, 40: {x: 0, y: -1}};
Avatar.speedModulo = config.avatar.speedModulo || 1;
Avatar.invulnerableTime = config.avatar.invulnerableTime;