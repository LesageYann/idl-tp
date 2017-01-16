var expect = chai.expect;

describe( "Environment", function () {
  describe( "#style", function () {
    before( function () {
      Shark.breedTime = 2;
      Shark.starveTime = 20;
    } );

    it( "baby style at creation", function () {
      shark = new Shark( 1, 1 );
      expect( shark.style() ).to.equal( Shark.style.baby );
    } );

    it( "adult style after breed", function () {
      e = new Environment( 3, 3, true );
      sma = new SMA( [], {
        Shark: 0
      } );
      e.setSMA( sma );
      shark = new Shark( 1, 1, e );
      e.addAgent( shark );
      shark.decide();
      shark.decide();
      expect( shark._style ).to.equal( Shark.style.adult );
    } );
  } );
  describe( "#eat", function () {
    before( function () {
      Shark.breedTime = 20;
      Shark.starveTime = 20;
    } );

    it( "eat a fish reduce starveTime", function () {
      e = new Environment( 3, 3, true );
      sma = new SMA( [], {
        Shark: 0,
        Fish: 0
      } );
      e.setSMA( sma );
      shark = new Shark( 1, 1, e );
      fish = new Fish( 2, 1, e );
      e.addAgent( shark );
      e.addAgent( fish );
      shark.decide();
      expect( shark.lastEat ).to.equal( 0 );
    } );

    it( "eat a fish kill him", function () {
      e = new Environment( 3, 3, true );
      sma = new SMA( [], {
        Shark: 0,
        Fish: 0
      } );
      e.setSMA( sma );
      shark = new Shark( 1, 1, e );
      fish = new Fish( 2, 1, e );
      e.addAgent( shark );
      e.addAgent( fish );
      shark.decide();
      expect( sma.getNumberOfAgents().Fish ).to.equal( 0 );
    } );
  } );

  describe( "#starvation", function () {
    before( function () {
      Shark.breedTime = 20;
      Shark.starveTime = 5;
    } );

    it( "don't eat up starve state", function () {
      e = new Environment( 3, 3, true );
      sma = new SMA( [], {
        Shark: 0,
        Fish: 0
      } );
      e.setSMA( sma );
      shark = new Shark( 1, 1, e );
      shark.decide();
      expect( shark.lastEat ).to.equal( 1 );
    } );

    it( "at starveTime, shark die", function () {
      e = new Environment( 3, 3, true );
      sma = new SMA( [], {
        Shark: 0,
        Fish: 0
      } );
      e.setSMA( sma );
      shark = new Shark( 1, 1, e );
      e.addAgent( shark );
      shark.starveTime = 4
      shark.decide();
      expect( sma.getNumberOfAgents().Shark ).to.equal( 0 );
    } );
  } );

  describe( "#breed", function () {
    before( function () {
      Shark.breedTime = 2;
      Shark.starveTime = 20;
    } );

    it( "no breed at first time", function () {
      e = new Environment( 3, 3, true );
      sma = new SMA( [], {
        Shark: 0
      } );
      e.setSMA( sma );
      shark = new Shark( 1, 1, e );
      e.addAgent( shark );
      shark.decide();
      expect( sma.getNumberOfAgents().Shark ).to.equal( 1 );
    } );


    it( " breed at the 3th time", function () {
      e = new Environment( 3, 3, true );
      sma = new SMA( [], {
        Shark: 0
      } );
      e.setSMA( sma );
      shark = new Shark( 1, 1, e );
      e.addAgent( shark );
      shark.decide();
      shark.decide();
      expect( sma.getNumberOfAgents().Shark ).to.equal( 2 );
    } );


    it( " can't breed if no place", function () {
      e = new Environment( 1, 1, true );
      sma = new SMA( [], {
        Shark: 0
      } );
      e.setSMA( sma );
      shark = new Shark( 0, 0, e );
      e.addAgent( shark );
      shark.decide();
      shark.decide();
      expect( sma.getNumberOfAgents().Shark ).to.equal( 1 );
    } );
  } );
} );
