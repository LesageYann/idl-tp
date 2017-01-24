class PanelVue {
  constructor(HTMLContainer, environment) {

    this._env = environment;
    this._container = HTMLContainer;
    if (this._container) {
      this._style = document.createElement('style');

      this._container.appendChild(this._style);

    this._div = document.createElement( 'div' );
    this._container.appendChild( this._div );
    this.addFormCustom();
  }

  addFormCustom() {
    this._form = document.createElement( 'form' );
    this._form.addEventListener( "submit", function ( event ) {
      event.preventDefault()
    } );
    var innerHTML = "";
    for ( var i = 0; i < config.possibleAgent.length; i++ ) {
      innerHTML += '<label>' + config.possibleAgent[ i ] +
        '</label><input type="number" name="' + config.possibleAgent[ i ] +
        '" value="' + ( config.particules[ config.possibleAgent[ i ] ] || 0 ) + '"><br />';
    }
    this._form.innerHTML = innerHTML;
    var btn = document.createElement( 'button' );
    btn.innerHTML = "new simu";
    this._form.appendChild( btn );
    var self = this;
    btn.addEventListener( 'click', function () {
      self.custom();
    } );
    this._container.appendChild( this._form );
  }

  update(agents) {
    if (this._container) {
      this._repaint(agents);
    }
  custom() {
    for ( var i = 0; i < config.possibleAgent.length; i++ ) {
      config.particules[ config.possibleAgent[ i ] ] = this._form[ config.possibleAgent[ i ] ].value || config.particules[ config.possibleAgent[ i ] ];
    }
    main.newSimu();
  }

  update( agents ) {
    this._repaint( agents );
  };

  _repaint() {
    var numberOfAgents = this._env.getNumberOfAgents();
    var agentsDetails = 'Tick: ' + this._env.getTick() + "\n<br/><br/>";
    var keys = Object.keys(numberOfAgents);
    for (var i = 0; i < keys.length; i++) {
      var agentName = keys[i];
      agentsDetails += agentName + "\n Population: " + numberOfAgents[agentName] + "\n<br/>" +
        "#Initial : " + config.particules[agentName] + "\n<br/>";
      if (config.params) {
        for (var params in config.params[agentName]) {
          agentsDetails += params + ": " + config.params[agentName][params] + "\n<br/>";
        }
        agentsDetails += "<br/>";
      }
    }

    this._div.innerHTML = agentsDetails;
  };
}
