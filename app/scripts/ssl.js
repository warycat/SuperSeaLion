var SSL = new Circle({x:0,y:1024});

SSL.init = function(){
  ED.addEventListener('jump',SSL.jump);
  ED.addEventListener('fire',SSL.fire);
  this.mvx = 10;
  this.mvy = 100;
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
  Circle.prototype.render.call(SSL);
};

SSL.jump = function(){
  if(SSL.sprite.state.current.name === 'jump' && ! SSL.sprite.state.isComplete())return;
  SSL.vy = - 25;
  SSL.sprite.state.setAnimationByName('jump');
};
