var Enemy = function(){};

Enemy.prototype.init = function(id){
  var enemyData = EnemyDatas[id];
  this.sprite = new PIXI.Spine(Loader.path[enemyData.name]);
  this.sprite.position = this.position;
  this.sprite.scale = {x:0.5,y:0.5};
  this.sprite.state.setAnimationByName(enemyData.anim,true);
  Gamespace.sprite.addChildAt(this.sprite,0);
};

var FL = function(position){
  Circle.prototype.constructor.call(this,position,10);
};

FL.prototype = new Circle();

FL.prototype.init = function(){
  Enemy.prototype.init.call(this,1);
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
  Enemy.prototype.init.call(this,2);
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
  Enemy.prototype.init.call(this,3);
};

JF.prototype.render = function(){
  if(this.dead)return;
  this.y = this.position.y + this.A * Math.cos(this.t);
  this.sprite.position.y = this.y;
  this.t+= 0.05;
  if(this.collideCircle(SSL)){
    if(this.sprite.state.current.name === 'float')this.sprite.state.setAnimationByName('attack');
    if(SSL.sprite.state.current.name !== 'ultimate'){
      SSL.sprite.state.setAnimationByName('ultimate');
    }
  }else if(this.collideCircle(FB)){
    if(this.sprite.state.current.name === 'float')this.sprite.state.setAnimationByName('dead');
    this.dead = true;
  }
};

var jf1 = new JF({x:2500,y:1500});

var LF = function(position){
  Circle.prototype.constructor.call(this,position,20);
};

LF.prototype = new Circle();

LF.prototype.init = function(){
  this.vx = -1;
  Enemy.prototype.init.call(this,4);
};

LF.prototype.render = function(){
  if(this.dead)return;
  if(this.collideCircle(SSL)){
    if(this.sprite.state.current.name === 'swim')this.sprite.state.setAnimationByName('swim');
    if(SSL.sprite.state.current.name !== 'ultimate'){
      SSL.sprite.state.setAnimationByName('ultimate');
    }
  }else if(this.collideCircle(FB)){
    if(this.sprite.state.current.name === 'swim')this.sprite.state.setAnimationByName('dead');
    this.dead = true;
  }
  Circle.prototype.render.call(this);
};

var lf1 = new LF({x:2500,y:1200});

var Octopus = function(position){
  Circle.prototype.constructor.call(this,position,20);
};

Octopus.prototype = new Circle();

Octopus.prototype.init = function(){
  Enemy.prototype.init.call(this,5);
};

Octopus.prototype.render = function(){
  if(this.collideCircle(SSL)){
    if(this.sprite.state.current.name === 'swim')this.sprite.state.setAnimationByName('attack');
    if(SSL.sprite.state.current.name !== 'ultimate'){
      SSL.sprite.state.setAnimationByName('ultimate');
    }
  }else if(this.collideCircle(FB)){
    if(this.sprite.state.current.name === 'swim')this.sprite.state.setAnimationByName('dead');
    this.dead = true;
  }
};

var o = new Octopus({x:2800,y:1200});

var SG = function(position){
  Circle.prototype.constructor.call(this,position,20);
};

SG.prototype = new Circle();

SG.prototype.init = function(){
  Enemy.prototype.init.call(this,6);
};

SG.prototype.render = function(){
  if(this.dead){
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
    Circle.prototype.render.call(this);
    return;
  }
  if(this.collideCircle(FB)){
    if(this.sprite.state.current.name === 'fly')this.sprite.state.setAnimationByName('dead');
    this.dead = true;
    this.ay = 0.7;
  }
};

var sg1 = new SG({x:3000,y:700});

var SF = function(position){
  Circle.prototype.constructor.call(this,position,20);
};

SF.prototype = new Circle();

SF.prototype.init = function(){
  this.vx = 2;
  Enemy.prototype.init.call(this,7);
};

SF.prototype.render = function(){
  if(this.dead)return;
  if(this.collideCircle(SSL)){
    if(this.sprite.state.current.name === 'jab')this.sprite.state.setAnimationByName('jab',true);
    if(SSL.sprite.state.current.name !== 'ultimate'){
      SSL.sprite.state.setAnimationByName('ultimate');
    }
  }else if(this.collideCircle(FB)){
    if(this.sprite.state.current.name === 'jab')this.sprite.state.setAnimationByName('dead');
    this.dead = true;
  }
  Circle.prototype.render.call(this);
};

var sf1 = new SF({x:1700,y:1600});

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
  , anim:'jab'
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













