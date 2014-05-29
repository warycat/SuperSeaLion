var SSL = new Circle({x:500,y:1024},80);
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
  this.vx = 3;
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
  this.mvy = (this.inWater()) ? this.mvy1 : this.mvy2;
  Circle.prototype.render.call(SSL);

};

SSL.jump = function(){
  if(SSL.inWater()){
    if(SSL.vy === 0) {
      SSL.vy = -15;
    } else if(SSL.vy < 0) {
      SSL.vy = 5;
    } else if (SSL.vy > 0) {
      SSL.vy = -8;
    }
  }else{
    if(SSL.sprite.state.current.name === 'jump' && ! SSL.sprite.state.isComplete())return;
    SSL.sprite.state.setAnimationByName('jump');
    SSL.vy = - 25;
  }

  SSL.sprite.state.setAnimationByName('jump');
};


SSL.fire = function(){
  if(SSL.canFire){
    if(SSL.sprite.state.current.name === 'fire' && ! SSL.sprite.state.isComplete()){
      return;
    }else{
      SSL.sprite.state.setAnimationByName('fire');
      FB.x = SSL.x;
      FB.y = SSL.y;
      FB.sprite.state.setAnimationByName('fire',true);
    }
  }else{
    if(SSL.sprite.state.current.name === 'flip' && ! SSL.sprite.state.isComplete()){
      return;
    }else{
      SSL.sprite.state.setAnimationByName('flip');
    }
  }
};

var Fireball = function(position){
  Circle.prototype.constructor.call(this,position,40);
};

Fireball.prototype.init = function(){
  this.vx = 24;
  this.sprite = new PIXI.Spine(Loader.path.fireballAnim);
  this.sprite.position = this.position;
  this.sprite.scale = {x:0.5,y:0.5};
  this.sprite.state.setAnimationByName('fire',true);
  Gamespace.sprite.addChild(this.sprite);
};

Fireball.prototype.render = function(){
  if(this.sprite.state.isComplete()){
    this.x = 0;
  }
  Circle.prototype.render.call(this);
};

var FB = new Fireball({x:0,y:1024});






