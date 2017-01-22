var config = {
  grid: {
    toric: false,
    size: {
      x: 600, //default 50
      y: 400 //default 50
    }
  },
  canvasDisplay: true,
  canvasSize: {
    x: 1200,
    y: 800,
    unit: 'px'
  },
  box: {
    size: 4,
    unit: 'px'
  },
  delay: 50, //if delay null, manual refresh
  sheduling: "fair", //value radom, sequential,fair
  nbTicks: 0, //infinite if 0
  trace: true,
  panel: true,
  seed: 'any string fyou like', //radom if null
  refresh: 1, //if(tick%refresh ==0)
  particules: {
    Particule: 2000
  },
  render: "WebGLVue" // WebGLVue or TableVue
};
