var config = {
  grid: {
    toric: true,
    size: {
      x: 50, //default 50
      y: 15 //default 50
    }
  },
  canvasDisplay: true,
  canvasSize: {
    x: 300,
    y: 300,
    unit: '%'
  },
  box: {
    size: 10,
    unit: 'px'
  },
  delay: 25, //if delay null, manual refresh
  sheduling: "fair", //value radom, sequential,fair
  nbTicks: 0, //infinite if 0
  trace: true,
  seed: 'any string', //radom if null
  refresh: 1, //if(tick%refresh ==0)
  particules: {
    Fish: 1
  },
  fish: {
    breedTime: 10
  },
  shark: {
    breedTime: 10
  },
  render: "TableVue" // WebGLVue or TableVue
};
