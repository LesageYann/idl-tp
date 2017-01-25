class Listener {

  constructor( env) {
    this.letterBox = {
      lastDirection: {
        x: 0,
        y: 0
      },
      direction: {
        x: 0,
        y: 0
      }
    };
    this._env=env;
    var self = this;

    window.onkeydown = function ( e ) {
      self.onKeyDown( e );
    };
  };

  onKeyDown( e ) {
    var code = e.keyCode ? e.keyCode : e.which;
    switch( code ) {
      //up,down left,right
      case 37:
      case 38:
      case 39:
      case 40:
        this.setDirection( code )
        break;
      //space
      case 32:
        this._env.pause( code )
        break;
      case 79:
        this.speedUp(Avatar);
        break;
      case 80:
        this.speedDown(Avatar);
        break;
      case 65:
        this.speedUp(Hunter);
        break;
      case 90:
        this.speedDown(Hunter);
        break;
      case 87:
        if(config.delay >100)
          config.delay -= Listener.deltaDelay;
        this._env.pause();
        this._env.pause();
        break;
      case 88:
        if (config.delay <1500)
          config.delay += Listener.deltaDelay;
        this._env.pause();
        this._env.pause();
        break;
      default:
        console.log("key", code, "is unknow");
        break;
    };
  }

  setDirection( code ) {
    this.letterBox.lastDirection = this.letterBox.direction;
    this.letterBox.direction = this.constructor.CODE[ code ];
  }

  speedUp(prototype){
    if(prototype.speedModulo >2)
      prototype.speedModulo -= Listener.deltaSpeed;
  }

  speedDown(prototype){
    if(prototype.speedModulo <29)
      prototype.speedModulo += Listener.deltaSpeed;
  }
}


Listener.CODE = {37: {x: -1, y: 0}, 38: {x: 0, y: 1}, 39: {x: 1, y: 0}, 40: {x: 0, y: -1}};
Listener.deltaSpeed = 1;
Listener.deltaDelay=50;
