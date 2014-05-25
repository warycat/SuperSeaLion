
var stats = new Stats();
stats.setMode(0); // 0: fps, 1: ms

// Align top-left
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';

// document.body.appendChild( stats.domElement );

var Screen = (function(){
  var width = 1136;
  var height = 640;
  var stage = new PIXI.Stage(0xF0FFFF, true);

  return {
    width:width
  , height:height
  , stage:stage
  };
})();


var Layer = function(unit){
  this.unit = unit;
};

Layer.prototype.width = 4096 * 5;
Layer.prototype.height = 2048;
Layer.prototype.imageWidth = 1024 * 5;
Layer.prototype.imageHeight = 512;

Layer.prototype.init = function(){
  this.sprite.x = Screen.width / 2;
  this.sprite.y = Screen.height / 2;
  this.sprite.scale = {x:this.scale,y:this.scale};
  // this.sprite.anchor = {x:0.5,y:0.5};
  Screen.stage.addChild(this.sprite);
};

Layer.prototype.focus = function(center,zoom){
  var x = center.x / Layer.prototype.width;
  var y = center.y / Layer.prototype.height;
  this.sprite.scale = {x: this.scale * this.unit * zoom, y: this.scale * this.unit * zoom};
  this.sprite.x = Screen.width / 2 - center.x + this.width * (1- this.unit*zoom) * x;
  this.sprite.y = Screen.height / 2 - center.y + this.height * (1- this.unit*zoom) * y;

};

var Background = new Layer(0.6);

Background.init = function(){
  this.sprite = new PIXI.DisplayObjectContainer();
  var tilesTexture = PIXI.Texture.fromImage(Loader.path.backgroundImage);
  this.tiles = new PIXI.TilingSprite(tilesTexture, Layer.prototype.imageWidth, Layer.prototype.imageHeight);
  this.sprite.addChild(this.tiles);
  this.scale = 4;
  Layer.prototype.init.call(this);
};

var Foreground = new Layer(0.8);

Foreground.init = function(){
  var tilesTexture = PIXI.Texture.fromImage(Loader.path.foregroundImage);
  this.sprite = new PIXI.TilingSprite(tilesTexture,Layer.prototype.imageWidth,Layer.prototype.imageHeight);
  this.scale = 4;
  Layer.prototype.init.call(this);
};

var Gamespace = new Layer(1);

Gamespace.init = function(){
  this.isEditing = false;
  this.enemyID = 1;
  ED.addEventListener('tab',Gamespace.edit);
  ED.addEventListener('new',Gamespace.spawn);
  ED.addEventListener('space',Gamespace.change);
  this.sprite = new PIXI.DisplayObjectContainer();
  var tilesTexture = PIXI.Texture.fromImage(Loader.path.gamespaceImage);
  this.tiles = new PIXI.TilingSprite(tilesTexture,this.width,this.height);
  this.tiles.visible = false;
  this.sprite.setInteractive(true);
  this.sprite.hitArea = new PIXI.Rectangle(0,0,Layer.prototype.width,Layer.prototype.height);
  this.sprite.mousedown = function(mouseData){
    var ps = mouseData.getLocalPosition(Gamespace.sprite);
    if(Gamespace.isEditing){
      ED.dispatchEvent({type:'new',position:ps});
    }
  };

  this.sprite.addChild(this.tiles);
  this.scale = 1;
  Layer.prototype.init.call(this);
  this.setup();
};

Gamespace.edit = function(event){
  Gamespace.isEditing = !Gamespace.isEditing;
  Gamespace.tiles.visible = Gamespace.isEditing;
};

Gamespace.setup = function(){
  // var ssl = new PIXI.Spine(Loader.path.sfAnim);
  // ssl.x = 500;
  // ssl.y = 500;
  // ssl.scale = {x:0.5,y:0.5};
  // ssl.state.setAnimationByName('swim',true);
  // this.sprite.addChild(ssl);
  // this.ssl = ssl;
};

Gamespace.change = function(event){
  if(!Gamespace.isEditing) return;
  Gamespace.enemyID++;
  if(Gamespace.enemyID > 8) Gamespace.enemyID = 1;
  // console.log(event);
};

Gamespace.spawn = function(event){
  var position = event.position;
  var enemy = new Enemy(Gamespace.enemyID,position);
};
