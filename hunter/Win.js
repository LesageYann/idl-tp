/* This agent exchange position if position is already occuped
 */

class Win extends Agent {

  constructor(x, y, env, style) {
    style = "url('../images/win.png')";
    super(x, y, env, style);
    this.age = 0;
    this.nbEat = 0;
  };

  decide() {
  };
}
