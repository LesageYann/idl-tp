/* This agent exchange position if position is already occuped
 */

class Avatar extends KillerAgent {

  constructor(x, y, env, style) {
    style = "url('../images/avatar.gif')";

    super(x, y, env, style);
    this.invulnerable = 0;
    this.nbPillule = 0;
    this.letterBox = this._env.getLetterBox();
    this._dijkstra();
  };

  die(){
    if (this.invulnerable <= 0) {
      this._env.stop(false);
    }
  }

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
      }
      else {
        var agent = this._env._plan[pos.x][pos.y].agent;
        if (agent && agent instanceof Defender) {
          this._eatPillule(pos);
          this._move(pos);
        }
      }
    }
    this._dijkstra();
  };

  _eatPillule(pos) {
    this.eat(pos);
    this.invulnerable=Avatar.invulnerableTime;
    this.nbPillule++;
  };

  _inverseDijkstra() {
    var distanceMax = this._env.getDistanceMax();
    for (var x = 0; x < this._env.xSize(); x++) {
      for (var y = 0; y < this._env.ySize(); y++) {
        var distance = this._env._plan[x][y].distance;
        this._env._plan[x][y].distance = distanceMax - distance;
      }
    }
  }

  _dijkstra() {
    var min = 0;
    this._env._resetAllDistance();
    this._env._plan[this._pos.x][this._pos.y].distance = min;
    this._env.destination = this._pos;
    var listPos = [this._pos];
    var distance = min + 1;
    while (listPos.length) {
      listPos = this._dijkstraTurn(listPos, distance, min);
      distance++;
    }

    if (this.invulnerable) {
      this._inverseDijkstra();
    }
  };

  _dijkstraTurn(listPos, distance, min) {
    var nextListPos = [];
    for (var index in listPos) {
      var pos = listPos[index];
      var around = this._env.getAround(pos);
      var free = around.free;
      var notFree = around.notFree;

      for (var index in free) {
        var position = free[index];
        if (this._env._plan[position.x][position.y].distance < min) {
          this._env._plan[position.x][position.y].distance = distance;
          if (position != this._pos) {
            nextListPos.push(position);
          }
        }
      }
      for (var index in notFree) {
        var position = notFree[index];
        if (this._env._plan[position.x][position.y].distance < min) {
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

Avatar.speedModulo = config.avatar.speedModulo || 1;
Avatar.invulnerableTime = config.avatar.invulnerableTime || 10;
