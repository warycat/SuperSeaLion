var SSL = new Circle({x:0,y:1024});

SSL.init = function(){
  this.speed = 1;
  var sprite = new PIXI.Spine(Loader.path.sslAnim);
  sprite.position = this.position;
  sprite.scale = {x:0.5,y:0.5};
  sprite.state.setAnimationByName('swim',true);
  Gamespace.sprite.addChild(sprite);
  this.sprite = sprite;
  this.vx = 5;
};

SSL.render = function(){
  if(Input.keys.Q)this.ay += this.speed;
  if(Input.keys.E)this.ay -= this.speed;
  Circle.prototype.render.call(SSL);
};


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




var Camera = (function(){
  var width = 1136;
  var height = 640;
  var zoom = 1;
  var speed = 20;
  var xlimit = Screen.width/2 + 128 * 6;
  var ylimit = Screen.height/2 + 128 * 2;
  var center = {
    x:0
  , y:0
  };

  function render(){
    if(Gamespace.isEditing){
      if(Input.keys.A)center.x-=speed;
      if(Input.keys.D)center.x+=speed;
      if(Input.keys.W)center.y-=speed;
      if(Input.keys.S)center.y+=speed;
      if(Input.keys.Z)zoom*=1.01;
      if(Input.keys.X)zoom/=1.01;
      if(Input.keys.C)foregroundUnit*=1.01;
      if(Input.keys.V)foregroundUnit/=1.01;
      if(Input.keys.B)backgroundUnit*=1.01;
      if(Input.keys.N)backgroundUnit/=1.01;
      if(zoom<0.25)zoom=0.25;
      if(zoom>1)zoom=1;
      if(center.x<xlimit) center.x=xlimit;
      if(center.x>Gamespace.width-xlimit) center.x = Gamespace.width - xlimit;
      if(center.y<ylimit) center.y = ylimit;
      if(center.y> Gamespace.height - ylimit) center.y = Gamespace.height - ylimit;
    }else{
      center.x = SSL.sprite.position.x;
      center.y = SSL.sprite.position.y;
      zoom = 1;
      if(center.x<xlimit) center.x=xlimit;
      if(center.x>Gamespace.width-xlimit) center.x = Gamespace.width - xlimit;
      if(center.y<ylimit) center.y = ylimit;
      if(center.y> Gamespace.height - ylimit) center.y = Gamespace.height - ylimit;
    }
    Background.focus(center,zoom);
    Foreground.focus(center,zoom);
    Gamespace.focus(center,zoom);
  }

  return {
    render:render
  };

})();











