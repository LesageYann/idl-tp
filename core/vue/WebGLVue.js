
function WebGLVue(HTMLContainer, environment) {

  this._container = HTMLContainer;
  this._env = environment;
  this._x = config.grid.size.x;
  this._y = config.grid.size.y;
  this._boxSize = config.box.size;
  this._refresh = config.refresh || 1;
  this._tick = this._refresh; // for drawing at the first tick

  if (WebGLVue.initialized !== true) {

    this._idGenerator = 0;

    WebGLVue.prototype.update = function (agents) {
      if (this._tick == this._refresh) {
        this._repaint(agents);
        //requestAnimationFrame(this._repaint);
        this._tick = 0;
      }
      this._tick++;
    };

    WebGLVue.prototype._repaint = function (agents) {
      //drawing
      for (var i = 0; i < agents.length; i++) {
        if (agents.geometry == null) {
          this.createAgent(agents[i]);
        } else {
          agents[i].geometry.position.x = (agents[i].x() * this._boxSize);
          agents[i].geometry.position.y = (agents[i].y() * this._boxSize);
        }
      }
      console.log(this._camera, this._scene)
      this._render();
    };

    WebGLVue.prototype.init = function () {
      var scene = new THREE.Scene();
      var width = this._x * this._boxSize;
      var height = this._y * this._boxSize;
      var w = width / 2;
      var h = height / 2;
      var camera = new THREE.OrthographicCamera(-w, w, h, -h, -500, 1000);

      var renderer = new THREE.WebGLRenderer();
      renderer.setSize(config.canvasSize.x, config.canvasSize.y);
      this._container.appendChild(renderer.domElement);

      var geometry = new THREE.PlaneGeometry(width, height);
      var material = new THREE.MeshBasicMaterial({color: 0x555577});
      var plane = new THREE.Mesh(geometry, material);
      plane.position.x = w;
      plane.position.y = h;

      scene.add(plane);

      camera.position.z = 10;
      camera.position.x = w;
      camera.position.y = h;

      var render = function () {

        //cube.rotation.x += 0.1;
        //cube.rotation.y += 0.1;

        renderer.render(scene, camera);
      };
      this._render = render;
      this._renderer = renderer;
      this._camera = camera;
      this._scene = scene;
      this._render = render
      render();
    };

    /*
     * create agent representation in model
     */
    WebGLVue.prototype.createAgent = function (agent) {
      var geometry = new THREE.SphereGeometry(this._boxSize, 16, 16);
      var material = new THREE.MeshBasicMaterial({color: agent.color()});
      var sphere = new THREE.Mesh(geometry, material);
      sphere.position.x = agent.x() * this._boxSize;
      sphere.position.y = agent.y() * this._boxSize;
      agent.geometry = sphere;
      this._scene.add(sphere);
    }

    WebGLVue.initialized = true;
  }

  this.init();
}