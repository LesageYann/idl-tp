function Environment(x,y,toric){
  this._x = x || 50;
  this._y = y || 50;
  this._toric = toric;
  this._plan = [];
  this._sma={setChanged:function(){}};//mock before set sma
  
  for(var i=0;i < this._x ;i++){
    this._plan[i]= [];
  }
  
  if (typeof Environment.initialized !== true) {

    Environment.prototype.isToric = function () {
      return this._toric;
    };
    
    Environment.prototype.xSize = function () {
      return this._x;
    };
    
    Environment.prototype.ySize = function () {
      return this._y;
    };
    
    Environment.prototype.setSMA = function (sma) {
      this._sma=sma;
      //sma.addObserver(this);
    };
    
    /* change position on plan
     * return agent if the newPos is already occuped
     */
    Environment.prototype.moveAgent= function(agent, newPos){
      this._handleBound(newPos);
      this._plan[agent.x()][agent.y()]=null;
      res = this._plan[newPos.x][newPos.y];
      this._plan[newPos.x][newPos.y]=agent;
      this._sma.setChanged();
      return res;
    };
    
    /* change position on plan
     * erase previous agent if the newPos is already occuped
     */
    Environment.prototype.setAgentAt= function(agent, newPos){
      this._handleBound(newPos);
      this._plan[newPos.x][newPos.y]=agent;
      this._sma.setChanged();
    };
    
    Environment.prototype._handleBound= function(newPos){
      if(this._toric){
        if(newPos.x >= this._x || newPos.x <0){
          newPos.x= ( newPos.x + this._x )%2;
        }
        if(newPos.y >= this._y || newPos.y <0){
          newPos.y= ( newPos.y + this._y )%2;
        }
      }else{
        if(newPos.x >= this._x || newPos.x <0){
          throw new ExceptionXBound(newPos.x);
        }
        if(newPos.y >= this._y || newPos.y <0){
          throw new ExceptionYBound(newPos.y);
        }
      }
    };
    
    Environment.prototype.aroundFree = function(pos){
      res= [];
      for(i=-1; i<2;i++){
        this._addToFree(x+i,y+i,res);
        this._addToFree(x+i,y+i+1,res);
      }
      return res;
    };
    
    Environment.prototype._addToFree=function (x,y,arr){
      if(this.isFree(x,y)){
        arr.push({x:x,y:y});
      }
    };
    
    Environment.prototype.case= function(x,y){
      return this._plan[x][y];
    };
    
    Environment.prototype.isFree= function(x,y){
      return this._plan[x][y] == null;
    };

    Environment.initialized = true;
  }
}
