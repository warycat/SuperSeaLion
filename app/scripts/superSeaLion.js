// create an array of assets to load
console.log('supersealion');

var Screen = (function(){
  var width = 960;
  var height = 640;
  var stage = new PIXI.Stage(0xFFFFFF, true);

  return {
    width:width
  , height:height
  , stage:stage
  };
})();

var Input = (function(){
  var keys = {};
  function keydown(event){
    var keyCode = event.keyCode;
    switch(keyCode){
      case 37:
      case 38:
      case 39:
      case 40:
      case 27:
      case 13:
      case 65:
        event.preventDefault();
        keys[keyCode] = true;
        break;
      default:
    }
  }

  function keyup(event){
    var keyCode = event.keyCode;
    switch(keyCode){
      case 37:
      case 38:
      case 39:
      case 40:
        event.preventDefault();
        keys[keyCode] = false;
        break;
      case 27:
        event.preventDefault();
        keys[keyCode] = false;
        onEsc();
        break;
      case 13:
      case 65:
        event.preventDefault();
        keys[keyCode] = false;
        onDone();
        break;
      default:
    }
  }
  function up(){
    if(keys[38] === true) return true;
    return false;
  }

  function down(){
    if(keys[40] === true) return true;
    return false;
  }

  function left(){
    if(keys[37] === true) return true;
    return false;
  }

  function right(){
    if(keys[39] === true) return true;
    return false;
  }
  function init(){
    window.addEventListener('keydown', keydown);
    window.addEventListener('keyup',keyup);
  }
  return {
    init:init
  , up:up
  , left:left
  , down:down
  , right:right
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
  var width = 960;
  var height = 640;
  var scale = 1;
  var center = {
    x:0
  , y:0
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
  renderer.view.style.width = Screen.width;
  renderer.view.style.height = Screen.width;
  document.body.appendChild(renderer.view);

  function play(){
    paused = false;
    requestAnimFrame(animate);
  }

  function pause(){
    paused = true;
  }

  function animate(){
    if(paused)return;
    if(Input.up())console.log('.');
    renderer.render(Screen.stage);
    requestAnimFrame(animate);
  }

  return {
    play:play
  , pause:pause
  };
})();


Input.init();
Renderer.play();

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





