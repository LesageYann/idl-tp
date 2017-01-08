function CanvasVue(HTMLContainer,environment) {

  this._canvas = document.createElement('canvas');
  this._env = environment;

  if (typeof CanvasVue.initialized !== true) {

    CanvasVue.prototype.update = function () {
      //drawing
    };
    
    

    CanvasVue.initialized = true;
  }
}