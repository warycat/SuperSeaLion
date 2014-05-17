// create an array of assets to load
console.log('supersealion');

var Screen = (function(){
  var width = 960;
  var height = 640;
  var stage = new PIXI.Stage(0xF0FFFF, true);

  return {
    width:width
  , height:height
  , stage:stage
  };
})();


function Layer(unit){
  this.width = 8192;
  this.height = 4096;
  this.unit = unit;
}

Layer.prototype.init = function(){
  this.sprite.x = Screen.width / 2;
  this.sprite.y = Screen.height / 2;
  this.sprite.scale = {x:this.scale,y:this.scale};
  Screen.stage.addChild(this.sprite);
};

Layer.prototype.focus = function(center,zoom){
  var x = center.x / this.width;
  var y = center.y / this.height;
  this.sprite.anchor = {x:x,y:y};
  this.sprite.scale = {x: zoom * this.scale / this.unit, y: zoom * this.scale / this.unit};
};

var Background = new Layer(1.2);

Background.init = function(){
  this.sprite = PIXI.Sprite.fromImage(Loader.path.backgroundImage);
  this.scale = 8;
  Layer.prototype.init.call(this);
};

var Foreground = new Layer(1.1);

Foreground.init = function(){
  this.sprite = PIXI.Sprite.fromImage(Loader.path.foregroundImage);
  this.scale = 8;
  Layer.prototype.init.call(this);
};

var Gamespace = new Layer(1);

Gamespace.init = function(){
  var texture = PIXI.Texture.fromImage(Loader.path.gamespaceImage);
  this.sprite = new PIXI.TilingSprite(texture,this.width,this.height);
  this.scale = 1;
  Layer.prototype.init.call(this);
};




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
  var xlimit = Screen.width/2;
  var ylimit = Screen.height/2;
  var center = {
    x:480
  , y:2048
  };

  function render(){
    center.x += 0.1;
    if(Input.keys.A)center.x-=speed;
    if(Input.keys.D)center.x+=speed;
    if(Input.keys.W)center.y-=speed;
    if(Input.keys.S)center.y+=speed;
    if(Input.keys.Z)zoom*=1.01;
    if(Input.keys.X)zoom/=1.01;
    if(zoom<0.8)zoom=0.8;
    if(zoom>1)zoom=1;
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
  }

  return {
    play:play
  , pause:pause
  , resize:resize
  };
})();

Input.init();



Loader.load();







