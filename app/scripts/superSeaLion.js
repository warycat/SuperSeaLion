var SSL = (function(){
  var width = 100;
  var height = 100;
  var health = 10;
  var sprite;
  var acceleration = {
    x:1
  , y:1
  };
  var velocity = {
    x:10
  , y:10
  };
  var center = {
    x:0
  , y:0
  };

  function init(){
    var sprite = new PIXI.Spine(Loader.path.sslAnim);
    sprite.position = {x:1000,y:1024};
    sprite.scale = {x:0.5,y:0.5};
    sprite.state.setAnimationByName('swim',true);
    Gamespace.sprite.addChild(sprite);
    this.sprite = sprite;
  }

  return {
    width:width
  , height:height
  , health:health
  , center:center
  , velocity:velocity
  , acceleration:acceleration
  , init:init
  , sprite:sprite
  };
})();

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
    name:'lobsterAnim'
  , anim:'both_attack'
  }
];

var Enemy = function(enemyID, position){
  var enemys = ['flAnim','gcAnim','jfAnim','lfAnim','octopusAnim','sgAnim','sfAnim','lobsterAnim'];
  var enemyData = EnemyDatas[enemyID-1];
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
    SSL.sprite.position.x += 10;
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
      if(Input.keys.Q)SSL.sprite.position.y += speed;
      if(Input.keys.E)SSL.sprite.position.y -= speed;
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

var Renderer = (function(){
  var renderer = new PIXI.autoDetectRenderer(Screen.width, Screen.height);
  var paused = true;
  renderer.view.style.display = "block";
  renderer.view.style.margin = "auto";
  resize();
  document.body.appendChild(renderer.view);
  $(window).resize(function(){
    resize();
  });

  function resize(){
    renderer.view.style.width = $(window).width() + 'px';
    renderer.view.style.height = $(window).width()/1136 * 640 + 'px';
  }

  function play(){
    paused = false;
    requestAnimFrame(animate);
  }

  function pause(){
    paused = true;
  }

  function animate(){
    if(paused)return;

    Camera.render();
    renderer.render(Screen.stage);
    requestAnimFrame(animate);
    stats.update();
  }

  return {
    play:play
  , pause:pause
  , resize:resize
  };
})();

Input.init();

Loader.load();







