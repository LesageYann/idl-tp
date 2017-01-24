class TableVue {
  constructor(HTMLContainer, environment) {
    this._env = environment;
    this._container = HTMLContainer;
    this._style = document.createElement('style');
    this._refresh = config.refresh || 1;
    this._tick = this._refresh; // for drawing at the first tick
    this.removeAllChilds();
    this._container.appendChild(this._style);
    
    this.init();
  }
  
  setGame(game) {
    this._game = game;
  }
  
  removeAllChilds() {
    var childNodes = this._container.childNodes;
    for (var index = childNodes.length - 1; index >= 0; index--) {
      this._container.removeChild(childNodes[index]);
    }
  }
  
  update(agents) {
    //control refresh ofdrawing
    if (this._env.end) {
      this.end();
    }
    else {
      if (this._tick == this._refresh) {
        this._repaint(agents);
        this._tick = 0;
      }
      this._tick++;
    }
  };
  
  _repaint(agents) {
    //drawing
    var style = this._basicStyle;
    
    for (var index in agents) {
      var agent = agents[index];
      style += " #x" + agent._pos.x + "y" + agent._pos.y + "{ background:" +
        agent._style + ";}";
      
    }
    /*
     for (var x = 0; x < this._env.xSize(); x++) {
     for (var y = 0; y < this._env.ySize(); y++) {
     var td = document.getElementById("x" + x + "y" + y);
     td.innerHTML = this._env.getCase({x: x, y: y}).distance;
     }
     }
     */
    this._style.innerHTML = style;
    
  };
  
  end() {
    var oldTable = this._canvas;
    
    this._style.innerHTML = "";
    var div = document.createElement('div');
    
    var divAlert = document.createElement('div');
    divAlert.role = "alert";
    var span = document.createElement('span');
    span.className = "glyphicon glyphicon-exclamation-sign";
    divAlert.appendChild(span);
    span = document.createElement('span');
    if (this._env.win) {
      div.className = "alert alert-success";
      span.innerHTML = 'You win !!';
    }
    else {
      div.className = "alert alert-danger";
      span.innerHTML = 'You lose !!';
    }
    var button = document.createElement('button');
    button.className = "btn btn-success";
    button.onclick = this._game.play;
    button.innerHTML = 'Replay';
    divAlert.appendChild(span);
    div.appendChild(divAlert);
    div.appendChild(button);
    this._canvas = div;
    this._container.replaceChild(this._canvas, oldTable);
  }
  
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
    this._canvas = document.createElement('table');
    
    for (var y = this._env.ySize() - 1; y > -1; y--) {
      var tr = document.createElement('tr');
      this._canvas.appendChild(tr);
      
      for (var x = 0; x < this._env.xSize(); x++) {
        tr.insertCell(x).id = "x" + x + "y" + y;
      }
    }
    
    if (config.canvasDisplay) {
      if (oldTable == null) {
        // this._container.removeChild(this._container.lastChild);
        
        this._container.appendChild(this._canvas);
      } else {
        
        this._container.replaceChild(this._canvas, oldTable);
      }
    }
  };
}
