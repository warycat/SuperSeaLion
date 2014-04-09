'use strict';
console.log('super sea lion');
// var SSL = (function () {
//   var WIDTH = 640;
//   var HEIGHT = 960;
//   return {
//     WIDTH: WIDTH,
//     HEIGHT: HEIGHT
//   }
// })();

// var Renderer = (function () {
//   var WIDTH = SSL.WIDTH;
//   var HEIGHT = SSL.HEIGHT;

//   var renderer = PIXI.autoDetectRenderer(WIDTH, HEIGHT);
//   document.body.appendChild(renderer.view);

//   var stats = new Stats();
//   stats.domElement.style.position = 'absolute';
//   stats.domElement.style.top = '0px';
//   stats.domElement.style.right = '0px';
//   stats.domElement.style.zIndex = 1000;
//   document.body.appendChild(stats.domElement);

//   function render() {
//     requestAnimationFrame(render);
//     Menu.render();
//     Game.render();
//     // renderer.render(Wolf.stage);
//     stats.update();
//   }

//   function orientationchange(e) {
//     var width = $(window).width();
//     var height = $(window).height();
//     var w = Wolf.canvasWidth;
//     var h = Wolf.canvasHeight;
//     $('canvas').css({
//       position: 'absolute',
//       left: (width - w) / 2,
//       top: (height - h) / 2,
//       width: w,
//       height: h
//     });
//   }

//   function init() {
//     window.addEventListener('orientationchange', orientationchange);
//     window.addEventListener('resize', orientationchange);
//     orientationchange();
//   }

//   init();

//   return {
//     render: render
//   };

// })();