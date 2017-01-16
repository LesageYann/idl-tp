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
  nbTicks: 0, //infinite if 0
  trace: true,
  panel: true,
  seed: 'any string', //radom if null
  refresh: 2, //if(tick%refresh ==0)
  particules: {
    Fish: 40,
    Shark: 10
  },
  fish: {
    breedTime: 10
  },
  shark: {
    breedTime: 10,
    starveTime: 4
  },
  render: "TableVue" // WebGLVue or TableVue
};
