var FL = function(position){
  Circle.prototype.constructor.call(this,position,10);
};

FL.prototype = new Circle();

FL.prototype.init = function(){
  this.sprite = new PIXI.Spine(Loader.path.flAnim);
  this.sprite.position = this.position;
  this.sprite.scale = {x:0.5,y:0.5};
  this.sprite.state.setAnimationByName('swim',true);
  Gamespace.sprite.addChild(this.sprite);
};

FL.prototype.render = function(){
  if(this.collideCircle(SSL)){
    if(this.sprite.state.current.name === 'swim'){
      this.sprite.state.setAnimationByName('dead');
      SSL.sprite.state.setAnimationByName('flip');
      SSL.canFire = true;
    }
  }
};

var fl1 = new FL({x:1000,y:1024});

var GC = function(position){
  Circle.prototype.constructor.call(this,position,10);
};

GC.prototype = new Circle();

GC.prototype.init = function(){
  this.sprite = new PIXI.Spine(Loader.path.gcAnim);
  this.sprite.position = this.position;
  this.sprite.scale = {x:0.5,y:0.5};
  this.sprite.state.setAnimationByName('swim',true);
  Gamespace.sprite.addChildAt(this.sprite,0);
};

GC.prototype.render = function(){
  if(this.dead)return;
  if(this.collideCircle(SSL)){
    if(SSL.sprite.state.current.name === 'flip'){
      if(this.sprite.state.current.name === 'swim'){
        this.sprite.state.setAnimationByName('dead');
      }
    }else{
      if(SSL.sprite.state.current.name !== 'ultimate'){
        SSL.sprite.state.setAnimationByName('ultimate');
      }
    }
  }
  if(this.collideCircle(FB)){
    if(this.sprite.state.current.name === 'swim'){
      this.sprite.state.setAnimationByName('dead');
      this.dead = true;
    }
  }
};

var gc1 = new GC({x:2500,y:950});

var JF = function(position){
  Circle.prototype.constructor.call(this,position,20);
};

JF.prototype = new Circle();

JF.prototype.init = function(){
  this.A = 5;
  this.t = 0;
  this.sprite = new PIXI.Spine(Loader.path.jfAnim);
  this.sprite.position = this.position;
  this.sprite.scale = {x:0.5,y:0.5};
  this.sprite.state.setAnimationByName('float',true);
  Gamespace.sprite.addChildAt(this.sprite,0);
};

JF.prototype.render = function(){
  if(this.dead)return;
  this.y = this.position.y + this.A * Math.cos(this.t);
  this.sprite.position.y = this.y;
  this.t+= 0.05;
  if(this.collideCircle(SSL)){
    if(this.sprite.state.current.name === 'float')this.sprite.state.setAnimationByName('attack');
  }else if(this.collideCircle(FB)){
    if(this.sprite.state.current.name === 'float')this.sprite.state.setAnimationByName('dead');
    this.dead = true;
  }
};

var jf1 = new JF({x:2500,y:1500});

// console.log(fl1);
// 1 fireryLobster  // fl.anim swim, dead
// 2 giantClam     // gc.anim  swim, dead
// 3 jellyFish //jf.anim   attack, float, dead
// 4 largeFish //lf.anim   swim, dead
// 5 octopus //octopus.anim  swim, dead, attack
// 6 seagull //sg.anim   fly, dive, bite, dead
// 7 swordFish //sf.anim   swim, dead, jab
// 8 lobster //lobster.anim  both_attack, top_attack, bottom_attack, dead
// 9 ground
// // 10 iceBlock
// 11  groupFish //gf.anim   swim
// 12  turtle  //turtle.anim walk, dead, defend
// 13  ssl //ssl.anim    fire, flip, idle, jump, run, swim, ultimate
// 14  fireball  //fireball.anim fire
// 15  ulti  //ulti.anim   ulti
// 16  claw1 //c1.anim   both_attack, top_attack, bottom_attack
// 17  claw2 //c2.anim   both_attack, top_attack, bottom_attack

var EnemyDatas = [
  {
    name:'groundAnim'
  , anim:'default'
  }
, {
    name:'flAnim'
  , anim:'swim'
  }
, {
    name:'gcAnim'
  , anim:'swim'
  }
, {
    name:'jfAnim'
  , anim:'float'
  }
, {
    name:'lfAnim'
  , anim:'swim'
  }
, {
    name:'octopusAnim'
  , anim:'swim'
  }
, {
    name:'sgAnim'
  , anim:'fly'
  }
, {
    name:'sfAnim'
  , anim:'swim'
  }
, {
    name:'gfAnim'
  , anim:'swim'
  }
, {
    name:'turtleAnim'
  , anim:'walk'
  }
, {
    name:'lobsterAnim'
  , anim:'both_attack'
  }
, {
    name:'c1Anim'
  , anim:'both_attack'
  }
, {
    name:'c2Anim'
  , anim:'both_attack'
  }
, {
    name:'fireballAnim'
  , anim:'fire'
  }
, {
    name:'ultiAnim'
  , anim:'ulti'
  }
];


var Enemy = function(enemyID, position){
  var enemys = ['groundAnim','flAnim','gcAnim','jfAnim','lfAnim','octopusAnim','sgAnim','sfAnim','gfAnim','lobsterAnim','c1Anim','c2Anim','fireballAnim','ultiAnim'];
  var enemyData = EnemyDatas[enemyID];
  console.log(Loader.path[enemyData.name],position);
  var sprite = new PIXI.Spine(Loader.path[enemyData.name]);
  sprite.position = position;
  sprite.scale = {x:0.5,y:0.5};
  sprite.state.setAnimationByName(enemyData.anim,true);
  Gamespace.sprite.addChild(sprite);
};













