console.log("Page Loaded");var Input=function(){function a(a){var b=a.keyCode,c=String.fromCharCode(b);-1!=="ASDQWE".indexOf(c)&&(a.preventDefault(),d[c]=!0,e&&console.log(c))}function b(a){var b=a.keyCode,c=String.fromCharCode(b);-1!=="ASDQWE".indexOf(c)&&(a.preventDefault(),d[c]=!1,e&&console.log(c))}function c(){window.addEventListener("keydown",a),window.addEventListener("keyup",b)}var d={},e=!1;return{init:c,keys:d}}(),Loader=function(){function a(){d.load()}function b(a){c.push(a)}var c=["images/logo_small.png","images/PixieSpineData.json","images/Pixie.json","images/iP4_BGtile.jpg","images/iP4_ground.png"],d=new PIXI.AssetLoader(c);return d.onComplete=function(){Renderer.play()},{push:b,load:a}}();console.log("supersealion");var Screen=function(){var a=480,b=320,c=new PIXI.Stage(15794175,!0);return{width:a,height:b,stage:c}}(),World=function(){var a="images/background1.png",b="images/foreground.png";Loader.push(a),Loader.push(b);var c=new PIXI.Sprite.fromImage(a);return Screen.stage.addChild(c),{sprite:c}}(),Tiles=void 0,SSL=function(){var a=100,b=100,c=10,d={x:1,y:1},e={x:10,y:10},f={x:0,y:0};return{width:a,height:b,health:c,center:f,velocity:e,acceleration:d}}(),Camera=function(){function a(){Input.keys.A&&b.x--,Input.keys.D&&b.x++,Input.keys.W&&b.y--,Input.keys.S&&b.y++,b.x<0&&(b.x=0),b.x>1024&&(b.x=1024),b.y<0&&(b.y=0),b.y>512&&(b.y=512),World.sprite.x=-b.x,World.sprite.y=-b.y,World.sprite.scale={x:2,y:2}}var b={x:0,y:0};return{render:a}}(),GameSpace=function(){var a=0,b=1e4,c=-1e3,d=3e3;return{left:a,right:b,top:c,bottom:d}}(),Renderer=function(){function a(){e.view.style.width=$(window).width()+"px",e.view.style.height=$(window).width()/1.5+"px"}function b(){f=!1,requestAnimFrame(d)}function c(){f=!0}function d(){f||(Camera.render(),e.render(Screen.stage),requestAnimFrame(d))}var e=new PIXI.autoDetectRenderer(Screen.width,Screen.height),f=!0;return e.view.style.display="block",e.view.style.margin="auto",a(),document.body.appendChild(e.view),$(window).resize(function(){a()}),{play:b,pause:c,resize:a}}();Input.init(),Loader.load();