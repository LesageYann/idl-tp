class TableVue {
  constructor( HTMLContainer, environment ) {

    this._env = environment;
    this._container = HTMLContainer;
    this._style = document.createElement( 'style' );
    this._refresh = config.refresh || 1;
    this._tick = this._refresh; // for drawing at the first tick

    this._container.appendChild( this._style );

    this.init();
  }

  update( agents ) {
    //control refresh ofdrawing
    if ( this._tick == this._refresh ) {
      this._repaint( agents );
      this._tick = 0;
    }
    this._tick++;
  };

  _repaintInfos() {
    var oldDiv = this._div;
    this._div = document.createElement( 'div' );
    this._div.className = "col-xs-6";
    var span = document.createElement( 'span' );
    var numberOfAgents = this._env.getNumberOfAgents();
    var agentsDetails = 'Tick: ' + this._env.getTick() + "\n<br/><br/>";
    var keys = Object.keys( numberOfAgents );
    for ( var i = 0; i < keys.length; i++ ) {
      var agentName = keys[ i ];
      agentsDetails += agentName + "\n Population: " + numberOfAgents[ agentName ] + "\n<br/>" +
        "#Initial : " + config.particules[ agentName ] + "\n<br/>";
      if ( config.params ) {
        for ( var params in config.params[ agentName ] ) {
          agentsDetails += params + ": " + config.params[ agentName ][ params ] + "\n<br/>";
        }
        agentsDetails += "<br/>";
      }
    }

    span.innerHTML = agentsDetails;
    this._div.appendChild( span );
    
    if ( config.canvasDisplay ) {
      if ( oldDiv == null ) {
        this._container.appendChild( this._div );
      } else {
        this._container.replaceChild( this._div, oldDiv );
      }
    }
  };

  _repaint( agents ) {
    //drawing
    var style = this._basicStyle;
    
    for ( var index in agents) {
      var agent = agents[index];
          style += " #x" + agent._pos.x + "y" + agent._pos.y + "{ background:" +
            agent._style+ ";}";
    }
    
    this._style.innerHTML = style;

    this._repaintInfos();
  };

  init() {
    this._basicStyle = "table{border-collapse: collapse;width:" +
      ( config.grid.size.x * config.box.size ) + config.box.unit +
      "}#view{max-width:" + config.canvasSize.x + config.canvasSize.unit +
      ";max-height:" + config.canvasSize.x + config.canvasSize.unit +
      ";overflow: auto;}td{box-sizing: border-box;border:#f8f8f8 solid 1px;width: " + config.box.size +
      config.box.unit + "; height: " + config.box.size + config.box.unit +
      ";background-repeat: no-repeat !important;background-size: 100% !important;}";
    this._style.innerHTML = this._basicStyle;
    var oldTable = this._canvas;
    this._canvas = document.createElement( 'table' );
    this._canvas.className = "col-xs-6";

    for ( var y = 0; y < this._env.ySize(); y++ ) {
      var tr = document.createElement( 'tr' );
      this._canvas.appendChild( tr );

      for ( var x = 0; x < this._env.xSize(); x++ ) {
        tr.insertCell( x ).id = "x" + x + "y" + y;
      }
    }

    if ( config.canvasDisplay ) {
      if ( oldTable == null ) {
        this._container.appendChild( this._canvas );
      } else {
        this._container.replaceChild( this._canvas, oldTable );
      }
    }
  };
}
