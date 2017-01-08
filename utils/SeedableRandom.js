function seedableRandom(newSeed) {
  var seed = newSeed;
  if(newSeed ==null){
    seed= Math.floor(Math.random()*100000);
  }

  this.next=function(){
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };
  
  this.newSeed=function(newSeed){
    seed= newSeed;
  };
}