var config = {
  grid: {
    toric: true,
    size: {
      x: 200, //default 50
      y: 100 //default 50
    }
  },
  ToucheBinding: true,
  canvasDisplay: true,
  canvasSize: {
    x: 800,
    y: 400,
    unit: 'px'
  },
  box: {
    size: 4,
    unit: 'px'
  },
  delay: 200, //if delay null, manual refresh
  delay: 10, //if delay null, manual refresh
  sheduling: "fair", //value radom, sequential,fair
  nbTicks: 0, //infinite if 0
  trace: true,
  panel: true,
  seed: 'any string', //radom if null
  refresh: 10, //if(tick%refresh ==0)
  particules: {
    //Particule: 4000,
    ParticuleNathan: 4000
  },
  render: "WebGLVue", // WebGLVue or TableVue
  possibleAgent: [ "Particule", "ParticuleNathan" ]
};
