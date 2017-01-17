var config = {
  grid: {
    toric: true,
    size: {
      x: 500, //default 50
      y: 300 //default 50
    }
  },
  canvasDisplay: true,
  canvasSize: {
    x: 1000,
    y: 600,
    unit: 'px'
  },
  box: {
    size: 2,
    unit: 'px'
  },
  delay: 10, //if delay null, manual refresh
  sheduling: "fair", //value radom, sequential,fair
  nbTicks: 0, //infinite if 0
  trace: true,
  panel: true,
  seed: 'any string fyou like', //radom if null
  refresh: 1, //if(tick%refresh ==0)
  particules: {
    Particule: 5000
  },
  render: "WebGLVue" // WebGLVue or TableVue
};
