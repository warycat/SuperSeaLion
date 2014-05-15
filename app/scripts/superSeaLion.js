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


var Background = (function(){
  var width = 1024;
  var height = 512;
  var unit = 1;
  var scale = 1;
  var backgroundImageName = "images/background1.png";
  Loader.push(backgroundImageName);
  var background = new PIXI.Sprite.fromImage(backgroundImageName);
  background.scale = {x:scale,y:scale};
  background.x = Screen.width / 2;
  background.y = Screen.height / 2;
  Screen.stage.addChild(background);
  
  function focus(center,scale){
    var x = center.x * unit / width;
    var y = center.y * unit / height;
    background.anchor = {x:x,y:y};
    background.scale = {x:scale*unit,y:scale*unit};
  }

  return{
    focus:focus
  };
})();

var Foreground = (function(){
  var width = 2048;
  var height = 1024;
  var unit = 2;
  var scale = 2;
  var forgroundImageName = "images/foreground1.png";
  Loader.push(forgroundImageName);
  var foreground = new PIXI.Sprite.fromImage(forgroundImageName);
  foreground.scale = {x:scale,y:scale};
  foreground.x = Screen.width / 2;
  foreground.y = Screen.height / 2;
  Screen.stage.addChild(foreground);

  function focus(center,scale){
    var x = center.x * unit / width;
    var y = center.y * unit / height;
    foreground.anchor = {x:x,y:y};
    foreground.scale = {x:scale*unit,y:scale*unit};
  }

  return{
    focus:focus
  };
})();

// var GameSpace  = (function(){
//   var width = 1024;


//   return {
//     left:left
//   , right:right
//   , top:top
//   , bottom:bottom
//   };
// })();

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
  var width = 480;
  var height = 320;
  var scale = 1;
  var speed = 1;
  var center = {
    x:0
  , y:256
  };

  function render(){
    center.x += 0.1;
    if(Input.keys.A)center.x-=speed;
    if(Input.keys.D)center.x+=speed;
    if(Input.keys.W)center.y-=speed;
    if(Input.keys.S)center.y+=speed;
    if(Input.keys.Z)scale*=1.01;
    if(Input.keys.X)scale/=1.01;
    if(center.x<0)center.x=0;
    if(center.x>1024)center.x=1024;
    if(center.y<0)center.y=0;
    if(center.y>512)center.y=512;
    Background.focus(center,scale);
    Foreground.focus(center,scale);
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







