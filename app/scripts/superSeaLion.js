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
  var background = new PIXI.Sprite.fromImage(backgroundImageName);
  Screen.stage.addChild(background);

  return {
    sprite:background
  };

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
    if(center.x<0)center.x=0;
    if(center.x>1024)center.x=1024;
    if(center.y<0)center.y=0;
    if(center.y>512)center.y=512;
    World.sprite.x = -center.x;
    World.sprite.y = -center.y;
    World.sprite.scale = {x:2,y:2};
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



// var enemies = [{name:'fish'},{name:'crab'}];
// _.each(enemies,function(enemy){
//   console.log(enemy.name);
// });
// $.getJSON('/bosses_and_enemies.json',function(data){
//   console.log(data);
// });
// var stage = new PIXI.Stage(0xFFFFFF, true);
// var postition = 0;
// var background;
// var background2;

// function animate() {

//   postition += 10;

//   background.position.x = -(postition * 0.6);
//   background.position.x %= 1286 * 2;
//   if (background.position.x < 0) background.position.x += 1286 * 2;
//   background.position.x -= 1286;

//   background2.position.x = -(postition * 0.6) + 1286;
//   background2.position.x %= 1286 * 2;
//   if (background2.position.x < 0) background2.position.x += 1286 * 2;
//   background2.position.x -= 1286;

//   foreground.position.x = -postition;
//   foreground.position.x %= 1286 * 2;
//   if (foreground.position.x < 0) foreground.position.x += 1286 * 2;
//   foreground.position.x -= 1286;

//   foreground2.position.x = -postition + 1286;
//   foreground2.position.x %= 1286 * 2;
//   if (foreground2.position.x < 0) foreground2.position.x += 1286 * 2;
//   foreground2.position.x -= 1286;

//   requestAnimFrame(animate);


//   renderer.render(stage);
// }

// function onAssetsLoaded() {
//   background = PIXI.Sprite.fromImage("images/iP4_BGtile.jpg");
//   background2 = PIXI.Sprite.fromImage("images/iP4_BGtile.jpg");
//   stage.addChild(background);
//   stage.addChild(background2);

//   foreground = PIXI.Sprite.fromImage("images/iP4_ground.png");
//   foreground2 = PIXI.Sprite.fromImage("images/iP4_ground.png");
//   stage.addChild(foreground);
//   stage.addChild(foreground2);
//   foreground.position.y = foreground2.position.y = 640 - foreground2.height;

//   var pixie = new PIXI.Spine("images/PixieSpineData.json");

//   var scale = 0.3; //window.innerHeight / 700;

//   pixie.position.x = 1024 / 3;
//   pixie.position.y = 500;

//   pixie.scale.x = pixie.scale.y = scale;


//   //dragon.state.setAnimationByName("running", true);

//   stage.addChild(pixie);

//   pixie.stateData.setMixByName("running", "jump", 0.2);
//   pixie.stateData.setMixByName("jump", "running", 0.4);

//   pixie.state.setAnimationByName("running", true);



//   stage.mousedown = stage.touchstart = function () {
//     pixie.state.setAnimationByName("jump", false);
//     pixie.state.addAnimationByName("running", true);
//   };

//   var logo = PIXI.Sprite.fromImage("images/logo_small.png");
//   stage.addChild(logo);


//   logo.anchor.x = 1;
//   logo.position.x = 1024;
//   logo.scale.x = logo.scale.y = 0.5;
//   logo.position.y = 640 - 70;
//   logo.setInteractive(true);
//   logo.buttonMode = true;
//   logo.click = logo.tap = function () {
//     window.open("https://github.com/GoodBoyDigital/pixi.js", "_blank");
//   };

//   requestAnimFrame(animate);
// }


// var assetsToLoader = ["images/logo_small.png", "images/PixieSpineData.json", "images/Pixie.json", "images/iP4_BGtile.jpg", "images/iP4_ground.png"];

// create a new loader
// loader = new PIXI.AssetLoader(assetsToLoader);

// use callback
// loader.onComplete = onAssetsLoaded;

//begin load
// loader.load();

// create an new instance of a pixi stage

// create a renderer instance

// set the canvas width and height to fill the screen

// add render view to DOM





