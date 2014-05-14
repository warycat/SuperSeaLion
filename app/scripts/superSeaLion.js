// create an array of assets to load
console.log('supersealion');

var Screen = (function(){
  var width = 480;
  var height = 320;
  var stage = new PIXI.Stage(0xF0FFFF, true);

  return {
    width:width
  , height:height
  , stage:stage
  };
})();



var World = (function(){
  var width = 1024;
  var height = 512;
  var skyHeight = 128;
  var seaHeight = 384;
  var backgroundImageName = "images/background1.png";
  var foregroundImageName = "images/foreground.png";
  Loader.push(backgroundImageName);
  Loader.push(foregroundImageName);
  var container = new PIXI.DisplayObjectContainer();
  var background = new PIXI.Sprite.fromImage(backgroundImageName);
  container.addChild(background);
  Screen.stage.addChild(container);


  return {
    sprite:container
  };

})();

var Tiles = (function(){
  var size = 64;
  var row = 64;
  var col = 128;
  function absolutePosition(r,c){
    var p = {x:c*size, y:r*size};
    return p;
  }

})();

var SSL = (function(){
  var width = 100;
  var height = 100;
  var health = 10;
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

  return {
    width:width
  , height:height
  , health:health
  , center:center
  , velocity:velocity
  , acceleration:acceleration
  };
})();

var Camera = (function(){
  var width = 240;
  var height = 160;
  var scale = 1;
  var center = {
    x:0
  , y:0
  };
  function render(){
    if(Input.keys.A)center.x--;
    if(Input.keys.D)center.x++;
    if(Input.keys.W)center.y--;
    if(Input.keys.S)center.y++;
    if(Input.keys.Z)scale*=1.01;
    if(Input.keys.X)scale/=1.01;
    if(center.x<0)center.x=0;
    if(center.x>1024)center.x=1024;
    if(center.y<0)center.y=0;
    if(center.y>512)center.y=512;
    World.sprite.x = -center.x;
    World.sprite.y = -center.y;
    World.sprite.scale = {x:scale,y:scale};
  }

  return {
    render:render
  };

})();

var GameSpace  = (function(){
  var left = 0;
  var right = 10000;
  var top = -1000;
  var bottom = 3000;



  return {
    left:left
  , right:right
  , top:top
  , bottom:bottom
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
    renderer.view.style.height = $(window).width()/1.5 + 'px';
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
  }

  return {
    play:play
  , pause:pause
  , resize:resize
  };
})();

Input.init();



Loader.load();







