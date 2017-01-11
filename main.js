var main;

window.onload=function(){
  var sma, vue, env, trace;
  var agents=[];
  //make the Math.random predictible and reproducible
  Math.seedrandom(config.seed || Math.random()+'');
  
  function createAgents(particules){
    var x=Math.floor(Math.random() * config.grid.size.x);
    var y=Math.floor(Math.random() * config.grid.size.y);
  
    var keys= Object.keys( particules);
    for(var i=0; i< keys.length; i++){
      for(j=particules[keys[i]]; j>0; j--){
        
        while(!env.isFree(x,y)){
          x= Math.floor(Math.random() * config.grid.size.x);
          y= Math.floor(Math.random() * config.grid.size.y);
        }
        agents.push(createAgent(keys[i],x,y,env));
        env.moveAgent(agents[agents.length-1],{x:x,y:y});
      }
    }
    sma= new SMA(agents, config.refresh);
    env.setSMA(sma);
    sma.addObserver(vue);
    vue.update(agents);
  }
  
  function createTrace(){
    if(config.trace){
      trace= new Trace();
      sma.addObserver(trace);
    }
  }
  
  env= new Environment(config.grid.size.x,config.grid.size.y, config.grid.toric);
  vue= createVue( config.render || "TableVue",document.getElementById('view'),env);
  
  createAgents(config.particules);
  createTrace();

  sma.run();
  
  main ={
    nextTick: function(){sma.launchTurn();},
    agents: function(){return agents;},
    printAgents: function(){ var res="";
      for(i=0;i<agents.length;i++){
        res= res+"x: "+agents[i].x()+" y: "+agents[i].y()+"\n";
      }
      return res;
    }
  };
};