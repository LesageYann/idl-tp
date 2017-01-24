var config = {
  grid: {
    toric: true,
    size: {
      x: 30, //default 50
      y: 30 //default 50
    }
  },
  labyrinth : false,
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
  seed: null, //radom if null
  refresh: 1, //if(tick%refresh == 0)
  particules: {
    Avatar: 1,
    Hunter: 3,
    Defender:  1,
    Wall : 30 * 30 * 15 /100
  },
  hunter : {
    speedModulo : 3
  },
  avatar : {
    speedModulo : 1,
    invulnerableTime : 10
  },
  render: "TableVue" // WebGLVue or TableVue
};
