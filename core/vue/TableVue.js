function TableVue( HTMLContainer, environment ) {

  this._env = environment;
  this._container = HTMLContainer;
  this._style = document.createElement( 'style' );
  this._refresh = config.refresh || 1;
  this._tick = this._refresh; // for drawing at the first tick

  HTMLContainer.appendChild( this._style );

  if ( TableVue.initialized !== true ) {

    TableVue.prototype.update = function ( agents ) {
      console.log( agents )
      //control refresh ofdrawing
      if ( this._tick == this._refresh ) {
        this._repaint( agents );
        this._tick = 0;
      }
      this._tick++;
    };

    TableVue.prototype._repaint = function ( agents ) {
      //drawing
      var style = this._basicStyle;
      for ( var x = 0; x < this._env.xSize(); x++ ) {
        for ( var y = 0; y < this._env.ySize(); y++ ) {
          if ( !this._env.isFree( {
              x: x,
              y: y
            } ) ) {
            console.log( "repaint", x, y, this._env._plan[ x ][ y ].style() );
            style += " #x" + x + "y" + y + "{ " +
              this._env._plan[ x ][ y ].style() + ";}";
          }
        }
      }
      this._style.innerHTML = style;
    };

    }

    TableVue.prototype.init = function () {
      this._basicStyle = "table{border-collapse: collapse;width:" +
        ( config.grid.size.x * config.box.size ) + config.box.unit +
        "}#view{max-width:" + config.canvasSize.x + config.canvasSize.unit +
        ";max-height:" + config.canvasSize.x + config.canvasSize.unit +
        ";overflow: auto;}td{box-sizing: border-box;border:#f8f8f8 solid 1px;width: " + config.box.size +
        config.box.unit + "; height: " + config.box.size + config.box.unit + "}";
      this._style.innerHTML = this._basicStyle;
      var oldTable = this._canvas;
      this._canvas = document.createElement( 'table' );
      for ( var y = 0; y < this._env.ySize(); y++ ) {
        var tr = document.createElement( 'tr' );
        this._canvas.appendChild( tr );

        for ( var x = 0; x < this._env.xSize(); x++ ) {
          tr.insertCell( x ).id = "x" + x + "y" + y;
        }
      }
    }
  };

      if ( config.canvasDisplay ) {
        if ( oldTable == null ) {
          this._container.appendChild( this._canvas );
        } else {
          this._container.replaceChild( this._canvas, oldTable );
        }
      }
    }
    this._style.innerHTML = style;

    this._repaintInfos();
  };

  init() {
    this._basicStyle = "table{border-collapse: collapse;width:" +
      (config.grid.size.x * config.box.size) + config.box.unit +
      "}#view{max-width:" + config.canvasSize.x + config.canvasSize.unit +
      ";max-height:" + config.canvasSize.x + config.canvasSize.unit +
      ";overflow: auto;}td{box-sizing: border-box;border:#f8f8f8 solid 1px;width: " + config.box.size +
      config.box.unit + "; height: " + config.box.size + config.box.unit + "}";
    this._style.innerHTML = this._basicStyle;
    var oldTable = this._canvas;
    this._canvas = document.createElement('table');
    for (var y = 0; y < this._env.ySize(); y++) {
      var tr = document.createElement('tr');
      this._canvas.appendChild(tr);

  this.init();
};
