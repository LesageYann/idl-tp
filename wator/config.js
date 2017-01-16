var config = {
  grid: {
    toric: true,
    size: {
      x: 30, //default 50
      y: 10 //default 50
    }
  },
  canvasDisplay: true,
  canvasSize: {
    x: 600,
    y: 300,
    unit: 'px'
  },
  box: {
    size: 15,
    unit: 'px'
  },
  delay: 200, //if delay null, manual refresh
  sheduling: "fair", //value radom, sequential,fair
  nbTicks: 40, //infinite if 0
  trace: true,
  panel: true,
  seed: 'any string', //radom if null
  refresh: 2, //if(tick%refresh ==0)
  particules: {
    Fish: 15,
    Shark: 15
  },
  fish: {
    breedTime: 50
  },
  shark: {
    breedTime: 10,
    starveTime: 3,
  },
  render: "TableVue" // WebGLVue or TableVue
};
