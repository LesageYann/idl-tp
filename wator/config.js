var config = {
  grid: {
    toric: true,
    size: {
      x: 100, //default 50
      y: 60 //default 50
    }
  },
  canvasDisplay: true,
  canvasSize: {
    x: 1000,
    y: 600,
    unit: 'px'
  },
  box: {
    size: 10,
    unit: 'px'
  },
  delay: 50, //if delay null, manual refresh
  sheduling: "fair", //value radom, sequential,fair
  nbTicks: 0, //infinite if 0
  trace: true,
  panel: true,
  seed: 'any string', //radom if null
  refresh: 1, //if(tick%refresh ==0)
  particules: {
    Fish: 400,
    Shark: 10,
    SharkRandom: 10
  },
  fish: {
    breedTime: 2
  },
  shark: {
    breedTime: 8,
    starveTime: 4
  },
  render: "TableVue" // WebGLVue or TableVue
};
