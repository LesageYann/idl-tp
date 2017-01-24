/* This agent exchange position if position is already occuped
 */

class Win extends Defender {

  constructor(x, y, env, style) {
    style = style || "url('../images/win.png')";
    super(x, y, env, style);
  };


  die(expire) {
    if(expire){
      super.die(expire);
    }else{
      this._env.stop( true);
    }
  };

  decide() {
  };
}
