/* This agent exchange position if position is already occuped
 */
class KillerAgent extends Agent {

  eat( preyPos ) {
    this._env.getCase( preyPos ).agent.die();
  }
}
