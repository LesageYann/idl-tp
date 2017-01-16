var expect = chai.expect;

describe( "SMA", function () {
  describe( "killAgent", function () {
    it( "should set the number of colums", function () {
      a1 = new Agent( 1, 1 );
      a2 = new Agent( 1, 2 );
      a3 = new Agent( 1, 3 );
      var sma = new SMA( [ a1, a2, a3 ], {
        Agent: 0
      } )
      sma.killAgent( a2 );
      expect( sma.getNumberOfAgents().Agent ).to.equal( 3 );
    } );
  } );
} );
