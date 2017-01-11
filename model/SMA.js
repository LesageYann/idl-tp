function SMA(agents) {

  this._agents = agents;
  this._observers = [];
  this._hasChanged = false;
  this._tick = 0;

  if (SMA.initialized !== true) {
    /*Make a shuffle of agents
     */
    function fair(sma) {
      var j, x, i;
      for (i = sma._agents.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = sma._agents[i - 1];
        sma._agents[i - 1] = sma._agents[j];
        sma._agents[j] = x;
      }
      sma._executeTurn.sequential(sma);
    };
    
    function random(sma) {
      var i, l=sma._agents.length;
      for (i = l; i; i--) {
        sma._agents[Math.floor(Math.random() * l)].decide();
      }
    };
    
    function sequential(sma){
      //nothing todo, always the same order
      for (i = 0; i < sma._agents.length; i++) {
        sma._agents[i].decide();
      }
    }

    SMA.prototype._executeTurn = {
      fair : fair,
      random: random,
      sequential: sequential
    };

    SMA.prototype.run = function () {
        self = this;
        self._tick = 1;
        self._inTurn = false;
        if (config.delay != 0) {
          self._intervalID = window.setInterval(function () {
            self.launchTurn(self);
          }, config.delay);
        }
    };

    SMA.prototype.launchTurn = function () {
      self =this;
      if (!self._inTurn) {
        self._inTurn = true;
        self.turn();
        if (self._tick == config.nbTicks) {
          console.log("clear interval")
          clearInterval(self._intervalID);
        }
        self._tick++;
        self._inTurn = false;
      }
    };

    SMA.prototype.turn = function () {
      this._executeTurn[config.sheduling](this);
      
      if (this.hasChanged() ) {
        this.notifyObserver();
      }
    };

    SMA.prototype.hasChanged = function () {
      return this._hasChanged;
    };

    SMA.prototype.setChanged = function () {
      this._hasChanged = true;
    };

    SMA.prototype.addObserver = function (observer) {
      this._observers.push(observer);
    };

    SMA.prototype.notifyObserver = function () {
      for (var i = 0; i < this._observers.length; i++) {
        this._observers[i].update(this._agents);
      }
      this._hasChanged = false;
    };

    SMA.initialized = true;
  }
}