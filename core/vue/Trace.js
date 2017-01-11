function Trace(HTMLContainer, environment) {

  var self=this; //useful for event;

  this.root = document.createElement('div');
  this.root.id = 'trace';
  this._textFilename = document.createElement('input');
  this._trigger = document.createElement('button');
  this._trigger.innerHTML = "refresh trace";

  this._trigger.addEventListener("click", function(){
    self.saveFiche();
  });
  this._env = environment;
  this._trace = "";

  this.root.appendChild(this._textFilename);
  this.root.appendChild(this._trigger);
  document.getElementById("panel").appendChild(this.root);

  if ( Trace.initialized !== true) {

    Trace.prototype.update = function (agents) {
      for (var i = 0; i < agents.length; i++) {
        if (agents[i].changeDir()) {
          this._trace += "Agent;\r\n";
        }
      }
      this._trace += "Tick;\r\n";
    };

    Trace.prototype.saveFiche = function () {
      var name = this._textFilename.value || this._textFilename.placeholder;
      var data = this._trace;
      console.log("savefiche", name, data);
      saveAs(
              new Blob([data]
                      , {type: "text/plain;charset=" + document.characterSet})
              , name + ".csv"
              );
    }


    Trace.initialized = true;
  }
}