class PanelVue {
  constructor( HTMLContainer, environment ) {

    this._env = environment;
    this._container = HTMLContainer;
    this._style = document.createElement( 'style' );

    this._container.appendChild( this._style );

    this._div = document.createElement( 'div' );
    this._container.appendChild( this._div );

  }

  update( agents ) {
    this._repaint( agents );
  };

  _repaint() {
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

    this._div.innerHTML = agentsDetails;
  };
}
