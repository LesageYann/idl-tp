/* This agent exchange position if position is already occuped
 */
class SharkRandomAdult extends SharkRandom {

  _builderAddPos( pos, prey, free ) {
    try {
      var agent = this._env.getCase( pos ).agent;
      if ( agent == null ) {
        free.push( pos );
      } else if ( agent instanceof Fish ) {
        if ( agent.age > agent.constructor.breedTime )
          prey.push( pos );
      }
    } catch ( e ) {
      //if the case don't exist we do nothing
    }
  }
}
