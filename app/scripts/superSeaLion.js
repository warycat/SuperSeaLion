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
  var width = 960;
  var height = 480;
  var zoom = 1;
  var speed = 10;
  var backgroundUnit = 0.5;
  var foregroundUnit = 1;
  var xlimit = Screen.width/2;
  var ylimit = Screen.height/2;
  var center = {
    x:0
  , y:0
  };

  function render(){
    // center.x += 10;
    // center.y += 10;
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
    if(foregroundUnit<0.5)foregroundUnit = 0.5;
    if(foregroundUnit>1)foregroundUnit = 1;
    if(backgroundUnit<0.25)backgroundUnit = 0.25;
    if(backgroundUnit>1)backgroundUnit = 1;
    Background.unit = backgroundUnit;
    Foreground.unit = foregroundUnit;
    if(center.x<xlimit) center.x=xlimit;
    if(center.x>Gamespace.width-xlimit) center.x = Gamespace.width - xlimit;
    if(center.y<ylimit) center.y = ylimit;
    if(center.y> Gamespace.height - ylimit) center.y = Gamespace.height - ylimit;
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







