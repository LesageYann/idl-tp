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
    console.log(this._pos);
    console.log(this.letterBox.direction);
    var pos = {
      x: this._pos.x + this.letterBox.direction.x,
      y: this._pos.y + this.letterBox.direction.y
    };
    console.log(this._perception(pos));
    if (this._perception(pos)) {
      this._move(pos);
    }
  };
  
  _move(pos) {
    try {
    this._env.moveAgent(this, pos);
    this.lastPos = this._pos;
    this._pos = pos;
    }
  };
  
  _perception(pos) {
    return this._env.isFree(pos)
  }
}

Avatar.CODE = {37: {x: -1, y: 0}, 38: {x: 0, y: 1}, 39: {x: 1, y: 0}, 40: {x: 0, y: -1}};
