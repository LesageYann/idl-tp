function TableVue(HTMLContainer, environment) {

  this._env = environment;
  this._container = HTMLContainer;
  this._style = document.createElement('style');
  this._refresh = config.refresh || 1;
  this._tick = this._refresh; // for drawing at the first tick

  HTMLContainer.appendChild(this._style);

  if (TableVue.initialized !== true) {

    TableVue.prototype.update = function (agents) {
      //control refresh ofdrawing
      if (this._tick == this._refresh) {
        this._repaint(agents);
        this._tick = 0;
      }
      this._tick++;
    };

    TableVue.prototype._repaint = function (agents) {
      //drawing
      for (var x = 0; x < this._env.xSize(); x++) {
        for (var y = 0; y < this._env.ySize(); y++) {
          if (!this._env.isFree(x, y)) {
            this._canvas.children[y].children[x].style.background =
                    this._env._plan[x][y].color();
          } else if (this._canvas.children[y].children[x].style.background != "") {
            this._canvas.children[y].children[x].style.background = "";
          }
        }
      }
    };


    TableVue.prototype.init = function () {
      this._style.innerHTML = "table{border-collapse: collapse;width:" +
              ((config.grid.size.x + 1) * config.box.size + 50) + config.box.unit +
              "}#view{max-width:" + config.canvasSize.x + config.canvasSize.unit +
              ";max-height:" + config.canvasSize.x + config.canvasSize.unit +
              ";overflow: auto;}td{border:black solid 1px;width: " + config.box.size +
              config.box.unit + "; height: " + config.box.size + config.box.unit + "}";
      var oldTable = this._canvas;
      this._canvas = document.createElement('table');
      for (var y = 0; y < this._env.ySize(); y++) {
        var tr = document.createElement('tr');
        this._canvas.appendChild(tr);

        for (var x = 0; x < this._env.xSize(); x++) {
          tr.insertCell(x);
        }
        tr.insertCell(this._env.xSize()).innerHTML = y;
      }
      var tr = document.createElement('tr');
      this._canvas.appendChild(tr);

      for (var x = 0; x < this._env.xSize(); x++) {
        tr.insertCell(x).innerHTML = "" + x;
      }
      tr.insertCell(this._env.xSize()).innerHTML = "x\y";

      if (config.canvasDisplay) {
        if (oldTable == null) {
          this._container.appendChild(this._canvas);
        } else {
          this._container.replaceChild(this._canvas, oldTable);
        }
      }
    };


    TableVue.initialized = true;
  }

  this.init();
}