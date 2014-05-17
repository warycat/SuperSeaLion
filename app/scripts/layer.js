
var stats = new Stats();
stats.setMode(0); // 0: fps, 1: ms

// Align top-left
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';

document.body.appendChild( stats.domElement );

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
  this.unit = unit;
}

Layer.prototype.width = 8192;
Layer.prototype.height = 4096;

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

