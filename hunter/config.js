var config = {
  grid: {
    toric: true,
    size: {
      x: 10, //default 50
      y: 10 //default 50
    }
  },
  canvasDisplay: true,
  canvasSize: {
    x: 1000,
    y: 600,
    unit: 'px'
  },
  box: {
    size: 20,
    unit: 'px'
  },
  delay: 200, //if delay null, manual refresh
  sheduling: "fair", //value radom, sequential,fair
  nbTicks: 0, //infinite if 0
  trace: true,
  panel: true,
  seed: 'any string', //radom if null
  refresh: 1, //if(tick%refresh ==0)
  particules: {
    Wall: 1,
    Avatar: 1,
    Hunter: 1
  },
  render: "TableVue" // WebGLVue or TableVue
};
