
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

Layer.prototype.width = 4096;
Layer.prototype.height = 2048;

Layer.prototype.init = function(){
  this.sprite.x = Screen.width / 2;
  this.sprite.y = Screen.height / 2;
  this.sprite.scale = {x:this.scale,y:this.scale};
  // this.sprite.anchor = {x:0.5,y:0.5};
  Screen.stage.addChild(this.sprite);
};

Layer.prototype.focus = function(center,zoom){
  var x = center.x / this.width;
  var y = center.y / this.height;
  this.sprite.scale = {x: this.scale * this.unit * zoom, y: this.scale * this.unit * zoom};
  this.sprite.x = Screen.width / 2 - center.x + this.width * (1- this.unit*zoom) * x;
  this.sprite.y = Screen.height / 2 - center.y + this.height*(1- this.unit*zoom) * y;

};

var Background = new Layer(1);

Background.init = function(){
  this.sprite = PIXI.Sprite.fromImage(Loader.path.backgroundImage);
  this.scale = 4;
  Layer.prototype.init.call(this);
};

var Foreground = new Layer(1);

Foreground.init = function(){
  var self = this;
  this.sprite = PIXI.Sprite.fromImage(Loader.path.foregroundImage);
  this.sprite.setInteractive(true);
  this.sprite.mousedown = function(mouseData){
    var ps = mouseData.getLocalPosition(self.sprite);
    console.log(ps.x,ps.y);
  };
  this.scale = 4;
  Layer.prototype.init.call(this);
};

var Gamespace = new Layer(1);

Gamespace.init = function(){
  var texture = PIXI.Texture.fromImage(Loader.path.gamespaceImage);
  this.sprite = new PIXI.TilingSprite(texture,this.width,this.height);
  var ssl = new PIXI.Spine(Loader.path.sfAnim);
  ssl.x = 500;
  ssl.y = 500;
  ssl.state.setAnimationByName('swim',true);
  this.sprite.addChild(ssl);
  this.scale = 1;
  Layer.prototype.init.call(this);
  Gamespace.ssl = ssl;
};

