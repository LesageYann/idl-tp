/* This agent exchange position if position is already occuped
 */

class Avatar extends Agent {

  constructor(x, y, env, style) {
    style = "url('../images/avatar.gif')";

    super(x, y, env, style);
    var self = this;
    this.letterBox = {lastDirection: {x: 0, y: 0}, direction: {x: 0, y: 0}};
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
  }

  decide() {
    var pos = {
      x: this._pos.x + this.letterBox.direction.x,
      y: this._pos.y + this.letterBox.direction.y
    };
    if (this._perception(pos)) {
      this._move(pos);
      //  this._dijkstra();
    }
  };


  _dijkstra() {
    console.log(this._pos);
    var distance = 1;
    var listPos = [this._pos];
    while (listPos.length) {
      console.log(listPos);
      listPos = _dijkstraTurn(listPos, distance);
      distance++;
    }
    console.log(this._env._plan);
  };

  _dijkstraTurn(listPos, distance) {
    var nextListPos = [];
    for (var index in listPos) {
      var pos = listPos[index];
      var around = this._env.getAround(pos);
      for (var index in around) {
        var position = around[index];
        if (!this._env._plan[position.x][position.y].distance) {
          this._env._plan[position.x][position.y].distance = distance;
          nextListPos.push(position);
        }
      }
    }
    distance++;
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
  }
}

Avatar.CODE = {37: {x: -1, y: 0}, 38: {x: 0, y: 1}, 39: {x: 1, y: 0}, 40: {x: 0, y: -1}};
