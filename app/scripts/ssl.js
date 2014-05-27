var SSL = new Circle({x:0,y:1024},80);
console.log(SSL);

SSL.init = function(){
  ED.addEventListener('jump',SSL.jump);
  ED.addEventListener('fire',SSL.fire);
  this.mvx = 10;
  this.mvy1 = 100;
  this.mvy2 = 20;
  this.speed = 1;
  this.sprite = new PIXI.Spine(Loader.path.sslAnim);
  this.sprite.position = this.position;
  this.sprite.scale = {x:0.5,y:0.5};
  this.sprite.state.setAnimationByName('swim',true);
  Gamespace.sprite.addChild(this.sprite);
  this.vx = 5;
};

SSL.render = function(){
  this.ay = this.gravity();
  var state = this.sprite.state;
  if(state.current.name === 'jump' && state.isComplete()) state.setAnimationByName('run');
  for(var j in World.dashes){
    var dash = World.dashes[j];
    var c = this.collideDash(dash);
    if(c === 0) continue;
    if(c === -1){
      if(this.vy > 0) this.vy = 0;
      if(this.ay > 0) this.ay = 0;
    }else if(c === 1){
      if(this.vy < 0) this.vy = - 0.5 * this.vy;
      if(this.ay < 0) this.ay = 0;
    }
  }
  if(this.y>1024 && state.isComplete())state.setAnimationByName('swim',true);
  Circle.prototype.render.call(SSL);


};

SSL.jump = function(){
  if(SSL.inWater()){
    if(SSL.vy === 0) {
      SSL.vy = -20;
    } else if(SSL.vy < 0) {
      SSL.vy = 5;
    } else if (SSL.vy > 0) {
      SSL.vy = -10;
    }
  }else{
    if(SSL.sprite.state.current.name === 'jump' && ! SSL.sprite.state.isComplete())return;
    SSL.sprite.state.setAnimationByName('jump');
    SSL.vy = - 25;
  }

  SSL.sprite.state.setAnimationByName('jump');
};
