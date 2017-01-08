var config={
  grid:{
    toric: true,
    size: {
      x:15, //default 50
      y:15  //default 50
    }
  },
  canvasDisplay: true,
  canvasSize: {
    x:400,
    y:400,
    unit:'px'
  },
  box:{
    size:20,
    unit:'px'
  },
  delay:50, //if delay null, manual refresh
  sheduling: "fair",//value radom, sequential,fair
  nbTicks:0, //infinite if 0
  trace: true,
  seed: 'any string you like', //radom if null
  refresh:4, //if(tick%refresh ==0)
  particules:{
    Agents: 6
  }
};

