var Floor = function(position,n){
  this.n = n;
  this.position = position;
	Dash.prototype.constructor.call(this, position,n * 64);
};

Floor.prototype.init = function(){
  for(var i = 0 ;i<this.n;i++){
    var sprite = new PIXI.Spine(Loader.path.groundAnim);
    sprite.position.x = this.position.x + i * 64;
    sprite.position.y = this.position.y;
    sprite.state.setAnimationByName('default',true);
    Gamespace.sprite.addChildAt(sprite,0);
  }
};

var f1 = new Floor({x:1500,y:1024},50);
// var f2 = new Floor({x:1500,y:800},20);
