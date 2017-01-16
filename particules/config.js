var config = {
  grid: {
    toric: true,
    size: {
      x: 100, //default 50
      y: 80 //default 50
    }
  },
  canvasDisplay: true,
  canvasSize: {
    x: 300,
    y: 300,
    unit: '%'
  },
  box: {
    size: 5,
    unit: 'px'
  },
  delay: 50, //if delay null, manual refresh
  sheduling: "fair", //value radom, sequential,fair
  nbTicks: 30, //infinite if 0
  trace: true,
  panel: true,
  seed: 'any string fyou like', //radom if null
  refresh: 1, //if(tick%refresh ==0)
  particules: {
    Particule: 100
  },
  render: "TableVue" // WebGLVue or TableVue
};
