/* This agent exchange position if position is already occuped
 */
class SharkRandom extends Shark {

  _buildPreyAndFree( prey, free ) {
    var pos, agent, tmpPrey = [],
      tmpFree = [];
    for ( var i = -1; i < 2; i++ ) {
      for ( var j = -1; j < 2; j++ ) {
        pos = {
          x: this.x() + i,
          y: this.y() + j
        };
        this._builderAddPos( pos, tmpPrey, tmpFree );
      }
    }
    if ( tmpPrey.length ) {
      prey.push( tmpPrey[ Math.floor( Math.random() * tmpPrey.length ) ] );
    } else if ( tmpFree.length ) {
      free.push( tmpFree[ Math.floor( Math.random() * tmpFree.length ) ] );
    }
  }
}
