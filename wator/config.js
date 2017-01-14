var config = {
  grid: {
    toric: true,
    size: {
      x: 30, //default 50
      y: 30  //default 50
    }
  },
  canvasDisplay: true,
  canvasSize: {
    x: 300,
    y: 300,
    unit: '%'
  },
  box: {
    size: 20,
    unit: 'px'
  },
  delay: 500, //if delay null, manual refresh
  sheduling: "fair",//value radom, sequential,fair
  nbTicks: 0, //infinite if 0
  trace: true,
  seed: 'any string fyou like', //radom if null
  refresh: 1, //if(tick%refresh ==0)
  particules: {
    Fish: 200,
    Shark: 10
  },
  params: {
    Fish: {
      FishBreedTime: 10
    },
    Shark: {
      SharkBreedTime: 10,
      SharkStarveTime: 10
    }
  },
  render: "TableVue"// WebGLVue or TableVue
};

