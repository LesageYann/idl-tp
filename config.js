var config={
  grid:{
    toric: true,
    size: {
      x:50, //default 50
      y:50  //default 50
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
  nbTicks:50, //infinite if 0
  trace: true,
  seed: 'any string you like', //radom if null
  refresh:1, //if(tick%refresh ==0)
  particules:{
    Agents: 6
  },
  render:"WebGLVue"// WebGLVue or TableVue
};

